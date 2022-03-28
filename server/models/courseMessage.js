import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
      },
    // description: {
    //     type: String,
    //     required:true
    //   },
    teacher: {
        type: String,
        required:true
      },
      price: {
        type: Number,
        required:true
      },
    tags: {
        type: [String],
        required:true
      },
    selectedFile: {
        type: String,
        required:true
      },
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    enabled: {
        type: Boolean,
        default:true
      },
})

var courseMessage = mongoose.model('courseMessage', courseSchema);

export default courseMessage;