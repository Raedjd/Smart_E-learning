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
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
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
    avatar: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Men", "Women"],
    },
    phone: {
      type: Number,
    },
    birthdate: {
      type: Date,
    },
    aboutMe: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
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
    whatDoUdo: {
      type: String,
    },
    nationality: {
      type: String,
    },
    likes: {
      type: [String],
    },

    yourDataFile: {
      //for become a teacher
      type: String,
    },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },

    disabled: { type: Boolean, default: false },
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
//for auth
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
