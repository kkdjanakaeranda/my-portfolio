export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">
          Hi, I'm Eranda
        </h1>

        <p className="mt-6 text-xl text-gray-400">
          Full Stack Developer
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold">
            View Projects
          </button>

          <button className="border border-white px-6 py-3 rounded-xl">
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
}