const mongoose = require("mongoose")

//creating connection with db
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log("Connection Successfull!"))
.catch((e)=>console.log("Error", e))