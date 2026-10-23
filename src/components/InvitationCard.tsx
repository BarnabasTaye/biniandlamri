import React from 'react';
import { Heart, Printer, Clock, MapPin } from 'lucide-react';

export const InvitationCard: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="invitation" className="py-16 md:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B68D40] font-sans font-medium mb-1">
            Formal Announcement
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl text-[#1B382B]">The Wedding Invitation</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[#B68D40]">
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
            <span className="text-sm">✦ ✦ ✦</span>
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
          </div>
        </div>

        {/* Digital Stationery Card */}
        <div className="relative mx-auto max-w-2xl bg-white border border-[#B68D40]/50 shadow-[0_10px_35px_rgba(27,56,43,0.06)] rounded-sm p-8 sm:p-14 text-center">
          {/* Inner hairline ornamental border */}
          <div className="absolute inset-3 border border-[#B68D40]/30 pointer-events-none" />

          {/* Top Emblem */}
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 rounded-full border border-[#B68D40]/60 flex items-center justify-center text-[#B68D40]">
              <Heart className="w-4 h-4 fill-[#B68D40]/20" />
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.28em] text-[#8C6721] font-sans font-semibold mb-3">
            In The Name of God
          </p>

          <p className="text-sm sm:text-base text-[#4A5D52] font-sans mb-3">
            Together with their families, you are warmly invited to witness &amp; celebrate the Holy Matrimony of
          </p>

          <h3 className="font-serif italic text-3xl sm:text-5xl text-[#1B382B] my-4 leading-tight">
            Lamirot &amp; Biniyam
          </h3>

          <div className="my-6">
            <span className="inline-block px-4 py-1.5 font-serif text-lg sm:text-xl font-medium tracking-wide text-[#1B382B] border-y border-[#B68D40]/40">
              Saturday, November 14, 2026
            </span>
          </div>

          {/* Ceremony and Dinner specifics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 text-left border-y border-[#E5DCC8] py-6">
            <div className="p-3 bg-[#FAF7F2]/60 rounded-xs">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B68D40] font-sans font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" /> Holy Matrimony
              </div>
              <p className="font-serif text-lg text-[#1B382B] font-semibold leading-snug">
                Gerji Muluwengel Church
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#526458] mt-1 font-sans">
                <Clock className="w-3.5 h-3.5 text-[#B68D40]" />
                <span>2:30 PM (8:30 Ethiopian Time)</span>
              </div>
              <p className="text-xs text-[#6B766F] mt-1">Gerji, Addis Ababa</p>
            </div>

            <div className="p-3 bg-[#FAF7F2]/60 rounded-xs">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B68D40] font-sans font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" /> Wedding Dinner
              </div>
              <p className="font-serif text-lg text-[#1B382B] font-semibold leading-snug">
                The Glasshouse, Kazanchis
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#1B382B] font-medium mt-1 font-sans">
                <Clock className="w-3.5 h-3.5 text-[#B68D40]" />
                <span>Guests seated by 6:00 PM</span>
              </div>
              <p className="text-xs text-[#6B766F] mt-1">Kazanchis, Addis Ababa</p>
            </div>
          </div>

          <p className="font-serif italic text-base sm:text-lg text-[#4A5D52] max-w-lg mx-auto mb-8">
            &ldquo;Therefore what God has joined together, let no one separate.&rdquo;
            <span className="block text-xs uppercase tracking-widest font-sans not-italic text-[#8C6721] mt-1.5">
              Mark 10:9
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#rsvp"
              className="px-6 py-2.5 bg-[#1B382B] hover:bg-[#254A39] text-[#FAF7F2] text-xs font-sans font-semibold uppercase tracking-[0.18em] rounded-xs transition-colors shadow-sm"
            >
              Confirm Your Attendance
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 border border-[#B68D40]/60 hover:border-[#B68D40] text-[#1B382B] hover:bg-[#FAF7F2] text-xs font-sans uppercase tracking-[0.16em] rounded-xs transition-colors flex items-center gap-2"
              title="Print formal invitation card"
            >
              <Printer className="w-3.5 h-3.5 text-[#B68D40]" />
              Print Keepsake
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
