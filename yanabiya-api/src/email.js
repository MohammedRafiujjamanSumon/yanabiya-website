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

module.exports = { sendReply, isConfigured: () => !!getTransporter() }
