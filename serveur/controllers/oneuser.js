const OneuserModel = require("../models/user");



// all quizs
module.exports.allUsers = async (req, res) => {
  try {
    const users = await OneuserModel.find();

    res.status(200).json(users);
  } catch (err) {
    res.json({ message: err });
  }
};
// one quiz
module.exports.getOneuser = async (req, res) => {
  try {
    const oneuser = await OneuserModel.findById(req.params.oneuserId);
    
    res.status(200).json(oneuser);
  } catch (err) {
    res.json({ message: err });
  }
};

