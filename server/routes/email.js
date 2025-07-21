// routes/email.js
const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/send', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Gcasl-philippines <support@gcash-philippians.com>',
      to,
      subject,
      html: message,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
