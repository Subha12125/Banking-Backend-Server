const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");


async function userRegisterController(req, res) {
    const { email, name, password } = req.body;

    const isExist = await User.findOne({
        email: email
    });

    if( isExist){
        return res.status(400).json({
            message: "User already exist",
            status: "failed"
        })
    };


    const user = await User.create({
        email,
        name,
        password
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    // Set the token in a cookie
    res.cookie("token", token);

    await emailService.sendRegistrationEmail(user.email, user.name);

    return res.status(201).json({
       user: {
        _id: user._id,
        email: user.email,
        name: user.name
       }, token
    });
}

/**
 * - User Login Controller
 * - POST /api/auth/login
 */

async function userLoginController(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select("+password");

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isValidPassword = await user.comparePassword(password);

    if(!isValidPassword){
        return res.status(400).json({
            message: "Invalid password"
        })
    };

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    // Set the token in a cookie
    res.cookie("token", token);

    return res.status(200).json({
       user: {
        _id: user._id,
        email: user.email,
        name: user.name
       }, token
    });


}


module.exports = { userRegisterController, userLoginController }