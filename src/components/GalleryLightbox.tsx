import React, { useEffect, useCallback } from 'react';
import { GalleryItem } from '../data/gallery';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  items,
  onClose,
  onNavigate,
}) => {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(items[currentIndex - 1]);
    } else if (items.length > 0) {
      onNavigate(items[items.length - 1]);
    }
  }, [currentIndex, items, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(items[currentIndex + 1]);
    } else if (items.length > 0) {
      onNavigate(items[0]);
    }
  }, [currentIndex, items, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, handlePrev, handleNext]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Image Viewer"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Background backdrop click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation Button */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous gallery image"
          className="absolute left-2 sm:left-6 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Navigation Button */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next gallery image"
          className="absolute right-2 sm:right-6 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Center Lightbox Card */}
      <div className="relative z-40 max-w-4xl w-full bg-[#183628] rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col">
        {/* Visual Slot */}
        <div className="relative aspect-16/9 sm:aspect-16/10 bg-gradient-to-br from-[#1E4332] via-[#143324] to-[#0A1F16] flex items-center justify-center p-8 overflow-hidden">
          {item.src ? (
            <img
              src={item.src}
              alt={item.alt}
              width={1000}
              height={625}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-center max-w-md px-4 relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 text-[#E5D2B4] flex items-center justify-center border border-white/15 shadow-inner">
                <Sparkles className="w-8 h-8" aria-hidden="true" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#B5D0BD] font-medium block mb-2">
                {item.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold mb-3">
                {item.title}
              </h2>
              <p className="text-sm text-[#D1E0D7] leading-relaxed">
                {item.alt}
              </p>
            </div>
          )}
        </div>

        {/* Captions and Details Bar */}
        <div className="bg-[#122A1F] p-5 sm:p-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#9BBBA6] mb-1">
              <span>{item.category}</span>
              <span aria-hidden="true">·</span>
              <span>Image {currentIndex + 1} of {items.length}</span>
            </div>
            <p className="text-sm sm:text-base text-[#F4ECE0] font-normal">
              {item.caption}
            </p>
          </div>

          <div className="text-xs text-[#7A9984] shrink-0">
            Dr. B. Bhattacharyya Clinic
          </div>
        </div>
      </div>
    </div>
  );
};
