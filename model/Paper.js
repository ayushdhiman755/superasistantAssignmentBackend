const mongoose = require("mongoose");
const PaperSchema = new mongoose.Schema({
  Question1: String,
  Question2: String,
  Question3: String,
});

module.exports = mongoose.model("Paper", PaperSchema);
