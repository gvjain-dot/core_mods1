const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId:{
    type:String,
    required:true,
    unique:true
  },
  title: String,
  company: String,
  description: String,
  skills: [String],     // array of required skills
  location: String,
  salary: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);

