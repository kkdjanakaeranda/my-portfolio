export default function Footer() {
  return (
    <footer className="py-10 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <p className="mt-3 text-zinc-500">
          Building AI-powered solutions, modern web applications and IoT systems.
        </p>

        <p className="mt-6 text-zinc-600 text-sm">
          © {new Date().getFullYear()} Janaka Eranda
        </p>
      </div>
    </footer>
  );
}