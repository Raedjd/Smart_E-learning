const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema(
    {
    questionId: {
        type:String , 
        required : true 
    },
    quizId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz",
        required: true,
    },
    response : [{type: Schema.Types.ObjectId, ref: 'response'}],
    stage: {
        type:Number,
    },
    message :  {
        type:String , 
        required:true
    },
    }
)
const questionModel = mongoose.model("question", questionSchema);
module.exports = questionModel;