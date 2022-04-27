const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");

//@desc Get category
//@route GET /api/category
//@access Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

//@desc Get category
//@route GET /api/category
//@access Private

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json(category);
});

//@desc post category
//@route POST /api/category
//@access Private
const setCategory = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("please add a name field");
  }

  const category = await Category.create({
    name: req.body.name,
  });
  res.status(200).json(category);
});

//@desc Update category
//@route PUT /api/categories/:id
//@access Private
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedCategory);
});

//@desc Delete category
//@route DELETE /api/categories/:id
//@access Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }
  await category.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCategories,
  setCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
