'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-purple-500/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2 sm:gap-3 select-none group"
          >
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 animate-pulse" />
            <span className="text-3xl sm:text-4xl font-bold tracking-wider led-font led-text">
              stackbuildr
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 font-mono text-sm">
            <a href="#projects" className="text-zinc-400 hover:text-white transition-colors interactive">
              /projects
            </a>
            <a href="#skills" className="text-zinc-400 hover:text-white transition-colors interactive">
              /skills
            </a>
            <a href="#contact" className="text-zinc-400 hover:text-white transition-colors interactive">
              /contact
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-zinc-400 hover:text-white focus:outline-none p-1 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Links Fullscreen Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/98 flex flex-col justify-center items-center gap-8 font-mono text-xl animate-fade-in">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 focus:outline-none"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>

          <a 
            href="#projects" 
            onClick={() => setIsOpen(false)} 
            className="text-zinc-400 hover:text-white py-2 transition-colors"
          >
            /projects
          </a>
          <a 
            href="#skills" 
            onClick={() => setIsOpen(false)} 
            className="text-zinc-400 hover:text-white py-2 transition-colors"
          >
            /skills
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)} 
            className="text-zinc-400 hover:text-white py-2 transition-colors"
          >
            /contact
          </a>
        </div>
      )}
    </>
  );
}
