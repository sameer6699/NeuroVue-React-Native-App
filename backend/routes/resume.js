const express = require('express');
const router = express.Router();
const ResumeAnalysis = require('../models/ResumeAnalysis');

// POST /api/resume/analyze
router.post('/analyze', async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      industry,
      jobDescription,
      experienceLevel,
      resumeBase64,
      fileName,
      fileType
    } = req.body;

    // Validate required fields
    if (!jobTitle || !companyName || !industry || !experienceLevel || !resumeBase64 || !fileName || !fileType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.'
      });
    }

    const newAnalysis = new ResumeAnalysis({
      jobTitle,
      companyName,
      industry,
      jobDescription,
      experienceLevel,
      resumeBase64,
      fileName,
      fileType
    });

    await newAnalysis.save();

    res.status(201).json({
      success: true,
      message: 'Resume analysis data stored successfully.'
    });
  } catch (error) {
    console.error('Error saving resume analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not store resume analysis.'
    });
  }
});

module.exports = router; 