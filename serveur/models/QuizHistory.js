const mongoose = require("mongoose");
const quizhistorySchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quiz : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz", 
    },
    score: {
        type: Number,
    }
  },

  {
    timestamps: true,
  }
);
const QuizHistoryModel = mongoose.model("QuizHistory", quizhistorySchema);
module.exports = QuizHistoryModel;
