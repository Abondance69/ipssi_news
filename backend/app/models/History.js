const mongoose = require("mongoose");

const History = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  image: { type: String },
  source: { type: String },
  consultedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("History", History);
