const express = require('express');
const multer = require('multer');
const path = require('path');
const Resume = require('../models/Resume');
const router = express.Router();

console.log("Resume upload route loaded");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Saving file to: uploads/");
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const finalName = uniqueName + path.extname(file.originalname);
    console.log(`Filename generated: ${finalName}`);
    cb(null, finalName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const isAllowed = filetypes.test(path.extname(file.originalname).toLowerCase());
    console.log(`File type check: ${file.originalname} => ${isAllowed}`);
    if (isAllowed) {
      cb(null, true);
    } else {
      cb(new Error('Only .pdf, .doc, and .docx files are allowed!'));
    }
  }
});

router.post('/upload', upload.single('resume'), async (req, res) => {
  console.log("Upload request received");
  
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ error: 'Resume file is required.' });
  }
  try {
  const resume = new Resume({
    originalname: req.file.originalname,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size
  });
  await resume.save(); // ✅ Save to MongoDB
  console.log("✅ Resume metadata saved to MongoDB");
  res.status(201).json({
    message: 'Resume uploaded and saved successfully',
    resume,
    filename: req.file.filename,
    originalname: req.file.originalname,
    path: req.file.path,
    size: req.file.size
  });
  } catch (error) {
    console.error("❌ Error saving resume to DB:", error);
    res.status(500).json({ error: 'Upload succeeded but DB save failed.' });
  }
});

module.exports = router;
