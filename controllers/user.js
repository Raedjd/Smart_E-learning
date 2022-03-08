const UserModel = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password"); //select all data except password
  res.status(200).json(users);
};

module.exports.singleUser = (req, res) => {
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
          enabled: req.body.enabled,
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
  try {
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        passwordHash,
      }
    );

    res.json({ msg: "Password successfully changed!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

/////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////
module.exports.updateUserRole = async (req, res) => {
  // student to teacher
  try {
    const { role } = req.body;

    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        role,
      }
    );

    res.json({ msg: "Update Success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
