const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name value"],
      unique: true,
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subCategory", SubCategorySchema);
