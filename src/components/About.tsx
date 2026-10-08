import React from 'react';
import { ArrowRight, CheckCircle2, Feather, Sparkles } from 'lucide-react';
import { clinic } from '../config/clinic';
import { ScrollReveal } from './ScrollReveal';

interface AboutProps {
  onLearnMore: () => void;
}

export const About: React.FC<AboutProps> = React.memo(({ onLearnMore }) => {
  const principles = [
    {
      title: "Patient-Centred Consultation",
      description: "We allocate dedicated, uninterrupted time to listen carefully to your journey and symptoms."
    },
    {
      title: "Individualised Classical Care",
      description: "Homeopathic selections are tailored to your constitutional identity rather than generic formulas."
    },
    {
      title: "Comprehensive Health History",
      description: "We examine lifestyle, sleep, emotional stressors, and previous clinical reports in detail."
    },
    {
      title: "Comfortable & Respectful Setting",
      description: "A serene, confidential environment where you can speak freely without judgement or rush."
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition representing the Clinic Interior & Philosophy */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="left" distance={30} duration={800}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E7E0D3] bg-gradient-to-br from-[#F5F1E8] to-[#EAE3D5] p-5 sm:p-10">
                {/* Botanical watermark */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D2E4D6]/40 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#153A2A] uppercase mb-6">
                    <Feather className="w-4 h-4 text-[#B88E57]" aria-hidden="true" />
                    <span>The Clinic Ethos</span>
                  </div>

                  <blockquote className="font-serif text-2xl sm:text-3xl text-[#153A2A] leading-snug mb-6">
                    “Healing begins when the patient feels genuinely understood in their totality.”
                  </blockquote>

                  <p className="text-sm text-[#4E5E57] leading-relaxed mb-6">
                    Carrying forward an esteemed 80+ year heritage of classical healing, the qualified doctors available at <strong className="font-semibold text-[#183B2C]">Dr. B. Bhattacharyya Clinic in Patna</strong> adhere strictly to the foundational principles of Hahnemannian homeopathy. We believe that physical symptoms are meaningful signals of systemic imbalance. By understanding underlying constitutional tendencies, our consulting doctors nurture your body’s inherent capacity for lasting equilibrium and vitality.
                  </p>

                  <div className="mb-8 p-3.5 rounded-xl bg-white/70 border border-[#DFD8CB] text-xs text-[#4F6058] leading-relaxed">
                    <span className="font-semibold text-[#183B2C] block mb-0.5">Clinical Standards &amp; Care:</span>
                    Our <strong>homeopathy clinic in Patna</strong> provides authentic classical constitutional care with experienced resident doctors for patients across Bihar and remote consultations nationwide.
                  </div>

                  {/* Quiet editable practice details */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#DFD8CB] text-xs text-[#52635B]">
                    <div>
                      <span className="block font-medium text-[#1A382A]">Physical Practice</span>
                      <span className="text-[#64766E] mt-0.5 block">Dr. B. Bhattacharyya Clinic Patna</span>
                    </div>
                    <div>
                      <span className="block font-medium text-[#1A382A]">Clinical Tradition</span>
                      <span className="text-[#64766E] mt-0.5 block">Classical Hahnemannian</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle decorative bottom card */}
              <div className="mt-4 p-4 rounded-xl bg-[#EEF4F0] border border-[#CFDFD4] flex items-center justify-between text-xs text-[#284A3B]">
                <span className="font-medium">Confidential, unhurried patient intake</span>
                <span className="text-[#688E78]">45–60 min first visit</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative and Principles */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <ScrollReveal direction="right" distance={30} duration={800} delay={150}>
              {/* Small Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wider text-[#153A2A] uppercase">
                  About {clinic.name}
                </span>
              </div>

              {/* Section Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-serif font-bold text-[#153A2A] leading-tight mb-6 text-balance">
                Healthcare That Begins With Listening.
              </h2>

              {/* Body Prose */}
              <p className="text-base text-[#475750] leading-relaxed mb-8">
                True wellness requires more than temporary relief. For over 80+ years, families across Bihar have turned to Dr. B. Bhattacharyya Clinic when seeking authentic homeopathy treatment in Patna and compassionate constitutional care. Founded on the pioneering clinical heritage of late Dr. B. Bhattacharyya, the experienced consulting doctors available at the clinic listen to your complete story before offering personalised guidance.
              </p>

              {/* Principles list */}
              <div className="space-y-4 mb-8">
                {principles.map((p, idx) => (
                  <ScrollReveal key={p.title} direction="up" distance={15} delay={250 + idx * 80}>
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2 className="w-5 h-5 text-[#2B664C] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h3 className="text-sm font-semibold text-[#183628]">{p.title}</h3>
                        <p className="text-xs sm:text-sm text-[#53645D] mt-0.5 leading-relaxed">{p.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* CTA */}
              <div>
                <button
                  type="button"
                  onClick={onLearnMore}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#153A2A] hover:text-[#0A1F16] group cursor-pointer"
                >
                  <span>Learn More About Our Consultation Process</span>
                  <ArrowRight className="w-4 h-4 text-[#153A2A] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

