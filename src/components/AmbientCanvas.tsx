import React, { useEffect, useRef } from 'react';
import { sounds } from '../utils/sound';

interface AmbientCanvasProps {
  chapter: number; // 1 to 13
  fireworksActive?: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  color: string;
}

interface Firefly {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speedX: number;
  speedY: number;
}

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
}

export const AmbientCanvas: React.FC<AmbientCanvasProps> = ({ chapter, fireworksActive = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize Rose Petals
    const petals: Petal[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      color: Math.random() > 0.4 ? '#FF8DB3' : '#FFD6E8'
    }));

    // Initialize Sparkles
    const sparkles: Sparkle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      alpha: Math.random(),
      maxAlpha: Math.random() * 0.8 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      color: Math.random() > 0.5 ? '#FFFFFF' : '#F7D27A'
    }));

    // Initialize Fireflies (Night chapters)
    const fireflies: Firefly[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1.5,
      alpha: Math.random(),
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6
    }));

    // Fireworks
    let fireworks: FireworkParticle[] = [];

    const createFireworkBurst = (cx: number, cy: number, playSound: boolean = false) => {
      const colors = ['#FF8DB3', '#E75480', '#F7D27A', '#FFFFFF', '#FFD6E8', '#E2B6FF'];
      if (playSound) {
        sounds.playFirework();
      }
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.2;
        fireworks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012
        });
      }
    };

    let autoFireworkTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isNight = chapter >= 10;

      // Render Fireflies on Night Mode
      if (isNight) {
        fireflies.forEach(f => {
          f.x += f.speedX;
          f.y += f.speedY;
          if (f.x < 0) f.x = width;
          if (f.x > width) f.x = 0;
          if (f.y < 0) f.y = height;
          if (f.y > height) f.y = 0;

          f.alpha += Math.sin(Date.now() * 0.002 + f.x) * 0.01;
          const currentAlpha = Math.max(0.1, Math.min(0.9, f.alpha));

          ctx.save();
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(247, 210, 122, ${currentAlpha})`;
          ctx.shadowColor = '#F7D27A';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        });
      }

      // Render Sparkles
      sparkles.forEach(s => {
        s.alpha += s.pulseSpeed;
        if (s.alpha > s.maxAlpha || s.alpha < 0.1) {
          s.pulseSpeed = -s.pulseSpeed;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = isNight 
          ? `rgba(255, 255, 255, ${Math.abs(s.alpha)})` 
          : `rgba(231, 84, 128, ${Math.abs(s.alpha) * 0.6})`;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = isNight ? 8 : 4;
        ctx.fill();
        ctx.restore();
      });

      // Render Rose Petals
      petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.5 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.beginPath();
        // Petal Path
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size, -p.size, -p.size * 1.2, p.size * 0.8, 0, p.size * 1.5);
        ctx.bezierCurveTo(p.size * 1.2, p.size * 0.8, p.size, -p.size, 0, 0);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = isNight ? p.opacity * 0.8 : p.opacity;
        ctx.fill();
        ctx.restore();
      });

      // Render Fireworks (Chapter 13 / fireworksActive)
      if (fireworksActive || chapter === 13) {
        autoFireworkTimer++;
        if (autoFireworkTimer % 90 === 0) {
          createFireworkBurst(
            Math.random() * (width * 0.8) + width * 0.1,
            Math.random() * (height * 0.5) + height * 0.1
          );
        }

        fireworks.forEach((fp, idx) => {
          fp.x += fp.vx;
          fp.y += fp.vy;
          fp.vy += 0.03; // gravity
          fp.alpha -= fp.decay;

          if (fp.alpha <= 0) {
            fireworks.splice(idx, 1);
            return;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(fp.x, fp.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = fp.color;
          ctx.globalAlpha = Math.max(0, fp.alpha);
          ctx.shadowColor = fp.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [chapter, fireworksActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000"
    />
  );
};
