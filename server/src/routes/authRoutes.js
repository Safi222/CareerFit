const Route = require('express').Router
const authController = require('../controllers/authController')
const validatorMiddleware = require('../middlewares/validatorMiddleware')
const auth = Route()

auth.post('/register', validatorMiddleware.registerValidator(), authController.registerController)

auth.post('/login', (req, res)=>{
	res.json({msg: "login endpoint exist"
	})
})

module.exports = auth
