export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md text-white z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Janaka Eranda
        </h1>

        <div className="flex gap-6 text-sm font-medium">
          <a href="#about" className="hover:text-gray-400">About</a>
          <a href="#skills" className="hover:text-gray-400">Skills</a>
          <a href="#projects" className="hover:text-gray-400">Projects</a>
          <a href="#contact" className="hover:text-gray-400">Contact</a>
        </div>
      </div>
    </nav>
  );
}
