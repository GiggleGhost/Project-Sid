import React, { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { STORY_CONFIG } from '../../config';
import { sounds } from '../../utils/sound';

interface Chapter2MemoryOrbProps {
  onComplete: () => void;
}

export const Chapter2MemoryOrb: React.FC<Chapter2MemoryOrbProps> = ({ onComplete }) => {
  const [orbBrightness, setOrbBrightness] = useState(1);
  const [isExploding, setIsExploding] = useState(false);
  const [statusText, setStatusText] = useState('Collecting our precious photos...');
  const [collectedIndex, setCollectedIndex] = useState(0);

  const photos = STORY_CONFIG.memoryOrbPhotos || [
    { id: 'm1', title: 'Memory 1', src: '/mem1.jpg' },
    { id: 'm2', title: 'Memory 2', src: '/mem2.jpg' },
    { id: 'm3', title: 'Memory 3', src: '/mem3.jpg' },
    { id: 'm4', title: 'Memory 4', src: '/mem4.jpg' },
    { id: 'm5', title: 'Memory 5', src: '/mem5.jpg' },
    { id: 'm6', title: 'Memory 6', src: '/mem6.jpg' },
    { id: 'm7', title: 'Memory 7', src: '/mem7.jpg' }
  ];

  useEffect(() => {
    sounds.playSparkle();

    // Incrementally collect photos during the first 2.5 seconds
    const interval = setInterval(() => {
      setCollectedIndex((prev) => {
        if (prev < photos.length) {
          sounds.playPop();
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 350);

    // Timeline steps for a 6.5s load
    const timer1 = setTimeout(() => {
      setOrbBrightness(1.5);
      setStatusText('Weaving our favorite smiles & kisses...');
    }, 2200);

    const timer2 = setTimeout(() => {
      setOrbBrightness(2.2);
      setStatusText('Charging the magic memory orb...');
    }, 4200);

    const timer3 = setTimeout(() => {
      setIsExploding(true);
      sounds.playPop();
    }, 5800);

    const timer4 = setTimeout(() => {
      onComplete();
    }, 6600);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete, photos.length]);

  return (
    <section id="chapter-2" className="min-h-screen flex flex-col items-center justify-center p-6 relative z-20 overflow-hidden bg-[#FFF5F9]">
      {!isExploding ? (
        <div className="flex flex-col items-center justify-center space-y-10 max-w-xl mx-auto text-center">
          
          {/* Main Magical Orb Stage */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            
            {/* Outer Pulsing Glow */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF8DB3] via-[#FFD6E8] to-[#F7D27A] blur-3xl opacity-70 transition-transform duration-1000"
              style={{ transform: `scale(${orbBrightness})` }}
            />

            {/* Central Glass Orb */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full glass-panel flex items-center justify-center border-2 border-white shadow-[0_0_80px_rgba(255,141,179,0.6)] z-10 overflow-visible">
              
              {/* Rotating / Floating Memory Photos around the Orb */}
              {photos.map((photo, index) => {
                const isCollected = index < collectedIndex;
                const angle = (index / photos.length) * 360 + orbBrightness * 45;
                const radius = 100 + (index % 2) * 12; // floating orbit radius
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={photo.id}
                    className={`absolute w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-2xl border-2 border-white transition-all duration-700 ease-out z-20 ${
                      isCollected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px) scale(${isCollected ? 1 : 0.2}) rotate(${index * 15}deg)`
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                );
              })}

              {/* Central Sparkling Heart Core */}
              <div className="flex flex-col items-center justify-center text-center p-4 z-30">
                <Heart className="w-12 h-12 text-[#E75480] fill-[#FF8DB3] animate-bounce mb-1 drop-shadow-md" />
                <Sparkles className="w-7 h-7 text-[#F7D27A] animate-spin" />
              </div>
            </div>
          </div>

          {/* Collection Counter & Status */}
          <div className="text-center space-y-3 z-30">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#FFB8D1] shadow-sm text-xs font-body text-[#E75480] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#F7D27A]" />
              
            </div>
            
            <h2 className="font-title text-3xl sm:text-4xl text-[#E75480] block transition-all duration-500">
              {statusText}
            </h2>
            <p className="font-body text-xs text-[#888888]">
              {STORY_CONFIG.recipientName} & {STORY_CONFIG.senderName}'s Story
            </p>
          </div>
        </div>
      ) : (
        /* Exploding Memory Burst Transition */
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#FF8DB3] via-[#E75480] to-[#F7D27A] animate-ping opacity-90 blur-3xl" />
        </div>
      )}
    </section>
  );
};

