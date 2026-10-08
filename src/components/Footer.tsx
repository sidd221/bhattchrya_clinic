import React, { useState } from 'react';
import { clinic } from '../config/clinic';
import { WhatsAppIcon } from './FloatingWhatsApp';
import { ShieldCheck, Phone, Mail, MapPin, X, Facebook } from 'lucide-react';

export const Footer: React.FC = React.memo(() => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  const navLinks = [
    { label: 'About Clinic', href: '#about' },
    { label: 'Consultation Steps', href: '#process' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Areas of Care', href: '#treatments' },
    { label: 'Clinic Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="footer" className="bg-[#0E271C] text-[#E5EFE8] pt-16 pb-24 sm:pb-16 border-t border-[#1C4331]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          {/* Brand & Mission */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-3">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A675] rounded-full"
                title="Scroll to top of website"
                aria-label="Scroll to top of website"
              >
                <picture className="w-10 h-10 block">
                  <source srcSet="/logo.webp" type="image/webp" />
                  <img
                    src="/logo.jpeg"
                    alt={clinic.name}
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 object-contain rounded-full border border-white/20 bg-white p-0.5 shadow-xs hover:border-[#C9A675] transition-colors"
                  />
                </picture>
              </button>
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-inherit font-inherit text-left hover:text-[#D1B28C] transition-colors cursor-pointer inline-flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A675] rounded"
                  title="Scroll to top of website"
                  aria-label="Scroll to top of website"
                >
                  <span>{clinic.name}</span>
                </button>
              </h2>
            </div>
            <p className="text-sm text-[#A5C2B0] max-w-sm mb-6 leading-relaxed">
              Dr. B. Bhattacharyya Clinic leads a trusted classical homeopathy clinic in Patna, Bihar, offering compassionate, patient-focused consultations and root-cause healing.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={clinic.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#1877F2] text-[#D8EADB] hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105"
                aria-label="Dr. B. Bhattacharyya Clinic on Facebook"
                title="Follow Dr. B. Bhattacharyya Clinic on Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-widest text-[#B5D5C1] font-semibold mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#92B59F]">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h3 className="text-xs uppercase tracking-widest text-[#B5D5C1] font-semibold mb-4">
              Contact &amp; Hours
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-[#9BBBA6]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A675] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Dr. B. Bhattacharyya Clinic Patna</span>
                  <span className="text-xs text-[#A5C2B0] leading-relaxed block mt-0.5">
                    {clinic.address.line1}, {clinic.address.line2}, {clinic.address.city}, {clinic.address.state} {clinic.address.postalCode}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A675] shrink-0" />
                <a href={`tel:${clinic.phoneRaw}`} className="hover:text-white transition-colors">
                  {clinic.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" size={16} />
                <a
                  href={`https://wa.me/${clinic.whatsappRaw}?text=${encodeURIComponent('Hello, I want to book an appointment with the doctor at Dr. B. Bhattacharyya Clinic.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {clinic.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A675] shrink-0" />
                <a href={`mailto:${clinic.email}`} className="hover:text-white transition-colors truncate">
                  {clinic.email}
                </a>
              </div>
              <div className="pt-2 border-t border-white/10 text-xs text-[#8BAE97] space-y-1">
                <div><span className="text-white font-medium">Hours:</span> {clinic.openingHours.weekdays}</div>
                <div className="text-white/80">{clinic.openingHours.sunday}</div>
                <div className="text-[#E5B574] font-medium text-[11px] pt-0.5">Note: Book your slot 1 day prior</div>
                <div className="text-[#B5D5C1] text-[11px] pt-1 border-t border-white/5">
                  <span className="font-semibold text-white">Modes:</span> In-clinic (Patna) &amp; Online consultation with medicine parcel delivery across India.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#8BAE97] leading-relaxed mb-10 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#C9A675] shrink-0 mt-0.5" />
          <p>
            <strong>Medical Disclaimer:</strong> This website provides general educational information about homeopathic consultation and clinic services. It is not intended to replace professional medical advice, diagnosis, or emergency healthcare. Individual patient outcomes, response timelines, and treatment experiences naturally vary.
          </p>
        </div>

        {/* Bottom Bar: Copyright, Credits & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7B9E87]">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-center sm:text-left">
            <span>© 2026 {clinic.name} · All rights reserved.</span>
            <span className="hidden sm:inline select-none" aria-hidden="true">·</span>
            <span>
              Designed by{' '}
              <a
                href="https://siddhantsinha.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A5C2B0] hover:text-white font-medium underline underline-offset-2 transition-colors"
              >
                Siddhant Sinha
              </a>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setActiveModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Consultation
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveModal('disclaimer')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Medical Disclaimer
            </button>
          </div>
        </div>
      </div>

      {/* Legal Information Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
        >
          <div className="bg-[#FAF8F5] text-[#1E2522] max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-xl border border-[#E4DCCE] relative">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-[#5A6D65] hover:text-[#153A2A] rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'privacy' && (
              <div>
                <h3 className="text-xl font-serif font-bold text-[#153A2A] mb-3">Privacy Policy</h3>
                <p className="text-xs text-[#4F6058] leading-relaxed mb-4">
                  At {clinic.name}, patient confidentiality is strictly observed. Any personal details, contact information, or health records submitted through this website or during consultations are maintained securely and never shared with third parties for marketing purposes.
                </p>
                <p className="text-xs text-[#4F6058] leading-relaxed">
                  Information provided in consultation request forms is utilized solely to schedule appointments and provide direct clinical communication.
                </p>
              </div>
            )}

            {activeModal === 'terms' && (
              <div>
                <h3 className="text-xl font-serif font-bold text-[#153A2A] mb-3">Terms of Consultation</h3>
                <p className="text-xs text-[#4F6058] leading-relaxed mb-4">
                  Consultation appointments are scheduled in advance. If you need to reschedule or cancel your slot, we appreciate at least 24 hours prior notice so the dedicated time may be offered to other waiting patients.
                </p>
                <p className="text-xs text-[#4F6058] leading-relaxed">
                  Homeopathic remedies and consultation advice are tailored specifically to the named individual and should not be shared with family members without professional evaluation.
                </p>
              </div>
            )}

            {activeModal === 'disclaimer' && (
              <div>
                <h3 className="text-xl font-serif font-bold text-[#153A2A] mb-3">Medical Disclaimer</h3>
                <p className="text-xs text-[#4F6058] leading-relaxed mb-4">
                  The information published on this website is for general educational and informational purposes only. It should not be construed as specific medical advice, diagnosis, or treatment prescription.
                </p>
                <p className="text-xs text-[#4F6058] leading-relaxed">
                  Always seek the advice of your qualified healthcare provider with any questions you may have regarding a medical condition. In case of acute emergency, please contact your nearest hospital emergency department immediately.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#E8E1D5] text-right">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#153A2A] hover:bg-[#0E271C] rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
});

Footer.displayName = 'Footer';

