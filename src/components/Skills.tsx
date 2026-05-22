const skillCategories = [
  {
    title: "Programming",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C++"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Angular", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "PHP", "ASP.NET Core", "REST APIs"],
  },
  {
    title: "AI & Databases",
    skills: ["OpenAI API", "LangChain", "MySQL", "MongoDB", "Firebase"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-black text-white py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-14">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-zinc-900 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-zinc-800 px-4 py-2 rounded-xl text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
