import React, { useState, useMemo, lazy, Suspense } from 'react';
import { treatmentsData, Treatment } from '../data/treatments';
import { clinic } from '../config/clinic';
import { WhatsAppIcon } from './FloatingWhatsApp';
import { ScrollReveal } from './ScrollReveal';

const TreatmentDetailModal = lazy(() =>
  import('./TreatmentDetailModal').then((m) => ({ default: m.TreatmentDetailModal }))
);
import {
  Salad,
  Wind,
  Sparkles,
  HeartHandshake,
  Smile,
  Activity,
  ShieldPlus,
  ArrowRight,
  PhoneCall,
  Droplets,
  Bone,
  Heart,
  Flame,
  Sun,
  ShieldAlert,
  Brain,
  Thermometer,
  Pill,
  Flower2,
  Baby,
  Droplet
} from 'lucide-react';

interface TreatmentsProps {
  onBookConsultation: (treatmentName?: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Wind,
  Droplets,
  Bone,
  Heart,
  Flame,
  Smile,
  Sun,
  Sparkles,
  ShieldAlert,
  Brain,
  Thermometer,
  Activity,
  Pill,
  Salad,
  Flower2,
  ShieldPlus,
  Baby,
  Droplet,
  HeartHandshake
};

const CATEGORIES = [
  'All Conditions (20)',
  'Respiratory & ENT',
  'Digestive & Anorectal',
  'Skin & Scalp',
  'Bones & Nerves',
  'Kidney & Urinary',
  'Specialized Care'
];

export const Treatments: React.FC<TreatmentsProps> = React.memo(({ onBookConsultation }) => {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [activeCategory, setActiveCategory] = useState('All Conditions (20)');

  const filteredTreatments = useMemo(() => {
    return treatmentsData.filter((item) => {
      if (activeCategory === 'Respiratory & ENT') {
        return ['asthma', 'sinusitis', 'tonsillitis', 'allergies'].includes(item.id);
      } else if (activeCategory === 'Digestive & Anorectal') {
        return ['stomach-gas', 'liver-disorders', 'piles-hemorrhoids', 'fistula-fissure'].includes(item.id);
      } else if (activeCategory === 'Skin & Scalp') {
        return ['vitiligo', 'hair-fall-alopecia', 'psoriasis'].includes(item.id);
      } else if (activeCategory === 'Bones & Nerves') {
        return ['arthritis-sciatica', 'spondylosis', 'migraine'].includes(item.id);
      } else if (activeCategory === 'Kidney & Urinary') {
        return ['kidney-stones', 'prostate-problems', 'uti'].includes(item.id);
      } else if (activeCategory === 'Specialized Care') {
        return ['pcod', 'pediatric-illnesses', 'sexual-health'].includes(item.id);
      }
      return true;
    });
  }, [activeCategory]);

  return (
    <section id="treatments" className="py-20 lg:py-28 bg-[#F5F2EA] border-t border-[#E8E1D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={25}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wider text-[#153A2A] uppercase">
                Clinical Focus · Classical Homeopathy Care in Patna
              </span>
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#153A2A] tracking-tight mb-4">
              Conditions We Treat
            </h2>
            <p className="text-base sm:text-lg text-[#4E5E57] font-normal leading-relaxed">
              Explore the 20 primary acute and chronic conditions evaluated at our clinic. Consulting doctors at Dr. B. Bhattacharyya Clinic analyse your constitutional totality, providing individualised, side-effect-free homeopathic remedies for patients in Patna and across India.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal direction="up" distance={20} delay={100}>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#153A2A] text-white shadow-xs'
                      : 'bg-white/80 hover:bg-white text-[#4A5D54] border border-[#D7DFD9]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredTreatments.map((item, index) => {
              const Icon = iconMap[item.iconName] || ShieldPlus;
              return (
                <ScrollReveal
                  key={item.id}
                  direction="up"
                  distance={24}
                  delay={Math.min(index * 40, 400)}
                  className="h-full"
                >
                  <div className="h-full rounded-2xl bg-[#FAF8F5] border border-[#E2DBD0] hover:border-[#153A2A]/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg group shadow-xs">
                    <div
                      onClick={() => setSelectedTreatment(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedTreatment(item);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`View clinical details for ${item.name}`}
                      className="h-full w-full flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-[#153A2A]"
                    >
                      {/* Top: Image Section with Tag Badge & Icon Overlay */}
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#E2DBD0]">
                        <picture className="w-full h-full block">
                          <source
                            srcSet={item.imageUrl.replace(/\.(jpg|jpeg)$/, '.webp')}
                            type="image/webp"
                          />
                          <img
                            src={item.imageUrl}
                            alt={item.imageAlt || item.name}
                            width={736}
                            height={460}
                            loading={index < 8 ? 'eager' : 'lazy'}
                            decoding="async"
                            onError={(e) => {
                              const target = e.currentTarget;
                              const parent = target.parentElement;
                              if (parent && parent.tagName === 'PICTURE') {
                                const sources = parent.querySelectorAll('source');
                                sources.forEach((s) => s.remove());
                              }
                              if (item.fallbackImageUrl && target.src !== item.fallbackImageUrl) {
                                target.src = item.fallbackImageUrl;
                              }
                            }}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                          />
                        </picture>

                        {/* Subtle scrim for badge contrast without darkening the image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

                        {/* Category Tag Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-[#153A2A]/90 text-white backdrop-blur-md shadow-xs border border-white/20">
                            {item.tag}
                          </span>
                        </div>

                        {/* Floating Circular Icon Badge */}
                        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 text-[#153A2A] flex items-center justify-center shadow-md backdrop-blur-xs group-hover:bg-[#153A2A] group-hover:text-white transition-colors duration-300">
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Below: Content & Description */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title */}
                          <h3 className="text-lg font-serif font-bold text-[#183628] mb-2 group-hover:text-[#153A2A] transition-colors leading-snug">
                            {item.name}
                          </h3>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed line-clamp-3 mb-4">
                            {item.shortDescription}
                          </p>
                        </div>

                        {/* Card Action Link */}
                        <div className="pt-3.5 border-t border-[#EFE8DD] flex items-center justify-between text-xs font-semibold text-[#153A2A] group-hover:text-[#0A1F16]">
                          <span>View Care Details</span>
                          <div className="w-6 h-6 rounded-full bg-[#EAE2D5] group-hover:bg-[#153A2A] group-hover:text-white flex items-center justify-center transition-colors">
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        {/* ============================================================== */}
        {/* DON'T SEE YOUR DISEASE / DIRECT CONSULTATION CALLOUT BANNER   */}
        {/* ============================================================== */}
        <ScrollReveal direction="up" distance={25} delay={150}>
          <div className="mt-12 lg:mt-16 rounded-2xl bg-gradient-to-br from-[#123123] via-[#163B2B] to-[#1C4633] text-white p-7 sm:p-9 lg:p-10 shadow-xl border border-[#2B543F] relative overflow-hidden">
            {/* Subtle decorative background glow */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 -mb-10 w-48 h-48 rounded-full bg-[#B88E57]/10 blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium tracking-wide mb-3.5 backdrop-blur-xs border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#E5B574] animate-pulse" />
                  <span>Holistic Consultation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight mb-3">
                  Don&apos;t see your disease or condition listed?
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                  Homeopathy treats the complete individual rather than just isolated diagnoses. If your specific symptoms or condition are not listed above, connect directly with our homeopathy clinic in Patna to discuss your health history and explore personalised care.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <a
                  href={`tel:${clinic.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-[#FAF8F5] active:bg-[#F2ECE1] text-[#153A2A] rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg group cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#153A2A] group-hover:scale-110 transition-transform" />
                  <span>Call Us: {clinic.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${clinic.whatsappRaw}?text=${encodeURIComponent('Hello, I want to book an appointment with the doctor at Dr. B. Bhattacharyya Clinic.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" size={18} />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Modal View */}
      {selectedTreatment && (
        <Suspense fallback={null}>
          <TreatmentDetailModal
            treatment={selectedTreatment}
            onClose={() => setSelectedTreatment(null)}
            onBookConsultation={onBookConsultation}
          />
        </Suspense>
      )}
    </section>
  );
});

Treatments.displayName = 'Treatments';

