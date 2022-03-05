const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const sendMail = require("./verificationMail");
const { CLIENT_URL } = process.env;
const token_duration = 2 * 24 * 60 * 1000;

//---------------------------------------------------register user-------------------------------------------//
module.exports.signUp = async (req, res) => {
  try {
    //const user = await UserModel.create({ username, email, password });
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ msg: "Please fill in all fields." });
    const userUsername = await UserModel.findOne({ username });
    if (userUsername)
      return res.status(400).json({ msg: "This username already exists." });
    if (!validateEmail(email))
      return res.status(400).json({ msg: "Invalid emails." });

    const userEmail = await UserModel.findOne({ email });
    if (userEmail)
      return res.status(400).json({ msg: "This email already exists." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters." });
    const user = { username, email, password };
    const activation_token = createActivationToken(user);
    const url = `${CLIENT_URL}/user/activate/${activation_token}`;
    sendMail(email, url);
    res.json({
      msg: "Register Success! Please activate your email to start.",
    });
    console.log(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
//validate email
function validateEmail(email) {
  const valid =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return valid.test(email);
}
//active email
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

//---------------------------------------------------login user---------------------------------------_----//

module.exports.signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { http: true, token_duration: token_duration });
    res.status(200).json({ msg: "Login Success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: 2 * 24 * 60 * 1000, //Valid for 2 days
  });
};

//---------------------------------------------------logout user-------------------------------------------//
module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
