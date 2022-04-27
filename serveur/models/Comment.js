const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    createdAt: Date,
    topicId: mongoose.ObjectId,
    content: String,
    userId: mongoose.ObjectId
});



const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;

