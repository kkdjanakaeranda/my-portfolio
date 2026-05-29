const projects = [
  {
    title: "EduRAG+",
    tech: ["FastAPI", "LangChain", "Pinecone", "OpenAI API"],
    description:
      "AI-powered RAG system for intelligent lecture note analysis, semantic search, and exam preparation.",
    repo: "https://github.com/yourusername/edurag",
    live: "https://edurag-demo.vercel.app",
  },
  {
    title: "Smart Irrigation System",
    tech: ["ESP32", "Firebase", "IoT"],
    description:
      "IoT-based automated irrigation system with real-time monitoring and remote control features.",
    repo: "https://github.com/yourusername/smart-irrigation",
    live: "",
  },
  {
    title: "Student Management System",
    tech: ["PHP", "MySQL", "JavaScript"],
    description:
      "Role-based student management platform with attendance, grading, and admin modules.",
    repo: "https://github.com/yourusername/student-management-system",
    live: "",
  },
  {
    title: "Portfolio Website",
    tech: ["Next.js", "Tailwind CSS"],
    description:
      "Modern responsive portfolio website showcasing projects, skills, and experience.",
    repo: "https://github.com/yourusername/my-portfolio",
    live: "https://your-portfolio.vercel.app",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-zinc-950 text-white py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-zinc-400 mb-3">
            Selected Work
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Project Preview Placeholder */}
              <div className="h-52 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center">
                <span className="text-zinc-500 text-sm">
                  Project Preview
                </span>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold">
                  {project.title}
                </h3>

                <p className="mt-4 text-zinc-400 leading-7">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1 rounded-full bg-zinc-800 text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-6 flex gap-3">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm transition"
                  >
                    View Repo
                  </a>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-sm transition"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}