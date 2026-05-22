const projects = [
  {
    title: "EduRAG+",
    tech: "FastAPI, LangChain, Pinecone, OpenAI API",
    description:
      "AI-powered RAG system for intelligent lecture note analysis and exam preparation.",
  },
  {
    title: "Smart Irrigation System",
    tech: "ESP32, Firebase, IoT",
    description:
      "IoT-based automated irrigation system with real-time monitoring.",
  },
  {
    title: "Student Management System",
    tech: "PHP, MySQL, JavaScript",
    description:
      "Role-based student management platform with attendance and grading modules.",
  },
  {
    title: "Portfolio Website",
    tech: "Next.js, Tailwind CSS",
    description:
      "Modern responsive portfolio website showcasing projects and skills.",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-zinc-900 text-white py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-14">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-zinc-800 p-8 rounded-2xl hover:scale-[1.02] transition"
            >
              <h3 className="text-3xl font-bold mb-4">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-4">
                {project.tech}
              </p>

              <p className="text-gray-300 leading-7">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
