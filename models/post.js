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
    posts: {
      type: [String],
    },
    comments: {
      type: [String],
  
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("user", userSchema);

module.exports = UserModel;