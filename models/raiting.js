const mongoose = require("mongoose");
const raitingSchema = new mongoose.Schema(
    {
      
        rate: {
          type: Number,
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

const RatingModel = mongoose.model("raiting", raitingSchema);
module.exports = RatingModel;