"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-14 md:h-14 bg-black/80 backdrop-blur-md text-white border-b border-zinc-800 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        <a href="#home" className="text-base sm:text-lg md:text-xl font-bold">
          Janaka Eranda
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-violet-400 transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 border-b border-zinc-800 px-4 py-4">
          <div className="flex flex-col gap-4 text-sm">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-zinc-300 hover:text-white transition"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}