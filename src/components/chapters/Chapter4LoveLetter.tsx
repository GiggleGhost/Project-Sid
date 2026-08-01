import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Feather } from 'lucide-react';
import { STORY_CONFIG } from '../../config';
import { TurnPageButton } from '../TurnPageButton';
import { sounds } from '../../utils/sound';

export const Chapter4LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnfolded, setIsUnfolded] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    sounds.playEnvelopeOpen();
    setIsOpen(true);

    setTimeout(() => {
      sounds.playSparkle();
      setIsUnfolded(true);
    }, 600);
  };

  return (
    <section id="chapter-4" className="min-h-screen flex flex-col justify-between p-6 py-16 relative z-20">
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        
        {/* Chapter Label */}
        <div className="text-center mb-8">
          <span className="font-title text-3xl sm:text-4xl text-[#E75480] block">Chapter IV</span>
          <h2 className="font-heading text-2xl sm:text-3xl font-medium text-[#444444]">A Handwritten Love Letter</h2>
        </div>

        {/* Envelope & Letter Container */}
        <div className="w-full relative flex flex-col items-center">
          {!isOpen ? (
            /* Closed Envelope View */
            <div
              onClick={handleOpenEnvelope}
              className="interactive glass-panel p-8 sm:p-12 rounded-3xl w-full max-w-lg text-center cursor-pointer border-2 border-[#FFD6E8] shadow-2xl hover:scale-105 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Wax Seal / Bow */}
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#E75480] to-[#FF8DB3] flex items-center justify-center shadow-lg mb-6 group-hover:rotate-12 transition-transform">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>

              <div className="space-y-2">
                <span className="font-title text-3xl text-[#E75480] block">To: {STORY_CONFIG.recipientName} (Muddulu)</span>
                <p className="font-heading text-sm text-[#666666] flex items-center justify-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#E75480]" /> Click to open letter <Sparkles className="w-4 h-4 text-[#F7D27A]" />
                </p>
              </div>

              <div className="absolute inset-x-0 bottom-3 text-[10px] text-[#A0A0A0] font-body tracking-widest uppercase">
                Sealed with everlasting love
              </div>
            </div>
          ) : (
            /* Opened Letter View */
            <div
              className={`w-full glass-panel p-8 sm:p-12 rounded-3xl border-2 border-[#FFD6E8] shadow-2xl transition-all duration-700 ${
                isUnfolded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              style={{
                backgroundImage: 'radial-gradient(#FFD6E8 0.75px, transparent 0.75px)',
                backgroundSize: '16px 16px'
              }}
            >
              {/* Top Letter Header */}
              <div className="flex items-center justify-between border-b border-[#FFD6E8] pb-4 mb-6">
                <div className="flex items-center gap-2 text-[#E75480]">
                  <Feather className="w-5 h-5 animate-bounce" />
                  <span className="font-heading font-semibold text-sm">For My Dearest Chittikuna</span>
                </div>
                <Sparkles className="w-5 h-5 text-[#F7D27A]" />
              </div>

              {/* Letter Title */}
              <h3 className="font-title text-3xl sm:text-4xl text-[#E75480] mb-6">
                {STORY_CONFIG.loveLetter.title}
              </h3>

              {/* Letter Paragraphs */}
              <div className="space-y-6 font-letter text-xl sm:text-2xl md:text-[26px] text-[#2C1820] leading-relaxed tracking-wide font-normal">
                {STORY_CONFIG.loveLetter.paragraphs.map((p, idx) => (
                  <p key={idx} className="indent-6 sm:indent-8 first-letter:text-4xl first-letter:font-semibold first-letter:text-[#E75480] first-letter:mr-0.5">
                    {p}
                  </p>
                ))}
              </div>

              {/* Letter Signature */}
              <div className="mt-10 pt-6 border-t border-[#FFD6E8]/80 text-right space-y-1">
                <p className="font-letter italic text-lg sm:text-xl text-[#88586B] font-medium">{STORY_CONFIG.loveLetter.closing}</p>
                <p className="font-title text-4xl sm:text-5xl text-[#E75480] font-bold tracking-wider">
                  {STORY_CONFIG.loveLetter.signature}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <TurnPageButton targetChapterId="chapter-5" label="Turn to Our Timeline ❤️" />
    </section>
  );
};
