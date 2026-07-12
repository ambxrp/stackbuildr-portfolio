'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if it's a touch device or mobile screen
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Track mouse coordinates
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Dynamic scale and color on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') || 
        target.classList.contains('interactive');

      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Spring animation for outer cursor ring
    const animateCursor = () => {
      if (!dot || !outline) return;

      // Center dot follows instantly
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Outer ring follows with inertia (lerp)
      const ease = 0.15; // interpolation factor
      outlineX += (mouseX - outlineX) * ease;
      outlineY += (mouseY - outlineY) * ease;

      outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) scale(${isHovered ? 1.8 : 1})`;

      requestAnimationFrame(animateCursor);
    };

    const animId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, isHovered]);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
        }}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference"
      />
      {/* Outer Ring */}
      <div
        ref={outlineRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out, width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s',
        }}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border-2 rounded-full pointer-events-none z-50 ${
          isHovered 
            ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.5)]' 
            : 'border-purple-500'
        }`}
      />
    </>
  );
}
