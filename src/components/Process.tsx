import React from 'react';
import { CalendarCheck2, Stethoscope, PackageCheck, RefreshCw, PhoneCall, Truck, Users, Star } from 'lucide-react';
import { clinic } from '../config/clinic';
import { ScrollReveal } from './ScrollReveal';
import { AnimatedCounter } from './AnimatedCounter';

interface ProcessProps {
  onOpenBooking: () => void;
}

export const Process: React.FC<ProcessProps> = React.memo(({ onOpenBooking }) => {
  const steps = [
    {
      step: "01",
      icon: CalendarCheck2,
      title: "Book",
      description: "Reserve your appointment online, by phone, or WhatsApp — choosing an in-clinic visit in Patna or an online consultation."
    },
    {
      icon: Stethoscope,
      step: "02",
      title: "Consult",
      description: "Discuss your health journey unhurriedly with experienced doctors available at Dr. B. Bhattacharyya Clinic in person at the clinic or over video/phone call."
    },
    {
      step: "03",
      icon: PackageCheck,
      title: "Remedies & Parcel",
      description: "Collect your personalised remedies at the clinic, or have them safely packed and parcelled directly to your doorstep across India."
    },
    {
      step: "04",
      icon: RefreshCw,
      title: "Follow Up",
      description: "Track your progress and adapt treatments as your vitality improves, with medicine refills parcelled whenever needed."
    }
  ];

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#F6F3EC] border-t border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={25}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wider text-[#153A2A] uppercase">
                The Consultation Path
              </span>
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#153A2A] tracking-tight mb-4">
              How It Works
            </h2>

            <p className="text-base sm:text-lg text-[#52635C] leading-relaxed">
              A transparent 4-step path toward personalised homeopathic care — available at our clinic in Patna and online across India.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Desktop & Mobile */}
        <div className="relative">
          {/* Horizontal connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-[#D5DDD6] -translate-y-8 z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal
                  key={item.step}
                  direction="up"
                  distance={28}
                  delay={index * 120}
                >
                  <div className="h-full bg-[#FAF8F5] border border-[#E4DDD0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#153A2A]/40 transition-all hover:-translate-y-1">
                    <div>
                      {/* Step indicator & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[#153A2A] text-white flex items-center justify-center shadow-xs">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <span className="text-2xl font-serif font-bold text-[#B88E57]">
                          {item.step}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-[#183628] mb-2.5">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#50615A] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Remote Consultation & Pan-India Parcel Service Feature Card */}
        <ScrollReveal direction="up" distance={25} delay={300}>
          <div className="mt-12 bg-[#FAF8F5] border border-[#D5DDD7] rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex flex-col items-center gap-2 shrink-0 self-center sm:self-start">
                <div className="w-13 h-13 rounded-2xl bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0 shadow-xs">
                  <Truck className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#153A2A] bg-[#E5EFE8] px-2.5 py-0.5 rounded-full border border-[#CBDCCE] whitespace-nowrap shadow-2xs">
                  <AnimatedCounter end={5000} start={1} duration={2200} suffix="+" className="font-bold text-[#153A2A]" />
                  <span>Happy Patients</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#153A2A]">
                    Online Patient Care &amp; Delivery
                  </span>
                  <span className="text-[11px] font-medium text-[#7C5A24] bg-[#F7EFE1] px-2.5 py-0.5 rounded-full border border-[#E8DEC8]">
                    Parcelled Across India
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#183628] mb-1.5">
                  Consult from Anywhere — Medicines Delivered to Your Doorstep
                </h3>
                <p className="text-xs sm:text-sm text-[#4E5E57] leading-relaxed">
                  Can't visit our Patna clinic? Qualified doctors available at Dr. B. Bhattacharyya Clinic consult patients online via phone or video call. Following your comprehensive case analysis, genuine homeopathic remedies and clear dosage instructions are securely packed and parcelled to your address anywhere in India.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 5000+ Happy Patients Milestone Banner directly below the car card */}
        <ScrollReveal direction="up" distance={20} delay={380}>
          <div className="mt-6 max-w-4xl mx-auto bg-[#FAF8F5] border border-[#E3DBD0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-[#153A2A] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Users className="w-6 h-6 text-[#E2CCA8]" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-baseline justify-center sm:justify-start gap-2">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#153A2A]">
                    <AnimatedCounter
                      end={5000}
                      start={1}
                      duration={2400}
                      suffix="+"
                      className="font-serif font-bold text-[#153A2A]"
                    />
                  </span>
                  <span className="text-base sm:text-lg font-serif font-semibold text-[#8B6128]">
                    Happy Patients &amp; Families
                  </span>
                </div>
                <p className="text-xs text-[#52635B] mt-0.5">
                  Treated with root-cause classical homeopathic care across Patna and nationwide.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-1.5 shrink-0 border-t sm:border-t-0 sm:border-l border-[#DFD7C8] pt-3 sm:pt-0 sm:pl-5">
              <div className="flex items-center gap-1 text-[#E5A83B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-[#183628] bg-[#E7EFE9] px-2.5 py-0.5 rounded-full">
                5.0 Verified Google Rating
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom CTA to start process */}
        <ScrollReveal direction="up" distance={20} delay={450}>
          <div className="mt-12 text-center">
            <a
              href={`tel:${clinic.phoneRaw}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#153A2A] hover:bg-[#0E271C] rounded-lg transition-colors shadow-xs cursor-pointer hover:shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-[#D8E6DD]" />
              <span>Begin Step 01 — Book an Appointment</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

Process.displayName = 'Process';

