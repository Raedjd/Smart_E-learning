const router = require("express").Router();
const courseController = require("../controllers/courses");
const auth = require("../middleware/forAuth");

router.get("/creator", courseController.getCoursesByCreator);
router.get("/search", courseController.getCoursesBySearch);
router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourse);

router.post("/", courseController.createCourse);
router.patch("/:id", courseController.updateCourse);
router.delete("/:id",courseController.deleteCourse);
router.patch("/:id/likeCourse", courseController.likeCourse);
router.post(
  "/:id/commentCourse",
  courseController.commentCourse
);

module.exports = router;
