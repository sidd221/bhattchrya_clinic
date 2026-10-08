import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { clinic } from './config/clinic';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { About } from './components/About';
import { Treatments } from './components/Treatments';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { Gallery } from './components/Gallery';

// Code-split modals and error views
const BookingModal = lazy(() => import('./components/BookingModal').then((m) => ({ default: m.BookingModal })));
const NotFound = lazy(() => import('./components/NotFound').then((m) => ({ default: m.NotFound })));

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  // Synchronize route state on popstate (browser back/forward or internal link)
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const isNavigatingRef = useRef(false);
  const navigatingTimeoutRef = useRef<number | null>(null);

  const handleSectionSelect = useCallback((sectionId: string) => {
    isNavigatingRef.current = true;
    setActiveSection(sectionId);
    if (navigatingTimeoutRef.current) {
      clearTimeout(navigatingTimeoutRef.current);
    }
    // Lock scroll spy while smooth scrolling takes place
    navigatingTimeoutRef.current = window.setTimeout(() => {
      isNavigatingRef.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    // If the user manually scrolls or touches, immediately unlock scroll spy
    const unlockNavigation = () => {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
        if (navigatingTimeoutRef.current) {
          clearTimeout(navigatingTimeoutRef.current);
          navigatingTimeoutRef.current = null;
        }
      }
    };

    window.addEventListener('wheel', unlockNavigation, { passive: true });
    window.addEventListener('touchmove', unlockNavigation, { passive: true });
    return () => {
      window.removeEventListener('wheel', unlockNavigation);
      window.removeEventListener('touchmove', unlockNavigation);
    };
  }, []);

  // Track active section for navbar highlighting with performant IntersectionObserver (zero layout thrashing)
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'process',
      'why-us',
      'treatments',
      'gallery',
      'faq',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;
        const visible = entries.find((e) => e.isIntersecting);
        if (visible && visible.target.id) {
          setActiveSection((prev) => (prev !== visible.target.id ? visible.target.id : prev));
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    let ticking = false;
    const handleScroll = () => {
      if (isNavigatingRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY < 100) {
            setActiveSection((prev) => (prev !== 'home' ? 'home' : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenBooking = useCallback((treatmentName?: string) => {
    if (treatmentName) {
      setSelectedTreatmentForBooking(treatmentName);
    } else {
      setSelectedTreatmentForBooking('');
    }
    window.location.href = `tel:${clinic.phoneRaw}`;
  }, []);

  const handleExploreTreatments = useCallback(() => {
    const el = document.getElementById('treatments');
    if (el) {
      const navHeight = 72;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleLearnMoreProcess = useCallback(() => {
    const el = document.getElementById('process');
    if (el) {
      const navHeight = 72;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const isNotFound = currentPath !== '/' && currentPath !== '' && currentPath !== '/index.html';

  if (isNotFound) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
        <NotFound
          onGoHome={() => {
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
          }}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2522] flex flex-col font-sans selection:bg-[#153A2A] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        activeSection={activeSection}
        onSectionChange={handleSectionSelect}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onExploreTreatments={handleExploreTreatments}
        />

        {/* Trust Indicators */}
        <TrustStrip />

        {/* About Section */}
        <About onLearnMore={handleLearnMoreProcess} />

        {/* 4-Step Consultation Journey (Process) */}
        <Process onOpenBooking={handleOpenBooking} />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Treatments & Areas We Care For */}
        <Treatments
          onBookConsultation={handleOpenBooking}
        />

        {/* Gallery Visual Tour */}
        <Gallery />

        {/* Patient Testimonials & Google Reviews */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ onOpenBooking={handleOpenBooking} />

        {/* Contact, Maps & Embedded Consultation Form */}
        <Contact initialTreatment={selectedTreatmentForBooking} />
      </main>

      {/* Footer & Legal Notices */}
      <Footer />

      {/* Floating WhatsApp and Mobile Bottom Navigation Bar */}
      <FloatingWhatsApp />

      {/* Global Booking Dialog Modal (Loaded on-demand) */}
      {isBookingOpen && (
        <Suspense fallback={null}>
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            selectedTreatment={selectedTreatmentForBooking}
          />
        </Suspense>
      )}
    </div>
  );
}
