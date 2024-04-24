import User from '../models/userModel.js'
import Post from '../models/postModel.js'

const createPost= async (req, res) => {
    try {
        const {postedBy,text,img}  = req.body
        if (!postedBy || !text){
            return res.status(400).json({
                error: "Please fill all the fields"
            })
        }
        const user = await User.findById(postedBy)
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        }
        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                error: "You are not authorized to perform this action"
            })
        }
        const maxLength = 500
        if (text.length > maxLength) {
            return res.status(400).json({
                error: `Text should be less than ${maxLength} characters`
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
            error: error.message
        })
        console.log(error)
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            })
        }
        res.status(200).json({
            post
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
        console.log(error)
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            })
        }
        if (post.postedBy.toString()!== req.user._id.toString()) {
            return res.status(401).json({
                error: "You are not authorized to perform this action"
            })
        }
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Post deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
        console.log(error)
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const {id:postId} = req.params
        const userId = req.user._id
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            })
        }
        const isLiked = post.likes.includes(userId)
        if (isLiked) {
            //Unliking the post
            await Post.updateOne({_id:postId},{$pull:{likes:userId}})
            res.status(200).json({message:"Post unliked."})
        } else {
            post.likes.push(userId)
            await post.save()
            res.status(200).json({message:"Post liked"})
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
        console.log(error)
    }
}

const replyPost = async (req, res) => {
    try {
        const {id:postId} = req.params
        const {text} = req.body
        const userID = req.user._id
        const userProfilePicture = req.user.profilePicture
        const username = req.user.username

        if (!text){
            return res.status(400).json({
                error: "Text field is required"
            })
        }

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            })
        }

        const reply = {userID,text,userProfilePicture,username}
        post.replies.push(reply)
        await post.save()

        res.status(201).json({
            message: "Reply created successfully",
            reply
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
        console.log(error)
    }
}

const getFeedPosts = async (req, res) => {
    try {
        const userId= req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        }
        const following = user.following
        const feedPosts = await Post.find({postedBy:{$in:following}}).sort({createdAt:-1})
        res.status(200).json({
            feedPosts
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
        console.log(error)
    }
}

export {createPost,getPost,deletePost,likeUnlikePost,replyPost,getFeedPosts}