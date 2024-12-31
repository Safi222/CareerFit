const bcrypt = require('bcrypt')
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const validation = require('express-validator')
const registerController = async (req, res) => {
	const errors = validation.validationResult(req)
	if (!errors.isEmpty()){
		return res.status(400).json({
			status : "fail",
			"data" : errors.array()[0]
		})
	}
	const { firstName, lastName, email, password } = req.body;
	const oldUser = await User.findOne({email: email})
	if (oldUser){
		return res.status(400).json(
			{
				status: "success",
				data: {
					title: "cannot use that email"
				}
			}
		)
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({
		firstName,
		lastName,
		email,
		password: hashedPassword
	})
	await user.save()
	token = 'Bearer ' + await jwt.sign({ firstName: user.firstName, id: user._id }, "bla bla", { expiresIn: '1d' })
	return res.status(201).json(
		{
			status: "success",
			data: {
				token
			}
		}
	)
}

module.exports = {
	registerController
}
