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
    quizName : {
      type:String,
    },
    score: {
        type: String,
    }
  },

  {
    timestamps: true,
  }
);
const QuizHistoryModel = mongoose.model("QuizHistory", quizhistorySchema);
module.exports = QuizHistoryModel;
