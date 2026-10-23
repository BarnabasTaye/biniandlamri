import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Upload, Check } from 'lucide-react';
import { WEDDING_DATE } from '../data/weddingData.ts';

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [heroImage, setHeroImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('lb_wedding_hero_image') || null;
    } catch {
      return null;
    }
  });

  const [calDropdownOpen, setCalDropdownOpen] = useState(false);
  const [photoUploadedToast, setPhotoUploadedToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const target = WEDDING_DATE.getTime();
      const difference = Math.max(0, target - now);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleHeroPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setHeroImage(result);
      try {
        localStorage.setItem('lb_wedding_hero_image', result);
      } catch {
        // LocalStorage quota fallback
      }
      setPhotoUploadedToast(true);
      setTimeout(() => setPhotoUploadedToast(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleResetHero = () => {
    setHeroImage(null);
    try {
      localStorage.removeItem('lb_wedding_hero_image');
    } catch {
      // Storage unavailable
    }
  };

  // Google Calendar URL generator
  const googleCalUrl = () => {
    const title = encodeURIComponent('Lamirot & Biniyam Wedding');
    const details = encodeURIComponent(
      'Holy Matrimony at Gerji Muluwengel Church (2:30 PM), followed by Dinner & Celebration at The Glasshouse, Kazanchis (seated by 6:00 PM). Addis Ababa, Ethiopia.'
    );
    const location = encodeURIComponent('Gerji Muluwengel Church & The Glasshouse, Addis Ababa, Ethiopia');
    // 2026-11-14 14:30 Addis time (UTC+3) -> UTC 11:30
    const startIso = '20261114T113000Z';
    const endIso = '20261114T200000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  // ICS file download generator
  const downloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lamirot & Biniyam Wedding//EN',
      'BEGIN:VEVENT',
      'UID:wedding-lamirot-biniyam-2026@addis',
      'DTSTAMP:20261022T000000Z',
      'DTSTART:20261114T113000Z',
      'DTEND:20261114T200000Z',
      'SUMMARY:Lamirot & Biniyam Wedding Ceremony & Dinner',
      'DESCRIPTION:Holy Matrimony at Gerji Muluwengel Church (2:30 PM), followed by dinner at The Glasshouse (seated by 6:00 PM).',
      'LOCATION:Addis Ababa, Ethiopia',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Lamirot-and-Biniyam-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCalDropdownOpen(false);
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#162F24] via-[#1B382B] to-[#12241C] text-[#FAF7F2] pt-14 pb-20 md:pt-20 md:pb-28"
    >
      {/* Subtle background ornamentation */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D6B368_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Arch Monogram / Couple Portrait */}
        <div className="relative mx-auto mb-8 w-44 h-60 sm:w-52 sm:h-72 rounded-t-[100px] rounded-b-2xl p-2 border-2 border-[#D6B368]/80 shadow-[0_0_0_8px_rgba(214,179,104,0.15),0_20px_40px_rgba(0,0,0,0.5)] animate-gentle-float group">
          <div className="w-full h-full rounded-t-[92px] rounded-b-xl overflow-hidden bg-gradient-to-br from-[#244737] to-[#12241C] flex flex-col items-center justify-center relative">
            {heroImage ? (
              <img
                src={heroImage}
                alt="Lamirot & Biniyam"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4">
                <span className="text-[#D6B368] text-xs font-sans uppercase tracking-[0.25em] mb-1 opacity-80">
                  Holy Covenant
                </span>
                <span className="font-serif italic text-4xl sm:text-5xl text-[#FAF7F2] leading-tight">
                  B <br />
                  <span className="text-[#D6B368] text-2xl font-normal">&amp;</span>
                  <br /> L
                </span>
                <span className="text-[10px] text-[#FAF7F2]/60 uppercase tracking-widest mt-2 font-sans">
                  Addis Ababa
                </span>
              </div>
            )}

            {/* Quick photo upload button on hover for personalization */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-[#D6B368] text-[#152B20] text-xs font-semibold rounded uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Upload className="w-3.5 h-3.5" />
                {heroImage ? 'Change Photo' : 'Add Photo'}
              </button>
              {heroImage && (
                <button
                  type="button"
                  onClick={handleResetHero}
                  className="text-[11px] text-[#FAF7F2]/80 hover:text-white underline"
                >
                  Reset Monogram
                </button>
              )}
            </div>
          </div>

          {/* Decorative Floral Accents */}
          <span
            className="absolute -top-3 -left-3 text-2xl select-none"
            aria-hidden="true"
          >
            🌸
          </span>
          <span
            className="absolute -bottom-2 -right-2 text-2xl select-none"
            aria-hidden="true"
          >
            🌿
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleHeroPhotoUpload}
          className="hidden"
          aria-label="Upload custom couple hero portrait"
        />

        {photoUploadedToast && (
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#D6B368]/20 border border-[#D6B368] text-[#D6B368] text-xs rounded-full">
            <Check className="w-3.5 h-3.5" /> Portrait updated beautifully!
          </div>
        )}

        {/* Header Kicker */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#D6B368] font-sans font-medium mb-3">
          Together with their families
        </p>

        {/* Hero Title */}
        <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] mb-4 text-[#FAF7F2] text-balance">
          Lamirot <span className="text-[#D6B368] not-italic">&amp;</span> Biniyam
        </h1>

        {/* Date and Location */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base text-[#FAF7F2]/90 font-sans tracking-wide mb-8">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#D6B368]" />
            <span>Saturday · November 14, 2026</span>
          </div>
          <span className="hidden sm:inline text-[#D6B368]/60" aria-hidden="true">
            ·
          </span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D6B368]" />
            <span>Addis Ababa, Ethiopia</span>
          </div>
        </div>

        {/* Live Countdown Clock */}
        <div className="max-w-xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[#FAF7F2]/70 mb-4 font-sans">
            Counting Down to Holy Matrimony
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-md bg-[#FAF7F2]/5 border border-[#D6B368]/40 backdrop-blur-xs">
              <span className="block font-serif text-2xl sm:text-4xl text-[#FAF7F2] tabular-nums font-normal">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D6B368] font-sans">
                Days
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-md bg-[#FAF7F2]/5 border border-[#D6B368]/40 backdrop-blur-xs">
              <span className="block font-serif text-2xl sm:text-4xl text-[#FAF7F2] tabular-nums font-normal">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D6B368] font-sans">
                Hours
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-md bg-[#FAF7F2]/5 border border-[#D6B368]/40 backdrop-blur-xs">
              <span className="block font-serif text-2xl sm:text-4xl text-[#FAF7F2] tabular-nums font-normal">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D6B368] font-sans">
                Mins
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-md bg-[#FAF7F2]/5 border border-[#D6B368]/40 backdrop-blur-xs">
              <span className="block font-serif text-2xl sm:text-4xl text-[#FAF7F2] tabular-nums font-normal">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D6B368] font-sans">
                Secs
              </span>
            </div>
          </div>
        </div>

        {/* Call to Actions: RSVP & Calendar dropdown */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative">
          <a
            href="#rsvp"
            className="px-8 py-3.5 bg-[#D6B368] hover:bg-[#E2C278] text-[#152B20] text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.2em] rounded-xs shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Kindly RSVP
          </a>

          <div className="relative">
            <button
              type="button"
              onClick={() => setCalDropdownOpen(!calDropdownOpen)}
              className="px-6 py-3.5 bg-transparent border border-[#D6B368] hover:bg-[#D6B368]/10 text-[#FAF7F2] text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.18em] rounded-xs transition-colors flex items-center gap-2"
              aria-expanded={calDropdownOpen}
            >
              <Calendar className="w-4 h-4 text-[#D6B368]" />
              Save Date
            </button>

            {calDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-52 bg-[#1B382B] border border-[#D6B368]/50 rounded shadow-2xl py-2 z-50 text-left">
                <a
                  href={googleCalUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCalDropdownOpen(false)}
                  className="block px-4 py-2 text-xs text-[#FAF7F2] hover:bg-[#D6B368]/20 hover:text-[#D6B368] transition-colors"
                >
                  Google Calendar
                </a>
                <button
                  type="button"
                  onClick={downloadIcs}
                  className="w-full text-left block px-4 py-2 text-xs text-[#FAF7F2] hover:bg-[#D6B368]/20 hover:text-[#D6B368] transition-colors"
                >
                  Apple / Outlook (.ICS)
                </button>
              </div>
            )}
          </div>

          <a
            href="#schedule"
            className="text-xs uppercase tracking-widest text-[#FAF7F2]/80 hover:text-[#D6B368] underline underline-offset-4 py-2"
          >
            Explore Order of Events
          </a>
        </div>
      </div>
    </section>
  );
};
