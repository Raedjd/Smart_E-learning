const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

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
      validate: [isEmail],
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
    },
    birthdate: {
      type: Date,
    },
    contactNumber: {
      type: Number,
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    updatedAt: {
      type: Date,
    },
    enabled: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
//function for encryption password before save into dataBase
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
