const mongoose = require("mongoose");


//---------------------SCHEMA------------------------
const noteSchema = new mongoose.Schema({
    text: String,
});

module.exports = mongoose.model("Note", noteSchema);