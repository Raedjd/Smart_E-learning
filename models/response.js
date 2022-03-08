const mongoose = require("mongoose");
const responseSchema = new mongoose.Schema(
    {
        responseId: {
            type:String , 
            required : true 
        },
        questionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "question",
            required: true,
        },
        isRight: {
            type: Boolean,
            default:false,
        },
        message : {
            type:String , 
        },
    }
)
const responseModel = mongoose.model("response", responseSchema);
module.exports = responseModel;