const QuizModel = require("../models/quiz");
const UserModel = require("../models/user");

// all quizs
module.exports.allQuizs = async (req, res) => {
  try {
    const quizs = await QuizModel.find();

    res.status(200).json(quizs);
  } catch (err) {
    res.json({ message: err });
  }
};

// add a quiz
module.exports.addQuiz = async (req, res) => {
  const quiz = new QuizModel({
    quizCreator: req.body.quizCreator,
    title: req.body.title,
    questions: req.body.questions,
    level: req.body.level,
    description:req.body.description,
    numberOfQuestion:req.body.numberOfQuestion,
    updatedAt: Date.now(),
  });
      await quiz.save()
      res.status(201).json(quiz)


 
};

// one quiz
module.exports.getQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.quizId);
    const user = await UserModel.findById(quiz.quizCreator);
    res.json({
      quiz:quiz,
      user: user
  });
  } catch (err) {
    res.json({ message: err });
  }
};
//delete a quiz
module.exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.remove({ _id: req.params.quizId });
    res.status(200).send("quiz deleted");
  } catch (err) {
    res.json({ message: err });
  }
};
//upadate a quiz
module.exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.updateOne(
      { _id: req.params.quizId },
      {
        $set: {
          title: req.body.title,
          level: req.body.level,
          numberOfQuestion: req.body.numberOfQuestion,
          updatedAt: Date.now(),
        },
      }
    );
    res.status(200).send("quiz updated");
  } catch (err) {
    res.json({ message: err });
  }
};
// Teacher quiz
module.exports.allTeacherQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.find({ quizCreator: req.params.teacherId });
    res.status(200).json(quiz);
    // res.send("test")
  } catch (err) {
    res.send("error");
    res.json({ message: err });
  }
};
