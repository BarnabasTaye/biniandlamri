import React from 'react';
import { MapPin, Navigation, Car, Clock, ShieldCheck } from 'lucide-react';

export const VenuesSection: React.FC = () => {
  return (
    <section id="venues" className="py-16 md:py-24 bg-white border-y border-[#E5DCC8]/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B68D40] font-sans font-medium mb-1">
            Locations &amp; Logistics
          </p>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1B382B]">The Venues</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[#B68D40]">
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
            <span className="text-sm">✦ ✦ ✦</span>
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
          </div>
          <p className="text-xs sm:text-sm text-[#526458] font-sans mt-3 max-w-lg mx-auto">
            Both venues are centrally located in Addis Ababa with ample security and parking.
          </p>
        </div>

        {/* Two Venue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Ceremony: Gerji Muluwengel Church */}
          <div className="bg-[#FAF7F2] border border-[#E5DCC8] rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#B68D40]/60 transition-colors">
            <div className="p-8">
              <div className="flex items-center justify-between text-xs font-sans uppercase tracking-widest text-[#B68D40] mb-2 font-semibold">
                <span>Sacred Matrimony</span>
                <span>2:30 – 5:00 PM</span>
              </div>
              <h3 className="font-serif italic text-3xl text-[#1B382B] mb-2">
                Gerji Muluwengel Church
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#526458] font-sans mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#B68D40]" />
                <span>Gerji Sub-City, Addis Ababa, Ethiopia</span>
              </div>

              <p className="text-xs sm:text-sm text-[#4A5D52] font-sans leading-relaxed mb-6">
                Where Lamirot &amp; Biniyam will make their vows before God and their community.
                Please plan to be seated inside the main sanctuary by 2:15 PM so the processional can begin promptly at 2:30 PM.
              </p>

              <div className="space-y-2 pt-4 border-t border-[#E5DCC8] text-xs text-[#6B766F] font-sans">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#B68D40]" />
                  <span>Ceremony starts at 2:30 PM (8:30 Ethiopian Time)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B68D40]" />
                  <span>Designated church parking available for guests</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-[#E5DCC8] flex items-center justify-between">
              <span className="text-xs text-[#8C6721] font-sans">Coordinates: Addis Ababa</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Gerji+Muluwengel+Church+Addis+Ababa"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1B382B] hover:bg-[#254A39] text-[#FAF7F2] text-xs font-sans font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#D6B368]" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Dinner: The Glasshouse */}
          <div className="bg-[#FAF7F2] border border-[#E5DCC8] rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#B68D40]/60 transition-colors">
            <div className="p-8">
              <div className="flex items-center justify-between text-xs font-sans uppercase tracking-widest text-[#B68D40] mb-2 font-semibold">
                <span>Banquet &amp; Fellowship</span>
                <span>Seated by 6:00 PM</span>
              </div>
              <h3 className="font-serif italic text-3xl text-[#1B382B] mb-2">
                The Glasshouse
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#526458] font-sans mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#B68D40]" />
                <span>Kazanchis District, Addis Ababa, Ethiopia</span>
              </div>

              <p className="text-xs sm:text-sm text-[#4A5D52] font-sans leading-relaxed mb-6">
                An evening of celebratory dining, speeches, cake cutting, and worship in the heart of Kazanchis.
                Please ensure you arrive by 6:00 PM for registration, greeting, and banquet table seating.
              </p>

              <div className="space-y-2 pt-4 border-t border-[#E5DCC8] text-xs text-[#6B766F] font-sans">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#B68D40]" />
                  <span>Couple entrance at 6:30 PM sharp (12:30 Ethiopian Time)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-[#B68D40]" />
                  <span>Valet &amp; venue parking attendants on site</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-[#E5DCC8] flex items-center justify-between">
              <span className="text-xs text-[#8C6721] font-sans">Coordinates: Kazanchis, Addis</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=The+Glasshouse+Kazanchis+Addis+Ababa"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1B382B] hover:bg-[#254A39] text-[#FAF7F2] text-xs font-sans font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#D6B368]" />
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Travel & Getting Around Guide */}
        <div className="bg-[#FAF7F2] border border-[#E5DCC8] rounded-sm p-6 sm:p-8">
          <h4 className="font-serif italic text-2xl text-[#1B382B] mb-2">
            Guest Transportation &amp; City Guide
          </h4>
          <p className="text-xs text-[#6B766F] font-sans mb-6">
            Helpful pointers for local and international guests traveling between Gerji and Kazanchis:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4A5D52] font-sans">
            <div>
              <p className="font-semibold text-[#1B382B] mb-1">Ride-Hailing Apps</p>
              <p className="leading-relaxed">
                Addis Ababa has convenient ride-hailing services including <strong>Feres</strong>, <strong>Ride</strong>, and <strong>ZayRide</strong>. You can pay via cash or Telebirr upon arrival.
              </p>
            </div>
            <div>
              <p className="font-semibold text-[#1B382B] mb-1">Distance &amp; Traffic</p>
              <p className="leading-relaxed">
                Travel from Gerji to Kazanchis is approximately 20–30 minutes depending on Saturday afternoon traffic. A dedicated convoy window is scheduled between 6:00 and 6:30 PM.
              </p>
            </div>
            <div>
              <p className="font-semibold text-[#1B382B] mb-1">November Weather &amp; Attire</p>
              <p className="leading-relaxed">
                November in Addis offers clear skies and pleasant daytime temperatures (~22°C/72°F). Evenings cool down to ~12°C (54°F), so a shawl, Netela, or evening jacket is recommended.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
