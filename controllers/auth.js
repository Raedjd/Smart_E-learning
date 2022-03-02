const UserModel = require("../models/user");
const sgMail = require("@sendgrid/mail");
//register user
module.exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.create({ username, email, password });
    res.status(201).json({ user: user._id });
  } catch (error) {
    res.status(200).send({ error });
  }
};
