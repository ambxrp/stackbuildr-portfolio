'use client';

import { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface MockPhoto {
  id: number;
  title: string;
  type: string;
  svgContent: React.ReactNode;
}

export default function PhotoViewer() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [shutterActive, setShutterActive] = useState(false);

  const photos: MockPhoto[] = [
    {
      id: 1,
      title: "Boerne Golden Hour",
      type: "35mm Film // Portra 400",
      svgContent: (
        <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
          {/* Sunset over hills */}
          <defs>
            <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill="url(#sunset)" />
          {/* Mountains/Hills */}
          <path d="M-20 250 L100 180 L220 220 L320 160 L420 250 Z" fill="#1e1b4b" opacity="0.9" />
          <path d="M80 250 L180 200 L290 230 L450 170 L450 250 Z" fill="#0f172a" />
          {/* Sun */}
          <circle cx="200" cy="110" r="35" fill="#fef08a" opacity="0.8" className="animate-pulse" />
          {/* Grain Overlay */}
          <rect width="400" height="250" fill="transparent" style={{ mixBlendMode: 'overlay', opacity: 0.15 }} />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Urban Geometry",
      type: "Monochrome // Tri-X 400",
      svgContent: (
        <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
          {/* Black & White Architectural shadow */}
          <rect width="400" height="250" fill="#18181b" />
          <polygon points="0,0 200,0 80,250 0,250" fill="#f4f4f5" />
          <polygon points="200,0 400,0 400,250 250,250" fill="#71717a" />
          <polygon points="80,250 250,250 400,100" fill="#27272a" />
          <line x1="200" y1="0" x2="80" y2="250" stroke="#a1a1aa" strokeWidth="2" />
          <circle cx="300" cy="70" r="15" fill="#f4f4f5" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Desert Silence",
      type: "Medium Format // Ektar 100",
      svgContent: (
        <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
          {/* Warm Sand dunes */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill="url(#skyGrad)" />
          {/* Dunes */}
          <path d="M-50 250 Q120 160 220 220 T450 180 L450 250 Z" fill="#7c2d12" />
          <path d="M80 250 Q220 190 320 210 T450 210 L450 250 Z" fill="#9a3412" />
          <path d="M-20 250 Q80 210 160 230 T450 230 L450 250 Z" fill="#4c1d95" opacity="0.3" />
        </svg>
      ),
    },
  ];

  const triggerShutter = () => {
    if (shutterActive) return;
    setShutterActive(true);
    setTimeout(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 180);
    setTimeout(() => {
      setShutterActive(false);
    }, 350);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center shadow-lg relative group">
      {/* Viewfinder Window */}
      <div className="relative w-full aspect-[1.6] rounded-xl overflow-hidden bg-black border-2 border-zinc-800 flex items-center justify-center">
        
        {/* Active Photo */}
        <div className="w-full h-full">
          {photos[photoIndex].svgContent}
        </div>

        {/* Shutter overlay iris animation */}
        <div
          style={{
            transform: shutterActive ? 'scale(1)' : 'scale(0)',
            opacity: shutterActive ? 1 : 0,
            transition: 'transform 0.18s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.15s ease',
          }}
          className="absolute inset-0 bg-black flex items-center justify-center z-20 pointer-events-none"
        >
          {/* Shutter blades closing */}
          <div className="w-full h-full flex items-center justify-center text-white">
            <Camera className="w-16 h-16 text-purple-400 animate-spin" style={{ animationDuration: '0.35s' }} />
          </div>
        </div>

        {/* Framing Guides Overlay */}
        <div className="absolute inset-4 border border-white/10 pointer-events-none flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-2 h-2 border-t border-l border-white/40" />
            <div className="w-2 h-2 border-t border-r border-white/40" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border border-dashed border-white/20 rounded-full" />
          </div>
          <div className="flex justify-between">
            <div className="w-2 h-2 border-b border-l border-white/40" />
            <div className="w-2 h-2 border-b border-r border-white/40" />
          </div>
        </div>

        {/* Badge Overlay */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-zinc-400 font-mono flex items-center gap-1.5 border border-zinc-800">
          <Eye className="w-3 h-3 text-cyan-400" />
          {photos[photoIndex].type}
        </div>
      </div>

      {/* Control Panel - Responsive flex-box spacing */}
      <div className="w-full mt-3 flex justify-between items-center bg-zinc-900/60 p-2 rounded-xl border border-zinc-800/50">
        <div className="flex flex-col min-w-0 flex-1 mr-2.5">
          <span className="text-xs font-bold text-white font-mono truncate">
            {photos[photoIndex].title}
          </span>
          <span className="text-[10px] text-purple-400 font-mono truncate">
            Sabryna Photo Portfolio
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={prevPhoto}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors interactive"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Shoot Button */}
          <button
            onClick={triggerShutter}
            className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-600 active:scale-95 text-black font-bold text-xs font-mono transition-all flex items-center gap-1 interactive shadow-[0_0_10px_rgba(168,85,247,0.3)]"
          >
            <Camera className="w-3.5 h-3.5" />
            Snap
          </button>

          <button
            onClick={nextPhoto}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors interactive"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
