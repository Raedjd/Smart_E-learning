const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel");

//@desc Get subCategory
//@route GET /api/subCategory
//@access Private
const getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.find();
  res.status(200).json(subCategories);
});

//@desc post subCategory
//@route POST /api/subCategory
//@access Private
const setSubCategory = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("please add a name field");
  }

  const subCategory = await SubCategory.create({
    name: req.body.name,
    category: req.body.category,
  });

  let categoryId = await Category.findById(req.body.category);
  categoryId.subCategories.push(subCategory);
  await categoryId.save();
  res.status(200).json(subCategory);
});

//@desc Update subCategory
//@route PUT /api/subCategories/:id
//@access Private
const updateSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id);
  if (!subCategory) {
    res.status(400);
    throw new Error("subCategory not found");
  }
  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedSubCategory);
});

//@desc Delete subCategory
//@route DELETE /api/subcategories/:id
//@access Private
const deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id);
  if (!subCategory) {
    res.status(400);
    throw new Error("subCategory not found");
  }
  await subCategory.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getSubCategories,
  setSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
