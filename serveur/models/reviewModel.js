const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
  // creator:String,
  title: String,
  text: String,
  // rate:Number,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseMessage" },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var reviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = reviewModel;
