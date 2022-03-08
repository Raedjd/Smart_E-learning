const mongoose = require('mongoose');
const shortid = require('shortid');

const commentSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      unique: true,
      default: shortid.generate,
    },
    message: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;