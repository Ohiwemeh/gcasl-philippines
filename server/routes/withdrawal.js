// routes/withdraw.js
const express = require('express');
const router = express.Router();
const Withdrawal = require('../models/withdrawal');

router.post('/', async (req, res) => {
  try {
    const { userId, toAccount, amount, note } = req.body;
    const newWithdrawal = new Withdrawal({
      user: userId,
      toAccount,
      amount,
      note,
      status: 'pending'
    });
    await newWithdrawal.save();
    res.status(201).json({ message: 'Withdrawal request submitted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
