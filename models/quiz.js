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
    questions :[{type: Schema.Types.ObjectId, ref: 'question'}] 

    
}

);
const quizModel = mongoose.model("quiz", quizSchema);
module.exports = quizModel;

