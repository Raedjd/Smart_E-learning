const mongoose = require('mongoose');
const shortid = require('shortid');

const subcategorySchema = new mongoose.Schema({
  shortid: {
    type: String,
    unique: true,
    default: shortid.generate,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  lastcomment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    },
  ],
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;