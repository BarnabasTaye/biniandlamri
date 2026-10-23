import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const EthiopianCustomsFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the recommended dress code?',
      a: 'We would love to see our guests in formal wedding attire or traditional Ethiopian dress! Gentlemen typically wear sharp suits or Ethiopian traditional embroidered shirts. Ladies are encouraged to wear elegant evening gowns or traditional Ethiopian cotton dresses (Habesha Kemis / Tilf) with beautiful Netela shawls.',
    },
    {
      q: 'What should I expect during the church ceremony at Gerji Muluwengel?',
      a: 'The service begins with uplifting gospel praise and worship, followed by the pastoral message, sacred vows, and ring exchange. Guests are asked to be seated inside by 2:15 PM so that worship and the bridal processional can commence at 2:30 PM without distraction.',
    },
    {
      q: 'Are children invited to attend?',
      a: 'Yes, children and families are warmly cherished. Please indicate the total number of guests, including children, on your RSVP so that adequate table seating and children’s meal arrangements are properly prepared.',
    },
    {
      q: 'Is there parking available at both Gerji Muluwengel Church and The Glasshouse?',
      a: 'Yes, both locations offer guarded on-site parking for wedding guests. Valet attendants and parking guides will assist drivers upon arrival at The Glasshouse in Kazanchis.',
    },
    {
      q: 'What will the weather in Addis Ababa be like on November 14?',
      a: 'November is one of the most beautiful months in Addis Ababa (the dry season / Bega). Daytime temperatures are pleasantly warm and sunny (~22°C to 24°C / 72°F–75°F). After sunset, Addis cools down to around 12°C (54°F), so carrying a light jacket, suit coat, or traditional wrap/shawl for the evening reception is advised.',
    },
    {
      q: 'Is there an official wedding hashtag?',
      a: 'Yes! Please tag all your photos, videos, and joyous memories with #BiniAndLami2026 so the couple can look back on every perspective of this special day.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B68D40] font-sans font-medium mb-1">
            Guest Information
          </p>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1B382B]">Q &amp; A</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[#B68D40]">
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
            <span className="text-sm">✦ ✦ ✦</span>
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
          </div>
          <p className="text-xs sm:text-sm text-[#526458] font-sans mt-3 max-w-md mx-auto">
            Everything you need to know to prepare for our wedding day in Addis Ababa.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-white border border-[#E5DCC8] rounded-xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-lg text-[#1B382B] hover:text-[#B68D40] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B68D40] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-[#4A5D52] font-sans leading-relaxed border-t border-[#E5DCC8]/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
