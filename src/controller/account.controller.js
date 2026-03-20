const accountModel = require("../models/account.model.js");

async function createAccount(req, res) {

    const user = req.user;

    const account = await accountModel.create({
        user: user._id,
    })

    res.status(201).json({ message: "Account created successfully", account });
}

module.exports = { createAccount };