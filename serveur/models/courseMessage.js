const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  price: Number,
  category:String,
  subCategory:String,
  level:String,
  creator: String,
  tags: [String],
  selectedFile: String,
  reviews: [],
  likes: { type: [String], default: [] },
  //comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var CourseMessage = mongoose.model("CourseMessage", courseSchema);

module.exports = CourseMessage;
