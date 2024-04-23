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

export {createPost}