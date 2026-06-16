"use client";

import { motion } from "framer-motion";

const focusAreas = [
  "🤖 Artificial Intelligence",
  "⚛️ Full Stack Development",
  "🚀 Software Engineering",
  "📡 IoT Systems",
  "☁️ Cloud Computing",
  "🌐 Web Development",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-black text-white py-10 px-3 overflow-hidden scroll-mt-8"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.15),transparent_35%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-violet-400 uppercase tracking-[0.3em] text-sm mb-4">
            WHO I AM
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 blur-3xl rounded-full" />
              <div className="relative z-10">

                <h3 className="text-2xl font-semibold mb-6">
                  My Journey
                </h3>

                <p className="text-zinc-400 leading-8 text-lg">
                  I am Janaka Eranda, a Software Engineering-focused
                  undergraduate at the University of Kelaniya with a strong
                  passion for Full Stack Development, Artificial Intelligence,
                  and emerging technologies.
                </p>

                <p className="text-zinc-400 leading-8 text-lg mt-5">
                  My experience includes building AI-powered systems such as
                  EduRAG+, developing modern web applications using Next.js and
                  React, creating IoT solutions with ESP32 and Firebase, and
                  designing scalable database-driven systems.
                </p>

                <p className="text-zinc-400 leading-8 text-lg mt-5">
                  Currently, I am expanding my expertise through the Advanced AI
                  & Software Engineering program while actively seeking
                  internship opportunities where I can contribute, learn, and
                  grow as a software engineer.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {focusAreas.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800 text-sm text-zinc-300 hover:border-violet-500 hover:-translate-y-1 transition-all duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 blur-3xl rounded-full" />
              <div className="relative z-10">

                <h3 className="text-2xl font-semibold mb-8">
                  Education Journey
                </h3>

                <div className="relative border-l border-zinc-700 pl-6 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-violet-500" />
                    <span className="text-violet-400 text-sm">Present</span>
                    <h4 className="font-semibold mt-1">BICT (Hons)</h4>
                    <p className="text-zinc-400 text-sm">
                      University of Kelaniya
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">
                      Software System Technology
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-500" />
                    <span className="text-cyan-400 text-sm">Ongoing</span>
                    <h4 className="font-semibold mt-1">
                      Advanced AI & Software Engineering
                    </h4>
                    <p className="text-zinc-400 text-sm">
                      C-Clarke Institute
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-green-500" />
                    <span className="text-green-400 text-sm">2022</span>
                    <h4 className="font-semibold mt-1">
                      Diploma in ICT & English
                    </h4>
                    <p className="text-zinc-400 text-sm">
                      ICBT Campus
                    </p>
                  </div>
                </div>
              </div>  
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}