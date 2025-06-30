const express = require('express');
const router = express.Router();

// POST /api/jobs
router.post('/', (req, res) => {
  const jobData = req.body;
  // TODO: save to DB
  res.status(201).json({ message: 'Job created', job: jobData });
});

module.exports = router;