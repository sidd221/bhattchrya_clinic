import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { galleryData, GalleryItem } from '../data/gallery';
import SocialCards, { CardItem } from './ui/card-fan-carousel';
import { ScrollReveal } from './ScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PatientVideoFeedback } from './PatientVideoFeedback';

const GalleryLightbox = lazy(() =>
  import('./GalleryLightbox').then((m) => ({ default: m.GalleryLightbox }))
);

// Authentic clinical, memorial, and treatment images for Dr. B. Bhattacharyya Clinic (12 images)
const CLINIC_FAN_CARDS: (CardItem & { id: string; caption: string })[] = galleryData.map((item) => ({
  id: item.id,
  imgUrl: item.src,
  alt: item.alt,
  title: item.title,
  category: item.category,
  caption: item.caption,
}));

const LIGHTBOX_ITEMS: GalleryItem[] = galleryData;

export const Gallery: React.FC = React.memo(() => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isMobilePaused, setIsMobilePaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleCardClick = useCallback((index: number) => {
    const card = CLINIC_FAN_CARDS[index];
    if (card) {
      setActiveItem({
        id: card.id,
        title: card.title || "Clinic Space",
        category: (card.category as any) || "Clinic",
        caption: card.caption,
        alt: card.alt || "Clinic Image",
        src: card.imgUrl,
        visualTheme: {
          bgGradient: "from-[#1F4232] to-[#122A1F]",
          accentColor: "#D4B07B",
          motif: "room"
        }
      });
    }
  }, []);

  // 5-second auto scroll for mobile view
  useEffect(() => {
    if (isMobilePaused) return;
    const timer = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % CLINIC_FAN_CARDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobilePaused]);

  const handleMobilePrev = useCallback(() => {
    setMobileIndex((prev) => (prev === 0 ? CLINIC_FAN_CARDS.length - 1 : prev - 1));
  }, []);

  const handleMobileNext = useCallback(() => {
    setMobileIndex((prev) => (prev + 1) % CLINIC_FAN_CARDS.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleMobileNext();
      } else {
        handleMobilePrev();
      }
    }
    touchStartX.current = null;
  };

  const currentMobileCard = CLINIC_FAN_CARDS[mobileIndex];
  const lightboxItems = LIGHTBOX_ITEMS;

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      {/* Subtle organic background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[500px] bg-[#E8EFE9]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={25}>
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wider text-[#153A2A] uppercase">
                Visual Experience
              </span>
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#153A2A] tracking-tight mb-3">
              Inside Dr. B. Bhattacharyya Clinic
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#4E5E57] leading-relaxed">
              Explore our historic heritage, senior consulting physicians, treatment dispensary, and documented recoveries.
            </p>
          </div>
        </ScrollReveal>

        {/* MOBILE VIEW: Dual-layer frame that fits every aspect ratio without cropping */}
        <div 
          className="block md:hidden w-full max-w-md mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsMobilePaused(true)}
          onMouseLeave={() => setIsMobilePaused(false)}
        >
          {/* Main Card */}
          <div 
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-[#D5CABC] bg-[#0A1B13] cursor-pointer group"
            onClick={() => handleCardClick(mobileIndex)}
            role="button"
            tabIndex={0}
            aria-label={`View ${currentMobileCard.title} in full screen`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(mobileIndex);
              }
            }}
          >
            {/* Ambient blurred backdrop so portrait and landscape both fill the card naturally */}
            <img
              src={currentMobileCard.imgUrl}
              aria-hidden="true"
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-[#07150E]/45 pointer-events-none" />

            {/* Foreground pure image - uncropped, contained, centered */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-2.5 sm:p-3">
              <img
                src={currentMobileCard.imgUrl}
                alt={currentMobileCard.alt || currentMobileCard.title || "Clinic gallery image"}
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl drop-shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center justify-between w-full px-3 mt-4 mb-2">
            <button
              onClick={handleMobilePrev}
              className="w-10 h-10 rounded-full bg-[#153A2A] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer shrink-0"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot Indicators & Slide Count */}
            <div className="flex flex-col items-center gap-1 px-2">
              <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[190px]">
                {CLINIC_FAN_CARDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setMobileIndex(i)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      i === mobileIndex
                        ? "w-4 h-1.5 bg-[#153A2A]"
                        : "w-1.5 h-1.5 bg-[#153A2A]/30 hover:bg-[#153A2A]/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-[#5C6E65] font-medium">
                {mobileIndex + 1} of {CLINIC_FAN_CARDS.length}
              </span>
            </div>

            <button
              onClick={handleMobileNext}
              className="w-10 h-10 rounded-full bg-[#153A2A] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer shrink-0"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DESKTOP / TABLET VIEW: Interactive 3D Card Fan Carousel */}
        <div className="hidden md:block w-full overflow-visible">
          <SocialCards
            cards={CLINIC_FAN_CARDS}
            onCardClick={handleCardClick}
          />
        </div>

        {/* Real Patient Video Feedback Section */}
        <PatientVideoFeedback />
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <Suspense fallback={null}>
          <GalleryLightbox
            item={activeItem}
            items={lightboxItems}
            onClose={() => setActiveItem(null)}
            onNavigate={(newItem) => setActiveItem(newItem)}
          />
        </Suspense>
      )}
    </section>
  );
});

Gallery.displayName = 'Gallery';
export default Gallery;

