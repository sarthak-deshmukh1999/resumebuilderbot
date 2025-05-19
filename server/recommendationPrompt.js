function generateAdvancedRecommendationPrompt(mainTex, userInput) {
    return `
USER INPUT
The user will provide:
- A job description (text)

JOB DESCRIPTION:
${userInput}

MASTER RESUME FORMAT:
${mainTex}

YOUR TASKS
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
- the relevancy/ATS score of the resume should be 98% or higher with respect to the job description
- strictly follow the master resume format
- keep the master resume syntax exactly the same just modify the content

OUTPUT
Return only:
- A complete resume in latex syntax
- Do not include explanations or extra text OR notes for improvement
- keep the master resume syntax exactly the same just modify the content
- Also give ATS score
`;
}

export default generateAdvancedRecommendationPrompt;