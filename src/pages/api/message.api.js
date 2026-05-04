import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, message } = req.body;

    // Basic validation
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing Gmail email configuration: GMAIL_USER and GMAIL_APP_PASSWORD must be set');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'tosif.shahbax@gmail.com',
      subject: `New Contact Form Message from ${email}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from portfolio contact form</em></p>
      `,
      text: `
New Contact Form Submission

From: ${email}

Message:
${message}

---
Sent from portfolio contact form
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Message rejected' });
  }
}