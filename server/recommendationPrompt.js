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


## Instructions
- write a perfect resume that has good mix of technical and soft skills. Shows leadership skills and matches well with job description
- Extract important keywords from the job description
- Evaluate the user's resume for relevant information
- Rewrite Work Experience using the Google XYZ format  
  strictly make sure that my work experience should strongly match the job description requirements
  include all technologies mentioned in the job description even if it doesn't make sense
  Focus on measurable impact, keywords, and tools
  up to 4 bullet points
  must focus on: quantify impact, strong action verbs without repeating 
  example: "Improved page load speed by 45% by refactoring legacy React components and implementing code-splitting techniques using Webpack, enhancing user experience and SEO performance across the platform."
- Rewrite Projects
  must include all 3 projects
  include all technologies mentioned in the job description even if it doesn't make sense
  Focus on measurable impact, keywords, and tools
  must have 4 bullet points with 20 words or more
  must focus on: quantify strong action verbs without repeating
- Generate a complete LaTeX resume using the provided master resume format
- Sections: Summary, Technical Skills, Experience, Projects, Education
- Use only defined LaTeX macros (\resumeSubheading, \resumeItem, etc.)
- Provide final ATS score and relevancy score with respect to the job description
- special symbols in latex like $, #, and % precede with a backslash e.g. \$, \#, \%
- optimize for high frequency of important technical skills given in job description
- the relevancy score of the resume should be 95% or higher with respect to the job description
- strictly follow the master resume format
- Do not use ** or * for boldin resume and cover letter
- Use syntax from the master resume
- keep the master resume syntax exactly the same just modify the content
- Strictly make sure that the overall word count of the resume is 730 words or less

OUTPUT
Return only:
- A complete resume in latex syntax
- DO NOT include explanations, notes, or any text outside the LaTeX document except for the ATS score.
- keep the master resume syntax exactly the same just modify the content
- A tailored cover letter in Markdown format
`;
}

export default generateAdvancedRecommendationPrompt;