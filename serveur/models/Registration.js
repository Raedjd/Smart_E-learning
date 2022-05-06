const mongoose = require("mongoose");

const RegistrationSchema = mongoose.Schema({
  category: String,
  course: String,
  level: String,
});

module.exports = mongoose.model("registration", RegistrationSchema);
