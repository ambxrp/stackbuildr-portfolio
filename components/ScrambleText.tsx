'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number; // speed of cycling in ms
  triggerOnHover?: boolean;
}

export default function ScrambleText({
  text,
  className = '',
  speed = 25,
  triggerOnHover = true, // Enabled on hover by default (now 3x faster, crisp glitch)
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // Matrix character set
  const chars = '0123456789%@#$+=*?µ§¥';

  const triggerScramble = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    let iteration = 0;
    if (intervalId.current) clearInterval(intervalId.current);

    intervalId.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalId.current) clearInterval(intervalId.current);
        isAnimating.current = false;
      }

      // Resolves 1 full character per frame (3x faster, clean glitch)
      iteration += 1;
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    triggerScramble();
    
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [triggerScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      triggerScramble();
    }
  };

  return (
    <span 
      onMouseEnter={handleMouseEnter} 
      className={`${className} inline-block`}
    >
      {displayText}
    </span>
  );
}
