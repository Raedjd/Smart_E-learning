const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true
    },
    photo: {
      type:String,
      required:true
    },
    price: {
      type: Number,
      required:true
    },
    rating: {
      type:Number,
      required:true
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
   category: {
      type: String,
     // ref: "category",
      required: true,
    },
    updatedAt: {
      type: Date,
      default:Date.now
    },
    enabled: {
      type: Boolean,
      default:true
    },
  },
  {
    timestamps: true,
  }
);


module.exports=mongoose.model("course", courseSchema);
