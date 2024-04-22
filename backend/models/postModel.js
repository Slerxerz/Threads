import { text } from "express";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        maxLength:500
    },
    img:{
        type:String,
    },
    likes:{
        type:Number,
        default:0
    },
    replies:[{
        userID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        text:{
            type:String,
            required:true
        },
        userProfilePicture:{
            type:String
        },
        username:{
            type:String
        }
    }]
},{timestamps:true},
)

const Post = mongoose.model("Post",PostSchema);

export default Post;