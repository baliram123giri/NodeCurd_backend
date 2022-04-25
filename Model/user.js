const mongoose = require("mongoose")

//creating user schema
const userSchema = new mongoose.Schema({
    fullname:String,
    email:String
}, {timestamps:true})

//create model
module.exports=  User = new mongoose.model("User", userSchema)