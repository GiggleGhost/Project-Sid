import React, { useState } from 'react';
import { Gift, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORY_CONFIG } from '../../config';
import { TurnPageButton } from '../TurnPageButton';
import { sounds } from '../../utils/sound';

export const Chapter12GiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    sounds.playRibbonUntie();

    setTimeout(() => {
      sounds.playPop();
      sounds.playSparkle();
      setIsOpen(true);

      confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF8DB3', '#E75480', '#F7D27A', '#FFFFFF']
      });
    }, 400);
  };

  return (
    <section id="chapter-12" className="min-h-screen flex flex-col justify-between p-6 py-16 relative z-20">
      <div className="max-w-md mx-auto w-full text-center">
        
        {/* Chapter Header */}
        <div className="mb-8">
          <span className="font-title text-3xl sm:text-4xl text-[#E75480] block">Chapter XII</span>
          <h2 className="font-heading text-2xl sm:text-4xl font-semibold text-[#444444]">Digital Gift Box</h2>
          <p className="font-body text-xs sm:text-sm text-[#888888] mt-2">
            Untie the golden ribbon to reveal your surprise!
          </p>
        </div>

        {/* Gift Box Container */}
        <div className="relative flex flex-col items-center">
          {!isOpen ? (
            /* Closed Gift Box */
            <div
              onClick={handleOpenGift}
              className="interactive glass-panel p-10 rounded-3xl cursor-pointer border-2 border-[#FFD6E8] shadow-2xl hover:scale-105 transition-all duration-500 w-full flex flex-col items-center justify-center space-y-6 group"
            >
              {/* Gift Box Icon with Ribbon */}
              <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#E75480] via-[#FF8DB3] to-[#FFD6E8] flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
                
                {/* Gold Bow */}
                <div className="absolute -top-4 w-12 h-8 bg-[#F7D27A] rounded-full shadow-md flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#E75480]" />
                </div>

                <Gift className="w-14 h-14 text-white" />
              </div>

              <div className="space-y-1">
                <span className="font-title text-3xl text-[#E75480] block">
                  {STORY_CONFIG.giftBox.tagText}
                </span>
                <p className="font-heading text-xs text-[#888888] flex items-center justify-center gap-1">
                  Click to untie ribbon <Sparkles className="w-3.5 h-3.5 text-[#F7D27A]" />
                </p>
              </div>
            </div>
          ) : (
            /* Open Gift Box View */
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-[#E75480] shadow-2xl w-full text-center space-y-6 animate-pulse-glow">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#E75480] text-white flex items-center justify-center shadow-xl animate-bounce">
                <Heart className="w-10 h-10 fill-white" />
              </div>

              <div className="space-y-3">
                <span className="font-title text-4xl sm:text-5xl text-[#E75480] block">
                  {STORY_CONFIG.giftBox.headline}
                </span>

                <p className="font-heading text-lg sm:text-xl text-[#444444] font-semibold">
                  "{STORY_CONFIG.giftBox.message}"
                </p>

                <p className="font-body text-xs text-[#888888]">
                  {STORY_CONFIG.giftBox.subtext}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <TurnPageButton targetChapterId="chapter-13" label="Turn to Our Grand Ending ❤️" />
    </section>
  );
};
