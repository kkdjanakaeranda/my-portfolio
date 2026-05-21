const projects = [
  {
    title: "Student Management System",
    tech: "Java + MySQL",
  },
  {
    title: "Library Management System",
    tech: "Spring Boot + MySQL",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-zinc-900 text-white py-24 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-zinc-800 p-6 rounded-2xl"
            >
              <h3 className="text-2xl font-bold">
                {project.title}
              </h3>

              <p className="mt-3 text-gray-400">
                {project.tech}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}