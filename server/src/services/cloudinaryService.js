// src/services/cloudinaryService.js
const cloudinary = require('../config/cloudinary');

/**
 * Upload a file to Cloudinary.
 * @param {string} filePath - Path to the file to upload.
 * @param {string} folder - Folder in Cloudinary to save the file.
 * @returns {Promise<object>} - Uploaded file details.
 */
const uploadProfilePic = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'image',
      type: "upload", // Ensures the file is publicly accessible
    });
    return result;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};

const uploadCvFile = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'raw',
      type: "upload", // Ensures the file is publicly accessible
    });
    return result;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};

module.exports = { uploadProfilePic, uploadCvFile };
