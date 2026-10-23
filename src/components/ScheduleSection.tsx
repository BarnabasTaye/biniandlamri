import React, { useState } from 'react';
import { Clock, CheckCircle2, Search } from 'lucide-react';
import { SCHEDULE_DATA } from '../data/weddingData.ts';

export const ScheduleSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'prep' | 'home' | 'church' | 'reception'>('all');
  const [clockMode, setClockMode] = useState<'dual' | 'standard' | 'ethiopian'>('dual');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = SCHEDULE_DATA.map((group) => {
    if (activeTab !== 'all' && group.category !== activeTab) {
      return null;
    }

    const matchedItems = group.items.filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.timeRange.toLowerCase().includes(q) ||
        item.ethiopianTime.toLowerCase().includes(q)
      );
    });

    if (matchedItems.length === 0) return null;

    return {
      ...group,
      items: matchedItems,
    };
  }).filter(Boolean) as typeof SCHEDULE_DATA;

  return (
    <section id="schedule" className="py-16 md:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B68D40] font-sans font-medium mb-1">
            Program &amp; Itinerary
          </p>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1B382B]">The Day</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[#B68D40]">
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
            <span className="text-sm">✦ ✦ ✦</span>
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
          </div>
          <p className="text-xs sm:text-sm text-[#526458] font-sans mt-3 max-w-xl mx-auto">
            A celebration of covenant and joy. Ethiopian time is calculated from dawn (6:00 AM standard = 12:00 ET).
          </p>
        </div>

        {/* Dinner guest callout banner */}
        <div className="mb-10 p-4 sm:p-5 bg-[#1B382B] text-[#FAF7F2] rounded-xs border-l-0 border border-[#B68D40]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D6B368]/20 flex items-center justify-center text-[#D6B368] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif text-lg font-medium text-[#FAF7F2]">
                Dinner Program at The Glasshouse
              </p>
              <p className="text-xs text-[#FAF7F2]/80 font-sans mt-0.5">
                Guests kindly requested to be seated by <strong className="text-[#D6B368]">6:00 PM sharp</strong> (12:00 Ethiopian Time).
              </p>
            </div>
          </div>
          <a
            href="#venues"
            className="px-4 py-2 bg-[#D6B368] hover:bg-[#E2C278] text-[#152B20] text-xs font-sans font-semibold uppercase tracking-wider rounded-xs whitespace-nowrap"
          >
            Venue Directions
          </a>
        </div>

        {/* Controls: Segmented Filter tabs & Clock Mode */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Phase Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white border border-[#E5DCC8] rounded-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#1B382B] text-[#FAF7F2] font-semibold'
                  : 'text-[#526458] hover:text-[#1B382B]'
              }`}
            >
              Full Day
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('prep')}
              className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'prep'
                  ? 'bg-[#1B382B] text-[#FAF7F2] font-semibold'
                  : 'text-[#526458] hover:text-[#1B382B]'
              }`}
            >
              Morning Prep
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'home'
                  ? 'bg-[#1B382B] text-[#FAF7F2] font-semibold'
                  : 'text-[#526458] hover:text-[#1B382B]'
              }`}
            >
              Family Residences
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('church')}
              className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'church'
                  ? 'bg-[#1B382B] text-[#FAF7F2] font-semibold'
                  : 'text-[#526458] hover:text-[#1B382B]'
              }`}
            >
              Church Vows
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reception')}
              className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'reception'
                  ? 'bg-[#1B382B] text-[#FAF7F2] font-semibold'
                  : 'text-[#526458] hover:text-[#1B382B]'
              }`}
            >
              Dinner Reception
            </button>
          </div>

          {/* Clock format selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B766F] font-sans">Clock:</span>
            <div className="flex items-center gap-1 p-1 bg-white border border-[#E5DCC8] rounded-xs text-xs font-sans">
              <button
                type="button"
                onClick={() => setClockMode('dual')}
                className={`px-2.5 py-1 transition-colors ${
                  clockMode === 'dual'
                    ? 'bg-[#B68D40] text-white font-medium'
                    : 'text-[#526458] hover:text-[#1B382B]'
                }`}
              >
                Dual Time
              </button>
              <button
                type="button"
                onClick={() => setClockMode('standard')}
                className={`px-2.5 py-1 transition-colors ${
                  clockMode === 'standard'
                    ? 'bg-[#B68D40] text-white font-medium'
                    : 'text-[#526458] hover:text-[#1B382B]'
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setClockMode('ethiopian')}
                className={`px-2.5 py-1 transition-colors ${
                  clockMode === 'ethiopian'
                    ? 'bg-[#B68D40] text-white font-medium'
                    : 'text-[#526458] hover:text-[#1B382B]'
                }`}
              >
                የኢትዮጵያ ሰዓት
              </button>
            </div>
          </div>
        </div>

        {/* Live Search bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schedule (e.g. vows, dinner, photoshoot)..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E5DCC8] text-xs font-sans text-[#1B382B] rounded-xs focus:outline-none focus:border-[#B68D40]"
          />
          <Search className="w-4 h-4 text-[#8C6721] absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-[#8C6721] hover:text-black"
            >
              Clear
            </button>
          )}
        </div>

        {/* Schedule Phase Cards */}
        <div className="space-y-8">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-12 bg-white border border-[#E5DCC8] rounded-xs p-6 text-sm text-[#6B766F]">
              No schedule items match your current filter or search criteria.
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div
                key={group.phase}
                className="bg-white border border-[#E5DCC8] rounded-sm p-6 sm:p-8 shadow-xs"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5DCC8]">
                  <h3 className="font-serif italic text-2xl text-[#1B382B]">{group.phase}</h3>
                  <span className="text-xs uppercase tracking-widest text-[#B68D40] font-sans">
                    {group.items.length} {group.items.length === 1 ? 'event' : 'events'}
                  </span>
                </div>

                <ul className="divide-y divide-[#E5DCC8]/60">
                  {group.items.map((item) => (
                    <li
                      key={item.id}
                      className={`py-4 transition-colors ${
                        item.highlight ? 'bg-[#FAF7F2]/80 -mx-3 px-3 rounded-xs' : ''
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start">
                        {/* Time column */}
                        <div className="md:col-span-4">
                          {clockMode !== 'ethiopian' && (
                            <div className="font-sans font-semibold text-sm text-[#1B382B] tabular-nums">
                              {item.timeRange}
                            </div>
                          )}
                          {(clockMode === 'dual' || clockMode === 'ethiopian') && (
                            <div className="text-xs text-[#8C6721] font-sans italic mt-0.5">
                              {item.ethiopianTime}
                            </div>
                          )}
                        </div>

                        {/* Event title & details */}
                        <div className="md:col-span-8">
                          <div className="flex items-start gap-2">
                            {item.highlight && (
                              <CheckCircle2 className="w-4 h-4 text-[#B68D40] shrink-0 mt-0.5" />
                            )}
                            <div>
                              <h4 className="font-serif text-lg text-[#1B382B] font-medium leading-snug">
                                {item.title}
                              </h4>
                              {item.description && (
                                <p className="text-xs text-[#526458] font-sans mt-1 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
