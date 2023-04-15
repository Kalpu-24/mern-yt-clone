import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true
    },
    Views:{
        type: Number,
        default: 0
    },
    tags:{
        type: [String],
        required: true
    },
    likes:{
        type: [String],
        default: null
    },
    dislikes:{
        type: [String],
        default: null
    }
}, {timestamps: true});

export default mongoose.model('Video', videoSchema);