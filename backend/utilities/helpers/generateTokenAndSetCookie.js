import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = async (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"3d"
    })
    res.cookie("token",token,{
        httpOnly:true,                  //This cookie cannot be accessed by browsers
        maxAge:1000*60*60*24*3 ,        //3 days
        sameSite:"strict"               //Cross-Site Request Forgery (CSRF). It controls whether a cookie can be sent with requests that originate from different domains (cross-site requests)
    })
    return token
}

export default generateTokenAndSetCookie