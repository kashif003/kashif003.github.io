// Asks Cloudflare whether a token from a Turnstile widget on the site is genuine.
// TURNSTILE_SECRET_KEY lives in Vercel's environment variables, never in this repo.
module.exports = async function passesTurnstile(token) {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
  });
  const result = await response.json();
  return result.success === true;
};
