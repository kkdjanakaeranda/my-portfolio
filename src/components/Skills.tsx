const skills = [
  "Java",
  "Spring Boot",
  "MySQL",
  "React",
  "Next.js",
  "Tailwind CSS",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-black text-white py-24 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">
          Skills
        </h2>

        <div className="flex flex-wrap gap-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="bg-zinc-800 px-6 py-3 rounded-xl"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}