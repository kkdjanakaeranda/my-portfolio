"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  {
    number: "20+",
    label: "Projects Done",
  },
  {
    number: "10+",
    label: "Technologies",
  },
  {
    number: "3+",
    label: "Years Learning",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden pt-28">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.15),transparent_35%)]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center min-h-screen relative z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* SMALL TITLE */}
          <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/70 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-violet-500"></div>

            <p className="text-sm text-zinc-300">
              Aspiring Software Engineer
            </p>
          </div>

          {/* MAIN TITLE */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-white via-zinc-300 to-violet-400 bg-clip-text text-transparent">
              Janaka
            </span>
          </h1>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-700 mt-2">
            Eranda
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-8 text-zinc-400 text-lg leading-8 max-w-2xl">
            Passionate about building AI-powered applications,
            IoT systems, and modern full stack web experiences
            using React, Next.js, Spring Boot, Node.js, and MySQL.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="#projects"
              className="bg-white text-black px-7 py-4 rounded-2xl font-medium hover:bg-zinc-200 transition-all duration-300 shadow-lg"
            >
              View Projects
            </a>

            <a
              href="/cv.pdf"
              className="border border-zinc-700 bg-zinc-900/60 backdrop-blur-md px-7 py-4 rounded-2xl hover:bg-zinc-800 transition-all duration-300"
            >
              Download CV
            </a>

          </div>

          {/* STATS */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl">

            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl rounded-3xl p-6"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  {stat.number}
                </h3>

                <p className="text-zinc-400 mt-2 text-sm leading-6">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end"
        >

          <div className="relative">

            {/* OUTER GLOW */}
            <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full scale-110"></div>

            {/* RING */}
            <div className="absolute inset-0 border border-violet-500/20 rounded-full scale-110"></div>

            {/* IMAGE CONTAINER */}
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">

              <Image
                src="/images/profile.png"
                alt="Profile"
                fill
                priority
                className="object-cover"
              />

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}