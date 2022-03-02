const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
    {
      
        content: {
          type: String,
          required: true,
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
      }
    );

const ReviewModel = mongoose.model("review", reviewSchema);
module.exports = ReviewModel;