import React, { useState } from 'react';
import { CheckCircle2, Circle, Sparkles, Heart, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORY_CONFIG } from '../../config';
import { TurnPageButton } from '../TurnPageButton';
import { sounds } from '../../utils/sound';

export const Chapter8BucketList: React.FC = () => {
  const [items, setItems] = useState(STORY_CONFIG.bucketList);

  const toggleItem = (id: string) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextState = !item.completed;
          if (nextState) {
            sounds.playPop();
            sounds.playSparkle();
            // Trigger heart confetti
            confetti({
              particleCount: 25,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#FF8DB3', '#E75480', '#F7D27A', '#FFD6E8']
            });
          }
          return { ...item, completed: nextState };
        }
        return item;
      })
    );
  };

  const completedCount = items.filter(i => i.completed).length;

  return (
    <section id="chapter-8" className="min-h-screen flex flex-col justify-between p-6 py-16 relative z-20">
      <div className="max-w-3xl mx-auto w-full">
        
        {/* Chapter Header */}
        <div className="text-center mb-10">
          <span className="font-title text-3xl sm:text-4xl text-[#E75480] block">Chapter VIII</span>
          <h2 className="font-heading text-2xl sm:text-4xl font-semibold text-[#444444]">Our Future Bucket List</h2>
          <p className="font-body text-xs sm:text-sm text-[#888888] mt-2 flex items-center justify-center gap-1">
            <Compass className="w-4 h-4 text-[#E75480]" /> Dream adventures for Siddikuna & Maha
          </p>

          {/* Progress Tracker */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD6E8]/60 text-xs font-semibold text-[#E75480]">
            <Heart className="w-3.5 h-3.5 fill-[#E75480]" />
            <span>{completedCount} of {items.length} Dreams Marked</span>
          </div>
        </div>

        {/* List Items */}
        <div className="space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`interactive glass-panel p-5 rounded-2xl flex items-center justify-between gap-4 cursor-pointer border transition-all duration-300 ${
                item.completed
                  ? 'border-[#E75480] bg-white/90 shadow-md'
                  : 'border-[#FFD6E8] hover:border-[#FF8DB3] shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <button className="text-[#E75480] hover:scale-110 transition-transform">
                  {item.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-[#E75480] fill-[#FFD6E8]" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#FF8DB3]" />
                  )}
                </button>

                <div>
                  <p
                    className={`font-body text-sm sm:text-base font-medium transition-colors ${
                      item.completed ? 'line-through text-[#888888]' : 'text-[#444444]'
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FFF8FC] text-[10px] font-semibold text-[#E75480] border border-[#FFD6E8]">
                  {item.category}
                </span>
                {item.completed && <Sparkles className="w-4 h-4 text-[#F7D27A] animate-spin" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TurnPageButton targetChapterId="chapter-9" label="Turn to Our Quiz ❤️" />
    </section>
  );
};
