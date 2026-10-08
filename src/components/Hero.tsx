import React, { useState } from 'react';
import { ArrowRight, PhoneCall, Camera, Image as ImageIcon } from 'lucide-react';
import { clinic } from '../config/clinic';
import ShinyText from './ui/ShinyText';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreTreatments: () => void;
}

export const Hero: React.FC<HeroProps> = React.memo(({ onOpenBooking, onExploreTreatments }) => {
  // Supported candidate image names in priority order with modern WebP first
  const candidateImages = [
    '/doctor.webp',
    '/doctor.jpeg',
    '/doctor.jpg',
    '/doctor.png',
    '/hero.jpeg',
    '/hero.jpg',
    '/hero.png',
  ];
  const [imageIndex, setImageIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const handleImageError = () => {
    if (imageIndex + 1 < candidateImages.length) {
      setImageIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };
  return (
    <section id="home" className="relative pt-32 pb-18 md:pt-40 md:pb-24 overflow-hidden bg-[#FAF8F5]">
      {/* Hero Background Image with responsive WebP picture and soft atmospheric wash */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-background-mobile.webp" type="image/webp" />
          <source srcSet="/hero-background.webp" type="image/webp" />
          <img
            src="/hero-background.jpg"
            alt=""
            width={1400}
            height={935}
            loading="eager"
            fetchPriority="low"
            decoding="async"
            aria-hidden="true"
            className="w-full h-full object-cover object-center lg:object-right opacity-35"
          />
        </picture>

        {/* Atmospheric gradient overlays: ensures comfortable text legibility on the left while showcasing the serene clinic interior on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/85 to-[#FAF8F5]/45 lg:from-[#FAF8F5]/95 lg:via-[#FAF8F5]/75 lg:to-[#FAF8F5]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-transparent to-[#FAF8F5]" />
      </div>

      {/* Subtle organic background foliage watermark graphic */}
      <div className="absolute top-12 right-0 z-0 w-96 h-96 opacity-20 pointer-events-none blur-3xl bg-[#D4E4D7] rounded-full" />
      <div className="absolute bottom-4 left-1/4 z-0 w-80 h-80 opacity-15 pointer-events-none blur-2xl bg-[#E8DEC8] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content with staggered fluid entrance */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Eyebrow: Unboxed text metadata */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="w-6 h-px bg-[#153A2A]" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wider text-[#153A2A] uppercase">
                Homeopathic Clinic in Patna
              </span>
              <span className="text-xs text-[#8A9C93]">·</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2C5240] bg-[#E5EFE8] px-2 py-0.5 rounded-full">
                <span>Classical Care</span>
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#153A2A] leading-[1.2] tracking-tight mb-5 sm:mb-6 text-balance">
              <ShinyText
                text="A Journey Towards"
                color="#153A2A"
                shineColor="#82D9A9"
                speed={2.5}
                spread={120}
                direction="left"
              />{' '}
              <span className="italic font-normal text-[#255740]">
                <ShinyText
                  text="Balance, Wellness & You."
                  color="#255740"
                  shineColor="#F5D061"
                  speed={2.5}
                  spread={120}
                  direction="left"
                  delay={0.25}
                />
              </span>
            </h1>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg lg:text-xl text-[#4A5952] font-normal leading-relaxed max-w-2xl mb-6 sm:mb-8">
              Dr. B. Bhattacharyya Clinic provides personalised homeopathic consultation and care in Patna, with experienced consulting doctors dedicated to understanding individual health concerns. Online consultations are also available for patients at a distance, with prescribed medicines carefully parcelled directly to your doorstep.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4">
              <a
                href={`tel:${clinic.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-medium text-white bg-[#153A2A] hover:bg-[#0E271C] active:bg-[#081811] rounded-lg transition-all shadow-xs hover:shadow-md cursor-pointer group hover:-translate-y-0.5"
              >
                <PhoneCall className="w-5 h-5 text-[#D8E6DD]" aria-hidden="true" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 text-[#D8E6DD] transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onExploreTreatments}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-medium text-[#1E3B2D] hover:text-[#0D2118] bg-[#EAE3D6]/70 hover:bg-[#E2DACB] rounded-lg transition-colors cursor-pointer"
              >
                <span>Explore Treatments</span>
              </button>
            </div>

            {/* Local Availability Prompt */}
            <p className="text-xs text-[#5D6F66] mb-6 sm:mb-8 flex items-start sm:items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2C694D] shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
              <span>In-clinic consultations in Patna &amp; remote online consultations with pan-India medicine parcel delivery.</span>
            </p>

            {/* Unboxed Trust Signals */}
            <div className="pt-5 sm:pt-6 border-t border-[#E3DBD0] flex flex-wrap items-center gap-x-2 sm:gap-x-3.5 gap-y-2 text-xs lg:text-[13px] tracking-tight text-[#54645D]">
              <span className="font-semibold text-[#153A2A]">In-Clinic &amp; Online Consults</span>
              <span className="text-[#5F7A6C] font-normal select-none hidden sm:inline" aria-hidden="true">•</span>
              <span className="font-medium text-[#1B3026]">Doorstep Medicine Parcels</span>
              <span className="text-[#5F7A6C] font-normal select-none hidden sm:inline" aria-hidden="true">•</span>
              <span className="font-medium text-[#1B3026]">Personalised Constitutional Care</span>
            </div>
          </div>

          {/* Right Column: High-End Clinic Visual Composition */}
          <div className="lg:col-span-5 relative animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Backing warm organic accent card */}
              <div className="absolute -inset-2.5 bg-gradient-to-tr from-[#C9DCCE]/50 via-[#EFE7D8]/70 to-[#D7E5DB]/60 rounded-3xl transform rotate-1 scale-[1.02] -z-10 shadow-sm" />

              {/* Main Visual Presentation Container - Exact Aspect Fit */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#E2D9CC] bg-[#FAF8F5] aspect-[1079/746] group">
                {/* When image is loading/available */}
                {!allFailed && (
                  <picture className="w-full h-full block">
                    <source srcSet="/doctor.webp" type="image/webp" />
                    <img
                      src={candidateImages[imageIndex]}
                      alt="Dr. B. Bhattacharyya Clinic - Homeopathic Clinic in Patna"
                      width={1079}
                      height={746}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      onError={handleImageError}
                      className="w-full h-full object-cover object-center"
                    />
                  </picture>
                )}

                {/* Dedicated Image Space & Instructions (displayed only when awaiting user's image upload) */}
                {allFailed && (
                  <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-[#1C4332] via-[#153627] to-[#0D241A] text-white">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#CBDCCF] font-medium">
                        <Camera className="w-4 h-4 text-[#E3CCA9]" aria-hidden="true" />
                        <span>Doctor / Clinic Image Slot</span>
                      </div>
                      <span className="text-xs text-[#E3CCA9] font-mono bg-white/10 px-2.5 py-0.5 rounded border border-white/15">
                        doctor.jpeg
                      </span>
                    </div>

                    {/* Center Notice & Frame Area */}
                    <div className="my-auto text-center py-4 px-2">
                      <div className="w-16 h-16 mx-auto mb-3.5 rounded-2xl bg-white/10 border-2 border-dashed border-[#8EBFA0]/60 flex items-center justify-center text-[#E3CCA9] shadow-inner group-hover:scale-105 transition-transform">
                        <ImageIcon className="w-8 h-8 text-[#E3CCA9]" aria-hidden="true" />
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] font-semibold mb-1.5">
                        Space Reserved for Photo
                      </h3>
                      <p className="text-xs sm:text-sm text-[#B7D1C0] max-w-xs mx-auto mb-3 leading-relaxed">
                        Ready to display your photo here. Expected file name:
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/20 text-[#F5E6CC] font-mono text-xs">
                        <span>doctor.jpeg</span>
                        <span className="text-[#89A694]">or</span>
                        <span>doctor.jpg</span>
                      </div>
                      <p className="text-[11px] text-[#8FB59D] mt-3">
                        Recommended: 4:3 or 5:4 aspect ratio (min 800×600px)
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-3.5 border-t border-[#2F5A44]/60 flex items-center justify-between text-xs text-[#B5D0BD]">
                      <span>Dr. B. Bhattacharyya Clinic Patna</span>
                      <span className="text-[#E5D2B4]">Classical Healing</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

