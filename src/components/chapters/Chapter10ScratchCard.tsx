import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TurnPageButton } from '../TurnPageButton';
import { sounds } from '../../utils/sound';

export const Chapter10ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 340);
    const height = (canvas.height = 200);

    // Draw Silver Shimmer Metallic Coating
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D1D5DB');
    gradient.addColorStop(0.5, '#E5E7EB');
    gradient.addColorStop(1, '#9CA3AF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw Scratch Card Text Pattern on Silver Layer
    ctx.fillStyle = '#6B7280';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here, Muddulu ✨', width / 2, height / 2);

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      sounds.playScratch();
      checkScratchPercentage();
    };

    const checkScratchPercentage = () => {
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let clearPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearPixels++;
      }

      const percent = Math.round((clearPixels / (pixels.length / 4)) * 100);
      setScratchPercent(percent);

      if (percent > 45 && !isRevealed) {
        setIsRevealed(true);
        sounds.playPop();
        sounds.playSparkle();

        confetti({
          particleCount: 35,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF8DB3', '#E75480', '#F7D27A']
        });
      }
    };

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const handleEnd = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);

      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isRevealed]);

  return (
    <section id="chapter-10" className="min-h-screen flex flex-col justify-between p-6 py-16 relative z-20">
      <div className="max-w-xl mx-auto w-full text-center">
        
        {/* Chapter Header */}
        <div className="mb-8">
          <span className="font-title text-3xl sm:text-4xl text-[#E75480] block">Chapter X</span>
          <h2 className="font-heading text-2xl sm:text-4xl font-semibold text-[#444444]">Romantic Scratch Card</h2>
          <p className="font-body text-xs sm:text-sm text-[#888888] mt-2 flex items-center justify-center gap-1">
            <Wand2 className="w-4 h-4 text-[#E75480]" /> Scratch the silver surface with your mouse or finger!
          </p>
        </div>

        {/* Scratch Card Frame */}
        <div className="relative mx-auto w-[340px] h-[200px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFD6E8] bg-gradient-to-tr from-[#FFD6E8] via-[#FFEBF3] to-[#FFF8FC] flex flex-col items-center justify-center p-6 space-y-2">
          
          {/* Hidden Text Revealed Under Layer */}
          <div className="text-center space-y-1">
            <Heart className="w-10 h-10 text-[#E75480] fill-[#FF8DB3] mx-auto animate-bounce" />
            <span className="font-title text-4xl text-[#E75480] block">
              I Love You Forever ❤️
            </span>
            <p className="font-heading text-xs text-[#666666]">
              Sid + Maha = Always & Forever
            </p>
          </div>

          {/* Interactive Scratch Canvas Overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-pointer touch-none z-10 transition-opacity duration-700"
            style={{ opacity: isRevealed ? 0 : 1 }}
          />
        </div>

        {/* Scratch Progress indicator */}
        <div className="mt-4 text-xs font-semibold text-[#E75480]">
          {isRevealed ? "Fully Revealed! 💖" : `Scratched: ${scratchPercent}%`}
        </div>
      </div>

      <TurnPageButton targetChapterId="chapter-12" label="Turn to Digital Gift Box ❤️" />
    </section>
  );
};
