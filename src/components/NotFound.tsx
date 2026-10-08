import React from 'react';
import { clinic } from '../config/clinic';
import { Home, Phone, ArrowLeft, Search, Calendar, Stethoscope, Compass } from 'lucide-react';
import { WhatsAppIcon } from './FloatingWhatsApp';

interface NotFoundProps {
  onGoHome?: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome }) => {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGoHome) {
      onGoHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.history.pushState({}, '', `/#${sectionId}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${clinic.name}, I encountered a missing page on your website and would like information regarding clinic consultation.`
  );
  const whatsappUrl = `https://wa.me/${clinic.whatsappRaw}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2522] flex flex-col font-sans selection:bg-[#153A2A] selection:text-white">
      {/* Top Header */}
      <header className="border-b border-[#E5DFD4] bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <picture className="w-11 h-11 shrink-0">
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/logo.jpeg"
                alt={clinic.name}
                width={44}
                height={44}
                loading="eager"
                decoding="async"
                className="w-11 h-11 object-contain rounded-full border border-[#D1C7B7] bg-white p-0.5 shadow-xs transition-transform group-hover:scale-105"
              />
            </picture>
            <div>
              <span className="font-serif font-bold text-lg sm:text-xl text-[#153A2A] leading-tight block">
                {clinic.name}
              </span>
              <span className="text-[11px] sm:text-xs text-[#52635B] font-medium tracking-wide block">
                {clinic.tagline}
              </span>
            </div>
          </a>

          <a
            href="/"
            onClick={handleHomeClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#153A2A] hover:text-[#0E271C] bg-[#E8EFEA] hover:bg-[#D9E6DD] px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </a>
        </div>
      </header>

      {/* Main 404 Content */}
      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center">
          {/* Badge & Number */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE4D7] border border-[#D5CCC0] text-xs font-medium text-[#7C5A24] mb-6">
            <Compass className="w-3.5 h-3.5 text-[#C8A97E]" />
            <span>Diagnosis: 404 · Page Not Located</span>
          </div>

          <div className="relative mb-6">
            <h1 className="text-7xl sm:text-9xl font-serif font-bold text-[#153A2A]/15 select-none tracking-widest">
              404
            </h1>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#153A2A]">
                Page Not Found
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#4E5E57] max-w-lg mx-auto leading-relaxed mb-8">
            The page or consultation resource you are searching for might have been moved, renamed, or is temporarily unavailable. Let us help you find what you need.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            <a
              href="/"
              onClick={handleHomeClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#153A2A] hover:bg-[#0E271C] text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4 text-[#D8E6DD]" />
              <span>Back to Homepage</span>
            </a>

            <a
              href={`tel:${clinic.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-[#CBD9CE] hover:border-[#153A2A] text-[#153A2A] text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#153A2A]" />
              <span>Call Clinic ({clinic.phone})</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" size={18} />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Quick Helpful Directory Links */}
          <div className="bg-white border border-[#E5DFD4] rounded-2xl p-6 sm:p-8 text-left shadow-xs">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#52635B] mb-4 flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#153A2A]" />
              <span>Popular Clinic Resources</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <button
                type="button"
                onClick={() => handleNavigateToSection('about')}
                className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-[#F5F2EA] transition-colors text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0 group-hover:bg-[#153A2A] group-hover:text-white transition-colors">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-medium text-[#183628] block">About Dr. B. Bhattacharyya Clinic</span>
                  <span className="text-xs text-[#6B7C73] block">Classical homeopathic philosophy</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNavigateToSection('treatments')}
                className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-[#F5F2EA] transition-colors text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0 group-hover:bg-[#153A2A] group-hover:text-white transition-colors">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-medium text-[#183628] block">Clinical Areas &amp; Care</span>
                  <span className="text-xs text-[#6B7C73] block">Chronic conditions &amp; lifestyle disorders</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNavigateToSection('process')}
                className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-[#F5F2EA] transition-colors text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0 group-hover:bg-[#153A2A] group-hover:text-white transition-colors">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-medium text-[#183628] block">Consultation Process</span>
                  <span className="text-xs text-[#6B7C73] block">In-clinic &amp; pan-India parcel care</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNavigateToSection('contact')}
                className="flex items-center gap-2.5 p-3 rounded-xl hover:bg-[#F5F2EA] transition-colors text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0 group-hover:bg-[#153A2A] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-medium text-[#183628] block">Location &amp; Timings</span>
                  <span className="text-xs text-[#6B7C73] block">East Patel Nagar, Patna</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-[#E5DFD4] py-6 text-center text-xs text-[#6B7C73]">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 {clinic.name} · All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
