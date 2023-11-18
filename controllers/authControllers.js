const User = require("../models/userModels.js");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const home = (req, res) => {
  res.status(200).json({
    Data: "This is home page",
  });
};

const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  // console.log(name, email, password, confirmPassword);

  if (!name || !email || !password || !confirmPassword) {
    res.status(400).json({
      success: false,
      Message: "Every field is required !!!",
    });
  }

  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    res.status(400).json({
      success: false,
      messasge: "Please provide a valid email id",
    });
  }

  if (password !== confirmPassword) {
    res.status(400).json({
      success: false,
      Message: "Password & conformPassword dosn't match",
    });
  }

  try {
    const userInfo = User(req.body);
    const result = await userInfo.save();

    res.status(200).json({
      success: true,
      Data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        messasge: "Account already exist with privided email id !!!",
      });
    }

    res.status(400).json({
      success: false,
      messasge: error.messasge,
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      Message: "Every field is required !!",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user ||!(bcrypt.compare(password,user.password))) {
      res.status(400).json({
        success: false,
        Message: "Envalid credentials !!",
      });
    }
    //token ko yahi bana lo ya fi userModel me bhi bana sakte ho sir ne userModel me banaya tha but yaha para banaya bahut easy hai that's why mai yhi par banaya hu
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET,
      { expiresIn: "24h" }
    );

    //user.password = undefined;  //TAAKI USER KA PASSWORD UNDEFINED HO JAYE OR JAB HUM RESPONSE M USER KI DETAILS MAANGE TOH BYI PASSWORD TOH UNDEFINED HAI TOH UNDEFINED KO KYA HI SHOW KREGA RESPONSE ME

    user.password = undefined;

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000, //24h me expire ho jayega
      httpOnly: true, //  not able to modify  the cookie in client side
    };

    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      messasge: "cant ran",
    });
  }
};

const getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logOut = (req, res) => {
  const cookieOption = {
    expiresIn: new Date(),
    httpOnly: true,
  };

  try {
    res.cookie("token", null, cookieOption);
    res.status(200).json({
      success: true,
      message: "Logged out successfully !!",
    });
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    })
  }
};
module.exports = { home, signUp, signIn, getUser, logOut };
