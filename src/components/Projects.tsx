"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
  title: "Smart-IoT-Based-Plant-Irrigation-System",
  type: "IoT Project - Personal Project",
  image: "/projects/plant_irrigation.jpg",
  tech: ["Arduino C++","ESP32", "Soil Moisture Sensor", "rain sensor"], 
  description:
    "An IoT-based Smart Plant Irrigation System developed using ESP32 to automate irrigation based on real-time environmental conditions. The system continuously monitors soil moisture, temperature, humidity, rainfall, and water tank level to make intelligent irrigation decisions. It also provides remote monitoring and manual control through the Blynk IoT mobile application.",
  repo: "https://github.com/kkdjanakaeranda/Smart-IoT-Based-Plant-Irrigation-System",
  live: "", // You can add a live video demo or dashboard link here later if you want!
},
  {
    title: "Expense Tracker",
    type: "Web Application - Personal Project",
    image: "/projects/expense-tracker.jpg",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"], 
    description:
      "A comprehensive personal finance management application that allows users to track income and expenses, categorize transactions, and visualize spending habits through interactive charts.",
    repo: "https://github.com/kkdjanakaeranda/expense-tracker",
    live: "https://expense-tracker-alpha-69.vercel.app/",
  },

    {
    title: "CLINEXA - Hospital Appointment Management System",
    type: "Web Application - Group Project",
    image: "/projects/clinexa.jpg",
    tech: ["React", "Vite", "Supabase", "Tailwind CSS"],
    description:
      "Hospital Appointment Management System is a web-based application for managing hospital appointments, doctor schedules, and patient records with secure role-based access.",
    repo: "https://github.com/neshanpramuditha/Hospital-Appointment-System",
    live: "https://clinexa-azure.vercel.app/",
  },

  {
    title: "EduRAG+",
    type: "AI / RAG System",
    image: "/projects/edurag.jpg",
    tech: ["FastAPI", "LangChain", "Pinecone", "OpenAI API"],
    description:
      "AI-powered RAG system for lecture note analysis, semantic search, and exam preparation.",
    repo: "https://github.com/kkdjanakaeranda/EduRAG",
    live: "https://edu-rag-theta.vercel.app/",
  },
  {
    title: "Smart Irrigation System",
    type: "IoT Project - Group Project",
    image: "/projects/irrigation.jpg",
    tech: ["ESP32", "Firebase", "IoT"],
    description:
      "IoT-based automated irrigation system with real-time monitoring and remote control.",
    repo: "https://github.com/kkdjanakaeranda/smart-irrigation-system",
    repo2: "https://github.com/KMDS21/Smart-Irrigation-System",
    live: "https://www.linkedin.com/posts/kkdjanakaeranda_smartirrigation-sustainablefarming-climateresilience-ugcPost-7352631703900770304-1KRn/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADG-_HUBIg1AgcfTQriBz2qjr1QNGvoA2Hg",
  },
  {
    title: "Student Management System",
    type: "Web Application - Individual Project",
    image: "/projects/student-management.jpg",
    tech: ["PHP", "MySQL", "JavaScript"],
    description:
      "Role-based student management platform with attendance, grading, and admin modules.",
    repo: "https://github.com/kkdjanakaeranda/student-management-system",
    live: "https://student-management-system-janaka.infinityfree.io/login.php",
  },
  {
    title: "Portfolio Website",
    type: "Personal Website",
    image: "/projects/portfolio.jpg",
    tech: ["Next.js", "Tailwind CSS"],
    description:
      "Modern responsive portfolio website showcasing projects, skills, and experience.",
    repo: "https://github.com/kkdjanakaeranda/my-portfolio",
    live: "https://janakaeranda-portfolio.vercel.app/",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-black text-white py-10 px-3 overflow-hidden scroll-mt-8"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.15),transparent_35%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-violet-400 uppercase tracking-[0.3em] text-sm mb-4">
            PROJECTS
          </p>

          <h2 className="text-3xl md:text-5xl font-bold">
            Selected Work
          </h2>

          <p className="text-zinc-400 mt-4 max-w-2xl leading-7">
            A collection of academic and personal projects focused on AI,
            full-stack development, IoT, and modern web technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-violet-500/50 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative h-40 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px]">
                    {project.type}
                  </span>
                </div>

                <div className="absolute top-3 right-3 text-white/40 text-sm font-semibold">
                  0{index + 1}
                </div>
              </div>

              <div className="relative z-10 p-5">
                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                <p className="mt-3 text-zinc-400 text-sm leading-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-2">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-center px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-violet-500 transition text-xs ${
                      project.live ? "flex-1" : "w-full"
                    }`}
                  >
                    GitHub
                  </a>

                  {project.repo2 && (
                  <a
                    href={project.repo2}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-center px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-violet-500 transition text-xs ${
                      project.live ? "flex-1" : "w-full"
                    }`}
                  >
                    GitHub
                  </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center px-3 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition text-xs font-medium"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}