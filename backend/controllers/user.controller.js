const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const {generateToken} = require('../lib/utils.js');
const validator = require('validator');
const v2 = require('../lib/cloudinary.js');

exports.signup = async (req,res)=>{
   const {fullname,email,password} = req.body;
  try{
   if(!fullname || !email || !password){
      return res.status(400).json({message:"All fields are mandatory"});
   }

   const isEmail = await userModel.findOne({email});
   if(!validator.isEmail(email)){
     return res.status(400).json({message:"Invalid Email"})
   }
   if(!validator.isStrongPassword(password)){
    return res.status(400).json({message:"Password not strong"})
   }

   if(isEmail){
    return res.status(400).json({message:"Email Already exists"});
   }

   const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await userModel.create({
        fullname,
        email,
        password:hashedPassword
    })

    if(newUser){
        generateToken(newUser._id,res);

        return res.status(200).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
            profilePic:newUser.profilePic
        })
    }
    else{
        return res.status(400).json({message:"Invalid User data"});
    }
}
catch(error){
    console.log(error);
}


}

exports.login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
           return res.status(400).json({message:"Email does not exists"});
        }

        const pass = await bcrypt.compare(password,user.password);

        if(!pass){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        generateToken(user._id,res);
        return res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            profilePic:user.profilePic
        })

    } catch (error) {
        console.log(error)
    }
}

exports.logout = async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged Out Successfully"})
    } catch (error) {
        console.log(error);
    }
}

exports.updateProfile = async (req,res)=>{
   const {profilePic} = req.body;
   const userId = req.user._id;
   try {
     if(!profilePic){
        return res.status(400).json({message:"Image is required"});
     }

     const uploadResponse = await v2.uploader.upload(profilePic);
     const updatedUser = await userModel.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});

     res.status(200).json(updatedUser);

   } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Server Error"
   });

   }
}

exports.check = async (req,res)=>{
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
    }
}