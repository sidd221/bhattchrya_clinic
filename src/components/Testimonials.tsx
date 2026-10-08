import React from 'react';
import { testimonialsData } from '../data/testimonials';
import { Star, ExternalLink, CheckCircle } from 'lucide-react';
import { clinic } from '../config/clinic';
import { ScrollReveal } from './ScrollReveal';

export const Testimonials: React.FC = React.memo(() => {
  return (
    <section id="testimonials" className="py-20 lg:py-24 bg-[#F5F2E9] border-t border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={25}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wider text-[#153A2A] uppercase">
                Verified Patient Reflections
              </span>
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#153A2A] tracking-tight mb-4">
              What Our Patients Say
            </h2>

            <p className="text-base sm:text-lg text-[#52635C] leading-relaxed mb-6">
              Genuine experiences shared by patients on our official Google Business Profile.
            </p>

            {/* Google Rating Pill & Direct Action Button */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-2 bg-[#FAF8F5] border border-[#E3DBD0] rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 px-3 py-1">
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#153A2A] text-sm">4.8 / 5.0</span>
                  <div className="flex text-[#E8A317]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E8A317]" aria-hidden="true" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-[#6C7E76] font-medium">• Google Verified</span>
              </div>

              <a
                href={clinic.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#153A2A] text-white hover:bg-[#0E281C] transition-colors text-xs sm:text-sm font-medium shadow-sm hover:shadow active:scale-[0.98]"
              >
                <span>Write a Google Review</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item, index) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              distance={24}
              delay={index * 120}
            >
              <div className="h-full bg-[#FAF8F5] border border-[#E4DCCE] rounded-2xl p-7 flex flex-col justify-between shadow-xs relative transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div>
                  {/* Google Review Header & Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white border border-[#E4DCCE] flex items-center justify-center shadow-xs">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-semibold text-[#153A2A] tracking-wide uppercase">
                        Google Review
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5 text-[#E8A317]">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E8A317]" aria-hidden="true" />
                      ))}
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="font-serif italic text-base text-[#2A3B33] leading-relaxed mb-6">
                    “{item.content}”
                  </p>
                </div>

                {/* Attribution and Google Verified Metadata */}
                <div className="pt-4 border-t border-[#EFE9DF]">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-[#183628]">
                        <span>{item.author}</span>
                        {item.isGoogleVerified && (
                          <span title="Verified Patient Review" className="inline-flex">
                            <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" />
                          </span>
                        )}
                      </div>
                      <span className="text-[#687B72] text-[11px]">
                        {item.date}
                      </span>
                    </div>
                    <span className="text-[#84968C] text-[11px] text-right">
                      {item.consultationTopic}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Google Reviews Direct CTA Section */}
        <div className="mt-12 p-6 sm:p-8 bg-[#FAF8F5] border border-[#E4DCCE] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#153A2A] mb-1">
              Have you consulted with the doctors at Dr. B. Bhattacharyya Clinic?
            </h4>
            <p className="text-sm text-[#596B62]">
              Your feedback helps other families find thoughtful, individualised homeopathic care.
            </p>
          </div>

          <a
            href={clinic.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#153A2A] text-white hover:bg-[#0E281C] transition-all font-medium text-sm shadow-md hover:shadow-lg active:scale-95 shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Leave a Review on Google</span>
            <ExternalLink className="w-4 h-4 ml-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';

