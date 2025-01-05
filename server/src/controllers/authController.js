const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validation = require('express-validator')
const registerController = async(req, res) => {
    const errors = validation.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "fail",
            "data": {
                title: errors.array()[0]
            }
        })
    }
    const { firstName, lastName, email, password } = req.body;
    const oldUser = await User.findOne({ email: email })
    if (oldUser) {
        return res.status(400).json({
            status: "fail",
            data: {
                title: "cannot use that email"
            }
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })
    await user.save()
    token = 'Bearer ' + await jwt.sign({ firstName: user.firstName, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.status(201).json({
        status: "success",
        data: {
            token
        }
    })
}

const loginController = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).json({
            "status": "fail",
            "data": { "title": "User Not Found" }
        })
    }
    const result = await user.matchPassword(password)
    if (!result) {
        return res.status(400).json({
            "status": "fail",
            "data": { "title": "Wrong password" }
        })
    }
    token = 'Bearer ' + await jwt.sign({ firstName: user.firstName, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.status(200).json({
        status: "success",
        data: {
            token
        }
    })
}

const googleAuth = async(req, res) => {
    token = 'Bearer ' + await jwt.sign({ firstName: req.user.firstName, id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.status(200).json({
        status: "success",
        data: {
            token
        }
    })
}
module.exports = {
    registerController,
    loginController,
    googleAuth
}