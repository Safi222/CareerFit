const { uploadProfilePic, uploadCvFile } = require('../services/cloudinaryService');
const fs = require('fs/promises');
const User = require('../models/User');

const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload file to Cloudinary
    const result = await uploadProfilePic(req.file.path, 'profile_pictures');
    await fs.unlink(req.file.path); // Delete local file

    // Update user profilePic field in the database
    const userId = req.user.id; // Authenticated user's ID
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: result.secure_url },
      { new: true } // Return the updated user
    );

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

    // Upload file to Cloudinary
    const result = await uploadCvFile(req.file.path, 'cv_files');
    await fs.unlink(req.file.path); // Delete local file

    // Update user cv field in the database
    const userId = req.user.id; // Authenticated user's ID
    const user = await User.findByIdAndUpdate(
      userId,
      { cvFile: result.secure_url },
      { new: true } // Return the updated user
    );

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
