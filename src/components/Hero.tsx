"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  {
    end: 2,
    label: "Projects",
  },
  {
    end: 10,
    label: "Technologies",
  },
  {
    end: 3,
    label: "Years Learning",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center pt-10"
>
      {/* Background Glow */}
      <div className="absolute right-0 top-0 h-full w-full pointer-events-none bg-[radial-gradient(circle_at_75%_40%,rgba(124,58,237,0.18),transparent_35%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <span className="text-sm text-zinc-300">
                Available for Internships
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Hi, I'm
            </h1>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-zinc-300 to-violet-400 bg-clip-text text-transparent">
                Janaka Eranda
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-zinc-400 text-lg leading-8 max-w-xl">
              I build modern web applications, AI-powered solutions,
              and IoT systems that solve real-world problems.
              Passionate about Full Stack Development, Artificial
              Intelligence, and creating impactful software.
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
                href="#contact"
                className="border border-zinc-700 bg-zinc-900/60 backdrop-blur-md px-7 py-4 rounded-2xl hover:bg-zinc-800 transition-all duration-300"
              >
                Contact me
              </a>

            </div>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-3 gap-3 max-w-md">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
                >
                  <h3 className="text-2xl font-bold">
                    <CountUp end={stat.end} duration={2} />+
                  </h3>

                  <p className="text-zinc-400 text-sm mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">

              {/* Glow */}
              <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full scale-110" />

              {/* Image */}
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border border-zinc-800 bg-zinc-900">

                <Image
                  src="/images/profile.png"
                  alt="Janaka Eranda"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Location Card */}
              <div className="absolute -bottom-3 -left-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                <p className="text-xs text-zinc-500">
                  Based In
                </p>

                <p className="font-medium">
                  Sri Lanka 🇱🇰
                </p>
              </div>

              {/* Focus Card */}
              <div className="absolute top-4 -right-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                <p className="text-xs text-zinc-500">
                  Focus
                </p>

                <p className="font-medium">
                  AI & Full Stack
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex">
        <div className="w-6 h-10 border border-zinc-700 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-zinc-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}