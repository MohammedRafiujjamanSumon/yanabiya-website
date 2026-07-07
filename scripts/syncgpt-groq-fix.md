# SyncGpt Groq fix — apply this in your PC's syncmeta repo

**Why:** The flagship "SyncGpt" model is pinned to a local Ollama provider whose
Cloudflare tunnel is dead, so chat replies fail with "SyncGpt couldn't answer right
now." This patch routes SyncGpt to Groq (free tier, `GROQ_API_KEY` is already in the
server env) while keeping a one-variable switch back to local Ollama later.

Every deploy from the PC overwrites the server-side hotfix, so the change must live
in the PC repo. Give this file to Claude Code on the PC and ask it to apply the edit.

**File:** `server/index.js` — inside the `BRAND_PROVIDERS` object.

**Replace this line:**

```js
  syncgpt: localProvider,
```

**With:**

```js
  // Flagship brand: use local Ollama when SYNCGPT_PROVIDER=local (and it's configured),
  // otherwise reply via Groq cloud so chat works without a local model.
  syncgpt: (/^local$/i.test(process.env.SYNCGPT_PROVIDER || 'cloud') && localProvider)
    ? localProvider
    : (makeProvider({
        name: 'syncgpt',
        baseURL: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
        apiKey: process.env.GROQ_API_KEY,
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      }) || localProvider),
```

**Verify after deploying** (from the server or a browser devtools console on the site):

```
POST https://syncmeta.ai/api/complete
{"model":"syncgpt","messages":[{"role":"user","content":"say OK"}]}
→ expect {"text":"OK...","provider":"syncgpt","model":"qwen/qwen3-32b",...}
```

**Later, to switch SyncGpt to a local Ollama:** set `SYNCGPT_PROVIDER=local` and point
`OLLAMA_BASE_URL` at the running Ollama — no code change needed.

**Also gone from the current image:** the `crawler/` folder (Playwright web-search +
in-app browser backend). If you want the in-app Browser feature back, include the
`crawler/` folder in the image again (or run it as its own container named `crawler`
on the same Docker network, port 8000, env `CRAWLER_URL=http://crawler:8000`).
