import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utilities/helpers/generateTokenAndSetCookie.js"

const signupUser = async (req,res)=>{
    try {
        const {name,email,username,password} = req.body
        const user = await User.findOne({ $or: [{username}, {email}]})
        if (user){
            return res.status(400).json({message:"User Already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            name,
            email,
            username,
            password:hashedPassword})

        await newUser.save()

        if (newUser){
            generateTokenAndSetCookie(newUser._id,res)
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                username:newUser.username
            })
        }else{
            res.status(400).json({message:"invalid user data"})
        }
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in Signup User: " + error.message);
    }
}

const loginUser = async (req,res)=>{
    try {
        const {username,password} = req.body
        if (username=='' || password==''){
            return res.status(400).json({message:"Fill up all the required fields"})
        }
        const user = await User.findOne({username})
        if (!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        generateTokenAndSetCookie(user._id,res)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username
        })
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in Login User: " + error.message);
    }
}

const logoutUser = async(req,res)=>{

    try {
        res.cookie("token","",{maxAge:1})
        res.status(200).json({message:"User Logged Out Successfully"})
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in Logout User: " + error.message);
    }
}

export {signupUser,loginUser,logoutUser} 