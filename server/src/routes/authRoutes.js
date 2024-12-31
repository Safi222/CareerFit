const Route = require('express').Router
const passport = require('passport')
const passportSetup = require('../config/passportSetup')
const authController = require('../controllers/authController')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const auth = Route()

auth.post('/register', validatorMiddleware.registerValidator(), authController.registerController)

auth.post('/login', validatorMiddleware.loginValidator(), authController.loginController)

auth.get('/google',
	passport.authenticate('google', { scope: ['profile'] }));

auth.get('/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }), authController.googleAuth);

module.exports = auth
