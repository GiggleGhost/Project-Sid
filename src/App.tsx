import React, { useState, useEffect } from 'react';
import { AmbientCanvas } from './components/AmbientCanvas';
import { CustomCursor } from './components/CustomCursor';
import { MusicPlayer } from './components/MusicPlayer';
import { HiddenSecret } from './components/chapters/HiddenSecret';

import { Chapter1Password } from './components/chapters/Chapter1Password';
import { Chapter2MemoryOrb } from './components/chapters/Chapter2MemoryOrb';
import { Chapter3Hero } from './components/chapters/Chapter3Hero';
import { Chapter4LoveLetter } from './components/chapters/Chapter4LoveLetter';
import { Chapter5Timeline } from './components/chapters/Chapter5Timeline';
import { Chapter6Gallery } from './components/chapters/Chapter6Gallery';
import { Chapter7Reasons } from './components/chapters/Chapter7Reasons';
import { Chapter8BucketList } from './components/chapters/Chapter8BucketList';
import { Chapter9Quiz } from './components/chapters/Chapter9Quiz';
import { Chapter10ScratchCard } from './components/chapters/Chapter10ScratchCard';
import { Chapter12GiftBox } from './components/chapters/Chapter12GiftBox';
import { Chapter13Ending } from './components/chapters/Chapter13Ending';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showOrb, setShowOrb] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [fireworksActive, setFireworksActive] = useState(false);

  // Background Gradient Evolution based on active chapter
  // 1-3: Pink Sunrise
  // 4-6: Pastel Sunset
  // 7-9: Golden Evening
  // 10-13: Magical Starry Night
  const getBgStyle = () => {
    if (currentChapter <= 3) {
      return "bg-gradient-to-b from-[#FFF8FC] via-[#FFEBF3] to-[#FFD6E8]";
    } else if (currentChapter <= 6) {
      return "bg-gradient-to-b from-[#FFEBF3] via-[#FFD1E1] to-[#FFB8D1]";
    } else if (currentChapter <= 9) {
      return "bg-gradient-to-b from-[#FFF3E0] via-[#FFE4EC] to-[#FFD8E4]";
    } else {
      return "bg-gradient-to-b from-[#1A0B1A] via-[#2D122D] to-[#0E050E] text-white";
    }
  };

  useEffect(() => {
    if (!isUnlocked) return;

    const handleScroll = () => {
      const chapters = Array.from({ length: 13 }, (_, i) => i + 1);
      for (const ch of chapters) {
        const el = document.getElementById(`chapter-${ch}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
            setCurrentChapter(ch);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnlocked]);

  const handlePasswordUnlocked = () => {
    setShowOrb(true);
    setCurrentChapter(2);
  };

  const handleOrbComplete = () => {
    setShowOrb(false);
    setIsUnlocked(true);
    setCurrentChapter(3);

    setTimeout(() => {
      const heroEl = document.getElementById('chapter-3');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleTriggerFireworks = () => {
    setFireworksActive(true);
    setTimeout(() => setFireworksActive(false), 3000);
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-1000 ${getBgStyle()}`}>
      {/* Ambient Canvas Effects (Petals, Sparkles, Fireflies, Fireworks) */}
      <AmbientCanvas chapter={currentChapter} fireworksActive={fireworksActive} />

      {/* Desktop Heart Cursor */}
      <CustomCursor />

      {/* Floating Ambient Music & Sound Bar */}
      <MusicPlayer />

      {/* Hidden Secret Heart Trigger */}
      <HiddenSecret />

      {/* Main Chapter Storybook Content */}
      <main className="relative z-20">
        {!isUnlocked && !showOrb && (
          <Chapter1Password onUnlocked={handlePasswordUnlocked} />
        )}

        {showOrb && (
          <Chapter2MemoryOrb onComplete={handleOrbComplete} />
        )}

        {isUnlocked && (
          <div className="space-y-12">
            <Chapter3Hero />
            <Chapter4LoveLetter />
            <Chapter5Timeline />
            <Chapter6Gallery />
            <Chapter7Reasons />
            <Chapter8BucketList />
            <Chapter9Quiz />
            <Chapter10ScratchCard />
            <Chapter12GiftBox />
            <Chapter13Ending onTriggerFireworks={handleTriggerFireworks} />
          </div>
        )}
      </main>
    </div>
  );
}
