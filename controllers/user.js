const { Validator } = require("node-input-validator");
const UserModel = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const sendMail = require("./teacherValid");
const jwt = require("jsonwebtoken");

module.exports.getAllUsers = async (req, res) => {
  const allUsers = await UserModel.find().select("-password"); //select all data except password
  const users = allUsers.filter((user) => user.disabled === false);
  res.status(200).json(users);
};

module.exports.getOneUser = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow:" + "" + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.status(200).send(docs);
    else console.log("ID unknow:" + "" + req.params.id);
  }).select("-password");
};
///////////////////////////////////////////////////////////////////////////////
module.exports.modifyUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID invalid : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          gender: req.body.gender,
          aboutMe: req.body.aboutMe,
          birthdate: req.body.birthdate,
          WhatDoUdo: req.body.WhatDoUdo,
          nationality: req.body.nationality,
        },
      },

      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
///////////////////////////////////////////////////////////////////////////////
module.exports.updatePasswordByUser = async (req, res) => {
  const token = req.cookies.jwt;

  const { old_password, new_password, confirm_password } = req.body;
  if (!old_password || !new_password || !confirm_password)
    return res.status(400).json({ msg: "Please fill in all fields." });
  if (new_password.length < 6)
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters." });

  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      let current_user = await UserModel.findOne({ _id: decodedToken.id });
      // console.log(current_user);
      let isTrue = bcrypt.compareSync(old_password, current_user.password);
      console.log(isTrue);
      if (!isTrue) res.json({ msg: "Current Password Invalid!" });
      else {
        if (new_password === confirm_password) {
          const salt = await bcrypt.genSalt();
          let confirm_passwordHash = await bcrypt.hash(confirm_password, salt);
          await UserModel.findOneAndUpdate(
            { _id: decodedToken.id },
            {
              password: confirm_passwordHash,
            }
          );
          res.json({ msg: "Password successfully changed!" });
        } else return res.status(200).json({ msg: "Invalid new password." });
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

///////////////////////////////////////////////////////////////////////////////
module.exports.removeUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow:" + "" + req.params.id);
  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "user deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
///////////////////////////////////////////////////////////////////////////////
module.exports.updateToBecomeTeacher = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID invalid : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          field_of_experience: req.body.field_of_experience,
          isAudience: req.body.isAudience,
        },
      },

      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
///////////////////////////////////////////////////////////////////////////////
module.exports.updateUserRole = async (req, res) => {
  // student to teacher
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        role: "teacher",
      }
    );
    const user = await UserModel.findById({ _id: req.params.id });
    //console.log(user.email);
    sendMail(user.email);

    res.json({ msg: "Update Success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
/* module.exports.editPDP = async (req, res) => {
  try {
    console.log(req.user.id);
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}; */
///////////////////////////////////////////////////////////////////////////////
module.exports.disableUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      //  console.log(decodedToken.id);
      await UserModel.findOneAndUpdate(
        { _id: decodedToken.id },
        {
          disabled: true,
        }
      );

      next();
    });

    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
///////////////////////////////////////////////////////////////////////////////
module.exports.follow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));

    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
///////////////////////////////////////////////////////////////////////////////
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      { new: true, upsert: true }
    );
    await UserModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
