import React from 'react';
import { UserCheck, ShieldCheck, Heart, Sparkles, MessageCircleQuestion, RefreshCw } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const WhyChooseUs: React.FC = React.memo(() => {
  const reasons = [
    {
      icon: UserCheck,
      number: "01",
      title: "Personalised Consultation",
      description: "Every consultation begins by understanding the individual’s unique concerns, physical sensitivities, and clinical history in unhurried depth."
    },
    {
      icon: Heart,
      number: "02",
      title: "Patient-Centred Care",
      description: "We cultivate a welcoming, pressure-free atmosphere where you can speak candidly, ask questions, and share personal health experiences."
    },
    {
      icon: Sparkles,
      number: "03",
      title: "Thoughtful Approach",
      description: "We focus on understanding the complete individual rather than using generic, one-size-fits-all remedy combinations."
    },
    {
      icon: ShieldCheck,
      number: "04",
      title: "Comfortable Experience",
      description: "From tranquil consultation spaces at our homeopathy clinic in Patna to attentive patient care, every interaction is calm, organised, and respectful."
    },
    {
      icon: MessageCircleQuestion,
      number: "05",
      title: "Clear Communication",
      description: "We explain the philosophy behind your homeopathic recommendations and outline next steps in clear, accessible language."
    },
    {
      icon: RefreshCw,
      number: "06",
      title: "Follow-Up Support",
      description: "Consistent progress reviews ensure adjustments can be made thoughtfully as your vitality and health patterns evolve."
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={25}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wider text-[#153A2A] uppercase">
                The Clinic Difference
              </span>
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#153A2A] tracking-tight mb-4">
              Why Patients Choose Dr. B. Bhattacharyya Clinic
            </h2>

            <p className="text-base sm:text-lg text-[#52635C] leading-relaxed">
              When searching for trusted homeopathic care in Patna, patients turn to the experienced doctors available at our clinic for respectful care, unhurried listening, and classical constitutional treatment.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.title}
                direction="up"
                distance={24}
                delay={index * 90}
              >
                <div className="h-full bg-[#F8F5EE] border border-[#E7E0D3] rounded-2xl p-7 relative transition-all duration-300 hover:border-[#153A2A]/40 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#E6EFE8] text-[#153A2A] flex items-center justify-center">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <span className="text-sm font-mono text-[#8C9F95] font-semibold">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#183628] mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4E5E57] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
});

WhyChooseUs.displayName = 'WhyChooseUs';

