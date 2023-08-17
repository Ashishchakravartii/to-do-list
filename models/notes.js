const mongoose = require("mongoose");

const Note = mongoose.Schema({
    note: String,
    discription: String,
})

const note = mongoose.model("note", Note);
module.exports = note;
