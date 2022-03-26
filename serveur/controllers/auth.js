const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendResetMail = require("./resetPasswordEmail");
const sendVerifMail = require("./verificationEmail");
const ObjectId = require("mongoose").Types.ObjectId;
const { CLIENT_URL } = process.env;
const token_duration = 2 * 24 * 60 * 1000;
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const fetch = require("node-fetch");
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
    const url = `${random_token}`;
    sendVerifMail(email, url);
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
  const responses = { successed: "", refused: "" };
  try {
    const { verifa } = req.body;
    const { verifb } = req.body;
    const { verifc } = req.body;
    const { verifd } = req.body;
    const { verife } = req.body;
    const { veriff } = req.body;
    const activation = verifa + verifb + verifc + verifd + verife + veriff;

    // console.log(activation);
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
      responses.successed = "Account has been activated!";
      res.json({ msg: responses });
    } else {
      responses.refused = "Account is not activated,repeat another time!";
      res.json({ msg: responses });
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
  res.cookie("id", "", { maxAge: 1 });
  res.redirect("/");
};

//---------------------------------------------------forget password---------------------------------------//
module.exports.forgetPass = async (req, res) => {
  const responses = { successed: "", refused: "" };
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      responses.refused = "This email does not exist!";
      res.json({ msg: responses });
    } else {
      const access_token = createToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      sendResetMail(email, url, "Reset your password");
      responses.successed = "Re-send the password, please check your email.";
      res.json({ msg: responses });
    }
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
    const responses = { successed: "", refused: "" };
    const { password } = req.body;
    if (password.length < 6) {
      responses.refused = "Password must be at least 6 characters.";
      res.json({ msg: responses });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordhash = await bcrypt.hash(password, salt);
      await UserModel.findOneAndUpdate(
        { _id: ObjectId(req.user.id) },
        {
          password: passwordhash,
        }
      ).exec();
      responses.successed = "Password successfully changed!";
      res.json({ msg: responses });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;

    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.MAILING_SERVICE_CLIENT_ID,
    });

    // console.log(verify);

    const { email_verified, email, name, picture } = verify.payload;

    const password = email + process.env.GOOGLE_SECRET;

    const passwordHash = await bcrypt.hash(password, 12);

    if (!email_verified)
      return res.status(400).json({ msg: "Email verification failed." });

    const user = await UserModel.findOne({ email });

    if (user) {
      const token = createToken(user._id);
      res.cookie("jwt", token, { http: true, token_duration: token_duration });

      res.status(200).json({ user });
    } else {
      const newUser = new UserModel({
        username: name,
        email,
        password: passwordHash,
        avatar: picture,
      });

      await newUser.save();
      console.log(newUser);
      const token = createToken(newUser._id);
      res.cookie("jwt", token, { http: true, token_duration: token_duration });

      res.status(200).json({ newUser });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports.facebookLogin = async (req, res) => {
  try {
    const { accessToken, userID } = req.body;

    const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });

    const { email, name, picture } = data;

    const password = email + process.env.FACEBOOK_SECRET;

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await UserModel.findOne({ email });

    if (user) {
      const token = createToken(user._id);
      res.cookie("jwt", token, { http: true, token_duration: token_duration });

      res.status(200).json({ user });
    } else {
      const newUser = new UserModel({
        username: name,
        email,
        password: passwordHash,
        avatar: picture.data.url,
      });

      await newUser.save();
      console.log(newUser);
      const token = createToken(newUser._id);
      res.cookie("jwt", token, { http: true, token_duration: token_duration });

      res.status(200).json({ newUser });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
