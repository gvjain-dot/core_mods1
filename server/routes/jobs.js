const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); //  Import Job model

// POST /api/jobs
router.post('/', async (req, res) => {
  const jobData = req.body;

  try {
    //  Create new Job instance
    const job = new Job({
      title: jobData.title,
      description: jobData.description,
      skills: jobData.skills || [] // Example: ["javascript", "node", "react"]
    });

    await job.save(); 
    console.log(" Job saved to DB:", job);

    res.status(201).json({
      message: 'Job created successfully',
      job
    });

  } catch (error) {
    console.error(" Error saving job:", error);
    res.status(500).json({ error: 'Something went wrong while saving the job.' });
  }
});

module.exports = router;
