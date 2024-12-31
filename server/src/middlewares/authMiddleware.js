const jwt = require("jsonwebtoken")

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
