import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    profilepicture:{
        type:String,
        default:""
    },
    followers:{
        type:[String],
        default:[]
    },
    following:{
        type:[String],
        default:[]
    },
    bio:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const User = mongoose.model("User",UserSchema)

export default User