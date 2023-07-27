const mongoose = require("mongoose");

const userModel= mongoose.Schema({
    note:String,
})

const user= mongoose.model("todo",userModel);
module.exports= user;