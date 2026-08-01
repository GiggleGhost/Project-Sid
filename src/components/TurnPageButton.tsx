import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/sound';

interface TurnPageButtonProps {
  targetChapterId: string;
  label?: string;
}

export const TurnPageButton: React.FC<TurnPageButtonProps> = ({
  targetChapterId,
  label = "Turn the Page ❤️"
}) => {
  const handleClick = () => {
    sounds.playSparkle();
    const target = document.getElementById(targetChapterId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex justify-center pt-8 pb-12">
      <button
        onClick={handleClick}
        className="interactive glass-button group relative px-8 py-3.5 rounded-full flex items-center gap-3 text-sm font-heading font-semibold text-[#E75480] hover:text-[#444444] shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <Sparkles className="w-4 h-4 text-[#F7D27A] animate-pulse" />
        <span>{label}</span>
        <Heart className="w-4 h-4 text-[#E75480] fill-[#FF8DB3] group-hover:scale-125 transition-transform" />
      </button>
    </div>
  );
};
