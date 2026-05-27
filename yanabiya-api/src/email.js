const nodemailer = require('nodemailer')

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587'),
    secure: parseInt(SMTP_PORT || '587') === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

async function sendReply({ to, toName, subject, replyText }) {
  const transporter = getTransporter()
  if (!transporter) throw new Error('SMTP not configured')

  const from = process.env.SMTP_FROM || `Yanabiya Group <${process.env.SMTP_USER}>`

  await transporter.sendMail({
    from,
    to: `${toName} <${to}>`,
    subject: subject ? `Re: ${subject}` : 'Reply from Yanabiya Group',
    text: replyText,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <p>${replyText.replace(/\n/g, '<br>')}</p>
      <hr style="margin-top:32px;border:none;border-top:1px solid #e5e7eb">
      <p style="color:#6b7280;font-size:12px">Yanabiya Group &mdash; yanabiyagroup.com</p>
    </div>`,
  })
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]))
}

async function sendNewSubmissionNotification({ name, email, phone, subject, message, country, business }) {
  const transporter = getTransporter()
  if (!transporter) return // silently no-op if SMTP not configured

  const from = process.env.SMTP_FROM || `Yanabiya Group <${process.env.SMTP_USER}>`
  const to = process.env.CONTACT_NOTIFY_EMAIL || 'info@yanabiyagroup.com'

  const rows = [
    ['Name',     name],
    ['Email',    email],
    ['Phone',    phone],
    ['Subject',  subject],
    ['Business', business],
    ['Country',  country],
  ].filter(([, v]) => v && String(v).trim())

  const rowsHtml = rows.map(([k, v]) =>
    `<tr><td style="padding:6px 12px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;width:110px">${k}</td><td style="padding:6px 12px;color:#0f172a;font-size:14px">${escapeHtml(v)}</td></tr>`
  ).join('')

  await transporter.sendMail({
    from,
    to,
    replyTo: email ? `${name || ''} <${email}>` : undefined,
    subject: `New website enquiry${subject ? ` — ${subject}` : ''}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMessage:\n${message}`,
    html: `<div style="font-family:sans-serif;max-width:640px;margin:0 auto;background:#f8fafc;padding:24px">
      <h2 style="font-family:Georgia,serif;color:#0f172a;margin:0 0 16px 0">New website enquiry</h2>
      <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
        ${rowsHtml}
      </table>
      <div style="background:#fff;border-radius:8px;padding:16px 18px;margin-top:14px;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
        <div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">Message</div>
        <div style="color:#0f172a;font-size:14px;white-space:pre-wrap;line-height:1.55">${escapeHtml(message)}</div>
      </div>
      <p style="color:#9ca3af;font-size:11px;margin-top:18px">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
    </div>`,
  })
}

module.exports = { sendReply, sendNewSubmissionNotification, isConfigured: () => !!getTransporter() }
