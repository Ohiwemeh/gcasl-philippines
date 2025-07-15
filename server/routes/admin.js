const express = require('express');
const router = express.Router();
const Verification = require('../models/Verification');
const User = require('../models/User'); // ✅ Make sure this is included

// GET all verifications
router.get('/verifications', async (req, res) => {
  try {
    const verifications = await Verification.find().populate('user');
    res.json(verifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch verifications' });
  }
});

// POST approve or reject
router.post('/verifications/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await Verification.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: `Marked as ${status}`, updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update verification' });
  }
});

// ✅ BALANCE UPDATE ROUTE
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
module.exports = router;
