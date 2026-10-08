import React from 'react';
import { UserCheck, PackageCheck, Home, Heart } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TrustStrip: React.FC = React.memo(() => {
  const trustPoints = [
    {
      icon: UserCheck,
      title: "Personalised Care",
      description: "Individual attention and bespoke remedy selection for every patient."
    },
    {
      icon: PackageCheck,
      title: "In-Clinic & Online",
      description: "Visit in Patna or consult online with medicines safely parcelled to your doorstep."
    },
    {
      icon: Home,
      title: "Comfortable Environment",
      description: "A welcoming, unhurried space designed entirely around patient peace."
    },
    {
      icon: Heart,
      title: "Patient First",
      description: "Clear communication, active listening, and compassionate guidance."
    }
  ];

  return (
    <section className="relative z-10 border-y border-[#E6E0D4] bg-[#F7F4EC]/80 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <ScrollReveal
                key={point.title}
                direction="up"
                delay={index * 120}
                distance={20}
              >
                <div className="flex items-start gap-4 p-2 transition-transform duration-200">
                  <div className="p-2.5 bg-[#E7EFE9] text-[#153A2A] rounded-lg shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#163628] tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-xs text-[#52635B] mt-1 leading-relaxed">
                      {point.description}
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

TrustStrip.displayName = 'TrustStrip';

