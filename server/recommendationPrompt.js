function generateAdvancedRecommendationPrompt(mainTex, userInput) {
  if (!userInput || userInput === undefined) {
    console.error("Job description is undefined or empty");
    userInput = "No job description provided. Please provide a job description.";
  }

  if (!mainTex || mainTex === undefined) {
    console.error("Master resume template is undefined or empty");
    mainTex = "No resume template provided. Please provide a resume template.";
  }

  // Log for debugging
  console.log("Job Description Length:", userInput?.length || 0);
  console.log("Resume Template Length:", mainTex?.length || 0);

  return `  
## Input Data

---Begin Job Description---
${userInput}
---End Job Description---

---Begin Master Resume Template---
${mainTex}
---End Master Resume Template---

You are an expert resume writer and ATS optimization specialist. Generate a perfectly tailored resume that maximizes keyword matching and demonstrates clear alignment with the job requirements.

## Instructions

### 1. Keyword Optimization
- Extract ALL technical skills, tools, frameworks, and technologies from the job description
- Integrate these keywords naturally throughout the resume, especially in:
  - Technical Skills section
  - Work Experience bullet points
  - Project descriptions
- Prioritize high-frequency keywords from the job description
- Include relevant synonyms and variations of key terms

### 2. Work Experience Section
**Format Requirements:**
- Use Google XYZ format: "Accomplished [X] as measured by [Y], by doing [Z]"
- Maximum 4 bullet points per role
- Each bullet point must be 13-15 words exactly
- CCustomize the experience points by integrating all technologies mentioned in job description
- Must fit on a single line when rendered
- Exception: Accenture role can have different word count if needed
- No periods at the end of sentences

**Content Requirements:**
- Start each bullet with strong action verbs (avoid repetition)
- Include quantifiable metrics and measurable impact
- Incorporate job description technologies even if requiring creative integration
- Focus on achievements that match job responsibilities
- Demonstrate problem-solving and technical leadership
- No periods at the end of sentences

**Example Format:**
"Improved page load speed by 45% by refactoring legacy React components and implementing code-splitting techniques using Webpack, enhancing user experience and SEO performance."

### 3. Projects Section
**Structure:**
- Customize the project points by integrating all technologies mentioned in job description
- Include exactly only 3 most relevant projects
- Each project must have exactly 3 bullet points
- Each bullet point: 13-15 words, single line maximum
- Should be descending order of dates
- No periods at the end of sentences

**Content Focus:**
- Integrate ALL technologies mentioned in job description
- Quantify impact with specific metrics
- Use strong, varied action verbs
- Demonstrate technical depth and problem-solving
- Show end-to-end project ownership

### 4. Technical Skills Section
- Keep EXACTLY the same section categories as in the master template
- DO NOT add any new sections or categories
- Modify only the technologies within existing sections
- Maintain exactly 7-8 technologies per section
- Prioritize job description keywords within each existing category
- List skills in order of relevance to the role within each section

### 5. Summary Section
- 3-4 lines maximum
- Highlight years of experience matching job requirements
- Include 3-5 most important keywords from job description
- Emphasize relevant technical domains and soft skills
- End with passion/interest statement aligned with company/role

### CRITICAL FORMATTING RULES:
- Each bullet point must be exactly 13-15 words and fit on one line
- Exception: Accenture work experience can vary in word count
- Use strong action verbs without repetition
- Include quantifiable metrics in every bullet point
- Escape special LaTeX characters: \$, \#, \&, \%
- Use ONLY provided master template macros (\resumeSubheading, \resumeItem, etc.)
- NO markdown formatting (**, *, etc.)
- No periods at the end of sentences

### Section Order
1. Header (contact information)
2. Summary
3. Technical Skills
4. Experience (chronological, most recent first)
5. Projects (chronological, most recent first)
6. Education

## Output Requirements
Return a complete LaTeX resume using the provided master template syntax. Maintain exact formatting structure while modifying content to match job requirements.
Also generate cover letter
`;
}

export default generateAdvancedRecommendationPrompt;