const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        user = await UserModel.findById(decodedToken.id);
        await UserModel.findOneAndUpdate(
          { _id: decodedToken.id },
          {
            disabled: false,
          }
        );
        userId = decodedToken.id;
        res.locals.user = user;
        // console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
////////////////////////////////////////////////////////////////////////////////////
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json({ msg: "Invalid Authentication." });
      } else {
        //  console.log(decodedToken.id);
        // user = UserModel.findOne({ _id: decodedToken.id });
        next();
      }
    });
  } else {
    console.log("Invalid Authentication");
  }
};

//////////////////////////////////////////////////////////////////////////////////////
module.exports.forResetPass = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication." });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////////////
module.exports.authAdmin = async (req, res, next) => {
  try {
    //console.log(user);
    if (user.role !== "admin")
      return res.status(500).json({ msg: "Admin resources access denied." });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

/////////////////////////////////////////////////////////////////////////////////
