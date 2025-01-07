const jwt = require("jsonwebtoken");
const User = require('../models/User');
const { verifyToken } = require('../utils/jwtHelper');

/**
 * Middleware to verify if the user is authorized by checking the Authorization header.
 * 
 * @params {Object} req - The request object. Contains the `Authorization` or `authorization` header with a Bearer token.
 * @params {Object} res - The response object. Used to send error messages if authorization fails.
 * @params {Function} next - The next middleware function to call if the user is authorized.
 * 
 * @returns {Object} JSON response with status and message indicating the authorization result.
 */
const authorizationVerfication = async(req, res, next) => {
    const authHeader = req.get("Authorization") || req.get("authorization");
    if (!authHeader) {
        return res.status(400).json({
            status: "fail",
            data: {
                title: "Missing Authorization Header"
            }
        });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).json({
            status: "fail",
            data: {
                title: "Missing token"
            }
        });
    }
    try {
        const decodedToken = await verifyToken(token);
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
        };
        next();
    } catch {
        return res.status(402).json({
            status: "fail",
            data: {
                title: "Unauthorized"
            }
        });
    }
};

module.exports = {
    authorizationVerfication
};