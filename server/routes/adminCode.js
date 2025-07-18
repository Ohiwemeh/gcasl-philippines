const express = require('express');
const router = express.Router();
const WithdrawalCode = require('../models/WithdrawalCode');

// Admin sets a new withdrawal code
router.post('/set-code', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: 'Code is required' });

    const newCode = new WithdrawalCode({ code });
    await newCode.save();

    res.status(201).json({ message: 'Code set successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

