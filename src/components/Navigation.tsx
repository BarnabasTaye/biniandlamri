import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth.ts';

export const Navigation: React.FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleAudio = () => {
    const nextState = ambientAudio.toggle();
    setIsAudioPlaying(nextState);
  };

  const navLinks = [
    { label: 'Invitation', href: '#invitation' },
    { label: 'The Day', href: '#schedule' },
    { label: 'Venues', href: '#venues' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Guestbook', href: '#guestbook' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#152B20]/95 backdrop-blur-md shadow-md py-3 text-[#FAF7F2] border-b border-[#B68D40]/20'
            : 'bg-[#1A382B] py-4 text-[#FAF7F2]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: B&L logo mark */}
          <a
            href="#top"
            aria-label="Biniyam & Lamirot"
            className="font-serif text-2xl md:text-3xl tracking-[0.12em] text-[#FAF7F2] hover:text-[#D6B368] transition-colors whitespace-nowrap shrink-0"
          >
            B<span className="text-[#D6B368]">&amp;</span>L
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-sans font-medium text-[#FAF7F2]/85">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#D6B368] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D6B368]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + subtle ambient toggles */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Ambient Harp toggle */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`hidden sm:flex p-2 rounded-full border transition-all duration-200 text-xs items-center justify-center ${
                isAudioPlaying
                  ? 'border-[#D6B368] bg-[#D6B368]/20 text-[#D6B368]'
                  : 'border-[#FAF7F2]/20 hover:border-[#FAF7F2]/50 text-[#FAF7F2]/75 hover:text-[#FAF7F2]'
              }`}
              title={isAudioPlaying ? 'Mute ambient melody' : 'Play peaceful wedding chime melody'}
              aria-label="Toggle ambient wedding melody"
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Primary CTA */}
            <a
              href="#schedule"
              className="hidden sm:inline-block px-4 py-2 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[#152B20] bg-[#D6B368] hover:bg-[#E8C882] rounded-xs transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              View Program
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#FAF7F2] hover:text-[#D6B368]"
              aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden absolute inset-x-0 top-full z-50 bg-[#152B20] border-b border-[#B68D40]/30 shadow-2xl py-6 px-6 flex flex-col gap-4 text-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.2em] font-sans text-[#FAF7F2]/90 hover:text-[#D6B368] py-2 border-b border-[#FAF7F2]/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 py-3 bg-[#D6B368] text-[#152B20] font-sans font-bold uppercase tracking-widest text-xs rounded-xs"
            >
              View the Program
            </a>
          </div>
        )}
      </header>
    </>
  );
};
