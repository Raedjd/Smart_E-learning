const mongoose = require("mongoose");

const badgeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name value"],
    },
    level: {
      type: String,
    },
    value: {
      type: Number,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Badge", badgeSchema);
