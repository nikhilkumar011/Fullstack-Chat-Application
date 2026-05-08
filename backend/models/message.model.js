const mongoose = require('mongoose');
const schema = mongoose.Schema;

const messageSchema = new schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String
    },
    image:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("Message",messageSchema);