"""
Yanabiya — Real-time customer chat service.

- WebSocket-based bidirectional chat between customers (anonymous, identified
  by a random sessionId stored in their browser) and admins (authenticated via
  JWT from the existing Node.js auth service).
- Persists all conversations in MongoDB (`chat_sessions`, `chat_messages`).
- REST endpoints for history + session list (admin panel).
- CORS configured for both the Amplify frontend and local dev.

Run locally:
    pip install -r requirements.txt
    uvicorn main:app --host 0.0.0.0 --port 5001 --reload

Env vars:
    MONGO_URI         (required in prod; falls back to localhost)
    JWT_SECRET        (must match the Node.js API's JWT_SECRET)
    FRONTEND_URL      (optional; CORS allowed origin)
    PORT              (defaults to 5001)
"""
from __future__ import annotations

import asyncio
import json
import logging
import os
import secrets
from datetime import datetime
from typing import Dict, List, Optional, Set

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query, WebSocket, WebSocketDisconnect, status
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field

load_dotenv()

# ─── Config ───────────────────────────────────────────────────────────────────

MONGO_URI    = os.getenv("MONGO_URI", "mongodb://localhost:27017/yanabiya")
JWT_SECRET   = os.getenv("JWT_SECRET", "yanabiya_super_secret_jwt_key_2024_admin_panel")
FRONTEND_URL = os.getenv("FRONTEND_URL", "")
PORT         = int(os.getenv("PORT", "5001"))

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("yanabiya-chat")

# ─── App + Mongo ──────────────────────────────────────────────────────────────

app = FastAPI(title="Yanabiya Chat", version="1.0.0")

# Allow Amplify, S3 website, localhost, and any *.yanabiyagroup.com
origins = list({o for o in [
    "http://localhost:5173", "http://localhost:5174", "http://localhost:4173",
    "https://main.d5va1xe1a6sj1.amplifyapp.com",
    "http://yanabiya-website-prod.s3-website-eu-west-1.amazonaws.com",
    FRONTEND_URL,
] if o})

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https?://(localhost(:\d+)?|.*\.yanabiyagroup\.com|.*\.amplifyapp\.com)$",
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

mongo_client: Optional[AsyncIOMotorClient] = None
db = None
sessions_col = None
messages_col = None


@app.on_event("startup")
async def on_startup():
    global mongo_client, db, sessions_col, messages_col
    mongo_client = AsyncIOMotorClient(MONGO_URI)
    # Derive DB name from URI path or default to 'yanabiya'
    db_name = MONGO_URI.rstrip("/").rsplit("/", 1)[-1].split("?")[0] or "yanabiya"
    db = mongo_client[db_name]
    sessions_col = db["chat_sessions"]
    messages_col = db["chat_messages"]
    # Indexes
    await sessions_col.create_index("sessionId", unique=True)
    await messages_col.create_index([("sessionId", 1), ("createdAt", 1)])
    log.info("Mongo connected to db: %s", db_name)


@app.on_event("shutdown")
async def on_shutdown():
    if mongo_client:
        mongo_client.close()


# ─── Models ───────────────────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    sessionId: str
    text: str
    sender: str   # "customer" | "admin"
    senderName: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)


class StartSessionRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    sessionId: Optional[str] = None   # if returning customer


class StartSessionResponse(BaseModel):
    sessionId: str
    name: str
    email: str
    createdAt: datetime
    unreadByAdmin: int = 0


# ─── Connection registry ──────────────────────────────────────────────────────

# sessionId → set of customer websockets
customer_conns: Dict[str, Set[WebSocket]] = {}
# set of admin websockets (admins see all sessions)
admin_conns: Set[WebSocket] = set()


async def broadcast_to_session(session_id: str, payload: dict, exclude: Optional[WebSocket] = None):
    """Send a message to every websocket subscribed to this session."""
    targets = list(customer_conns.get(session_id, set())) + list(admin_conns)
    msg = json.dumps(payload, default=str)
    for ws in targets:
        if ws is exclude:
            continue
        try:
            await ws.send_text(msg)
        except Exception:
            pass   # connection died — handled by disconnect


# ─── Auth helper ──────────────────────────────────────────────────────────────

def verify_admin_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except JWTError:
        return None


# ─── REST endpoints ───────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {"status": "ok", "service": "yanabiya-chat", "ts": datetime.utcnow()}


@app.post("/api/chat/start", response_model=StartSessionResponse)
async def start_session(req: StartSessionRequest):
    """Customer starts (or resumes) a chat session."""
    if req.sessionId:
        existing = await sessions_col.find_one({"sessionId": req.sessionId})
        if existing:
            return StartSessionResponse(**existing)

    session_id = secrets.token_urlsafe(16)
    doc = {
        "sessionId": session_id,
        "name": (req.name or "Guest").strip()[:60],
        "email": (req.email or "").strip()[:120],
        "createdAt": datetime.utcnow(),
        "lastMessageAt": datetime.utcnow(),
        "unreadByAdmin": 0,
        "closed": False,
    }
    await sessions_col.insert_one(doc)

    # Notify admins of new session
    await broadcast_to_session("__admin_only__", {
        "type": "session-created",
        "session": {
            "sessionId": session_id,
            "name": doc["name"],
            "email": doc["email"],
            "createdAt": doc["createdAt"].isoformat(),
        }
    })

    return StartSessionResponse(**doc)


@app.get("/api/chat/messages/{session_id}")
async def get_messages(session_id: str, limit: int = Query(100, le=500)):
    """Fetch chat history for a session."""
    cursor = messages_col.find({"sessionId": session_id}).sort("createdAt", 1).limit(limit)
    rows = []
    async for m in cursor:
        m.pop("_id", None)
        m["createdAt"] = m["createdAt"].isoformat()
        rows.append(m)
    return {"sessionId": session_id, "messages": rows}


@app.get("/api/chat/sessions")
async def list_sessions(token: str = Query(...)):
    """Admin-only: list all chat sessions newest first."""
    if not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")

    cursor = sessions_col.find({}).sort("lastMessageAt", -1).limit(200)
    rows = []
    async for s in cursor:
        s.pop("_id", None)
        s["createdAt"] = s["createdAt"].isoformat()
        s["lastMessageAt"] = s.get("lastMessageAt", s["createdAt"])
        if isinstance(s["lastMessageAt"], datetime):
            s["lastMessageAt"] = s["lastMessageAt"].isoformat()
        rows.append(s)
    return {"sessions": rows}


@app.post("/api/chat/mark-read/{session_id}")
async def mark_read(session_id: str, token: str = Query(...)):
    """Admin acknowledges they've read messages in a session."""
    if not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")
    await sessions_col.update_one({"sessionId": session_id}, {"$set": {"unreadByAdmin": 0}})
    return {"ok": True}


# ─── WebSocket: customer ──────────────────────────────────────────────────────

@app.websocket("/ws/customer/{session_id}")
async def ws_customer(websocket: WebSocket, session_id: str):
    await websocket.accept()
    session = await sessions_col.find_one({"sessionId": session_id})
    if not session:
        await websocket.send_text(json.dumps({"type": "error", "message": "Session not found"}))
        await websocket.close()
        return

    customer_conns.setdefault(session_id, set()).add(websocket)
    log.info("Customer connected: session=%s (conns=%d)", session_id, len(customer_conns[session_id]))

    try:
        while True:
            raw = await websocket.receive_text()
            try:
                data = json.loads(raw)
            except Exception:
                continue
            text = (data.get("text") or "").strip()[:2000]
            if not text:
                continue

            msg = {
                "sessionId": session_id,
                "text": text,
                "sender": "customer",
                "senderName": session.get("name", "Guest"),
                "createdAt": datetime.utcnow(),
            }
            await messages_col.insert_one(dict(msg))
            await sessions_col.update_one(
                {"sessionId": session_id},
                {"$set": {"lastMessageAt": msg["createdAt"]}, "$inc": {"unreadByAdmin": 1}}
            )

            payload = {
                "type": "message",
                "sessionId": session_id,
                "text": text,
                "sender": "customer",
                "senderName": msg["senderName"],
                "createdAt": msg["createdAt"].isoformat(),
            }
            await broadcast_to_session(session_id, payload)

    except WebSocketDisconnect:
        log.info("Customer disconnected: session=%s", session_id)
    finally:
        customer_conns.get(session_id, set()).discard(websocket)


# ─── WebSocket: admin ─────────────────────────────────────────────────────────

@app.websocket("/ws/admin")
async def ws_admin(websocket: WebSocket, token: str = Query(...)):
    if not verify_admin_token(token):
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    await websocket.accept()
    admin_conns.add(websocket)
    log.info("Admin connected (conns=%d)", len(admin_conns))

    try:
        while True:
            raw = await websocket.receive_text()
            try:
                data = json.loads(raw)
            except Exception:
                continue

            session_id = data.get("sessionId")
            text = (data.get("text") or "").strip()[:2000]
            if not session_id or not text:
                continue

            msg = {
                "sessionId": session_id,
                "text": text,
                "sender": "admin",
                "senderName": data.get("adminName") or "Yanabiya Team",
                "createdAt": datetime.utcnow(),
            }
            await messages_col.insert_one(dict(msg))
            await sessions_col.update_one(
                {"sessionId": session_id},
                {"$set": {"lastMessageAt": msg["createdAt"], "unreadByAdmin": 0}}
            )

            payload = {
                "type": "message",
                "sessionId": session_id,
                "text": text,
                "sender": "admin",
                "senderName": msg["senderName"],
                "createdAt": msg["createdAt"].isoformat(),
            }
            await broadcast_to_session(session_id, payload)

    except WebSocketDisconnect:
        log.info("Admin disconnected")
    finally:
        admin_conns.discard(websocket)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=False)
