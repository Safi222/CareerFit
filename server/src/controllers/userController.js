const { uploadProfilePic, uploadCvFile, deleteFileFromCloudinary } = require('../services/cloudinaryService');
const fs = require('fs/promises');
const User = require('../models/User');

const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.user.id; // Authenticated user's ID
    const user = await User.findById(userId);

    // If the user already has a profile picture, delete it from Cloudinary
    if (user.profilePic) {
      const publicId = user.profilePic.split('/').pop().split('.')[0]; // Extract the public_id
      await deleteFileFromCloudinary(publicId);
    }

    // Upload the new file to Cloudinary
    const result = await uploadProfilePic(req.file.path, 'profile_pictures');
    await fs.unlink(req.file.path); // Delete local file

    // Update user profilePic field in the database
    await User.findByIdAndUpdate(userId, { profilePic: result.secure_url }, { new: true });

    res.status(200).json({ 
      message: 'Profile picture uploaded successfully', 
      profilePic: result.secure_url
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const uploadCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.user.id; // Authenticated user's ID
    const user = await User.findById(userId);

    // If the user already has a CV, delete it from Cloudinary
    if (user.cvFile) {
      const publicId = user.cvFile.split('/').pop().split('.')[0]; // Extract the public_id
      await deleteFileFromCloudinary(publicId);
    }

    // Upload the new file to Cloudinary
    const result = await uploadCvFile(req.file.path, 'cv_files');
    await fs.unlink(req.file.path); // Delete local file

    // Update user cv field in the database
    await User.findByIdAndUpdate(userId, { cvFile: result.secure_url }, { new: true });

    res.status(200).json({ 
      message: 'CV uploaded successfully', 
      cvFile: result.secure_url
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadProfilePicture, uploadCV };
