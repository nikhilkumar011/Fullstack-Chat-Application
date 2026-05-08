const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model.js');

exports. protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Unauthorised - No token Provided"})
        }

        const decoded = jwt.verify(token,process.env.SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorised - Invalid token "})
        }

        const user = await userModel.findById(decoded.userId);

        if(!user){
            return res.status(400).json({message:"No user found with that id"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error)
    }
}