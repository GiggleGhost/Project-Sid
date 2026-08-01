import React from 'react';
import { Calendar, MapPin, Sparkles, Heart } from 'lucide-react';
import { STORY_CONFIG } from '../../config';
import { TurnPageButton } from '../TurnPageButton';
import { formatImageUrl } from '../../utils/imageUtils';

export const Chapter5Timeline: React.FC = () => {
  return (
    <section id="chapter-5" className="min-h-screen flex flex-col justify-between p-6 py-16 relative z-20">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Chapter Header */}
        <div className="text-center mb-12">
          <span className="font-title text-3xl sm:text-4xl text-[#E75480] block">Chapter V</span>
          <h2 className="font-heading text-2xl sm:text-4xl font-semibold text-[#444444]">Our Relationship Timeline</h2>
          <p className="font-body text-xs sm:text-sm text-[#888888] mt-2">
            Every step with you feels like walking through a fairytale
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-[#FF8DB3]/40 ml-4 sm:ml-32 space-y-12">
          {STORY_CONFIG.timeline.map((item, idx) => (
            <div key={item.id} className="relative pl-8 sm:pl-12 group">
              
              {/* Timeline Heart Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-[#E75480] flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                <Heart className="w-4 h-4 text-[#E75480] fill-[#FF8DB3]" />
              </div>

              {/* Date Badge (Desktop Left) */}
              <div className="hidden sm:block absolute -left-36 top-1.5 w-28 text-right font-heading text-xs font-semibold text-[#E75480]">
                {item.date}
              </div>

              {/* Memory Card */}
              <div className="glass-panel p-6 rounded-3xl border border-[#FFD6E8] shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
                
                {/* Mobile Date */}
                <div className="sm:hidden flex items-center gap-1 text-xs font-semibold text-[#E75480] mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>

                <div className="grid md:grid-cols-5 gap-6 items-center">
                  {/* Photo */}
                  <div className="md:col-span-2 overflow-hidden rounded-2xl shadow-md border border-white/80 h-44">
                    <img
                      src={formatImageUrl(item.imageUrl)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="md:col-span-3 space-y-3">
                    {item.badge && (
                      <span className="inline-block px-3 py-1 rounded-full bg-[#FFD6E8]/60 text-[10px] font-semibold text-[#E75480]">
                        {item.badge}
                      </span>
                    )}

                    <h3 className="font-heading text-xl font-semibold text-[#444444] flex items-center gap-2">
                      {item.title}
                      <Sparkles className="w-4 h-4 text-[#F7D27A]" />
                    </h3>

                    {item.location && (
                      <div className="flex items-center gap-1 text-xs text-[#888888] font-body">
                        <MapPin className="w-3.5 h-3.5 text-[#E75480]" />
                        <span>{item.location}</span>
                      </div>
                    )}

                    <p className="font-body text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TurnPageButton targetChapterId="chapter-6" label="Turn to Photo Gallery ❤️" />
    </section>
  );
};
