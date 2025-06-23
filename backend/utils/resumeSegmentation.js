// Advanced resume segmentation utility
// Handles normalization, header variants, and robust sectioning

const SECTION_HEADERS = [
  { key: 'summary', variants: [
    'summary', 'profile', 'objective', 'career summary'
  ] },
  { key: 'education', variants: [
    'education', 'academic qualifications', 'education background'
  ] },
  { key: 'experience', variants: [
    'experience', 'professional experience', 'work history', 'employment'
  ] },
  { key: 'skills', variants: [
    'skills', 'technical skills', 'core competencies'
  ] },
  { key: 'projects', variants: [
    'projects', 'key projects', 'academic projects'
  ] },
  { key: 'certifications', variants: [
    'certifications', 'professional certifications', 'licenses', 'courses & certifications'
  ] },
  { key: 'achievements', variants: [
    'achievements', 'achivements', 'awards', 'honors', 'accomplishments'
  ] },
  { key: 'languages', variants: [
    'languages', 'spoken languages'
  ] },
  { key: 'publications', variants: [
    'publications', 'research', 'papers published'
  ] },
  { key: 'interests', variants: [
    'interests', 'hobbies', 'personal interests'
  ] },
  { key: 'contact', variants: [
    'contact', 'contact information', 'email', 'phone', 'mobile'
  ] },
];

/**
 * Normalize resume text for segmentation
 * - Lowercase, remove special chars (except @ . - : /), normalize whitespace, convert bullets
 * @param {string} text
 * @returns {string}
 */
function normalizeText(text) {
  // Lowercase, remove special chars (except @ . - : /), normalize whitespace, convert bullets
  return text
    .toLowerCase()
    .replace(/[•\u2022\u25AA\u25CF\u25CB\u25A0\u2023\u2043\u2219\u25E6\u204C\u204D\u2219\u25D8\u25D9\u25A1\u25A3\u25A4\u25A5\u25A6\u25A7\u25A8\u25A9\u25AB\u25AC\u25AD\u25AE\u25AF\u25B0\u25B1\u25B2\u25B3\u25B4\u25B5\u25B6\u25B7\u25B8\u25B9\u25BA\u25BB\u25BC\u25BD\u25BE\u25BF\u25C0\u25C1\u25C2\u25C3\u25C4\u25C5\u25C6\u25C7\u25C8\u25C9\u25CA\u25CB\u25CC\u25CD\u25CE\u25CF\u25D0\u25D1\u25D2\u25D3\u25D4\u25D5\u25D6\u25D7\u25D8\u25D9\u25DA\u25DB\u25DC\u25DD\u25DE\u25DF\u25E0\u25E1\u25E2\u25E3\u25E4\u25E5\u25E6\u25E7\u25E8\u25E9\u25EA\u25EB\u25EC\u25ED\u25EE\u25EF]/g, '\n')
    .replace(/[^a-z0-9@.\-:/\n ]/g, '') // keep : - / for skill lists
    .replace(/\n{2,}/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]*/g, '\n')
    .trim();
}

/**
 * Detect section key from a line
 * @param {string} line
 * @returns {string|null}
 */
function getSectionKey(line) {
  const lowerLine = line.toLowerCase();
  for (const section of SECTION_HEADERS) {
    for (const variant of section.variants) {
      // Match keyword anywhere in the line, case-insensitive
      if (lowerLine.includes(variant.toLowerCase())) {
        return section.key;
      }
    }
  }
  return null;
}

function segmentResume(text) {
  const normalized = normalizeText(text);
  const lines = normalized.split(/\r?\n/);
  // Initialize all sections
  const sections = {
    contact: '', summary: '', education: '', experience: '', skills: '', projects: '', certifications: '', achievements: '', languages: '', publications: '', interests: '', other: ''
  };
  let currentSection = 'contact'; // Assume top of resume is contact info
  let foundFirstSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const sectionKey = getSectionKey(line);
    if (sectionKey) {
      currentSection = sectionKey;
      foundFirstSection = true;
      // Debug: log section header detection
      console.log(`[Header Detected] '${line}' => ${sectionKey}`);
      continue; // Don't include the header line itself
    }
    // Special handling: if previous header was 'skills' (e.g., 'technical skills'), keep appending until next header
    // (already handled by currentSection logic)
    // Debug: log each line and current section
    console.log(`[Line] Section: ${currentSection} | ${line}`);
    // If before any section header, treat as contact info
    if (!foundFirstSection) {
      sections['contact'] += line + '\n';
    } else {
      sections[currentSection] += line + '\n';
    }
  }
  return sections;
}

module.exports = { segmentResume, normalizeText, getSectionKey }; 