const mongoose = require('mongoose');
const shortid = require('shortid');

const topicSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      unique: true,
      default: shortid.generate,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    lastcomment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  },
  { timestamps: true }
);

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;