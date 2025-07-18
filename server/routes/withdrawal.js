const express = require('express');
const router = express.Router();
const Withdrawal = require('../models/withdrawal');
const WithdrawalCode = require('../models/WithdrawalCode');



router.post('/', async (req, res) => {
  try {
    const { userId, toAccount, amount, note, code } = req.body;

    const validCode = await WithdrawalCode.findOne({ code, used: false });
    if (!validCode) {
      return res.status(400).json({ message: 'Invalid or already used withdrawal code.' });
    }

    // Mark code as used
    validCode.used = true;
    await validCode.save();

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
