const express = require('express');


/**
 * -Routes Required
 */
const authRouter = require("./routes/auth.route.js");
const accountRouter = require("./routes/account.routes.js");

const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());


/**
 * - Use Routes
 */
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);

module.exports = app;