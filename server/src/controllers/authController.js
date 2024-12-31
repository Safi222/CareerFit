const bcrypt = require('bcrypt')
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const registerController = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({
		firstName,
		lastName,
		email,
		password: hashedPassword
	})
	await user.save()
	token = await jwt.sign({ firstName: user.firstName, id: user._id }, "bla bla", { expiresIn: '1d' })
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