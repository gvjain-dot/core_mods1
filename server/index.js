const express = require('express');
const cors = require('cors');
const app = express();
const jobRoutes = require('./routes/jobs');
const resumeRoutes = require('./routes/resumes');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
app.use('/api/jobs', jobRoutes);
app.use('/api/resumes', resumeRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/candidateFinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
app.get('/', (req, res) => {
  res.send('CandidateFinder API is running 🚀');
});

app.post('/api/jobs', (req, res) => {
  const jobData = req.body;
  console.log(jobData); // log it to test
  res.status(201).json({ message: 'Job created successfully', data: jobData });
});
app.post('/api/resume', (req,res) =>{
    const resumeData = req.body;
    console.log("inside the reumse call"+(JSON.stringify(resumeData)));
    res.status(201).json({message:'Resume created successfully',data: resumeData});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
