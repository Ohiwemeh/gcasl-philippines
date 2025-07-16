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

    // Update verification status
    verification.status = 'approved';
    await verification.save();

    // Update user status
    const user = await User.findById(verification.user._id);
    if (user) {
      user.status = 'approved'; // Optional
      await user.save();
    }

    res.json({ message: 'User verification approved' });
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
