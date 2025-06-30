const express = require('express');
const router = express.Router();

// POST /api/resumes
router.post('/', (req, res) => {
  const resumeData = req.body;
  // TODO: parse or save resume
  res.status(201).json({ message: 'Resume received', resume: resumeData });
});

module.exports = router;
