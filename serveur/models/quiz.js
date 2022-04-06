const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    quizCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description : {
        type:String ,
        required:true
    },
    questions: [
      {
        stage: {
          type: Number,
        },
        message: {
          type: String,
          required: true,
        },
        answers: [ 
          {
            isRight: {
              type: Boolean,
              required:true 
            },
            message: {
              type: String,
            },
          },
        ],
      },
    ],
   
    level: {
      type: String,
      enum: ["beginner", "Medium", "advanced"],
    },
    numberOfQuestion: {
      type: Number,
     
    },
    enabled: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
const QuizModel = mongoose.model("quiz", quizSchema);
module.exports = QuizModel;
