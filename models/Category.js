const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    
    category_Id: {
        type: String,
        required: true,
      },

  name: {
    type: String,
    required: true,
  },

  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;