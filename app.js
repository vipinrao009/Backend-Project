
const express = require("express");
const authRouter = require("./router/authRouter.js");
const connnecTodb = require("./config/db.config.js");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors')

// Database connect
 connnecTodb();

// middleware
app.use(express.json());
app.use(cookieParser()) // Cookie Parser is a middleware of Node JS used to get cookie data.
app.use(cors({
    origin:"set_the origin in env file",
    credentials:true
}))

app.use("/", authRouter);

module.exports = app;

