const jwt = require("jsonwebtoken");
const User = require('../models/User');

const authorizationVerfication = async (req, res, next) => {
	const authHeader = req.get("Authorization") || req.get("authorization")
	if (!authHeader) {
		return res.status(400).json(
			{
				status: "fail",
				data: {
					title: "Missing Authorization Header"
				}
			}
		)
	}
	const token = authHeader.split(' ')[1]
	if (!token) {
		return res.status(400).json(
			{
				status: "fail",
				data: {
					title: "Missing token"
				}
			}
		)
	}
	try {
		const decodedToken = jwt.verify(token, 'bla bla')
		const user = await User.findOne({ _id: decodedToken.id });
		if (!user) {
            return res.status(401).json({
                status: "fail",
                data: { title: "Unauthorized: User not found" }
            });
        }
		req.user = {
			firstName: decodedToken.firstName,
			id: decodedToken.id
		}
		next()
	} catch {
		return res.status(401).json(
			{
				status: "fail",
				data: {
					title: "unauthorized"
				}
			}
		)
	}
}

module.exports = {
	authorizationVerfication
}
