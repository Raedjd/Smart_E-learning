const UserModel = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

module.exports.getAllUsers = async (req, res) => {
  const allUsers = await UserModel.find().select("-password"); //select all data except password
  const users = allUsers.filter((user) => user.disabled === false);
  res.status(200).json(users);
};

module.exports.getOneUser = (req, res) => {
  const token = req.cookies.jwt;

  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      //console.log(decodedToken.id);
      const user = await UserModel.findById({ _id: decodedToken.id }).select(
        "-password"
      );
      res.status(200).json(user);
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
///////////////////////////////////////////////////////////////////////////////
module.exports.modifyUser = async (req, res) => {
  const token = req.cookies.jwt;
  try {
    jwt
      .verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        //console.log(decodedToken.id);
        await UserModel.findOneAndUpdate(
          { _id: decodedToken.id },

          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            phone: req.body.phone,
            birthdate: req.body.birthdate,
            whatDoUdo: req.body.whatDoUdo,
            nationality: req.body.nationality,
            aboutMe: req.body.aboutMe,
          },

          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
      })
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
///////////////////////////////////////////////////////////////////////////////
module.exports.updatePasswordByUser = async (req, res) => {
  const token = req.cookies.jwt;
  const responses = {
    successed: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  };
  const { old_password, new_password, confirm_password } = req.body;

  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      let current_user = await UserModel.findOne({ _id: decodedToken.id });
      // console.log(current_user);
      let isTrue = bcrypt.compareSync(old_password, current_user.password);
      console.log(isTrue);
      if (!isTrue) {
        responses.old_password = "Current Password Invalid!";
        res.json({ msg: responses });
      } else if (new_password.length < 6) {
        responses.new_password = "Password must be at least 6 characters.";
        res.json({ msg: responses });
      } else if (new_password !== confirm_password) {
        responses.confirm_password = "Password does not matched!";
        res.json({ msg: responses });
      } else {
        const salt = await bcrypt.genSalt();
        let confirm_passwordHash = await bcrypt.hash(confirm_password, salt);
        await UserModel.findOneAndUpdate(
          { _id: decodedToken.id },
          {
            password: confirm_passwordHash,
          }
        );
        responses.successed = "Password successfully changed!";
        res.json({ msg: responses });
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

///////////////////////////////////////////////////////////////////////////////
module.exports.removeUser = async (req, res) => {
  const token = req.cookies.jwt;

  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      console.log(decodedToken.id);
      await UserModel.remove({ _id: decodedToken.id }).exec();
      res.status(200).json({ message: "user deleted. " });
    });
    res.cookie("jwt", "", { maxAge: 1 });
    res.cookie("id", "", { maxAge: 1 });
  } catch (err) {
    return res.status(500).json({ message: err });
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
    //sendMail(user.email);

    res.json({ msg: "Update Success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

///////////////////////////////////////////////////////////////////////////////
module.exports.disableUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      await UserModel.findOneAndUpdate(
        { _id: decodedToken.id },
        {
          disabled: true,
        }
      );
      next();
    });
    res.cookie("jwt", "", { maxAge: 1 });
    res.cookie("id", "", { maxAge: 1 });
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
