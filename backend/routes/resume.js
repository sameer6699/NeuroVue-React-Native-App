const express = require('express');
const router = express.Router();
const ResumeAnalysis = require('../models/ResumeAnalysis');
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { segmentResume } = require('../utils/resumeSegmentation');

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

    // Decode base64 to buffer
    const buffer = Buffer.from(resumeBase64, 'base64');
    let extractedText = '';
    let usedOcr = false;

    // --- Extract text from file ---
    try {
      if (fileType === 'application/pdf') {
        // Try PDF text extraction
        try {
          const data = await pdfParse(buffer);
          extractedText = data.text;
        } catch (pdfErr) {
          console.error('[PDF Parse Error]', pdfErr);
          extractedText = '';
        }
        // Fallback to OCR if text is too short or contains too many non-ASCII chars
        const asciiRatio = (extractedText.match(/[ -]/g) || []).length / (extractedText.length || 1);
        if (!extractedText || extractedText.trim().length < 100 || asciiRatio < 0.85) {
          console.warn('[PDF] Extracted text too short or non-ASCII, falling back to OCR...');
          try {
            const ocrResult = await Tesseract.recognize(buffer, 'eng');
            extractedText = ocrResult.data.text;
            usedOcr = true;
          } catch (ocrErr) {
            console.error('[Tesseract OCR Error]', ocrErr);
            return res.status(400).json({
              success: false,
              message: 'Unfortunately, we could not process your resume. Please upload your resume in a proper format.'
            });
          }
        }
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // DOCX extraction
        try {
          const result = await mammoth.extractRawText({ buffer });
          extractedText = result.value;
        } catch (docxErr) {
          console.error('[DOCX Parse Error]', docxErr);
          extractedText = '';
        }
        if (!extractedText || extractedText.trim().length < 100) {
          console.warn('[DOCX] Extracted text too short, falling back to OCR...');
          try {
            const ocrResult = await Tesseract.recognize(buffer, 'eng');
            extractedText = ocrResult.data.text;
            usedOcr = true;
          } catch (ocrErr) {
            console.error('[Tesseract OCR Error]', ocrErr);
            return res.status(400).json({
              success: false,
              message: 'Unfortunately, we could not process your resume. Please upload your resume in a proper format.'
            });
          }
        }
      } else if (fileType === 'application/msword') {
        // .doc files: OCR only
        try {
          const ocrResult = await Tesseract.recognize(buffer, 'eng');
          extractedText = ocrResult.data.text;
          usedOcr = true;
        } catch (ocrErr) {
          console.error('[Tesseract OCR Error]', ocrErr);
          return res.status(400).json({
            success: false,
            message: 'Unfortunately, we could not process your resume. Please upload your resume in a proper format.'
          });
        }
      } else {
        // Other file types: OCR only
        try {
          const ocrResult = await Tesseract.recognize(buffer, 'eng');
          extractedText = ocrResult.data.text;
          usedOcr = true;
        } catch (ocrErr) {
          console.error('[Tesseract OCR Error]', ocrErr);
          return res.status(400).json({
            success: false,
            message: 'Unfortunately, we could not process your resume. Please upload your resume in a proper format.'
          });
        }
      }
    } catch (outerErr) {
      console.error('[Resume Extraction Error]', outerErr);
      return res.status(400).json({
        success: false,
        message: 'Unfortunately, we could not process your resume. Please upload your resume in a proper format.'
      });
    }

    // --- Final fallback: If extracted text is still short or mostly non-alphanumeric, try OCR again ---
    const alnumRatio = (extractedText.match(/[a-z0-9]/gi) || []).length / (extractedText.length || 1);
    if (extractedText.trim().length < 100 || alnumRatio < 0.5) {
      if (!usedOcr) {
        console.warn('[Final Fallback] Extracted text still too short or non-alphanumeric, retrying OCR...');
        const ocrResult = await Tesseract.recognize(buffer, 'eng');
        extractedText = ocrResult.data.text;
      }
    }

    // --- Debug: Log extracted text length ---
    console.log('[ExtractedText] Length:', extractedText.length);

    // --- Segmentation ---
    // Log normalized lines and detected section keys
    const { normalizeText, getSectionKey } = require('../utils/resumeSegmentation');
    const normalized = normalizeText(extractedText);
    const lines = normalized.split(/\r?\n/);
    console.log('[Segmentation] Normalized lines and detected section keys:');
    lines.forEach(line => {
      if (!line.trim()) return;
      const sectionKey = getSectionKey(line);
      if (sectionKey) {
        console.log(`  [Header Detected] '${line}' => ${sectionKey}`);
      }
    });

    // Segment the resume
    const segmentedResume = segmentResume(extractedText);

    // Prepare each segment for direct storage
    const {
      summary = '',
      education = '',
      experience = '',
      skills = '',
      projects = '',
      certifications = '',
      achievements = '',
      languages = '',
      publications = '',
      interests = '',
      contact = '',
      other = ''
    } = segmentedResume || {};

    // --- Debug: Log final segments ---
    console.log('[SegmentedResume]');
    Object.entries(segmentedResume).forEach(([key, value]) => {
      console.log(`  [${key}] Length: ${value.length}`);
    });

    // Check for required 'experience' section
    if (!experience || experience.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Unfortunately, we couldn't process your resume. Upload resume in proper format"
      });
    }

    // --- Save to MongoDB ---
    const newAnalysis = new ResumeAnalysis({
      jobTitle,
      companyName,
      industry,
      jobDescription,
      experienceLevel,
      resumeBase64,
      fileName,
      fileType,
      extractedText,
      summary,
      education,
      experience,
      skills,
      projects,
      certifications,
      achievements,
      languages,
      publications,
      interests,
      contact,
      other
    });

    await newAnalysis.save();

    res.status(201).json({
      success: true,
      message: 'Resume analysis data stored successfully.',
      extractedText,
      summary,
      education,
      experience,
      skills,
      projects,
      certifications,
      achievements,
      languages,
      publications,
      interests,
      contact,
      other
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