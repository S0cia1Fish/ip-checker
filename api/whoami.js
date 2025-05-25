import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const forwarded = req.headers['x-forwarded-for'];
  const clientIP = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
  const time = new Date().toISOString();

  const emailMessage = `New visit detected!

IP Address: ${clientIP}
Time: ${time}
`;

  try {
    const data = await resend.emails.send({
      from: 'Visit Notifier <onboarding@resend.dev>', // ← здесь твой проверенный sender
      to: 'vk.com.socialfish@gmail.com',             // ← сюда отправляем (твоя почта)
      subject: 'New Visit Detected',
      text: emailMessage,
    });

    console.log('Email sent!', data);
    res.status(200).json({ message: 'Email sent', details: data });
  } catch (error) {
    console.error('Failed to send email', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
