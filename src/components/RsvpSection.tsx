import React, { useState, useEffect } from 'react';
import { CheckCircle2, Download, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_RSVPS, RsvpEntry } from '../data/weddingData.ts';

export const RsvpSection: React.FC = () => {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>(() => {
    try {
      const stored = localStorage.getItem('lb_wedding_rsvps');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_RSVPS;
  });

  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guests, setGuests] = useState<number>(1);
  const [dietary, setDietary] = useState('Standard Ethiopian');
  const [message, setMessage] = useState('');

  const [submittedEntry, setSubmittedEntry] = useState<RsvpEntry | null>(() => {
    try {
      const myRsvp = localStorage.getItem('lb_wedding_my_rsvp');
      if (myRsvp) {
        const parsed = JSON.parse(myRsvp);
        if (parsed && typeof parsed === 'object' && typeof parsed.name === 'string') {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return null;
  });

  // Bridal portal state
  const [showPortal, setShowPortal] = useState(false);
  const [portalPasscode, setPortalPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [portalSearch, setPortalSearch] = useState('');
  const [portalError, setPortalError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('lb_wedding_rsvps', JSON.stringify(rsvps));
    } catch {
      // ignore
    }
  }, [rsvps]);

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const entry: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      name: fullName.trim(),
      contact: contact.trim(),
      attending,
      guests: attending === 'yes' ? guests : 0,
      dietary: attending === 'yes' ? dietary : 'N/A',
      message: message.trim(),
      timestamp: Date.now(),
    };

    setRsvps((prev) => [entry, ...prev.filter((r) => r.name.toLowerCase() !== entry.name.toLowerCase())]);
    setSubmittedEntry(entry);
    try {
      localStorage.setItem('lb_wedding_my_rsvp', JSON.stringify(entry));
    } catch {
      // Storage unavailable; the RSVP is still kept in memory for this session
    }

    if (attending === 'yes') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#D6B368', '#1B382B', '#E8C882', '#FFFFFF'],
      });
    }
  };

  const handleEditRsvp = () => {
    if (submittedEntry) {
      setFullName(submittedEntry.name);
      setContact(submittedEntry.contact);
      setAttending(submittedEntry.attending);
      setGuests(submittedEntry.guests || 1);
      setDietary(submittedEntry.dietary || 'Standard Ethiopian');
      setMessage(submittedEntry.message || '');
      setSubmittedEntry(null);
    }
  };

  const handleUnlockPortal = (e: React.FormEvent) => {
    e.preventDefault();
    // Couple quick access passcode "bini&lami" or "2026"
    if (portalPasscode.trim().toLowerCase() === 'bini&lami' || portalPasscode.trim() === '2026') {
      setIsUnlocked(true);
      setPortalError('');
    } else {
      setPortalError('Incorrect bridal passcode. Try "2026"');
    }
  };

  const exportRsvpsToCsv = () => {
    const csvCell = (value: string | number) => {
      const text = String(value ?? '');
      const safe = /^[=+\-@]/.test(text) ? `'${text}` : text;
      return `"${safe.replace(/"/g, '""')}"`;
    };

    const headers = ['Name', 'Attendance', 'Guests Count', 'Contact', 'Dietary Preference', 'Note / Song Request', 'Submitted Date'];
    const rows = rsvps.map((r) => [
      csvCell(r.name),
      r.attending === 'yes' ? 'Attending' : 'Declined',
      r.guests,
      csvCell(r.contact || ''),
      csvCell(r.dietary || ''),
      csvCell(r.message || ''),
      csvCell(new Date(r.timestamp).toLocaleDateString()),
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Lamirot-and-Biniyam-Wedding-RSVPs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalAttending = rsvps
    .filter((r) => r.attending === 'yes')
    .reduce((sum, r) => sum + (Number(r.guests) || 1), 0);

  const totalResponses = rsvps.length;
  const totalDeclined = rsvps.filter((r) => r.attending === 'no').length;

  return (
    <section id="rsvp" className="py-16 md:py-24 bg-white border-y border-[#E5DCC8]/60 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B68D40] font-sans font-medium mb-1">
            Celebration of Covenant
          </p>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1B382B]">Kindly RSVP</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[#B68D40]">
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
            <span className="text-sm">✦ ✦ ✦</span>
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
          </div>
          <p className="text-xs sm:text-sm text-[#526458] font-sans mt-3 max-w-md mx-auto">
            Please let us know if you will be celebrating with us in Addis Ababa on November 14, 2026.
          </p>
        </div>

        {/* If already submitted confirmation */}
        {submittedEntry ? (
          <div className="bg-[#FAF7F2] border border-[#B68D40]/60 rounded-sm p-8 sm:p-12 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#1B382B] text-[#D6B368] mx-auto mb-5 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-serif italic text-3xl text-[#1B382B] mb-2">
              {submittedEntry.attending === 'yes' ? 'We Can’t Wait to Celebrate!' : 'Thank You for Letting Us Know'}
            </h3>

            <p className="text-sm text-[#4A5D52] font-sans max-w-md mx-auto mb-6">
              {submittedEntry.attending === 'yes'
                ? `Thank you, ${submittedEntry.name}! Your RSVP has been confirmed for ${submittedEntry.guests} ${
                    submittedEntry.guests === 1 ? 'guest' : 'guests'
                  }. We look forward to seeing you at Gerji Muluwengel Church and The Glasshouse!`
                : `We will truly miss your presence, ${submittedEntry.name}, but thank you deeply for your prayers and warm wishes.`}
            </p>

            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-sans">
              <button
                type="button"
                onClick={handleEditRsvp}
                className="px-5 py-2.5 border border-[#B68D40] text-[#1B382B] hover:bg-white rounded-xs uppercase tracking-wider"
              >
                Modify My RSVP
              </button>
              <a
                href="#schedule"
                className="px-5 py-2.5 bg-[#1B382B] text-white hover:bg-[#254A39] rounded-xs uppercase tracking-wider font-semibold"
              >
                View Wedding Itinerary
              </a>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <div className="bg-[#FAF7F2] border border-[#E5DCC8] rounded-sm p-6 sm:p-10 shadow-xs">
            <form onSubmit={handleSubmitRsvp} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-2">
                  Your Full Name <span className="text-[#B68D40]">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Selamawit Bekele"
                  className="w-full px-4 py-3 bg-white border border-[#E5DCC8] rounded-xs text-sm font-sans text-[#1B382B] focus:outline-none focus:border-[#B68D40]"
                />
              </div>

              {/* Contact Email or Phone */}
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-2">
                  Email Address or Phone Number
                </label>
                <input
                  type="text"
                  maxLength={80}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. +251 911 000 000 or name@example.com"
                  className="w-full px-4 py-3 bg-white border border-[#E5DCC8] rounded-xs text-sm font-sans text-[#1B382B] focus:outline-none focus:border-[#B68D40]"
                />
                <p className="text-[11px] text-[#6B766F] font-sans mt-1">
                  We will only use this for wedding logistics updates and seating details.
                </p>
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-2">
                  Will You Be Attending? <span className="text-[#B68D40]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 p-3.5 border rounded-xs cursor-pointer transition-colors ${
                      attending === 'yes'
                        ? 'border-[#B68D40] bg-white text-[#1B382B] shadow-xs'
                        : 'border-[#E5DCC8] bg-[#FAF7F2]/60 text-[#526458]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending === 'yes'}
                      onChange={() => setAttending('yes')}
                      className="accent-[#B68D40]"
                    />
                    <span className="font-serif text-base font-medium">Joyfully Accepts</span>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3.5 border rounded-xs cursor-pointer transition-colors ${
                      attending === 'no'
                        ? 'border-[#B68D40] bg-white text-[#1B382B] shadow-xs'
                        : 'border-[#E5DCC8] bg-[#FAF7F2]/60 text-[#526458]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={attending === 'no'}
                      onChange={() => setAttending('no')}
                      className="accent-[#B68D40]"
                    />
                    <span className="font-serif text-base font-medium">Regretfully Declines</span>
                  </label>
                </div>
              </div>

              {/* Additional Details if Attending */}
              {attending === 'yes' && (
                <div className="space-y-6 pt-4 border-t border-[#E5DCC8]/70">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Number of Guests */}
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-2">
                        Total Guests Attending
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-white border border-[#E5DCC8] rounded-xs text-sm font-sans text-[#1B382B] focus:outline-none focus:border-[#B68D40]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest (Just me)' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Dietary Preference */}
                    <div>
                      <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-2">
                        Dietary Preference
                      </label>
                      <select
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-[#E5DCC8] rounded-xs text-sm font-sans text-[#1B382B] focus:outline-none focus:border-[#B68D40]"
                      >
                        <option value="Standard Ethiopian">Standard Ethiopian Buffet</option>
                        <option value="Ethiopian Fasting / Vegan (Tsom)">
                          Ethiopian Fasting / Vegan (የፆም ምግብ)
                        </option>
                        <option value="Halal">Halal</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                        <option value="Children Menu">Children Meal</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Warm Note or Favorite Song */}
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-2">
                  Note for the Couple or Song Request
                </label>
                <textarea
                  rows={3}
                  maxLength={400}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a loving blessing or tell us what song gets you on the dance floor!"
                  className="w-full px-4 py-3 bg-white border border-[#E5DCC8] rounded-xs text-sm font-sans text-[#1B382B] focus:outline-none focus:border-[#B68D40]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1B382B] hover:bg-[#254A39] text-[#FAF7F2] font-sans font-semibold text-xs uppercase tracking-[0.2em] rounded-xs shadow-md transition-colors"
                >
                  Send RSVP
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Discreet Bridal Portal Accordion */}
        <div className="mt-12 text-center border-t border-[#E5DCC8] pt-6">
          <button
            type="button"
            onClick={() => setShowPortal(!showPortal)}
            className="text-xs text-[#8C6721] hover:text-[#1B382B] font-sans flex items-center gap-1.5 mx-auto"
          >
            <Lock className="w-3.5 h-3.5" />
            {showPortal ? 'Hide Bridal Management Portal' : 'Bridal Organizer Portal (Bini & Lami)'}
          </button>

          {showPortal && (
            <div className="mt-6 p-6 bg-[#FAF7F2] border border-[#B68D40]/50 rounded-xs text-left">
              {!isUnlocked ? (
                <form onSubmit={handleUnlockPortal} className="max-w-xs mx-auto text-center space-y-3">
                  <p className="text-xs text-[#526458] font-sans">
                    Enter bridal passcode to view real-time headcount and export RSVPs. (Hint: <strong>2026</strong>)
                  </p>
                  <input
                    type="password"
                    value={portalPasscode}
                    onChange={(e) => setPortalPasscode(e.target.value)}
                    placeholder="Enter passcode"
                    className="w-full px-3 py-2 bg-white border border-[#E5DCC8] text-xs font-sans text-center rounded-xs focus:outline-none focus:border-[#B68D40]"
                  />
                  {portalError && <p className="text-xs text-rose-700">{portalError}</p>}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1B382B] text-white text-xs font-sans uppercase tracking-wider rounded-xs"
                  >
                    Unlock Portal
                  </button>
                </form>
              ) : (
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DCC8] mb-6">
                    <div>
                      <h4 className="font-serif italic text-2xl text-[#1B382B]">
                        Bridal RSVP Dashboard
                      </h4>
                      <p className="text-xs text-[#6B766F] font-sans">
                        Live attendance overview for November 14, 2026
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={exportRsvpsToCsv}
                      className="px-3.5 py-2 bg-[#B68D40] hover:bg-[#C99E4B] text-white text-xs font-sans font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export to CSV
                    </button>
                  </div>

                  {/* Metrics strip */}
                  <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                    <div className="p-3 bg-white border border-[#E5DCC8] rounded-xs">
                      <span className="block font-serif text-2xl text-[#1B382B] font-bold tabular-nums">
                        {totalAttending}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#6B766F] font-sans">
                        Confirmed Guests
                      </span>
                    </div>
                    <div className="p-3 bg-white border border-[#E5DCC8] rounded-xs">
                      <span className="block font-serif text-2xl text-[#1B382B] font-bold tabular-nums">
                        {totalResponses}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#6B766F] font-sans">
                        Total Responses
                      </span>
                    </div>
                    <div className="p-3 bg-white border border-[#E5DCC8] rounded-xs">
                      <span className="block font-serif text-2xl text-[#1B382B] font-bold tabular-nums">
                        {totalDeclined}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#6B766F] font-sans">
                        Declined
                      </span>
                    </div>
                  </div>

                  {/* Search inside RSVP list */}
                  <div className="mb-4">
                    <input
                      type="text"
                      value={portalSearch}
                      onChange={(e) => setPortalSearch(e.target.value)}
                      placeholder="Filter guest names or dietary..."
                      className="w-full px-3 py-2 bg-white border border-[#E5DCC8] text-xs font-sans rounded-xs focus:outline-none focus:border-[#B68D40]"
                    />
                  </div>

                  {/* List */}
                  <div className="max-h-60 overflow-y-auto divide-y divide-[#E5DCC8] bg-white border border-[#E5DCC8] rounded-xs">
                    {rsvps
                      .filter((r) =>
                        r.name.toLowerCase().includes(portalSearch.toLowerCase()) ||
                        (r.dietary || '').toLowerCase().includes(portalSearch.toLowerCase())
                      )
                      .map((r) => (
                        <div key={r.id} className="p-3 text-xs font-sans flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-[#1B382B]">{r.name}</p>
                            <p className="text-[11px] text-[#6B766F]">
                              {r.contact || 'No contact provided'} · {r.dietary}
                            </p>
                            {r.message && <p className="text-[11px] italic text-[#4A5D52] mt-0.5">&ldquo;{r.message}&rdquo;</p>}
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            <span
                              className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded ${
                                r.attending === 'yes'
                                  ? 'bg-[#1B382B]/10 text-[#1B382B]'
                                  : 'bg-rose-100 text-rose-700'
                              }`}
                            >
                              {r.attending === 'yes' ? `${r.guests} Attending` : 'Declined'}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
