const router = require("express").Router();
const quizController = require("../controllers/quiz");


//quiz routing
router.post("/add-quiz",quizController.addQuiz)
router.get("/all-quizs",quizController.allQuizs)
router.get("/:quizId",quizController.getQuiz)
router.delete("/delete-quiz/:quizId",quizController.deleteQuiz)
router.post("/update-quiz/:quizId",quizController.updateQuiz)
router.get("/teacher-quiz/:teacherId",quizController.allTeacherQuiz)



module.exports = router;