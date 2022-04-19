const express = require("express");
const router = express.Router();
const {
  getCategories,
  setCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/categoryController");

router.route("/").get(getCategories).post(setCategory);
router
  .route("/:id")
  .delete(deleteCategory)
  .put(updateCategory)
  .get(getCategory);

module.exports = router;
