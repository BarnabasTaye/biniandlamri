import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#152B20] text-[#FAF7F2] py-16 px-4 sm:px-6 border-t border-[#B68D40]/30 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Monogram emblem */}
        <div className="w-12 h-12 rounded-full border border-[#D6B368]/60 flex items-center justify-center text-[#D6B368] mx-auto mb-6">
          <Heart className="w-5 h-5 fill-[#D6B368]/20" />
        </div>

        <h3 className="font-serif italic text-3xl sm:text-4xl text-[#FAF7F2] mb-2">
          Lamirot <span className="text-[#D6B368] font-normal not-italic">&amp;</span> Biniyam
        </h3>

        <p className="text-xs uppercase tracking-[0.3em] text-[#D6B368] font-sans mb-4">
          November 14, 2026 · Addis Ababa, Ethiopia
        </p>

        <p className="font-serif italic text-sm sm:text-base text-[#FAF7F2]/80 max-w-lg mx-auto mb-8 leading-relaxed">
          &ldquo;Love is patient, love is kind. It does not envy, it does not boast, it is not proud...
          Love never fails.&rdquo;
          <span className="block text-[11px] uppercase tracking-widest font-sans not-italic text-[#D6B368] mt-1">
            1 Corinthians 13:4, 8
          </span>
        </p>

        {/* Quick nav */}
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest text-[#FAF7F2]/70 font-sans mb-10">
          <a href="#top" className="hover:text-[#D6B368] transition-colors">
            Home
          </a>
          <a href="#story" className="hover:text-[#D6B368] transition-colors">
            Our Story
          </a>
          <a href="#schedule" className="hover:text-[#D6B368] transition-colors">
            Schedule
          </a>
          <a href="#venues" className="hover:text-[#D6B368] transition-colors">
            Venues
          </a>
          <a href="#rsvp" className="hover:text-[#D6B368] transition-colors">
            RSVP
          </a>
          <a href="#guestbook" className="hover:text-[#D6B368] transition-colors">
            Guestbook
          </a>
        </div>

        {/* Back to top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#D6B368]/40 hover:border-[#D6B368] text-xs font-sans uppercase tracking-widest text-[#D6B368] rounded-xs transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" /> Back to Top
        </button>

        <div className="mt-12 pt-6 border-t border-[#FAF7F2]/10 text-[11px] text-[#FAF7F2]/50 font-sans">
          Celebration of Holy Matrimony · Gerji Muluwengel Church &amp; The Glasshouse · With love and gratitude
        </div>
      </div>
    </footer>
  );
};
