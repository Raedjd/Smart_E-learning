import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    price: Number,
    creator: String,
    tags: [String],
    selectedFile: String,
    reviews : [],
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var CourseMessage = mongoose.model('CourseMessage', courseSchema);

export default CourseMessage;