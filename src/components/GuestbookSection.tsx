import React, { useState, useEffect } from 'react';
import { Heart, Send, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_WISHES, WishItem } from '../data/weddingData.ts';

export const GuestbookSection: React.FC = () => {
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const stored = localStorage.getItem('lb_wedding_wishes');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_WISHES;
  });

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('lb_wedding_liked_wishes');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });
  const [sortMode, setSortMode] = useState<'latest' | 'popular'>('latest');

  useEffect(() => {
    try {
      localStorage.setItem('lb_wedding_wishes', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  useEffect(() => {
    try {
      localStorage.setItem('lb_wedding_liked_wishes', JSON.stringify(likedIds));
    } catch {
      // ignore
    }
  }, [likedIds]);

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      relationship: relationship.trim() || 'Well-wisher & Friend',
      message: message.trim(),
      timestamp: Date.now(),
      likes: 1,
    };

    setWishes((prev) => [newWish, ...prev]);
    setLikedIds((prev) => [...prev, newWish.id]);
    setName('');
    setRelationship('');
    setMessage('');

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#D6B368', '#B68D40', '#1B382B'],
    });
  };

  const handleLike = (id: string) => {
    const isLiked = likedIds.includes(id);
    if (isLiked) {
      setLikedIds((prev) => prev.filter((item) => item !== id));
      setWishes((prev) =>
        prev.map((w) => (w.id === id ? { ...w, likes: Math.max(0, w.likes - 1) } : w))
      );
    } else {
      setLikedIds((prev) => [...prev, id]);
      setWishes((prev) =>
        prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
      );
    }
  };

  const sortedWishes = [...wishes].sort((a, b) => {
    if (sortMode === 'popular') {
      return b.likes - a.likes;
    }
    return b.timestamp - a.timestamp;
  });

  return (
    <section id="guestbook" className="py-16 md:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B68D40] font-sans font-medium mb-1">
            Words of Love &amp; Blessing
          </p>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1B382B]">The Guestbook</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[#B68D40]">
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
            <span className="text-sm">✦ ✦ ✦</span>
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
          </div>
          <p className="text-xs sm:text-sm text-[#526458] font-sans mt-3 max-w-md mx-auto">
            Leave a prayer, scripture, memory, or congratulatory note for Lamirot &amp; Biniyam to cherish forever.
          </p>
        </div>

        {/* Wish Form */}
        <div className="bg-white border border-[#E5DCC8] rounded-sm p-6 sm:p-8 mb-12 shadow-xs">
          <h3 className="font-serif italic text-2xl text-[#1B382B] mb-1">
            Sign the Couple’s Guestbook
          </h3>
          <p className="text-xs text-[#6B766F] font-sans mb-6">
            Your heartfelt message will be read by Bini &amp; Lami with gratitude.
          </p>

          <form onSubmit={handleSubmitWish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-1.5">
                  Your Name <span className="text-[#B68D40]">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={60}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Almaz Kebede"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DCC8] rounded-xs text-xs font-sans text-[#1B382B] focus:outline-none focus:border-[#B68D40]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-1.5">
                  Relationship or Location
                </label>
                <input
                  type="text"
                  maxLength={60}
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Groom's University Friend, Addis Ababa"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DCC8] rounded-xs text-xs font-sans text-[#1B382B] focus:outline-none focus:border-[#B68D40]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-1.5">
                Your Blessing or Message <span className="text-[#B68D40]">*</span>
              </label>
              <textarea
                required
                rows={3}
                maxLength={600}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your prayers, congratulations, or special memories for the bride and groom..."
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DCC8] rounded-xs text-xs font-sans text-[#1B382B] focus:outline-none focus:border-[#B68D40]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1B382B] hover:bg-[#254A39] text-white text-xs font-sans font-semibold uppercase tracking-wider rounded-xs flex items-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-[#D6B368]" />
                Post Blessing
              </button>
            </div>
          </form>
        </div>

        {/* Wishes List Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5DCC8]">
          <div className="flex items-center gap-2 text-xs font-sans text-[#1B382B]">
            <MessageCircle className="w-4 h-4 text-[#B68D40]" />
            <span className="font-semibold">{wishes.length} Warm Wishes</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans">
            <span className="text-[#6B766F]">Sort:</span>
            <button
              type="button"
              onClick={() => setSortMode('latest')}
              className={`hover:text-[#1B382B] ${sortMode === 'latest' ? 'font-bold text-[#1B382B] underline' : 'text-[#6B766F]'}`}
            >
              Latest
            </button>
            <span className="text-[#E5DCC8]">·</span>
            <button
              type="button"
              onClick={() => setSortMode('popular')}
              className={`hover:text-[#1B382B] ${sortMode === 'popular' ? 'font-bold text-[#1B382B] underline' : 'text-[#6B766F]'}`}
            >
              Most Loved
            </button>
          </div>
        </div>

        {/* Wishes cards */}
        <div className="space-y-4">
          {sortedWishes.map((item) => {
            const isLiked = likedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-[#E5DCC8] rounded-xs p-5 sm:p-6 transition-all hover:border-[#B68D40]/50"
              >
                {item.amharicText && (
                  <p className="font-serif italic text-base text-[#1B382B] mb-2 leading-relaxed font-semibold">
                    &ldquo;{item.amharicText}&rdquo;
                  </p>
                )}
                <p className="text-sm text-[#4A5D52] font-sans leading-relaxed whitespace-pre-wrap">
                  {item.message}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E5DCC8]/50 text-xs font-sans">
                  <div>
                    <span className="font-serif font-bold text-[#1B382B] text-sm">
                      {item.name}
                    </span>
                    {item.relationship && (
                      <span className="text-[#6B766F] ml-2 text-[11px]">
                        · {item.relationship}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                      isLiked
                        ? 'bg-rose-50 text-rose-600'
                        : 'text-[#6B766F] hover:text-rose-600 hover:bg-rose-50/50'
                    }`}
                    title="Send love to this message"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                    <span className="tabular-nums font-sans text-xs">{item.likes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
