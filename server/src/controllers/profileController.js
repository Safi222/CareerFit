const User = require('../models/User');

/**
 * Controller to retrieve the user's profile data.
 * 
 * @params {Object} req - The request object containing user information (user ID in req.user).
 * @params {Object} res - The response object to send the response back to the client.
 * 
 * @returns {Object} JSON response with user profile data or error messages.
 */
const profileController = async(req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                status: "fail",
                data: {
                    title: "Invalid request",
                }
            });
        }

        const user = await User.findById(userId, 'firstName lastName email profilePic cvFile');
        if (!user) {
            return res.status(404).json({
                status: "fail",
                data: {
                    title: "User not found"
                }
            });
        }

        console.log("cvFile", user.cvFile)
        return res.status(200).json({
            status: "success",
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePic: user.profilePic,
                cvFile: user.cvFile
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            data: {
                title: "Internal Server Error",
            }
        });
    }
};

module.exports = profileController;