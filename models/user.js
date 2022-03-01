const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["man", "women"],
    },
    birthdate: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    aboutMe: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    posts: {
      type: [String],
    },
    courses: {
      type: [String],
    },
    madeCourses: {
      type: [String],
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
