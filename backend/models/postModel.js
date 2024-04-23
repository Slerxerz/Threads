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
        //array of user id's
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default:[]
    },
    replies:[{
        userID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        text:{
            type:String
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