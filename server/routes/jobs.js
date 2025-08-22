const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); //  Import Job model

// POST /api/jobs
router.post('/', async (req, res) => {
  const jobData = req.body;

  try {
    //  Create new Job instance
    const job = new Job({
      jobId: jobData.jobId,
      title: jobData.title,
      description: jobData.description,
      skills: jobData.skills || []
    });

    await job.save(); 
    console.log(" Job saved to DB:", job);

    res.status(201).json({
      message: 'Job created successfully',
      job
    });

  } catch (error) {
    if(error.code ==11000){
      res.status(400).json({ error: 'JOB ID ALREADY EXSIST' });
    }
    console.error(" Error saving job:", error);
    res.status(500).json({ error: 'Something went wrong while saving the job.' });
  }
});
// GET /api/jobs
router.get('/', async (req,res)=> {
    try{
        const jobs = await Job.find();
        res.status(200).json(jobs);
    }
    catch(error){
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: 'Failed to retrieve jobs' })
    }
});

module.exports = router;
