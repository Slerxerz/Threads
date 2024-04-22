import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({ error: "Authorization denied" })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decodedToken.userId).select("-password")
        if(!user) {
            return res.status(401).json({ error: "Authorization denied" })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in Middleware:", error.message);
    }
}

export default protectRoute