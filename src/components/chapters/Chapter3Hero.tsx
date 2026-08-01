import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { STORY_CONFIG } from '../../config';
import { TurnPageButton } from '../TurnPageButton';
import { sounds } from '../../utils/sound';

export const Chapter3Hero: React.FC = () => {
  const [currentNicknameIndex, setCurrentNicknameIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = STORY_CONFIG.nicknames[currentNicknameIndex];
    const typingSpeed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(targetWord.substring(0, displayText.length + 1));
        if (displayText.length === targetWord.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(targetWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentNicknameIndex((prev) => (prev + 1) % STORY_CONFIG.nicknames.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentNicknameIndex]);

  const handleStartStory = () => {
    sounds.playSparkle();
    const target = document.getElementById('chapter-4');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="chapter-3" className="min-h-screen flex flex-col justify-between p-6 pt-20 relative z-20">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-8">
        
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-medium text-[#E75480] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#F7D27A]" />
          <span>A Surprise Dedicated to Sid</span>
          <Heart className="w-3.5 h-3.5 fill-[#FF8DB3] text-[#E75480]" />
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-semibold text-[#444444] tracking-tight leading-tight">
          Happy Girlfriend's Day <br />
          <span className="font-title text-5xl sm:text-7xl md:text-8xl text-[#E75480] block mt-2 drop-shadow-sm">
            {displayText}
            <span className="animate-pulse text-[#FF8DB3]">|</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-body text-base sm:text-lg text-[#666666] max-w-xl mx-auto leading-relaxed">
          This interactive storybook is crafted with love for the one who holds my heart, my calm, and my forever.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <button
            onClick={handleStartStory}
            className="interactive glass-button px-9 py-4 rounded-full flex items-center gap-3 text-base font-heading font-semibold text-[#E75480] hover:text-[#444444] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>Start Our Story ❤️</span>
            <Heart className="w-5 h-5 fill-[#FF8DB3] text-[#E75480] animate-bounce" />
          </button>
        </div>
      </div>

      {/* Chapter Transition Button */}
      <TurnPageButton targetChapterId="chapter-4" label="Turn to Love Letter ❤️" />
    </section>
  );
};
