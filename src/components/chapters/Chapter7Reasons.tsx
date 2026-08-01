import React, { useState } from 'react';
import { Heart, Sparkles, Star, Music, Smile, Coffee, Compass, ShieldCheck } from 'lucide-react';
import { STORY_CONFIG } from '../../config';
import { TurnPageButton } from '../TurnPageButton';
import { sounds } from '../../utils/sound';

export const Chapter7Reasons: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const iconMap: Record<string, React.ReactNode> = {
    Heart: <Heart className="w-8 h-8 text-[#E75480]" />,
    Music: <Music className="w-8 h-8 text-[#E75480]" />,
    Sparkles: <Sparkles className="w-8 h-8 text-[#F7D27A]" />,
    ShieldCheck: <ShieldCheck className="w-8 h-8 text-[#E75480]" />,
    Smile: <Smile className="w-8 h-8 text-[#E75480]" />,
    Coffee: <Coffee className="w-8 h-8 text-[#E75480]" />,
    Compass: <Compass className="w-8 h-8 text-[#E75480]" />,
    Star: <Star className="w-8 h-8 text-[#F7D27A]" />
  };

  const handleCardClick = (id: string) => {
    sounds.playFlip();
    sounds.playPop();
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="chapter-7" className="min-h-screen flex flex-col justify-between p-6 py-16 relative z-20">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Chapter Header */}
        <div className="text-center mb-12">
          <span className="font-title text-3xl sm:text-4xl text-[#E75480] block">Chapter VII</span>
          <h2 className="font-heading text-2xl sm:text-4xl font-semibold text-[#444444]">Reasons Why I Love You</h2>
          <p className="font-body text-xs sm:text-sm text-[#888888] mt-2">
            Click each card to reveal a secret reason from my heart ❤️
          </p>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STORY_CONFIG.reasons.map((reason) => {
            const isFlipped = flippedCards[reason.id];

            return (
              <div
                key={reason.id}
                onClick={() => handleCardClick(reason.id)}
                className="interactive cursor-pointer h-64 perspective-1000 group"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front Face */}
                  <div className="absolute inset-0 w-full h-full glass-panel rounded-3xl p-6 flex flex-col items-center justify-between text-center border-2 border-[#FFD6E8] shadow-lg backface-hidden">
                    <span className="w-8 h-8 rounded-full bg-[#FFD6E8] text-[#E75480] font-heading font-bold text-xs flex items-center justify-center">
                      #{reason.number}
                    </span>

                    <div className="p-4 rounded-full bg-white/80 shadow-md animate-float">
                      {iconMap[reason.iconName] || <Heart className="w-8 h-8 text-[#E75480]" />}
                    </div>

                    <h3 className="font-heading font-semibold text-sm text-[#444444]">
                      {reason.title}
                    </h3>

                    <span className="text-[10px] text-[#E75480] font-body tracking-wider uppercase flex items-center gap-1">
                      Tap to flip <Sparkles className="w-3 h-3 text-[#F7D27A]" />
                    </span>
                  </div>

                  {/* Back Face */}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FFD6E8] to-[#FFEBF3] rounded-3xl p-6 flex flex-col items-center justify-center text-center border-2 border-[#E75480]/40 shadow-xl backface-hidden"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <Heart className="w-6 h-6 text-[#E75480] fill-[#FF8DB3] mb-3 animate-bounce" />
                    <p className="font-body text-xs sm:text-sm text-[#444444] leading-relaxed">
                      "{reason.description}"
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TurnPageButton targetChapterId="chapter-8" label="Turn to Our Bucket List ❤️" />
    </section>
  );
};
