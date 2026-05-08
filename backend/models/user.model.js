const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    email:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);