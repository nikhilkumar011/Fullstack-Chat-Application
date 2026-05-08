const userModel = require('../models/user.model.js');
const messageModel = require('../models/message.model.js');
const v2 = require('../lib/cloudinary.js');
const { io, getRecieverSocketId } = require('../lib/socket.js');

exports.getUsers = async (req,res)=>{
    try{
    const me = req.user._id;
    const filteredUsers = await userModel.find({_id:{$ne:me}}).select("-password");
    res.status(200).json(filteredUsers);
    }
    catch(error){
        console.log(error);
    }

}

exports.getMessage = async (req,res)=>{
    try {
        const {id:tochatting} = req.params;
        const myId = req.user._id;

        const messages = await messageModel.find({
            $or:[
                {senderId:myId,recieverId:tochatting},
                {senderId:tochatting,recieverId:myId}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log(error)
    }
}

exports.sendMessage = async (req,res)=>{
    try {
       const {text,image} = req.body;
       const {id:recieverId} = req.params;
       const senderId = req.user._id;

       let imageurl;

       if(image){
        const uploadResponse = await v2.uploader.upload(image);
        imageurl = uploadResponse.secure_url;
       }

       const newmessage  =new messageModel({
        recieverId,
        senderId,
        text,
        image:imageurl
       })

       await newmessage.save();

       const recieverSocketId = getRecieverSocketId(recieverId);
       if(recieverSocketId){
        io.to(recieverSocketId).emit("newMessage",newmessage);
       }

       res.status(201).json(newmessage);

    } catch (error) {
        console.log(error)
    }
}