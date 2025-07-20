const express = require('express');
const router = express.Router();
const Withdrawal = require('../models/withdrawal');
const WithdrawalCode = require('../models/WithdrawalCode');
const User = require('../models/User'); // ✅ imported

// ✅ Cleaned-up POST route for withdrawing
router.post('/', async (req, res) => {
  try {
    const { userId, toAccount, amount, note, code } = req.body;

    const validCode = await WithdrawalCode.findOne({ code, used: false });
    if (!validCode) {
      return res.status(400).json({ message: 'Invalid or already used withdrawal code.' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance.' });
    }

    // Deduct balance
    user.balance -= amount;
    await user.save();

    // Mark code as used
    validCode.used = true;
    await validCode.save();

    // Create withdrawal record
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

// GET /api/withdrawal/:userId - Fetch user's withdrawal history
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const withdrawals = await Withdrawal.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(withdrawals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch withdrawals.' });
  }
});


module.exports = router;
