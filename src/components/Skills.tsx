"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming",
    icon: "💻",
    description: "Languages for problem solving and software development.",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C++"],
  },
  {
    title: "Frontend",
    icon: "🎨",
    description: "Building modern responsive user interfaces.",
    skills: ["React", "Next.js", "Angular", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend",
    icon: "⚙️",
    description: "Creating APIs, server logic, and web systems.",
    skills: ["Node.js", "Express.js", "PHP", "ASP.NET Core", "REST APIs"],
  },
  {
    title: "AI & Databases",
    icon: "🤖",
    description: "AI integrations and data-driven applications.",
    skills: ["OpenAI API", "LangChain", "MySQL", "MongoDB", "Firebase"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative bg-zinc-950 text-white py-10 px-3 overflow-hidden scroll-mt-8"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.18),transparent_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-violet-400 uppercase tracking-[0.3em] text-sm mb-4">
            SKILLS
          </p>

          <h2 className="text-3xl md:text-5xl font-bold max-w-3xl">
            My Technical
            <span className="text-violet-400"> Toolkit</span>
          </h2>

          <p className="text-zinc-400 mt-4 max-w-2xl leading-7">
            A focused collection of technologies I use to build web apps,
            AI-powered systems, database solutions, and full-stack projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 hover:border-violet-500/60 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-3xl group-hover:scale-110 transition">
                    {category.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold">
                      {category.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800 text-sm text-zinc-300 hover:border-violet-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}