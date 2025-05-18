const generateDummyStudentProfiles = () => {
    return [
      {
        id: 1,
        name: "Emily Rodriguez",
        major: "Computer Science",
        academicYear: "Sophomore",
        gpa: 3.7,
        interests: [
          "Software Development",
          "Machine Learning",
          "Web Technologies"
        ],
        careerGoals: [
          "Become a Full-Stack Software Engineer",
          "Work in AI and Machine Learning"
        ],
        completedCourses: ["CS101", "MATH201"],
        skills: [
          "Python Programming",
          "Basic Web Development",
          "Data Structures"
        ]
      },
      {
        id: 2,
        name: "Alex Chen",
        major: "Data Science",
        academicYear: "Junior",
        gpa: 3.5,
        interests: [
          "Big Data Analytics",
          "Statistical Modeling",
          "Data Visualization"
        ],
        careerGoals: [
          "Data Scientist in Healthcare",
          "Research in Predictive Analytics"
        ],
        completedCourses: ["MATH201", "STAT150"],
        skills: [
          "R Programming",
          "Statistical Analysis",
          "Data Cleaning"
        ]
      },
      {
        id: 3,
        name: "Michael Thompson",
        major: "Physics",
        academicYear: "Freshman",
        gpa: 3.2,
        interests: [
          "Quantum Mechanics",
          "Astrophysics",
          "Computational Physics"
        ],
        careerGoals: [
          "Research Scientist",
          "Space Exploration Technology"
        ],
        completedCourses: ["PHYS150"],
        skills: [
          "Mathematical Modeling",
          "Scientific Computing"
        ]
      },
      {
        id: 4,
        name: "Sarah Kim",
        major: "Mechanical Engineering",
        academicYear: "Senior",
        gpa: 3.9,
        interests: [
          "Robotics",
          "Sustainable Design",
          "Advanced Manufacturing"
        ],
        careerGoals: [
          "Robotics Engineer",
          "Sustainable Technology Innovation"
        ],
        completedCourses: ["MATH201", "PHYS150", "ENG250"],
        skills: [
          "CAD Design",
          "3D Modeling",
          "Engineering Simulation"
        ]
      },
      {
        id: 5,
        name: "David Williams",
        major: "Biomedical Engineering",
        academicYear: "Sophomore",
        gpa: 3.6,
        interests: [
          "Medical Device Design",
          "Biomechanics",
          "Healthcare Technology"
        ],
        careerGoals: [
          "Medical Device Innovator",
          "Bioengineering Research"
        ],
        completedCourses: ["BIOL101", "CHEM150"],
        skills: [
          "Biology Understanding",
          "Basic Programming",
          "Research Methodology"
        ]
      }
    ];
  };
  
  // Function to get a random profile for demonstration
  const getRandomStudentProfile = () => {
    const profiles = generateDummyStudentProfiles();
    return profiles[Math.floor(Math.random() * profiles.length)];
  };
  
  // Expand course data with more comprehensive information
  const expandedCourseData = [
    {
      code: "CS101",
      name: "Introduction to Computer Science",
      description: "A foundational course covering basic programming concepts, algorithm design, and computational thinking.",
      department: "Computer Science",
      credits: 3,
      prerequisites: [],
      difficulty: "Beginner",
      recommendedFor: ["Computer Science", "Software Engineering", "Data Science"],
      topics: ["Programming Basics", "Algorithms", "Problem Solving"],
      careers: ["Software Developer", "Data Scientist", "System Analyst"]
    },
    {
      code: "MATH201",
      name: "Calculus I",
      description: "A comprehensive introduction to differential and integral calculus, focusing on limits, derivatives, and integration techniques.",
      department: "Mathematics",
      credits: 4,
      prerequisites: ["MATH120"],
      difficulty: "Intermediate",
      recommendedFor: ["Engineering", "Physics", "Mathematics", "Computer Science"],
      topics: ["Limits", "Derivatives", "Integration", "Fundamental Theorem of Calculus"],
      careers: ["Engineer", "Physicist", "Mathematician", "Data Scientist"]
    },
    {
      code: "PHYS150",
      name: "Introduction to Physics",
      description: "Covers fundamental principles of mechanics, energy, and motion with hands-on laboratory experiences.",
      department: "Physics",
      credits: 4,
      prerequisites: ["MATH120"],
      difficulty: "Intermediate",
      recommendedFor: ["Physics", "Engineering", "Chemistry"],
      topics: ["Mechanics", "Energy", "Motion", "Laboratory Techniques"],
      careers: ["Physicist", "Research Scientist", "Engineering Researcher"]
    },
    {
      code: "CS250",
      name: "Data Structures and Algorithms",
      description: "Advanced course exploring complex data structures, algorithm design, and computational efficiency.",
      department: "Computer Science",
      credits: 4,
      prerequisites: ["CS101"],
      difficulty: "Advanced",
      recommendedFor: ["Computer Science", "Software Engineering"],
      topics: ["Advanced Algorithms", "Data Structure Design", "Computational Complexity"],
      careers: ["Software Architect", "Algorithm Engineer", "Research Scientist"]
    },
    {
      code: "ROBO300",
      name: "Introduction to Robotics",
      description: "Comprehensive overview of robotic systems, including design, control systems, and programming.",
      department: "Mechanical Engineering",
      credits: 4,
      prerequisites: ["MATH201", "PHYS150"],
      difficulty: "Advanced",
      recommendedFor: ["Mechanical Engineering", "Computer Science"],
      topics: ["Robotic Design", "Control Systems", "Robotic Programming"],
      careers: ["Robotics Engineer", "Automation Specialist", "Research Scientist"]
    },
    {
      code: "BIOE250",
      name: "Biomedical Engineering Principles",
      description: "Exploration of engineering principles applied to medical and biological systems.",
      department: "Biomedical Engineering",
      credits: 3,
      prerequisites: ["BIOL101", "MATH120"],
      difficulty: "Intermediate",
      recommendedFor: ["Biomedical Engineering", "Biology"],
      topics: ["Medical Device Design", "Biomechanics", "Healthcare Technology"],
      careers: ["Medical Device Designer", "Biomedical Researcher", "Healthcare Technologist"]
    }
  ];
  
  export { 
    generateDummyStudentProfiles, 
    getRandomStudentProfile, 
    expandedCourseData 
  };