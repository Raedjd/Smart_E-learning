const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name value"],
      unique: true,
    },
    subCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "subCategory" },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
