import portfolioData from "@/data/portfolio-data.json";

export interface Project {
  title: string;
  type: string;
  image: string;
  tech: string[];
  description: string;
  repo: string;
  repo2?: string;
  live?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    location: string;
    profileImage: string;
    tagline: string;
    availability: string;
    focus: string;
  };
  about: {
    journey: string;
    currentFocus: string;
    focusAreas: string[];
  };
  skills: {
    categories: SkillCategory[];
  };
  projects: Project[];
  education: Education[];
  experience: Experience[];
  achievements: Achievement[];
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    portfolio: string;
    resume: string;
  };
}

const data = portfolioData as PortfolioData;

export function generateLocalResponse(query: string): string {
  const normalized = query.toLowerCase().trim();

  // 1. Resume / CV
  if (
    normalized.includes("resume") ||
    normalized.includes("cv") ||
    normalized.includes("download cv") ||
    normalized.includes("download resume")
  ) {
    return `### Resume / CV

Janaka Eranda's professional resume is available for review and download. It details his academic history, key projects, and technical skills.

You can download it using the link below:

[Download Resume](${data.contact.resume})

*Feel free to reach out if you have any questions about his background!*`;
  }

  // 2. Contact
  if (
    normalized.includes("contact") ||
    normalized.includes("email") ||
    normalized.includes("phone") ||
    normalized.includes("reach out") ||
    normalized.includes("hire") ||
    normalized.includes("call") ||
    normalized.includes("social")
  ) {
    return `### Contact Details & Social Links

You can get in touch with Janaka Eranda directly through any of the following channels:

* **Email:** [${data.contact.email}](mailto:${data.contact.email})
* **Phone:** [${data.contact.phone}](tel:${data.contact.phone.replace(/\s+/g, "")})
* **LinkedIn:** [linkedin.com/in/kkdjanakaeranda](${data.contact.linkedin})
* **GitHub:** [github.com/kkdjanakaeranda](${data.contact.github})
* **Portfolio Website:** [janakaeranda-portfolio.vercel.app](${data.contact.portfolio})

Let me know if you would like to download his [Resume](${data.contact.resume})!`;
  }

  // 3. Projects
  if (normalized.includes("project") || normalized.includes("portfolio") || normalized.includes("work")) {
    // Check if they are asking about specific technologies in projects
    const techQuery = findTechInQuery(normalized);
    if (techQuery) {
      const filtered = data.projects.filter(p =>
        p.tech.some(t => t.toLowerCase() === techQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        return formatProjectsList(filtered, `Projects using **${techQuery}**`);
      }
    }

    if (normalized.includes("best") || normalized.includes("strongest") || normalized.includes("top")) {
      const best = data.projects.filter(p => p.title === "Smart Hire" || p.title === "EduRAG+");
      return formatProjectsList(best, "Strongest & Featured Projects");
    }

    if (normalized.includes("latest") || normalized.includes("recent") || normalized.includes("new")) {
      const latest = [data.projects[0], data.projects[1]]; // Smart Hire and Smart IoT Irrigation
      return formatProjectsList(latest, "Latest Projects");
    }

    if (normalized.includes("php")) {
      const phpProjects = data.projects.filter(p => p.tech.some(t => t.toLowerCase().includes("php")));
      return formatProjectsList(phpProjects, "PHP Projects");
    }

    if (normalized.includes("react")) {
      const reactProjects = data.projects.filter(p => p.tech.some(t => t.toLowerCase().includes("react")));
      return formatProjectsList(reactProjects, "React Projects");
    }

    if (normalized.includes("ai") || normalized.includes("rag") || normalized.includes("openai") || normalized.includes("fastapi")) {
      const aiProjects = data.projects.filter(p =>
        p.tech.some(t => {
          const l = t.toLowerCase();
          return l.includes("openai") || l.includes("langchain") || l.includes("pinecone") || l.includes("mcp") || l.includes("fastapi");
        })
      );
      return formatProjectsList(aiProjects, "AI & Intelligent System Projects");
    }

    if (normalized.includes("iot") || normalized.includes("esp32") || normalized.includes("arduino") || normalized.includes("sensor")) {
      const iotProjects = data.projects.filter(p =>
        p.tech.some(t => {
          const l = t.toLowerCase();
          return l.includes("esp32") || l.includes("arduino") || l.includes("sensor") || l.includes("firebase") || l.includes("iot");
        })
      );
      return formatProjectsList(iotProjects, "Internet of Things (IoT) Projects");
    }

    return formatProjectsList(data.projects, "Selected Projects");
  }

  // Check specific tech terms in case they didn't write the word "project" (e.g. "Have you worked with PostgreSQL?")
  const techQuery = findTechInQuery(normalized);
  if (techQuery) {
    const hasSkill = data.skills.categories.some(c => c.skills.some(s => s.toLowerCase() === techQuery.toLowerCase()));
    const relatedProjects = data.projects.filter(p =>
      p.tech.some(t => t.toLowerCase() === techQuery.toLowerCase())
    );

    if (hasSkill || relatedProjects.length > 0) {
      let response = `### Experience with ${techQuery}\n\n`;
      if (hasSkill) {
        response += `Yes! **${techQuery}** is part of Janaka's technical toolkit.\n\n`;
      } else {
        response += `Yes! Janaka has hands-on experience using **${techQuery}** in his projects.\n\n`;
      }

      if (relatedProjects.length > 0) {
        response += `Here are the projects where he applied **${techQuery}**:\n\n`;
        relatedProjects.forEach(p => {
          response += `* **[${p.title}](${p.repo})** (${p.type}): ${p.description}\n`;
        });
      }
      return response;
    }
  }

  // 4. Skills
  if (
    normalized.includes("skill") ||
    normalized.includes("toolkit") ||
    normalized.includes("technologies") ||
    normalized.includes("technology") ||
    normalized.includes("what languages") ||
    normalized.includes("know") ||
    normalized.includes("can you code")
  ) {
    if (normalized.includes("frontend") || normalized.includes("ui") || normalized.includes("design")) {
      const cat = data.skills.categories.find(c => c.title.toLowerCase().includes("frontend"));
      return cat ? formatSkillCategory(cat) : "Frontend skills include React, Next.js, Angular, Tailwind CSS, HTML, and CSS.";
    }

    if (normalized.includes("backend") || normalized.includes("server") || normalized.includes("api")) {
      const cat = data.skills.categories.find(c => c.title.toLowerCase().includes("backend"));
      return cat ? formatSkillCategory(cat) : "Backend skills include Node.js, Express.js, PHP, ASP.NET Core, FastAPI, and REST APIs.";
    }

    if (normalized.includes("database") || normalized.includes("databases") || normalized.includes("sql") || normalized.includes("mongodb")) {
      const cat = data.skills.categories.find(c => c.title.toLowerCase().includes("databases") || c.title.toLowerCase().includes("ai"));
      return cat ? formatSkillCategory(cat) : "Database skills include MySQL, PostgreSQL, MongoDB, Firebase, and Supabase.";
    }

    if (normalized.includes("ai") || normalized.includes("ml") || normalized.includes("rag") || normalized.includes("langchain")) {
      const skills = ["OpenAI API", "LangChain", "Pinecone", "MCP Server"];
      return `### AI Toolkit

Janaka has specialized skills in building AI systems, including RAG (Retrieval-Augmented Generation) applications:

* **Frameworks & API Integrations:** OpenAI API, LangChain
* **Vector Databases:** Pinecone
* **Agentic Tools:** MCP (Model Context Protocol) Server
* **AI Projects Built:** **EduRAG+** (lecture note analyst) and **Smart Hire** (integrated AI assistant)`;
    }

    if (normalized.includes("language") || normalized.includes("languages") || normalized.includes("programming")) {
      const cat = data.skills.categories.find(c => c.title.toLowerCase().includes("programming"));
      return cat ? formatSkillCategory(cat) : "Programming languages: Java, Python, JavaScript, TypeScript, SQL, C++, Arduino C++.";
    }

    // Return all skills
    let response = `### Janaka's Technical Toolkit\n\n`;
    data.skills.categories.forEach(cat => {
      response += `#### ${cat.title}\n`;
      response += `${cat.skills.join(", ")}\n\n`;
    });
    return response;
  }

  // 5. Education
  if (
    normalized.includes("education") ||
    normalized.includes("study") ||
    normalized.includes("university") ||
    normalized.includes("degree") ||
    normalized.includes("kelaniya") ||
    normalized.includes("academic") ||
    normalized.includes("school") ||
    normalized.includes("faculty")
  ) {
    let response = `### Education Journey\n\n`;
    data.education.forEach(edu => {
      response += `#### ${edu.degree}\n`;
      response += `* **Institution:** ${edu.institution}\n`;
      response += `* **Period:** ${edu.period}\n`;
      response += `* **Details:** ${edu.details}\n\n`;
    });
    return response;
  }

  // 6. Experience & Leadership / Internships
  if (
    normalized.includes("experience") ||
    normalized.includes("work") ||
    normalized.includes("job") ||
    normalized.includes("internship") ||
    normalized.includes("volunteer") ||
    normalized.includes("activities") ||
    normalized.includes("leadership")
  ) {
    let response = `### Experience & Activities\n\n`;
    response += `Janaka is currently looking for **Software Engineering Internship** opportunities. Here is his practical experience:\n\n`;

    data.experience.forEach(exp => {
      response += `#### ${exp.role}\n`;
      response += `* **Organization:** ${exp.organization} (${exp.period})\n`;
      response += `* **Description:** ${exp.description}\n\n`;
    });

    response += `#### Achievements & Projects Led\n`;
    data.achievements.forEach(ach => {
      response += `* **${ach.title}**: ${ach.description}\n`;
    });

    return response;
  }

  // 7. About me / Intro
  if (
    normalized.includes("who are you") ||
    normalized.includes("tell me about yourself") ||
    normalized.includes("introduce") ||
    normalized.includes("about you") ||
    normalized.includes("about me") ||
    normalized.includes("self") ||
    normalized.includes("janaka") ||
    normalized.includes("eranda")
  ) {
    return `### About Janaka Eranda

**Janaka Eranda** is a Software Engineering student at the **University of Kelaniya** (BICT Hons, specializing in Software System Technology) and a Full-Stack & AI developer based in **Sri Lanka**.

#### Key Focus Areas:
${data.about.focusAreas.map(item => `* ${item}`).join("\n")}

#### Short Biography:
${data.about.journey}

${data.about.currentFocus}

*Would you like to see his **[Projects](${data.contact.portfolio}#projects)** or download his **[Resume](${data.contact.resume})**?*`;
  }

  // Default fallback response
  return `I don't have that information in my portfolio. 

As Janaka's AI Portfolio Assistant, I can answer questions regarding his:
* **About Me** (journey, focus areas, location)
* **Projects** (EduRAG+, Smart Hire, IoT Irrigation, Expense Tracker)
* **Technical Skills** (Java, React, Next.js, Python, FastAPI, SQL, OpenAI API)
* **Education** (University of Kelaniya, C-Clarke Institute)
* **Experience** (leadership, academic projects)
* **Resume** (download link)
* **Contact details** (email, linkedin, github)

Try asking something like:
* *"What technologies do you know?"*
* *"Show me your best project"*
* *"How can I contact you?"*`;
}

function findTechInQuery(query: string): string | null {
  const allTech = [
    "React", "Next.js", "Angular", "Tailwind CSS", "HTML", "CSS",
    "Node.js", "Express", "PHP", "ASP.NET Core", "FastAPI",
    "Java", "Python", "JavaScript", "TypeScript", "SQL", "C++", "Arduino C++",
    "OpenAI API", "LangChain", "Pinecone", "MCP Server",
    "MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase", "Blynk IoT", "ESP32"
  ];

  for (const tech of allTech) {
    if (query.includes(tech.toLowerCase())) {
      return tech;
    }
  }
  return null;
}

function formatProjectsList(projects: Project[], title: string): string {
  if (projects.length === 0) {
    return `No projects found matching that query. Janaka has worked on AI systems (EduRAG+), Web applications (Smart Hire, Expense Tracker), and IoT systems (Smart Plant Irrigation).`;
  }

  let response = `### ${title}\n\n`;
  projects.forEach(p => {
    response += `#### ${p.title}\n`;
    response += `* **Type:** ${p.type}\n`;
    response += `* **Technologies:** ${p.tech.join(", ")}\n`;
    response += `* **Description:** ${p.description}\n`;
    response += `* **Links:** [GitHub Repository](${p.repo})`;
    if (p.live) {
      response += ` | [Live Demo / Website](${p.live})`;
    }
    response += `\n\n`;
  });
  return response;
}

function formatSkillCategory(category: SkillCategory): string {
  return `### ${category.title}

Here are Janaka's skills in this category:

${category.skills.map(s => `* **${s}**`).join("\n")}

*All skills are backed by academic courseworks, personal projects, or group systems.*`;
}
