const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema(
    {
      
        rate: {
          type: Number,
          required:true,
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


module.exports =  mongoose.model("rating", ratingSchema);

