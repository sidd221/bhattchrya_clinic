import React, { useState, useEffect } from 'react';
import { clinic } from '../config/clinic';
import { Phone } from 'lucide-react';

// Exact official WhatsApp SVG icon (speech bubble outline + telephone handset with natural handset tilt)
export const WhatsAppIcon: React.FC<{ className?: string; size?: number }> = ({
  className = "w-7 h-7 text-white",
  size = 28
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M16.02 2.5C8.58 2.5 2.54 8.54 2.54 15.98c0 2.65.77 5.12 2.1 7.2L3 30l7.05-1.61c1.99 1.18 4.31 1.86 6.79 1.86 7.44 0 13.48-6.04 13.48-13.48 0-7.44-6.04-13.48-13.48-13.48zm7.88 19.34c-.33.93-1.64 1.77-2.67 1.99-.71.15-1.63.27-4.75-.97-3.99-1.59-6.55-5.64-6.75-5.9-.2-.27-1.62-2.15-1.62-4.11 0-1.95 1.02-2.92 1.39-3.32.36-.4.79-.5 1.05-.5.26 0 .53.01.76.02.24.01.57-.09.89.7.33.79 1.12 2.74 1.22 2.94.1.2.17.44.03.71-.13.26-.2.43-.4.66-.2.23-.42.52-.6.7-.2.2-.41.42-.18.82.23.4 1.03 1.7 2.21 2.75 1.52 1.35 2.8 1.77 3.2 1.97.4.2.63.17.86-.1.23-.27.99-1.16 1.26-1.55.26-.4.53-.33.89-.2.36.13 2.31 1.09 2.71 1.29.4.2.66.3.76.46.1.17.1 1 . -23 1.93z" />
  </svg>
);

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let footerInView = false;

    const footerEl = document.getElementById('footer');
    let observer: IntersectionObserver | null = null;

    if (footerEl) {
      observer = new IntersectionObserver(
        (entries) => {
          footerInView = entries[0].isIntersecting;
          updateVisibility();
        },
        { threshold: 0.05 }
      );
      observer.observe(footerEl);
    }

    let ticking = false;
    const updateVisibility = () => {
      const pastHero = window.scrollY > 400;
      const shouldBeVisible = pastHero && !footerInView;
      setIsVisible((prev) => (prev !== shouldBeVisible ? shouldBeVisible : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const whatsappUrl = `https://wa.me/${clinic.whatsappRaw}?text=${encodeURIComponent(
    'Hello, I would like to book a consultation appointment with the doctor at Dr. B. Bhattacharyya Clinic.'
  )}`;

  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <aside
        aria-label="Quick contact"
        className={`hidden sm:block fixed bottom-6 right-6 z-40 transition-all duration-300 ease-in-out ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Dr. B. Bhattacharyya Clinic on WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] active:bg-[#1DA851] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-108 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#25D366] cursor-pointer group"
        >
          <WhatsAppIcon className="w-8 h-8 text-white group-hover:scale-105 transition-transform" />
        </a>
      </aside>

      {/* Mobile Sticky Bottom CTA Bar */}
      <nav
        aria-label="Mobile quick actions"
        className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-[#E5DFD4] px-4 py-2.5 shadow-lg flex items-center gap-2.5 transition-all duration-300 ease-in-out ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <a
          href={`tel:${clinic.phoneRaw}`}
          aria-label="Call clinic directly"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#FAF8F5] border border-[#CBD9CE] text-[#153A2A] rounded-lg text-xs font-bold hover:bg-[#F2ECE1] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#153A2A]" aria-hidden="true" />
          <span>Call Clinic</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366] text-white rounded-lg text-xs font-bold hover:bg-[#20BA5A] transition-colors shadow-xs"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" size={18} />
          <span>WhatsApp Us</span>
        </a>
      </nav>
    </>
  );
};
