const express = require('express');
const cors = require('cors');
const app = express();
const jobRoutes = require('./routes/jobs');
const resumeRoutes = require('./routes/resumes');
app.use(cors());
app.use(express.json());
app.use('/api/jobs', jobRoutes);
app.use('/api/resumes', resumeRoutes);

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
