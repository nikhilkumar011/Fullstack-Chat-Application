const mongoose = require('mongoose');

const DbConnection = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED...");
    } catch (error) {
        console.log("connection error");
    }
}

module.exports = DbConnection;