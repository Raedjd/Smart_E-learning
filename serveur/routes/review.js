const router = require("express").Router();
const courseReview = require("../controllers/review");

router.get("/", courseReview.getReviews);
router.get("/:id", courseReview.getReview);

router.post("/", courseReview.createReview);
router.patch("/:id", courseReview.updateReview);
router.delete("/:id", courseReview.deleteReview);
module.exports = router;
