import React from 'react';
import { Heart, Sparkles, Compass, Church } from 'lucide-react';

export const TheCouple: React.FC = () => {
  const milestones = [
    {
      year: '2022',
      title: 'The First Hello',
      location: 'Addis Ababa',
      description: 'A chance conversation over warm Ethiopian coffee that turned into hours of shared laughter and instant kindred spirit.',
      icon: Sparkles,
    },
    {
      year: '2024',
      title: 'Adventures & Growth',
      location: 'Across Ethiopia & Beyond',
      description: 'Exploring landscapes, hiking the Entoto ridge, supporting each other through dreams and building a resilient foundation grounded in faith.',
      icon: Compass,
    },
    {
      year: '2025',
      title: 'The Proposal',
      location: 'A Starry Addis Evening',
      description: 'With trembling hands, joyful tears, and a grateful prayer, Bini asked, and Lami said yes with all her heart.',
      icon: Heart,
    },
    {
      year: 'Nov 14, 2026',
      title: 'Holy Matrimony',
      location: 'Gerji Muluwengel Church',
      description: 'The sacred covenant where two lives become one before God, family, and our most cherished friends.',
      icon: Church,
    },
  ];

  return (
    <section id="story" className="py-16 md:py-24 bg-white border-y border-[#E5DCC8]/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B68D40] font-sans font-medium mb-1">
            Two Hearts, One Covenant
          </p>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1B382B]">About Us</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[#B68D40]">
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
            <span className="text-sm">✦ ✦ ✦</span>
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
          </div>
        </div>

        {/* Bride & Groom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Lamirot */}
          <div className="bg-[#FAF7F2] border border-[#E5DCC8] rounded-sm p-8 text-center relative hover:border-[#B68D40]/60 transition-colors">
            <div className="w-24 h-24 rounded-full mx-auto mb-5 bg-gradient-to-tr from-[#1B382B] to-[#34634F] flex items-center justify-center text-[#D6B368] font-serif italic text-3xl shadow-inner border-2 border-[#D6B368]/40">
              L
            </div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#B68D40] font-sans font-semibold mb-1">
              The Bride
            </p>
            <h3 className="font-serif italic text-3xl text-[#1B382B] mb-3">Lamirot</h3>
            <p className="text-sm text-[#4A5D52] font-sans leading-relaxed mb-4">
              Warm, bright, and the heart of every room she walks into. Her kindness touches everyone she meets,
              and her steadfast faith illuminates every step of their journey together.
            </p>
            <div className="pt-3 border-t border-[#E5DCC8]/60 text-xs text-[#6B766F] italic font-serif">
              &ldquo;My heart is steadfast, O God; I will sing and make music with all my soul.&rdquo;
            </div>
          </div>

          {/* Biniyam */}
          <div className="bg-[#FAF7F2] border border-[#E5DCC8] rounded-sm p-8 text-center relative hover:border-[#B68D40]/60 transition-colors">
            <div className="w-24 h-24 rounded-full mx-auto mb-5 bg-gradient-to-tr from-[#1B382B] to-[#34634F] flex items-center justify-center text-[#D6B368] font-serif italic text-3xl shadow-inner border-2 border-[#D6B368]/40">
              B
            </div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#B68D40] font-sans font-semibold mb-1">
              The Groom
            </p>
            <h3 className="font-serif italic text-3xl text-[#1B382B] mb-3">Biniyam</h3>
            <p className="text-sm text-[#4A5D52] font-sans leading-relaxed mb-4">
              Steady, thoughtful, and always ready with a gentle reassuring smile. A man of integrity, dedication,
              and deep loyalty, who loves Lamirot with quiet strength and boundless devotion.
            </p>
            <div className="pt-3 border-t border-[#E5DCC8]/60 text-xs text-[#6B766F] italic font-serif">
              &ldquo;I have found the one whom my soul loves.&rdquo; — Song of Solomon 3:4
            </div>
          </div>
        </div>

        {/* Narrative passage */}
        <div className="max-w-2xl mx-auto text-center mb-16 px-4">
          <p className="font-serif italic text-xl text-[#1B382B] leading-relaxed">
            &ldquo;From the first hello to a lifetime of tomorrows, we are so deeply grateful to share this sacred chapter with the people who have shaped, prayed for, and loved us. Thank you for being an indispensable part of our story.&rdquo;
          </p>
          <p className="text-xs uppercase tracking-widest text-[#B68D40] font-sans font-medium mt-3">
            — Lamirot &amp; Biniyam
          </p>
        </div>

        {/* Milestones Horizontal / Vertical Steps */}
        <div className="relative">
          <div className="text-center mb-8">
            <h4 className="font-serif italic text-2xl text-[#1B382B]">Our Journey So Far</h4>
            <p className="text-xs uppercase tracking-widest text-[#6B766F] font-sans">
              Chapters that brought us to November 14
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="bg-[#FAF7F2] border border-[#E5DCC8] rounded-sm p-6 relative flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-serif font-bold text-[#B68D40] tracking-wider">
                        {m.year}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#1B382B]/10 flex items-center justify-center text-[#1B382B]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h5 className="font-serif text-lg font-medium text-[#1B382B] mb-1">{m.title}</h5>
                    <p className="text-[11px] text-[#B68D40] font-sans uppercase tracking-wider mb-2">
                      {m.location}
                    </p>
                    <p className="text-xs text-[#526458] font-sans leading-relaxed">{m.description}</p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-[#E5DCC8]/60 text-[10px] text-[#6B766F] font-sans uppercase tracking-widest">
                    Step {idx + 1} of 4
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
