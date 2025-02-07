const express = require('express');
const { uploadPic, uploadcv } = require('../middlewares/fileUpload');
const { uploadProfilePicture, uploadCV } = require('../controllers/userController');
const { authorizationVerfication } = require('../middlewares/authMiddleware');
const detectMiddleware = require('../middlewares/detectMalware')
const profileController = require('../controllers/profileController')
const userRoutes = express.Router();

// Protect routes with authorizationVerfication
userRoutes.post('/profile-picture', authorizationVerfication, uploadPic.single('profilePic'), detectMiddleware, uploadProfilePicture);
userRoutes.post('/cv', authorizationVerfication, uploadcv.single('cvFile'), detectMiddleware, uploadCV);
userRoutes.get('/profile', authorizationVerfication, profileController)
module.exports = userRoutes;
