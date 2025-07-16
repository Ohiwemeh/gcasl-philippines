const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
// const Verification = require('../models/Verification'); // Make sure this model exists
const Verification = require('../models/verification')
// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer setup with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'gcasl-verification',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

// POST /api/verification
router.post('/', upload.fields([{ name: 'frontId' }, { name: 'backId' }]), async (req, res) => {
  const { userId } = req.body;

  console.log('✅ req.files:', req.files);
  console.log('✅ req.body:', req.body);

  try {
    const frontId = req.files['frontId']?.[0]?.path; // ✅ corrected
    const backId = req.files['backId']?.[0]?.path;

    if (!frontId || !backId || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const verification = await Verification.create({
      user: userId,
      frontIdUrl: frontId,
      backIdUrl: backId,
      status: 'pending',
    });

    res.status(201).json({ message: 'Verification submitted', verification });
  } catch (err) {
    console.error('Verification upload error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/all', async (req, res) => {
  try {
    const verifications = await Verification.find()
      .populate('user', 'firstName lastName email'); // just selected fields

    res.json({ verifications });
  } catch (err) {
    console.error('Failed to fetch verifications:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
