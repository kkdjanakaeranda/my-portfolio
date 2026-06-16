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
    <section
      id="home"
      className="relative min-h-screen bg-black text-white overflow-hidden pt-16 pb-16 md:pt-16 sm:pt-16"
    >
      {/* Background Glow */}
      <div className="absolute right-0 top-0 h-full w-full pointer-events-none bg-[radial-gradient(circle_at_75%_40%,rgba(124,58,237,0.18),transparent_35%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

          {/* RIGHT SIDE FIRST ON MOBILE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-first lg:order-last flex justify-center lg:justify-end mb-6 lg:mb-0"
          >
            
            <div className="relative">

              {/* Glow */}
              <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full scale-110" />

              {/* Image */}
              <div className="relative w-[180px] h-[180px]
                sm:w-[240px] sm:h-[240px]
                md:w-[320px] md:h-[320px]
                lg:w-[400px] lg:h-[400px]
                rounded-full overflow-hidden border border-zinc-800 bg-zinc-900
                transition-transform duration-500 hover:scale-105">

                <Image
                  src="/images/profile.png"
                  alt="Janaka Eranda"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Location Card */}
              <div className="absolute -bottom-1 left-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] md:-bottom-3 md:-left-3 md:rounded-xl md:px-4 md:py-3 md:text-xs">
                <p className="text-zinc-500">
                  Based In
                </p>

                <p className="font-medium">
                  Sri Lanka 🇱🇰
                </p>
              </div>

              {/* Focus Card */}
              <div className="absolute top-1 right-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[10px] md:top-4 md:-right-4 md:rounded-xl md:px-4 md:py-3 md:text-xs">
                <p className="text-zinc-500">
                  Focus
                </p>

                <p className="font-medium">
                  AI & Full Stack
                </p>
              </div>

            </div>
          </motion.div>

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <span className="text-xs sm:text-sm text-zinc-300">
                Available for Internships
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Hi, I'm
            </h1>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-zinc-300 to-violet-400 bg-clip-text text-transparent">
                Janaka Eranda
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-zinc-400 text-base md:text-lg leading-7 md:leading-8 max-w-xl mx-auto lg:mx-0">
              I build modern web applications, AI-powered solutions,
              and IoT systems that solve real-world problems.
              Passionate about Full Stack Development, Artificial
              Intelligence, and creating impactful software.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">

              <a
                href="#projects"
                className="bg-white text-black px-7 py-4 rounded-2xl font-medium hover:bg-zinc-200 transition-all duration-300 shadow-lg text-center"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="border border-zinc-700 bg-zinc-900/60 backdrop-blur-md px-7 py-4 rounded-2xl hover:bg-zinc-800 transition-all duration-300 text-center"
              >
                Contact me
              </a>

            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto lg:mx-0">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 sm:p-4"
                >
                  <h3 className="text-xl sm:text-2xl font-bold">
                    <CountUp end={stat.end} duration={2} />+
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex">
        <div className="w-6 h-10 border border-zinc-700 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-zinc-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}