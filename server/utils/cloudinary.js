const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'BDO-Trust_verifications',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
  },
});

module.exports = {
  cloudinary,
  storage,
};
