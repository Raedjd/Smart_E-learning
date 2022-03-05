const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const sendMail = require("./verificationMail");
const { CLIENT_URL } = process.env;
//register user
module.exports.signUp = async (req, res) => {
  try {
    //const user = await UserModel.create({ username, email, password });
    const { username, email, password } = req.body;
    const user = { username, email, password };
    const activation_token = createActivationToken(user);
    const url = `${CLIENT_URL}/user/activate/${activation_token}`;
    sendMail(email, url);
    res.json({
      msg: "Register Success with! Please activate your email to start.",
    });
    console.log(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports.activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    const { username, email, password } = user;

    const check = await UserModel.findOne({ email });
    if (check)
      return res.status(400).json({ msg: "This email already exists." });

    const newUser = new UserModel({
      username,
      email,
      password,
    });

    await newUser.save();

    res.json({ msg: "Account has been activated!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
