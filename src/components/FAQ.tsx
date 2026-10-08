import React, { useState } from 'react';
import { faqData } from '../data/faq';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { clinic } from '../config/clinic';
import { ScrollReveal } from './ScrollReveal';

interface FAQProps {
  onOpenBooking: () => void;
}

export const FAQ: React.FC<FAQProps> = React.memo(({ onOpenBooking }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FAF8F5] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={25}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wider text-[#153A2A] uppercase">
                Common Inquiries
              </span>
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#153A2A] tracking-tight mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-base text-[#52635C] leading-relaxed">
              Everything you need to know about our homeopathic consultation process and booking.
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqData.map((item, index) => {
            const isOpen = openIds.includes(item.id);
            return (
              <ScrollReveal
                key={item.id}
                direction="up"
                distance={18}
                delay={index * 60}
              >
                <div
                  className="border border-[#E4DDD0] rounded-xl overflow-hidden bg-[#FAF8F5] transition-colors"
                >
                  <button
                    type="button"
                    id={`faq-btn-${item.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 hover:bg-[#F5F0E6] transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-serif font-medium text-[#183628]">
                      {item.question}
                    </span>
                    <div className={`p-1 text-[#153A2A] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      className="px-5 sm:px-6 pb-5 pt-1 text-sm text-[#4E5E57] leading-relaxed border-t border-[#EFE8DC]/60 animate-in fade-in duration-150"
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Still have questions? banner */}
        <ScrollReveal direction="up" distance={20} delay={250}>
          <div className="mt-12 p-6 rounded-2xl bg-[#EEF4F0] border border-[#CFDFD4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#153A2A] text-white shrink-0">
                <HelpCircle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#163628]">Have a specific inquiry?</h3>
                <p className="text-xs text-[#52635B] mt-0.5">
                  Our clinic coordinator is happy to help you with appointment scheduling.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${clinic.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#153A2A] hover:bg-[#0E271C] rounded-lg transition-colors whitespace-nowrap cursor-pointer w-full sm:w-auto shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Clinic: {clinic.phone}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

FAQ.displayName = 'FAQ';

