import React from 'react';
import { clinic } from '../config/clinic';
import { AppointmentForm } from './AppointmentForm';
import { WhatsAppIcon } from './FloatingWhatsApp';
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation, ShieldCheck, Sparkles, PackageCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ContactProps {
  initialTreatment?: string;
}

export const Contact: React.FC<ContactProps> = React.memo(({ initialTreatment }) => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={25}>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wider text-[#153A2A] uppercase">
                Visit Our Patna Clinic
              </span>
              <span className="w-5 h-px bg-[#153A2A]" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#153A2A] tracking-tight mb-4">
              Let's Start the Conversation.
            </h2>

            <p className="text-base sm:text-lg text-[#52635C] leading-relaxed">
              Connect with experienced homeopathic doctors at Dr. B. Bhattacharyya Clinic in Patna for personalised care, or reach out to ask any questions regarding our classical approach.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Split: Clinic Details & Maps on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Direct Contact Cards & Map */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="left" distance={30}>
              {/* Quick Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="bg-[#F8F5EE] border border-[#E6DFD2] rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-semibold text-[#183628] uppercase tracking-wider mb-1">
                    Phone Call
                  </h3>
                  <a
                    href={`tel:${clinic.phoneRaw}`}
                    className="text-sm font-semibold text-[#153A2A] hover:underline block"
                  >
                    {clinic.phone}
                  </a>
                  {clinic.secondaryPhone && (
                    <a
                      href={`tel:${clinic.secondaryPhoneRaw}`}
                      className="text-xs font-medium text-[#4E5E57] hover:underline block mt-1"
                    >
                      {clinic.secondaryPhone}
                    </a>
                  )}
                  <span className="text-xs text-[#6A7B73] mt-1 block">Mon–Sat during clinic hours</span>
                </div>

                {/* WhatsApp */}
                <div className="bg-[#F8F5EE] border border-[#E6DFD2] rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366] text-white flex items-center justify-center mb-3">
                    <WhatsAppIcon className="w-5 h-5 text-white" size={20} />
                  </div>
                  <h3 className="text-xs font-semibold text-[#183628] uppercase tracking-wider mb-1">
                    WhatsApp Message
                  </h3>
                  <a
                    href={`https://wa.me/${clinic.whatsappRaw}?text=${encodeURIComponent('Hello, Dr, I want to book an appointment.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#153A2A] hover:underline block"
                  >
                    {clinic.whatsapp}
                  </a>
                  <span className="text-xs text-[#6A7B73] mt-1 block">Instant consultation inquiries</span>
                </div>

                {/* Email */}
                <div className="bg-[#F8F5EE] border border-[#E6DFD2] rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg bg-[#EAE2D3] text-[#153A2A] flex items-center justify-center mb-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-semibold text-[#183628] uppercase tracking-wider mb-1">
                    Email Desk
                  </h3>
                  <a
                    href={`mailto:${clinic.email}`}
                    className="text-sm font-semibold text-[#153A2A] hover:underline block truncate"
                  >
                    {clinic.email}
                  </a>
                  <span className="text-xs text-[#6A7B73] mt-1 block">Reports &amp; clinical records</span>
                </div>

                {/* Timings */}
                <div className="bg-[#F8F5EE] border border-[#E6DFD2] rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-semibold text-[#183628] uppercase tracking-wider mb-1">
                    Visiting Hours
                  </h3>
                  <p className="text-xs text-[#2A3B33] font-medium leading-relaxed">
                    {clinic.openingHours.weekdays}
                  </p>
                  <span className="text-xs text-[#596B63] font-medium mt-0.5 block">
                    {clinic.openingHours.sunday}
                  </span>

                  <div className="mt-3 pt-2.5 border-t border-[#E6DFD2]">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8B6128] bg-[#F7EFE1] px-2.5 py-1 rounded-md border border-[#E9DCB8]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B88E57]" />
                      Homeopathic doctor appointment Patna: Prior day booking recommended
                    </span>
                  </div>
                </div>

                {/* Online Consultation & Parcel Delivery notice */}
                <div className="bg-[#FAF7F0] border border-[#D5DDD7] rounded-xl p-4 sm:col-span-2 flex items-start gap-3.5 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0 mt-0.5">
                    <PackageCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-xs font-bold text-[#183628] uppercase tracking-wider">
                        Online Consultation &amp; Medicine Parcel Service
                      </h4>
                      <span className="text-[10px] font-semibold bg-[#E2ECE5] text-[#153A2A] px-2 py-0.5 rounded-md">
                        Pan-India Delivery
                      </span>
                    </div>
                    <p className="text-xs text-[#52635B] leading-relaxed">
                      Residing outside Patna or unable to visit the clinic? Qualified doctors at Dr. B. Bhattacharyya Clinic consult patients online via phone or video call. Prescribed genuine homeopathic medicines are hygienically packed and dispatched directly to your doorstep across India.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Embedded Google Maps Container */}
            <ScrollReveal direction="up" distance={25} delay={150}>
              <div className="bg-[#F8F5EE] border border-[#E6DFD2] rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-[#E6DFD2] flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#153A2A] text-white shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#183628]">Dr. B. Bhattacharyya Clinic Patna</h3>
                      <p className="text-xs text-[#4F6058] mt-0.5">
                        {clinic.address.line1}, {clinic.address.line2}
                      </p>
                      <p className="text-xs text-[#4F6058]">
                        {clinic.address.city}, {clinic.address.state} {clinic.address.postalCode}
                      </p>
                    </div>
                  </div>

                  <a
                    href={clinic.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#153A2A] hover:underline shrink-0"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Map embed */}
                <div className="w-full bg-[#E5DFD4] relative h-[310px] sm:h-[350px]">
                  <iframe
                    title="Dr. B. Bhattacharyya Clinic Patna Location Map"
                    src={clinic.mapsEmbedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>

                {/* Direct 'Get Directions' Action Bar */}
                <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-[#52635C] text-center sm:text-left">
                    <span className="font-semibold text-[#183628]">Visiting our homeopathy clinic in Patna?</span> Open Google Maps for live GPS turn-by-turn navigation.
                  </div>

                  <a
                    href={clinic.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#153A2A] hover:bg-[#0E271C] active:bg-[#081811] text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all group shrink-0 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#D8E6DD] group-hover:scale-110 transition-transform" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 text-white/60 ml-0.5" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Consultation Request Form & Clinic Guidance */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right" distance={30} delay={150}>
              <AppointmentForm initialTreatment={initialTreatment} />
            </ScrollReveal>

            {/* Consultation Guidance & Clinic Standards Card */}
            <ScrollReveal direction="up" distance={20} delay={220}>
              <div className="bg-[#F8F5EE] border border-[#E6DFD2] rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#E6DFD2]">
                  <div className="w-9 h-9 rounded-lg bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-[#183628]">
                      Consultation Guidance &amp; Clinic Standards
                    </h3>
                    <p className="text-[11px] text-[#596B63]">
                      What you can expect when consulting the doctors at Dr. B. Bhattacharyya Clinic
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#183628]">
                        Prior Slot Scheduling
                      </h4>
                      <p className="text-[11px] text-[#52635C] leading-relaxed mt-0.5">
                        Please schedule consultations <strong>one day in advance</strong> to guarantee dedicated, unhurried time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#183628]">
                        In-Depth Evaluation
                      </h4>
                      <p className="text-[11px] text-[#52635C] leading-relaxed mt-0.5">
                        Case-taking thoroughly examines constitutional traits, root causes, mental stress, and past history.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#183628]">
                        Strict Confidentiality
                      </h4>
                      <p className="text-[11px] text-[#52635C] leading-relaxed mt-0.5">
                        All shared clinical records, lab investigations, and personal discussions remain confidential.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#E2ECE5] text-[#153A2A] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#183628]">
                        Local &amp; Remote Access
                      </h4>
                      <p className="text-[11px] text-[#52635C] leading-relaxed mt-0.5">
                        Convenient clinic visits with doctors available at our clinic in Patna, plus remote video consultations with courier dispatch for distant patients.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#E6DFD2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-[#596B63] flex items-center gap-1.5 text-center sm:text-left">
                    <Sparkles className="w-3.5 h-3.5 text-[#B88E57]" />
                    <span>Average reply time: <strong>Within 2–4 hours</strong> on clinic days</span>
                  </span>
                  <a
                    href={`tel:${clinic.phoneRaw}`}
                    className="font-semibold text-[#153A2A] hover:underline shrink-0"
                  >
                    Quick Call: {clinic.phone} →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

