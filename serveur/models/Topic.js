const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    title: String,
    createdAt: Date,
    forumId: mongoose.ObjectId,
    content: String,
    userId: mongoose.ObjectId 
});



const Topic = mongoose.model('Topic', TopicSchema);
module.exports = Topic;

