const UserModel = require("../models/user");
const QuizHistoryModel = require("../models/QuizHistory");
const QuizModel = require("../models/quiz");


module.exports.allQuizsHistory = async (req, res) => {
  try {
    const quizsHistory = await QuizHistoryModel.find();

    res.status(200).json(quizsHistory);
  } catch (err) {
    res.json({ message: err });
  }
};
module.exports.addQuizHistory = async (req, res) => {
  const quizsHistory = new QuizHistoryModel({
    student: req.body.student,
    quiz: req.body.quiz,
    quizName:req.body.quizName,
    score: req.body.score,
  });
  await quizsHistory.save();
  res.status(201).json(quizsHistory);
};
module.exports.getQuizHistory = async (req, res) => {
  try {
    const QuizHistory = await QuizHistoryModel.findById(req.params.userId);
    const user = await UserModel.findById(QuizHistory.student);
    res.json({
      quizHistory: QuizHistory,
      user: user,
    });
  } catch (err) {
    res.json({ message: err });
  }
};
module.exports.allStudentQuiz = async (req, res) => {
  try {
    const QuizHistory = await QuizHistoryModel.find({
      student: req.params.studentId,
    });
   // const user = await UserModel.findById(req.params.studentId);
   // const quiz = await QuizModel.findById(QuizHistory.quiz);



    res.status(200).json(QuizHistory);
    // res.send("test")
  } catch (err) {
    res.send("error");
    res.json({ message: err });
  }
};
