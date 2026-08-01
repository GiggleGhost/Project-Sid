import React, { useState } from 'react';
import { Heart, Sparkles, X, Lock } from 'lucide-react';
import { STORY_CONFIG } from '../../config';
import { sounds } from '../../utils/sound';

export const HiddenSecret: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSecret = () => {
    sounds.playSparkle();
    sounds.playPop();
    setIsOpen(true);
  };

  return (
    <>
      {/* Tiny Hidden Heart Button located subtly at the bottom corner */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={handleOpenSecret}
          className="interactive p-2 rounded-full bg-white/40 hover:bg-[#FFD6E8] border border-white/60 shadow-sm transition-all duration-300 opacity-60 hover:opacity-100 group"
          title="A hidden secret for observant eyes..."
        >
          <Heart className="w-3.5 h-3.5 text-[#E75480] fill-[#FF8DB3] group-hover:scale-125 transition-transform" />
        </button>
      </div>

      {/* Secret Message Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative glass-panel p-8 sm:p-10 rounded-3xl max-w-md w-full text-center border-2 border-[#FFD6E8] shadow-2xl animate-float">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#E75480] p-1.5 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E75480] text-white flex items-center justify-center shadow-lg animate-bounce">
              <Sparkles className="w-8 h-8 text-[#F7D27A]" />
            </div>

            <h3 className="font-title text-3xl sm:text-4xl text-[#E75480] mb-2">
              {STORY_CONFIG.secretMessage.title}
            </h3>

            <p className="font-heading text-xs font-semibold text-[#888888] mb-4">
              {STORY_CONFIG.secretMessage.subtitle}
            </p>

            <div className="p-4 rounded-2xl bg-white/70 border border-[#FFD6E8] font-body text-xs sm:text-sm text-[#444444] leading-relaxed text-left space-y-2">
              <p>{STORY_CONFIG.secretMessage.content}</p>
            </div>

            <div className="pt-4 font-title text-3xl text-[#E75480]">
              {STORY_CONFIG.secretMessage.signature}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
