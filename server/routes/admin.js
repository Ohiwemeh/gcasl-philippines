const express = require('express');
const router = express.Router();
const Verification = require('../models/verification');
const User = require('../models/User');
const Withdrawal = require('../models/withdrawal');
const { verifyUser } = require('../controllers/adminController');

// GET all verifications
router.get('/verifications', async (req, res) => {
  try {
    const verifications = await Verification.find().populate('user');
    res.json(verifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch verifications' });
  }
});

// ✅ Use the controller for verifying user (PUT)
router.put('/verifications/:id', verifyUser);

// ✅ BALANCE UPDATE
router.put('/balance/:userId', async (req, res) => {
  const { balance } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { balance },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Balance updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update balance' });
  }
});

// ✅ Withdrawals
router.get('/withdrawals', async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().populate('user');
    res.json({ withdrawals });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch withdrawals' });
  }
});

router.put('/withdrawals/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await Withdrawal.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: `Marked as ${status}`, updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update withdrawal' });
  }
});

module.exports = router;
