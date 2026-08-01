import React, { useEffect, useState, useRef } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORY_CONFIG } from '../../config';
import { sounds } from '../../utils/sound';

interface Chapter13EndingProps {
  onTriggerFireworks: () => void;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

export const Chapter13Ending: React.FC<Chapter13EndingProps> = ({ onTriggerFireworks }) => {
  const [showContent, setShowContent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SparkParticle[]>([]);

  const launchFireworks = () => {
    // Play synthesized firework launch + explosion sound
    sounds.playFirework();

    // Trigger canvas fireworks around the card
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const colors = ['#FF8DB3', '#E75480', '#F7D27A', '#FFFFFF', '#FFD6E8', '#E2B6FF', '#FFD1A4'];

    // Spawn bursts at multiple key points around the card
    const burstPositions = [
      { x: width * 0.2, y: height * 0.3 },
      { x: width * 0.8, y: height * 0.35 },
      { x: width * 0.5, y: height * 0.18 },
      { x: width * 0.15, y: height * 0.6 },
      { x: width * 0.85, y: height * 0.65 },
    ];

    burstPositions.forEach((pos) => {
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        particlesRef.current.push({
          x: pos.x,
          y: pos.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2.5 + 1.5,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.012
        });
      }
    });

    // Also throw confetti
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FF8DB3', '#E75480', '#F7D27A', '#FFFFFF']
    });
  };

  useEffect(() => {
    sounds.playSparkle();
    
    // Auto launch fireworks sequence on mount
    const timer = setTimeout(() => {
      setShowContent(true);
      launchFireworks();
      setTimeout(() => launchFireworks(), 800);
      setTimeout(() => launchFireworks(), 1600);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Canvas render loop for card fireworks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleClick = () => {
    onTriggerFireworks();
    launchFireworks();
  };

  return (
    <section
      id="chapter-13"
      onClick={handleClick}
      className="min-h-screen flex flex-col items-center justify-center p-6 py-20 relative z-20 cursor-pointer overflow-hidden"
    >
      {/* Canvas overlay specifically for fireworks surrounding the card */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className={`max-w-2xl mx-auto text-center space-y-8 relative z-20 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Floating Heart Icon with glowing fireworks ring */}
        <div className="relative inline-block">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#E75480] to-[#FF8DB3] flex items-center justify-center shadow-[0_0_50px_rgba(231,84,128,0.8)] animate-pulse-glow">
            <Heart className="w-10 h-10 text-white fill-white animate-bounce" />
          </div>
          <Sparkles className="w-6 h-6 text-[#F7D27A] absolute -top-2 -right-2 animate-spin" />
          <Star className="w-5 h-5 text-[#FF8DB3] absolute -bottom-1 -left-2 animate-pulse" />
        </div>

        {/* Ending Heading */}
        <div className="space-y-3">
          <span className="font-title text-5xl sm:text-7xl text-[#FF8DB3] block drop-shadow-[0_0_20px_rgba(255,141,179,0.6)]">
            {STORY_CONFIG.ending.headline}
          </span>
          <p className="font-heading text-lg sm:text-2xl text-white font-medium tracking-wide">
            {STORY_CONFIG.ending.subheading}
          </p>
        </div>

        {/* Ending Card framed by glowing fireworks aura */}
        <div className="glass-panel-dark p-8 sm:p-12 rounded-3xl border border-white/20 text-white shadow-[0_0_40px_rgba(255,141,179,0.25)] space-y-4 max-w-lg mx-auto relative group hover:shadow-[0_0_60px_rgba(247,210,122,0.4)] transition-shadow duration-500">
          
          {/* Decorative Corner Sparkles */}
          <Sparkles className="w-5 h-5 text-[#F7D27A] absolute top-4 left-4 animate-pulse" />
          <Sparkles className="w-5 h-5 text-[#FF8DB3] absolute top-4 right-4 animate-pulse" />
          <Star className="w-4 h-4 text-[#F7D27A] absolute bottom-4 left-4 animate-ping" />
          <Sparkles className="w-5 h-5 text-[#E75480] absolute bottom-4 right-4 animate-pulse" />

          {STORY_CONFIG.ending.paragraphs.map((line, idx) => (
            <p key={idx} className="font-body text-base sm:text-lg leading-relaxed text-[#FFD6E8]">
              {line}
            </p>
          ))}

          <div className="pt-6 border-t border-white/20">
            <p className="font-title text-4xl sm:text-5xl text-[#F7D27A] drop-shadow-sm">
              {STORY_CONFIG.ending.signature}
            </p>
          </div>
        </div>

        {/* Tap Prompt */}
        <p className="font-body text-xs sm:text-sm text-[#FFB8D1] flex items-center justify-center gap-2 animate-pulse pt-4">
          <Sparkles className="w-4 h-4 text-[#F7D27A]" /> Tap anywhere to launch magic fireworks & sounds! <Star className="w-4 h-4 text-[#F7D27A]" />
        </p>
      </div>
    </section>
  );
};
