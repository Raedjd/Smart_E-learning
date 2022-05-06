const express = require("express");
const router = express.Router();
const {
  getTopics,
  deleteTopics,
} = require("../controllers/topicsController");

router.route("/").get(getTopics);
router
  .route("/:id")
  .delete(deleteTopics)
  

module.exports = router;
