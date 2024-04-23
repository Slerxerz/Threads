import User from '../models/userModel.js'
import Post from '../models/postModel.js'

const createPost= async (req, res) => {
    try {
        const {postedBy,text,img}  = req.body
        if (!postedBy || !text){
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        const user = await User.findById(postedBy)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "You are not authorized to perform this action"
            })
        }
        const maxLength = 500
        if (text.length > maxLength) {
            return res.status(400).json({
                message: `Text should be less than ${maxLength} characters`
            })
        }
        const newPost = new Post({postedBy,text,img})
        await newPost.save()
        res.status(201).json({
            message: "Post created successfully",
            newPost
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }
        res.status(200).json({
            post
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }
        if (post.postedBy.toString()!== req.user._id.toString()) {
            return res.status(401).json({
                message: "You are not authorized to perform this action"
            })
        }
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Post deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

export {createPost,getPost,deletePost}