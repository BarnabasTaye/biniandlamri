import React, { useState } from 'react';
import { Copy, Check, Heart, Building, Smartphone, Globe } from 'lucide-react';

export const RegistrySection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section id="details" className="py-16 md:py-24 bg-white border-y border-[#E5DCC8]/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B68D40] font-sans font-medium mb-1">
            Gifts &amp; Wishing Well
          </p>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1B382B]">Registry &amp; Blessing</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[#B68D40]">
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
            <span className="text-sm">✦ ✦ ✦</span>
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
          </div>
          <p className="text-xs sm:text-sm text-[#526458] font-sans mt-3 max-w-lg mx-auto">
            Your presence, love, and prayers on our wedding day are the greatest gifts we could ever ask for.
            For friends and family who have kindly inquired about wedding gifts and honoring the traditional Ethiopian wishing well (&ldquo;Enkopa&rdquo;):
          </p>
        </div>

        {/* Gift Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Option 1: Commercial Bank of Ethiopia (CBE) */}
          <div className="bg-[#FAF7F2] border border-[#E5DCC8] rounded-xs p-6 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-full bg-[#1B382B]/10 flex items-center justify-center text-[#1B382B] mb-4">
                <Building className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-sans uppercase tracking-widest text-[#B68D40] font-semibold mb-1">
                Local Bank Transfer
              </p>
              <h3 className="font-serif text-lg font-medium text-[#1B382B] mb-1">
                Commercial Bank of Ethiopia
              </h3>
              <p className="text-xs text-[#526458] font-sans mb-4">
                Account Name: <strong>Lamirot &amp; Biniyam</strong>
              </p>
              <div className="p-2.5 bg-white border border-[#E5DCC8] rounded-xs font-mono text-xs text-[#1B382B] mb-2">
                1000 4892 7391
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy('100048927391', 'cbe')}
              className="w-full mt-4 py-2 border border-[#B68D40] hover:bg-[#B68D40]/10 text-[#1B382B] text-xs font-sans uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedKey === 'cbe' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#B68D40]" /> Copy Account No.
                </>
              )}
            </button>
          </div>

          {/* Option 2: Telebirr */}
          <div className="bg-[#FAF7F2] border border-[#E5DCC8] rounded-xs p-6 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-full bg-[#1B382B]/10 flex items-center justify-center text-[#1B382B] mb-4">
                <Smartphone className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-sans uppercase tracking-widest text-[#B68D40] font-semibold mb-1">
                Mobile Payment
              </p>
              <h3 className="font-serif text-lg font-medium text-[#1B382B] mb-1">
                Telebirr
              </h3>
              <p className="text-xs text-[#526458] font-sans mb-4">
                Recipient: <strong>Biniyam &amp; Lamirot</strong>
              </p>
              <div className="p-2.5 bg-white border border-[#E5DCC8] rounded-xs font-mono text-xs text-[#1B382B] mb-2">
                +251 911 234 567
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy('+251911234567', 'telebirr')}
              className="w-full mt-4 py-2 border border-[#B68D40] hover:bg-[#B68D40]/10 text-[#1B382B] text-xs font-sans uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedKey === 'telebirr' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#B68D40]" /> Copy Telebirr Number
                </>
              )}
            </button>
          </div>

          {/* Option 3: International Guests / Zelle / PayPal */}
          <div className="bg-[#FAF7F2] border border-[#E5DCC8] rounded-xs p-6 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-full bg-[#1B382B]/10 flex items-center justify-center text-[#1B382B] mb-4">
                <Globe className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-sans uppercase tracking-widest text-[#B68D40] font-semibold mb-1">
                Diaspora / International
              </p>
              <h3 className="font-serif text-lg font-medium text-[#1B382B] mb-1">
                Zelle &amp; Remitly
              </h3>
              <p className="text-xs text-[#526458] font-sans mb-4">
                For friends &amp; family overseas wishing to contribute to the couple’s new beginning.
              </p>
              <div className="p-2.5 bg-white border border-[#E5DCC8] rounded-xs font-mono text-xs text-[#1B382B] mb-2 truncate">
                bini.lami.wedding@gmail.com
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy('bini.lami.wedding@gmail.com', 'intl')}
              className="w-full mt-4 py-2 border border-[#B68D40] hover:bg-[#B68D40]/10 text-[#1B382B] text-xs font-sans uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedKey === 'intl' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#B68D40]" /> Copy Email Address
                </>
              )}
            </button>
          </div>
        </div>

        {/* Traditional Enkopa blessing note */}
        <div className="bg-[#FAF7F2] border border-[#B68D40]/30 rounded-xs p-6 text-center max-w-xl mx-auto">
          <Heart className="w-5 h-5 text-[#B68D40] mx-auto mb-2" />
          <p className="font-serif italic text-base text-[#1B382B]">
            &ldquo;We thank you from the bottom of our hearts for your love, generosity, and prayers as we begin our holy union.&rdquo;
          </p>
          <p className="text-[11px] uppercase tracking-widest text-[#8C6721] font-sans mt-2">
            — Lamirot &amp; Biniyam
          </p>
        </div>
      </div>
    </section>
  );
};
