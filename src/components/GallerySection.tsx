import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';
import { INITIAL_GALLERY, GalleryPhoto } from '../data/weddingData.ts';
import { SafeImage } from './SafeImage.tsx';

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('lb_wedding_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return [...parsed, ...INITIAL_GALLERY];
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_GALLERY;
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'story' | 'engagement' | 'family'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'story' | 'engagement' | 'family'>('engagement');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPhotos = photos.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  useEffect(() => {
    if (lightboxIndex === null && !showUploadModal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else setShowUploadModal(false);
        return;
      }
      if (lightboxIndex !== null && filteredPhotos.length > 0) {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          setLightboxIndex((idx) => (idx === null ? null : (idx + 1) % filteredPhotos.length));
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          setLightboxIndex((idx) =>
            idx === null ? null : (idx - 1 + filteredPhotos.length) % filteredPhotos.length
          );
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, showUploadModal, filteredPhotos.length]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUploadedPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadPreview) return;

    const newPhoto: GalleryPhoto = {
      id: `custom-${Date.now()}`,
      title: uploadTitle.trim() || 'Cherished Memory',
      subtitle: 'Shared with love for Lamirot & Biniyam',
      category: uploadCategory,
      imageUrl: uploadPreview,
      isUserUploaded: true,
    };

    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    setActiveCategory('all');

    try {
      const customOnly = updated.filter((p) => p.isUserUploaded);
      localStorage.setItem('lb_wedding_photos', JSON.stringify(customOnly));
    } catch {
      // LocalStorage quota protection
    }

    setUploadTitle('');
    setUploadPreview(null);
    setShowUploadModal(false);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B68D40] font-sans font-medium mb-1">
            Moments &amp; Memories
          </p>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-[#1B382B]">The Gallery</h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-[#B68D40]">
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
            <span className="text-sm">✦ ✦ ✦</span>
            <span className="h-[1px] w-8 bg-[#B68D40]/40" />
          </div>
          <p className="text-xs sm:text-sm text-[#526458] font-sans mt-3 max-w-lg mx-auto">
            Glimpses of love, laughter, and the journey leading to our November celebration.
          </p>
        </div>

        {/* Filter and Add Photo buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E5DCC8] rounded-xs">
            {(['all', 'engagement', 'story', 'family'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#1B382B] text-[#FAF7F2] font-semibold'
                    : 'text-[#526458] hover:text-[#1B382B]'
                }`}
              >
                {cat === 'all' ? 'All Photos' : cat}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 border border-[#B68D40] hover:bg-[#B68D40]/10 text-[#1B382B] text-xs font-sans font-semibold uppercase tracking-wider rounded-xs flex items-center gap-2 transition-colors"
          >
            <Camera className="w-4 h-4 text-[#B68D40]" />
            Add a Memory Photo
          </button>
        </div>

        {/* Grid of Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer bg-white border border-[#E5DCC8] rounded-xs overflow-hidden shadow-xs hover:border-[#B68D40]/70 transition-all hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2] relative">
                <SafeImage
                  src={photo.imageUrl}
                  alt={photo.title}
                  fallbackLabel={photo.title}
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-sans uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D6B368]" /> View Fullscreen
                  </span>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-serif text-lg text-[#1B382B] font-medium leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs text-[#6B766F] font-sans mt-0.5">{photo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen photo viewer"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
              aria-label="Close photo view"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[70vh] rounded overflow-hidden">
                <SafeImage
                  src={filteredPhotos[lightboxIndex].imageUrl}
                  alt={filteredPhotos[lightboxIndex].title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>
              <div className="text-center mt-4 text-white">
                <h4 className="font-serif text-2xl text-[#D6B368]">
                  {filteredPhotos[lightboxIndex].title}
                </h4>
                <p className="text-xs text-white/70 font-sans mt-1">
                  {filteredPhotos[lightboxIndex].subtitle}
                </p>
                <p className="text-[11px] text-[#B68D40] uppercase tracking-widest mt-2">
                  Photo {lightboxIndex + 1} of {filteredPhotos.length}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Upload Photo Modal */}
        {showUploadModal && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Add a memory photo"
          >
            <div
              className="bg-white max-w-md w-full rounded-sm p-6 sm:p-8 border border-[#B68D40]/50 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 text-[#6B766F] hover:text-[#1B382B]"
                aria-label="Close upload dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif italic text-2xl text-[#1B382B] mb-1">Add a Memory</h3>
              <p className="text-xs text-[#526458] font-sans mb-6">
                Upload a photo with the bride and groom or a message from your adventures.
              </p>

              <form onSubmit={handleSaveUploadedPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-1.5">
                    Select Photo
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-[#526458] file:mr-4 file:py-2 file:px-4 file:rounded-xs file:border-0 file:text-xs file:font-semibold file:bg-[#1B382B] file:text-white hover:file:bg-[#254A39]"
                    required
                  />
                </div>

                {uploadPreview && (
                  <div className="w-full h-36 rounded overflow-hidden border border-[#E5DCC8] relative">
                    <img
                      src={uploadPreview}
                      alt="Upload preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-1.5">
                    Photo Title / Caption
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Joyful memories in Addis"
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5DCC8] text-xs font-sans text-[#1B382B] rounded-xs focus:outline-none focus:border-[#B68D40]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1B382B] mb-1.5">
                    Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5DCC8] text-xs font-sans text-[#1B382B] rounded-xs focus:outline-none focus:border-[#B68D40]"
                  >
                    <option value="engagement">Engagement &amp; Love</option>
                    <option value="story">Our Story</option>
                    <option value="family">Family &amp; Friends</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-xs font-sans uppercase tracking-wider text-[#6B766F]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1B382B] text-white text-xs font-sans font-semibold uppercase tracking-wider rounded-xs hover:bg-[#254A39]"
                  >
                    Save to Gallery
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
