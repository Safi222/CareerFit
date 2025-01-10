const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validation = require("express-validator");
const { createToken } = require("../utils/jwtHelper");

/**
 * Register a new user.
 *
 * @params {Object} req - The request object containing user data (firstName, lastName, email, password).
 * @params {Object} res - The response object to send the response back to the client.
 *
 * @returns {Object} JSON response with status and data (token or error message).
 */
const registerController = async (req, res) => {
  try {
    const errors = validation.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        data: {
          title: errors.array()[0],
        },
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.status(400).json({
        status: "fail",
        data: {
          title: "cannot use that email",
        },
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = await createToken(user);
    return res.status(201).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      data: {
        title: "internal server error",
      },
    });
  }
};

/**
 * Login a user.
 *
 * @params {Object} req - The request object containing login credentials (email, password).
 * @params {Object} res - The response object to send the response back to the client.
 *
 * @returns {Object} JSON response with status and data (token or error message).
 */
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        data: { title: "User Not Found" },
      });
    }

    const result = await user.matchPassword(password);
    if (!result) {
      return res.status(400).json({
        status: "fail",
        data: { title: "Wrong password" },
      });
    }

    const token = await createToken(user);
    return res.status(200).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      data: {
        title: "internal server error",
      },
    });
  }
};

/**
 * Handle Google Authentication.
 *
 * @params {Object} req - The request object containing the authenticated user's information.
 * @params {Object} res - The response object to send the response back to the client.
 *
 * @returns {Object} JSON response with status and data (token).
 */
const googleAuth = async (req, res) => {
  try {
    const token = await createToken(req.user);
    const frontendURL = process.env.FRONTEND_URL
    return res.redirect(`${frontendURL}/login?token=${token}`);
    // json({
    //     status: "success",
    //     data: {
    //         token
    //     }
    // })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      data: {
        title: "internal server error",
      },
    });
  }
};

module.exports = {
  registerController,
  loginController,
  googleAuth,
};
