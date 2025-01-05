const User = require('../models/User');

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

        const user = await User.findById(userId, 'firstName lastName email profilePic');
        if (!user) {
            return res.status(404).json({
                status: "fail",
                data: {
                    title: "User not found"
                }
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePic: user.profilePic
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