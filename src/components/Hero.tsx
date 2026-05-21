export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <p className="text-gray-400 text-lg mb-4">
          Aspiring Software Engineer
        </p>

        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          Janaka Eranda
        </h1>

        <p className="mt-8 text-gray-400 text-xl leading-8">
          Building AI-powered, IoT, and Full Stack Applications
          using modern technologies.
        </p>

        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            View Projects
          </a>

          <a
            href="/cv.pdf"
            className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
