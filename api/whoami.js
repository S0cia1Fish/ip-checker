export default function handler(req, res) {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const allHeaders = Object.entries(req.headers)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  res.status(200).send(`
👋 Hello! Here’s what we know about your request:

🌍 IP: ${clientIP}
📱 User-Agent: ${userAgent}

🗂 All Headers:
${allHeaders}
  `);
}
