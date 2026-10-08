import React, { useEffect } from 'react';
import { Treatment } from '../data/treatments';
import { clinic } from '../config/clinic';
import { X, AlertCircle, CheckCircle, HelpCircle, ArrowRight, PhoneCall } from 'lucide-react';

interface TreatmentDetailModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBookConsultation: (treatmentName?: string) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  treatment,
  onClose,
  onBookConsultation
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (treatment) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [treatment, onClose]);

  if (!treatment) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Backdrop click handler */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E7E1D4] overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Header with image cover */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden shrink-0">
          <picture className="w-full h-full block">
            <source
              srcSet={treatment.imageUrl.replace(/\.(jpg|jpeg)$/, '.webp')}
              type="image/webp"
            />
            <img
              src={treatment.imageUrl}
              alt={treatment.imageAlt || treatment.name}
              width={736}
              height={460}
              loading="eager"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                const parent = target.parentElement;
                if (parent && parent.tagName === 'PICTURE') {
                  const sources = parent.querySelectorAll('source');
                  sources.forEach((s) => s.remove());
                }
                if (treatment.fallbackImageUrl && target.src !== treatment.fallbackImageUrl) {
                  target.src = treatment.fallbackImageUrl;
                }
              }}
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-white/20 text-white backdrop-blur-md border border-white/20 mb-1.5">
              {treatment.tag}
            </span>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow-sm">
              {treatment.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-[#3D4C46]">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#153A2A] mb-2">
              Clinical Overview
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-[#2C3B34]">
              {treatment.detailedOverview}
            </p>
          </div>

          {/* Topics Discussed */}
          <div className="bg-[#F5F1E8] p-5 sm:p-6 rounded-xl border border-[#E4DDD0]">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#153A2A] mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#20573F]" />
              <span>What You May Discuss During Consultation</span>
            </h3>
            <ul className="space-y-2 text-sm text-[#45544E]">
              {treatment.topicsDiscussed.map((topic, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#20573F] font-bold mt-0.5">•</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How Consultation Works */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#153A2A] mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#B88E57]" />
              <span>How Consultation Works</span>
            </h3>
            <p className="text-sm leading-relaxed text-[#4A5952]">
              {treatment.consultationProcess}
            </p>
          </div>

          {/* When to Seek Immediate Attention */}
          <div className="bg-[#FAF2EB] border border-[#ECD9C6] p-5 rounded-xl text-sm">
            <h3 className="font-semibold text-[#8C4318] mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#B45309]" />
              <span>When to Seek Immediate Emergency or Conventional Medical Care</span>
            </h3>
            <p className="text-xs text-[#7A4B29] mb-2">
              Homeopathy is a gentle, constitutional modality. Please seek urgent hospital or emergency medical evaluation if you experience:
            </p>
            <ul className="space-y-1.5 text-xs text-[#6F4324]">
              {treatment.whenToSeekImmediateCare.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#B45309] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Educational Disclaimer */}
          <div className="pt-4 border-t border-[#E8E1D5] text-xs text-[#708078] italic leading-relaxed">
            <strong>Medical Disclaimer:</strong> Information provided on this website is for general educational purposes and does not replace professional medical advice, diagnosis, or emergency care. Individual health responses and consultation outcomes naturally vary.
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="sticky bottom-0 z-20 bg-[#FAF8F5] px-6 sm:px-8 py-4 border-t border-[#E8E1D5] flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-[#4E5E57] hover:text-[#183B2C] hover:bg-[#EAE4D7] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>

          <a
            href={`tel:${clinic.phoneRaw}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#153A2A] hover:bg-[#0E271C] rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#D8E6DD]" />
            <span>Call to Consult: {clinic.phone}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
