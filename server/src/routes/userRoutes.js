const express = require('express');
const { uploadPic, uploadcv } = require('../middlewares/fileUpload');
const { uploadProfilePicture, uploadCV } = require('../controllers/userController');
const { authorizationVerfication } = require('../middlewares/authMiddleware');
const malwareScanMiddleware = require('../middlewares/malwareScanMiddleware');

const userRoutes = express.Router();

// Protect routes with authorizationVerfication
userRoutes.post('/profile-picture', authorizationVerfication, uploadPic.single('profilePic'), uploadProfilePicture);
userRoutes.post('/cv', authorizationVerfication, uploadcv.single('cvFile'), uploadCV);

module.exports = userRoutes;
