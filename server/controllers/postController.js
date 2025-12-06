import postModel from "../models/postModel.js";
class postController {
    static likePost = async (req, res) => {
        try {
            const postId = req.params.id;
            const userId = req.userId;

            const post = await postModel.findById(postId);
            if (!post) return res.status(404).json({ message: "Post not found" });
            if (post.likes.includes(userId)) {
                post.likes.pull(userId);
                await post.save();
                return res.json({ message: "Post unliked", totalLikes: post.likes.length });
            }

            post.likes.push(userId);
            await post.save();
            res.json({ message: "Post liked", totalLikes: post.likes.length });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export default postController;