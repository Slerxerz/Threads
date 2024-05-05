import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utilities/helpers/generateTokenAndSetCookie.js"
import {v2 as cloudinary} from "cloudinary"
import mongoose from "mongoose"
import Post from "../models/postModel.js"

const getUserProfile = async (req,res)=>{
    //We will fetch the user profile with either username or profile id
    const {query} = req.params
    try {
        let user
        //check if the query is userId
        if(mongoose.Types.ObjectId.isValid(query)){
            user = await User.findOne({_id:query}).select("-password").select("-updatedAt").select("-createdAt").select("-email") 
        } else {
            user = await User.findOne({username:query}).select("-password").select("-updatedAt").select("-createdAt").select("-email") 
        }
        if (!user) return res.status(404).json({error:"User Not Found"})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in User Profile: " + error.message);
    }
}

const signupUser = async (req,res)=>{
    try {
        const {name,email,username,password} = req.body
        const user = await User.findOne({ $or: [{username}, {email}]})
        if (user){
            return res.status(400).json({error:"User Already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            name,
            email,
            username,
            password:hashedPassword,
            profilePicture:"https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"    
        })

        await newUser.save()

        if (newUser){
            generateTokenAndSetCookie(newUser._id,res)
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                username:newUser.username,
                bio:newUser.bio,
                profilePicture:newUser.profilePicture
            })
        }else{
            res.status(400).json({error:"invalid user data"})
        }
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in Signup User: " + error.message);
    }
}

const loginUser = async (req,res)=>{
    try {
        const {username,password} = req.body
        if (username=='' || password==''){
            return res.status(400).json({error:"Fill up all the required fields"})
        }
        const user = await User.findOne({username})
        if (!user){
            return res.status(400).json({error:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.status(400).json({error:"Invalid Credentials"})
        }
        generateTokenAndSetCookie(user._id,res)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
            bio:user.bio,
            profilePicture:user.profilePicture
        })
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in Login User: " + error.message);
    }
}

const logoutUser = async(req,res)=>{

    try {
        res.clearCookie("token")
        res.status(200).json({message:"User Logged Out Successfully"})
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in Logout User: " + error.message);
    }
}

const followUnfollowUser = async(req,res)=>{
    try 
    {   const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id)

        if(id===req.user._id.toString()) return res.status(400).json({error:"You cannot follow/unfollow yourself"});

        if (!userToModify || !currentUser) return res.status(404).json({error:'User Not Found'});

        const isFollowing = currentUser.following.includes(id)

        if (isFollowing){
            //unfollow user
            // Modify currentUser following and modify followers of userToModify
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}})
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
        } else {
            //Follow User
            // Modify currentUser following and modify followers of userToModify
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
        }
        res.status(200).json({message:isFollowing?"Unfollowed Successfully":"Followed Successfully"})
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in Follow/Unfollow User: " + error.message);}
}

const updateUser = async (req, res) => {

    const {username,name,email,password,bio} = req.body
    let {profilePicture} = req.body
    const userId = req.user._id
    try {
        let user = await User.findById(userId)
        if (!user) return res.status(404).json({error:"User Not Found"})

        if (req.params.id!== userId.toString())
            return res.status(404).json({error:"You cannot update other users profile"}) 

        if(password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)
            user.password = hashedPassword
        }
        
        if(profilePicture){
            if (user.profilePicture){
                await cloudinary.uploader.destroy(user.profilePicture.split("/").pop().split(".")[0])
            }
            const uploadResponse = await cloudinary.uploader.upload(profilePicture)
            profilePicture = uploadResponse.secure_url
        }

        user.name = name || user.name
        user.username = username || user.username
        user.email = email || user.email
        user.profilePicture = profilePicture || user.profilePicture
        user.bio = bio || user.bio

        user = await user.save()

        //Find all posts that the user has replied to and upadte its username and picture
        await Post.updateMany(
            {"replies.userID":userId},
            {
                $set:{
                    "replies.$[reply].username":user.username,
                    "replies.$[reply].userProfilePicture":user.profilePicture
                }
            },
            {
                arrayFilters:[{"reply.userID":userId}]
            }
        )

        //password should not be passed as a response
        user.password = null

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("Error in Update User: " + error.message);
    }
}


export {signupUser,loginUser,logoutUser,followUnfollowUser,updateUser,getUserProfile} 