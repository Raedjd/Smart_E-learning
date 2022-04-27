const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: String,
  createdAt: Date,
});

const Category = mongoose.model("Categoryy", CategorySchema);
module.exports = Category;
