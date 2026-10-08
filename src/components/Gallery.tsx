import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { galleryData, GalleryItem } from '../data/gallery';
import SocialCards, { CardItem } from './ui/card-fan-carousel';
import { ScrollReveal } from './ScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GalleryLightbox = lazy(() =>
  import('./GalleryLightbox').then((m) => ({ default: m.GalleryLightbox }))
);

// Rich, authentic clinical and calming interior photos for Dr. B. Bhattacharyya Clinic (10 images)
// Mapped cleanly to /gallery/gallery-1.jpg through /gallery/gallery-10.jpg
const CLINIC_FAN_CARDS: (CardItem & { id: string; caption: string })[] = [
  {
    id: "gal-1",
    imgUrl: "/gallery/gallery-1.jpg",
    alt: "Quiet Consultation Chamber",
    title: "Quiet Consultation Chamber",
    category: "Consultation Area",
    caption: "Designed for open, unhurried dialogues in a private, natural daylight-filled setting."
  },
  {
    id: "gal-2",
    imgUrl: "/gallery/gallery-2.jpg",
    alt: "Serene Welcoming Lounge",
    title: "Serene Welcoming Lounge",
    category: "Reception",
    caption: "A calming arrival space featuring warm earthen tones, living botanical plants, and herbal tea."
  },
  {
    id: "gal-3",
    imgUrl: "/gallery/gallery-3.jpg",
    alt: "The Classical Dispensary",
    title: "The Classical Dispensary",
    category: "Treatment Environment",
    caption: "Carefully curated pharmacopoeia of classical homeopathic dilutions, globules, and mother tinctures."
  },
  {
    id: "gal-4",
    imgUrl: "/gallery/gallery-4.jpg",
    alt: "Doctor's Study & Repertory",
    title: "Doctor's Study & Repertory",
    category: "Doctor",
    caption: "Classical homeopathic repertories, materia medica volumes, and digital case-taking records."
  },
  {
    id: "gal-5",
    imgUrl: "/gallery/gallery-5.jpg",
    alt: "Tranquil Patient Waiting Corner",
    title: "Tranquil Waiting Corner",
    category: "Patient Experience",
    caption: "Every interior touchpoint is arranged to minimise clinical anxiety and foster calm."
  },
  {
    id: "gal-6",
    imgUrl: "/gallery/gallery-6.jpg",
    alt: "Botanical Pharmacopoeia",
    title: "Herbal Pharmacopoeia",
    category: "Treatment Environment",
    caption: "Authentic, certified homeopathic preparations prepared according to classical standards."
  },
  {
    id: "gal-7",
    imgUrl: "/gallery/gallery-7.jpg",
    alt: "Private Diagnostic Room",
    title: "Diagnostic Examination Room",
    category: "Consultation Area",
    caption: "Equipped with diagnostic equipment to complement classical constitutional case taking."
  },
  {
    id: "gal-8",
    imgUrl: "/gallery/gallery-8.jpg",
    alt: "Reception & Appointment Desk",
    title: "Reception & Welcome Desk",
    category: "Reception",
    caption: "Coordinated appointments, unhurried patient intake, and prompt dispatch of courier medicines."
  },
  {
    id: "gal-9",
    imgUrl: "/gallery/gallery-9.jpg",
    alt: "Clinic Exterior & Entryway",
    title: "Clinic Entryway & Grounds",
    category: "Clinic",
    caption: "Centrally located in East Patel Nagar, Patna with quiet and accessible ground access."
  },
  {
    id: "gal-10",
    imgUrl: "/gallery/gallery-10.jpg",
    alt: "Holistic Health Diagnostics",
    title: "Constitutional Intake Desk",
    category: "Consultation Area",
    caption: "Holistic assessment connecting physiological reports with constitutional health profile."
  }
];

const LIGHTBOX_ITEMS: GalleryItem[] = CLINIC_FAN_CARDS.map((c) => ({
  id: c.id,
  title: c.title || "Clinic Space",
  category: (c.category as any) || "Clinic",
  caption: c.caption,
  alt: c.alt || "",
  src: c.imgUrl,
  visualTheme: {
    bgGradient: "from-[#1F4232] to-[#122A1F]",
    accentColor: "#D4B07B",
    motif: "room"
  }
}));

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
        title: card.title || "Clinic Environment",
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
              Explore our tranquil consultation chambers, dispensing counter, and patient sanctuary.
            </p>
          </div>
        </ScrollReveal>

        {/* MOBILE VIEW: Simple, beautiful, touch-friendly card slider */}
        <div 
          className="block md:hidden w-full max-w-md mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsMobilePaused(true)}
          onMouseLeave={() => setIsMobilePaused(false)}
        >
          {/* Main Card - Pure image only, no text overlay */}
          <div 
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#D5CABC] bg-[#1C3627] cursor-pointer"
            onClick={() => handleCardClick(mobileIndex)}
          >
            <img
              src={currentMobileCard.imgUrl}
              alt={currentMobileCard.alt || "Clinic gallery image"}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>

          {/* Simple Mobile Navigation Controls */}
          <div className="flex flex-col items-center gap-3 mt-4">
            <div className="flex items-center justify-between w-full px-2">
              <button
                onClick={handleMobilePrev}
                className="w-10 h-10 rounded-full bg-[#153A2A] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {CLINIC_FAN_CARDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setMobileIndex(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === mobileIndex
                        ? "w-6 h-2 bg-[#153A2A]"
                        : "w-2 h-2 bg-[#153A2A]/30 hover:bg-[#153A2A]/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleMobileNext}
                className="w-10 h-10 rounded-full bg-[#153A2A] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Count */}
            <span className="text-xs text-[#5C6E65] font-medium">
              {mobileIndex + 1} of {CLINIC_FAN_CARDS.length}
            </span>
          </div>
        </div>

        {/* DESKTOP / TABLET VIEW: Interactive 3D Card Fan Carousel */}
        <div className="hidden md:block w-full overflow-visible">
          <SocialCards
            cards={CLINIC_FAN_CARDS}
            onCardClick={handleCardClick}
          />
        </div>
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

