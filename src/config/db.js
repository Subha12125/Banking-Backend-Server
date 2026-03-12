const mongoose = require("mongoose");


function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to mongoDB ");
        
    })
    .catch((error)=>{
        console.log("Error connecting to mongoDB: ", error);
        process.exit(1);
    })
}

module.exports = connectDB;