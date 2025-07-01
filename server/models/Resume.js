const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  originalname: String,
  filename: String,
  path: String,
  size: Number,
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', resumeSchema);