const express = require("express");
const router = express.Router();
const {
  getBadges,
  setBadge,
  deleteBadge,
  getBadge,
} = require("../controllers/badgeController");

router.route("/").get(getBadges).post(setBadge);
router.route("/:id").delete(deleteBadge).get(getBadge);

module.exports = router;
