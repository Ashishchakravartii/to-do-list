const mongoose = require("mongoose");

const profile = mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const user = mongoose.model("profile", profile);
module.exports = user;
