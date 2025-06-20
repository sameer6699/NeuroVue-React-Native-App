const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  jobDescription: { type: String },
  experienceLevel: { type: String, required: true },
  resumeBase64: { type: String, required: true }, // base64 encoded resume
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'resume_analyses',
  timestamps: true
});

const ResumeAnalysis = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);

module.exports = ResumeAnalysis; 