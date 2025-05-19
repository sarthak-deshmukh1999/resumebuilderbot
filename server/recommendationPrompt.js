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

Job Description:
${userInput}

## Master Resume Template
${mainTex}


## Instructions
- write a perfect resume that has good mix of technical and soft skills. Shows leadership skills and matches well with job description
- Extract important keywords from the job description
- Evaluate the user's resume for relevant information
- Rewrite Experience using the Google XYZ format
  must include all past experiences
  Focus on measurable impact, keywords, and tools
  up to 4 bullet points
  must focus on: quantify impact, strong action verbs without repeating 
  example: "Improved page load speed by 45% by refactoring legacy React components and implementing code-splitting techniques using Webpack, enhancing user experience and SEO performance across the platform."
 - Rewrite Projects
  must include all 3 projects
  Focus on measurable impact, keywords, and tools
  must have 4 bullet points with 20 words or more
  must focus on: quantify strong action verbs without repeating
- Generate a complete LaTeX resume using the provided main.tex format
- Sections: Summary, Technical Skills, Experience, Projects, Education
- Use only defined LaTeX macros (\resumeSubheading, \resumeItem, etc.)
- Create a tailored cover letter in Markdown format
- Provide final ATS score and briefly note improvements
- special symbols in latex like $, #, and % precede with a backslash e.g. \$, \#, \%
- optimize for high frequency of important technical skills given in job description
- the relevancy score of the resume should be 95% or higher with respect to the job description
- strictly follow the master resume format
- keep the master resume syntax exactly the same just modify the content

OUTPUT
Return only:
- A complete resume in latex syntax
- DO NOT include explanations, notes, or any text outside the LaTeX document except for the ATS score.
- keep the master resume syntax exactly the same just modify the content
- ATS score and relevancy score with respect to the job description
`;
}

export default generateAdvancedRecommendationPrompt;