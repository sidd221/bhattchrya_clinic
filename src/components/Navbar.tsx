import React, { useState, useEffect, useRef } from 'react';
import { clinic } from '../config/clinic';
import { Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({ onOpenBooking: _onOpenBooking, activeSection = 'home', onSectionChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth sliding indicator coordinates using GPU-accelerated translateX
  const navContainerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{
    x: number;
    width: number;
    opacity: number;
  }>({ x: 0, width: 0, opacity: 0 });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop navigation: 8 clean destinations in chronological page order starting with Home (Hero section)
  const desktopNavLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Treatments', href: '#treatments' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  // Mobile menu: full list including Home
  const mobileNavLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Dr. B. Bhattacharyya Clinic', href: '#about' },
    { label: 'Consultation Process', href: '#process' },
    { label: 'Why Patients Choose Us', href: '#why-us' },
    { label: 'Conditions We Treat', href: '#treatments' },
    { label: 'Clinic Gallery', href: '#gallery' },
    { label: 'Frequently Asked Questions', href: '#faq' },
    { label: 'Contact & Location', href: '#contact' },
  ];

  // Update sliding underline position instantaneously without forced DOM reflows
  useEffect(() => {
    const updateIndicator = () => {
      const targetKey = (!activeSection || activeSection === 'hero') ? 'home' : activeSection;
      const activeEl = linkRefs.current[targetKey];

      if (activeEl && activeEl.offsetWidth > 0) {
        setIndicatorStyle({
          x: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
        return;
      }
      setIndicatorStyle((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
    };

    updateIndicator();

    window.addEventListener('resize', updateIndicator);
    if (document.fonts) {
      document.fonts.ready.then(updateIndicator);
    }

    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const sectionId = href.replace('#', '');

    // Instantly glide indicator to target link without any delay
    const targetEl = linkRefs.current[sectionId];
    if (targetEl && targetEl.offsetWidth > 0) {
      setIndicatorStyle({
        x: targetEl.offsetLeft,
        width: targetEl.offsetWidth,
        opacity: 1,
      });
    }

    if (onSectionChange) {
      onSectionChange(sectionId);
    }

    if (href === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const navHeight = 72;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-xl saturate-150 border-[#E8E1D5] shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-2.5 sm:py-3'
          : 'bg-[#FAF8F5]/80 backdrop-blur-lg border-[#EFE8DC] py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-4">
          {/* Zone 1: Wordmark & Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-2.5 sm:gap-3 transition-colors shrink-0"
            title={`${clinic.name} - Home`}
          >
            <picture className="w-9 h-9 sm:w-10 sm:h-10 shrink-0">
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/logo.jpeg"
                alt={clinic.name}
                width={40}
                height={40}
                loading="eager"
                decoding="async"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full border border-[#D5CCC0] bg-white shadow-xs group-hover:scale-105 transition-transform"
              />
            </picture>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-base sm:text-lg lg:text-[16px] xl:text-lg font-serif font-bold tracking-tight text-[#153A2A] group-hover:text-[#0E271C] transition-colors truncate max-w-[210px] sm:max-w-none">
                {clinic.name}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#697E74] font-medium tracking-wide">
                Patna, Bihar
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links with single smooth sliding underline */}
          <nav
            ref={navContainerRef}
            aria-label="Main Navigation"
            className="relative hidden lg:flex items-center gap-1.5 xl:gap-3.5 text-[13px] xl:text-sm font-medium text-[#46554F]"
          >
            {desktopNavLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId || (sectionId === 'home' && (!activeSection || activeSection === 'hero'));
              return (
                <a
                  key={link.label}
                  ref={(el) => {
                    linkRefs.current[sectionId] = el;
                  }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-2 xl:px-2.5 py-1.5 transition-colors duration-150 hover:text-[#153A2A] whitespace-nowrap rounded-md ${
                    isActive ? 'text-[#153A2A] font-semibold' : 'text-[#46554F]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Single Continuous Sliding Underline Indicator - GPU accelerated translateX */}
            <span
              className="absolute bottom-0 left-0 h-0.5 bg-[#153A2A] rounded-full pointer-events-none transition-[transform,width,opacity] duration-200 ease-out will-change-transform"
              style={{
                transform: `translateX(${indicatorStyle.x}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />
          </nav>

          {/* Zone 3: CTA Button & Mobile / Tablet menu toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`tel:${clinic.phoneRaw}`}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-[#153A2A] hover:bg-[#0E271C] active:bg-[#081811] rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D8E6DD]" aria-hidden="true" />
              <span>Book Appointment</span>
            </a>

            {/* Mobile / Tablet menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#153A2A] hover:bg-[#EAE4D7] rounded-lg transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5]/98 backdrop-blur-2xl border-b border-[#E3DBD0] px-4 pt-3 pb-6 shadow-[0_12px_32px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1 pt-1">
            {mobileNavLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId || (sectionId === 'home' && (!activeSection || activeSection === 'hero'));
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-2.5 text-sm sm:text-base font-medium rounded-lg transition-colors ${
                    isActive ? 'bg-[#153A2A]/10 text-[#153A2A] font-semibold' : 'text-[#2E3C36] hover:bg-[#FAF8F5] hover:text-[#153A2A]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-[#E8E2D8]">
              <a
                href={`tel:${clinic.phoneRaw}`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#153A2A] hover:bg-[#0E271C] rounded-lg transition-colors shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#D8E6DD]" />
                <span>Call to Book (+91 7050086029)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';
