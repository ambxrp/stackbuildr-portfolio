'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count
    const particleCount = Math.min(65, Math.floor((width * height) / 24000));
    const particles: Particle[] = [];
    const lasers: Laser[] = [];
    const sparks: Spark[] = [];
    const mouse = { x: -1000, y: -1000, active: false, radius: 180 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseColor: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Random velocity
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        
        // Curated cosmic colors
        const colors = [
          'rgba(168, 85, 247, ', // Purple
          'rgba(59, 130, 246, ',  // Blue
          'rgba(236, 72, 153, ',  // Pink
          'rgba(6, 182, 212, ',   // Cyan
        ];
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction (gravity pull/push)
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Pull slightly
            this.x -= (dx / dist) * force * 0.6;
            this.y -= (dy / dist) * force * 0.6;
          }
        }

        // Apply constant velocity
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.baseColor}${this.alpha})`;
        ctx.fill();
      }
    }

    class Laser {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
      life: number;
      maxLife: number;

      constructor(targetX: number, targetY: number) {
        // Shoot from a random position along the bottom border
        this.x1 = Math.random() * width;
        this.y1 = height;
        this.x2 = targetX;
        this.y2 = targetY;
        
        const colors = [
          '#a855f7', // Purple
          '#06b6d4', // Cyan
          '#ec4899', // Pink
          '#10b981', // Emerald
          '#f59e0b'  // Amber
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 12; // animation frame life
        this.maxLife = 12;
      }

      update() {
        this.life--;
      }

      draw() {
        if (!ctx) return;
        const progress = this.life / this.maxLife; // 1 to 0
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        
        // Neon outer glow
        ctx.shadowBlur = 18;
        ctx.shadowColor = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3.5 * progress;
        ctx.stroke();

        // High brightness inner white core
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.8 * progress;
        ctx.stroke();
        
        ctx.restore();
      }
    }

    class Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      decay: number;
      radius: number;

      constructor(startX: number, startY: number, color: string) {
        this.x = startX;
        this.y = startY;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = color;
        this.alpha = 1;
        this.decay = Math.random() * 0.025 + 0.015;
        this.radius = Math.random() * 1.8 + 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Friction drag
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.alpha -= this.decay;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fillStyle = `rgba(${this.hexToRgb(this.color)}, ${this.alpha})`;
        ctx.fill();
        ctx.restore();
      }

      // Convert hex color to rgb numbers for transparency fill
      hexToRgb(hex: string): string {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result 
          ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
          : '168, 85, 247';
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Draw faint space grid blueprint lines
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Mouse effect glow
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius
        );
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0.05)');
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Update & Draw lasers
      for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].update();
        lasers[i].draw();
        if (lasers[i].life <= 0) {
          lasers.splice(i, 1);
        }
      }

      // Update & Draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw();
        if (sparks[i].alpha <= 0) {
          sparks.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleClick = (e: MouseEvent) => {
      // Ignore click triggers only inside text input / textareas to keep form typing clean
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('input') || 
        target.closest('textarea')
      ) {
        return;
      }

      const clickX = e.clientX;
      const clickY = e.clientY;

      // Spawn a laser beam
      const laser = new Laser(clickX, clickY);
      lasers.push(laser);

      // Spawn impact sparks
      const sparkCount = Math.floor(Math.random() * 6) + 10; // 10-15 sparks
      for (let i = 0; i < sparkCount; i++) {
        sparks.push(new Spark(clickX, clickY, laser.color));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black pointer-events-none"
    />
  );
}
