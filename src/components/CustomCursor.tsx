import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface SparkleTrail {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState<SparkleTrail[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Detect touch screens or reduced motion
    const touchQuery = window.matchMedia('(pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (touchQuery.matches || motionQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    let counter = 0;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check hover interactive elements
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('.interactive'))) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }

      // Add trailing sparkle every few pixels
      counter++;
      if (counter % 3 === 0) {
        const newSparkle: SparkleTrail = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          size: Math.random() * 6 + 4,
          opacity: 1,
        };

        setSparkles(prev => [...prev.slice(-15), newSparkle]);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Fade out sparkles
    const interval = setInterval(() => {
      setSparkles(prev =>
        prev
          .map(s => ({ ...s, opacity: s.opacity - 0.1, size: s.size * 0.9 }))
          .filter(s => s.opacity > 0)
      );
    }, 40);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Sparkle Trail */}
      {sparkles.map(s => (
        <div
          key={s.id}
          className="fixed pointer-events-none rounded-full bg-[#F7D27A] z-50 transition-transform"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 6px #F7D27A',
          }}
        />
      ))}

      {/* Main Glowing Heart Cursor */}
      <div
        className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.4 : 1})`,
        }}
      >
        <Heart
          className="w-5 h-5 text-[#E75480] fill-[#FF8DB3] filter drop-shadow-[0_0_8px_rgba(231,84,128,0.6)] animate-pulse"
        />
      </div>
    </>
  );
};
