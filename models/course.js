const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    content: {
    },

    price: {
      type: Number,
    },
    raiting: {
      type:Number,
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

const CourseModel = mongoose.model("course", courseSchema);

module.exports = CourseModel;