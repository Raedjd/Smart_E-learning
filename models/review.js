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
          default:Date.now
        },
        enabled: {
          type: Boolean,
          default:true
        },
      }
    );

module.exports = mongoose.model("review", reviewSchema);