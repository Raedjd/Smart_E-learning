const express = require("express");
const router = express.Router();
const {
  getSubCategories,
  setSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryControllers");

router.route("/").get(getSubCategories).post(setSubCategory);
router.route("/:id").delete(deleteSubCategory).put(updateSubCategory);

module.exports = router;
