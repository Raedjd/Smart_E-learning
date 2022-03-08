const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema(
{
    quizId: {
        type:String , 
        required : true 
    },
    quizCreator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title:{
        type:String , 
        required : true 
    },
    questions :[{type: Schema.Types.ObjectId, ref: 'question'}], 
    level  : {
         type: String,
         enum: ["beginner", "Medium", "advanced"],
    },
    numberOfQuestion: {
        type:Number,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
      },
      updatedAt: {
        type: Date,
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

