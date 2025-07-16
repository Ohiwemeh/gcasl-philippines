// controllers/adminController.js
const Verification = require('../models/verification');
const User = require('../models/User');

exports.verifyUser = async (req, res) => {
  const { id } = req.params;

  try {
    const verification = await Verification.findById(id).populate('user');

    if (!verification) {
      return res.status(404).json({ message: 'Verification not found' });
    }

    // Only update if still pending
    if (verification.status === 'approved') {
      return res.status(400).json({ message: 'User is already approved' });
    }

    // Update verification status
    verification.status = 'approved';
    await verification.save();

    // Optional: Update user status or any other field
    if (verification.user) {
      await User.findByIdAndUpdate(verification.user._id, { status: 'approved' });
    }

    res.json({ message: 'User verification approved', verification });
  } catch (error) {
    console.error('Error verifying user:', error.message);
    res.status(500).json({ message: 'Server error during verification' });
  }
};
