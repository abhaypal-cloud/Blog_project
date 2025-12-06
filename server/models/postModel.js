import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }]
});

const postModel = new mongoose.model("Post", postSchema);
export default postModel;