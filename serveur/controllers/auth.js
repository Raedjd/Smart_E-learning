const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendMail = require("./verificationMail");
const ObjectId = require("mongoose").Types.ObjectId;
const { CLIENT_URL } = process.env;
const token_duration = 2 * 24 * 60 * 1000;

//---------------------------------------------------register user-------------------------------------------//
module.exports.signUp = async (req, res) => {
  try {
    //const user = await UserModel.create({ username, email, password });
    const { username, email, password } = req.body;
    const errors = { username: "", email: "", password: "" };

    const userUsername = await UserModel.findOne({ username });
    if (userUsername) {
      errors.username = "This username already exists.";
      return res.status(400).json({ msg: errors });
    }
    if (!validateEmail(email)) {
      errors.email = "Invalid emails.";
      return res.status(400).json({ msg: errors });
    }

    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      errors.email = "This email already exists.";
      return res.status(400).json({ msg: errors });
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      return res.status(400).json({ msg: errors });
    }
    const user = { username, email, password };
    exports.userToken = createActivationToken(user);

    var random_token = "";
    for (var i = 0; i < 6; i++) {
      random_token += process.env.ACTIVATION_TOKEN_SECRET.charAt(
        Math.floor(Math.random() * process.env.ACTIVATION_TOKEN_SECRET.length)
      );
    }
    exports.rdm = random_token;
    const url = `${CLIENT_URL}/user/activate/${random_token}`;
    sendMail(email, url);
    res.json({
      msg: "Register Success! Please activate your email to start.",
    });

    // console.log(user);
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
    const { activation } = req.body;
    //  console.log(this.rdm);

    if (activation === this.rdm) {
      // console.log(activation === this.rdm);
      const user = jwt.verify(
        this.userToken,
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
    } else {
      res.json({ msg: "Account is not activated,repeat another time!" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

//---------------------------------------------------login user-------------------------------------------//

module.exports.signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.login(username, password);

    const token = createToken(user._id);
    res.cookie("jwt", token, { http: true, token_duration: token_duration });
    res.status(200).json({ user });

    await UserModel.findOneAndUpdate(
      { _id: user.id },
      {
        disabled: false,
      }
    );
    // console.log(user.id);
  } catch (err) {
    const errors = signInErrors(err);
    return res.status(500).json({ errors });
  }
};
const signInErrors = (err) => {
  let errors = { username: "", password: "" };

  if (err.message.includes("username")) errors.username = "Username unknown!";

  if (err.message.includes("password"))
    errors.password = "password does not matched!";

  return errors;
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

//---------------------------------------------------forget password---------------------------------------//
module.exports.forgetPass = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user)
      return res.status(400).json({ msg: "This email does not exist!" });
    const access_token = createToken({ id: user._id });
    const url = `${CLIENT_URL}/user/reset/${access_token}`;

    sendMail(email, url, "Reset your password");
    res.json({ msg: "Re-send the password, please check your email." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//---------------------------------------------------reset password-------------------------------------------//
module.exports.resetPass = async (req, res) => {
  if (!ObjectId.isValid(req.user.id))
    return res.status(400).send("ID unknow:" + "" + req.user.id);
  //console.log(req.user.id);
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);
    await UserModel.findOneAndUpdate(
      { _id: ObjectId(req.user.id) },
      {
        password: passwordhash,
      }
    ).exec();

    res.json({ msg: "Password successfully changed!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
