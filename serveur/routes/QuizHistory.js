const router = require("express").Router();
const quizHistory = require("../controllers/HistoryQuiz");

router.post("/add-quizhistory",quizHistory.addQuizHistory)
router.get("/all-quizhistory",quizHistory.allQuizsHistory)
router.get("/:quizHistoryId",quizHistory.getQuizHistory)
router.get("/student-quiz/:studentId",quizHistory.allStudentQuiz)
module.exports = router;  