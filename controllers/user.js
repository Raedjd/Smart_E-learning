const UserModel = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

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
          gender: req.body.gender,
          aboutMe: req.body.aboutMe,
          birthdate: req.body.birthdate,
          contactNumber: req.body.contactNumber,
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
