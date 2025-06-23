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
  extractedText: { type: String }, // OCR extracted text
  segmentedResume: { type: Object }, // Segmented resume structure
  summary: { type: String, default: '' },
  education: { type: String, default: '' },
  experience: { type: String, default: '' },
  skills: { type: String, default: '' },
  projects: { type: String, default: '' },
  certifications: { type: String, default: '' },
  achievements: { type: String, default: '' },
  languages: { type: String, default: '' },
  publications: { type: String, default: '' },
  interests: { type: String, default: '' },
  contact: { type: String, default: '' },
  other: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'resume_analyses',
  timestamps: true
});

const ResumeAnalysis = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);

module.exports = ResumeAnalysis; 