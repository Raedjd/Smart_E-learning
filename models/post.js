const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    PostId: {
      type: String,
      required: true,
    },

    picture: {
      type: String,
    },
    message: {
      type: String,
    },

    likes: {
      type: Number,
    },
    comments: {
      type: [String],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

const PostModel = mongoose.model("user", userSchema);

module.exports = UserModel;
