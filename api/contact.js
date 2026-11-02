// Sends contact form messages to my inbox through Resend.
// RESEND_API_KEY lives in Vercel's environment variables, never in this repo.
const TO = 'kashifriyaz03@gmail.com';
const FROM = 'Portfolio Contact <onboarding@resend.dev>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

// asks Cloudflare whether the token from the form's Turnstile widget is genuine
async function passesTurnstile(token) {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
  });
  const result = await response.json();
  return result.success === true;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // hidden field real visitors never fill in: pretend it worked so bots move on
  if (clean(body.company)) return res.status(200).json({ ok: true });

  const email = clean(body.email);
  const title = clean(body.title).replace(/[\r\n]+/g, ' ');
  const message = clean(body.message);

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!title || title.length > 150) {
    return res.status(400).json({ error: 'Please enter a title under 150 characters.' });
  }
  if (!message || message.length > 5000) {
    return res.status(400).json({ error: 'Please enter a message under 5000 characters.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.TURNSTILE_SECRET_KEY) {
    console.error('RESEND_API_KEY or TURNSTILE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Could not send your message.' });
  }

  const token = clean(body['cf-turnstile-response']);
  if (!token) {
    return res.status(400).json({ error: 'Please complete the verification.' });
  }

  try {
    if (!(await passesTurnstile(token))) {
      return res.status(403).json({ error: 'Verification failed. Please try again.' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `[Portfolio] ${title}`,
        text: `From: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error('Resend error', response.status, await response.text());
      return res.status(502).json({ error: 'Could not send your message.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend request failed', err);
    return res.status(502).json({ error: 'Could not send your message.' });
  }
};
