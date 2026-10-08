import React, { useState, useEffect } from 'react';
import { clinic } from '../config/clinic';
import { WhatsAppIcon } from './FloatingWhatsApp';
import { User, Phone, Mail, MessageSquare, CheckCircle2, X, Building2, Package, MapPin, Hash, Truck } from 'lucide-react';

interface AppointmentFormProps {
  initialTreatment?: string;
  onSuccess?: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialTreatment = '',
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consultationMode: 'clinic' as 'clinic' | 'online',
    cityOrAddress: '',
    pincode: '',
    message: initialTreatment ? `Consultation query regarding: ${initialTreatment}` : ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);
  const [countdown, setCountdown] = useState(5);

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      consultationMode: 'clinic',
      cityOrAddress: '',
      pincode: '',
      message: ''
    });
    setErrors({});
    setSubmittedData(null);
  };

  // Automatically dismiss confirmation screen after 5 seconds
  useEffect(() => {
    if (!submittedData) {
      setCountdown(5);
      return;
    }

    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [submittedData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact phone number.';
    } else if (!/^[0-9+-\s()]{8,18}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.consultationMode === 'online') {
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Please enter your 6-digit postal PIN code.';
      } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
        newErrors.pincode = 'Please enter a valid 6-digit Indian PIN code (e.g. 800001).';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createWhatsAppUrl = (data: typeof formData) => {
    const lines = [
      'Hello Dr. B. Bhattacharyya Clinic,',
      '',
      `• Name: ${data.name.trim()}`,
      `• Phone: ${data.phone.trim()}`,
      `• Consultation Mode: ${data.consultationMode === 'online' ? 'Online Consultation (Medicines to be Parcelled)' : 'In-Clinic Visit (Patna)'}`,
    ];
    if (data.consultationMode === 'online') {
      if (data.pincode.trim()) {
        lines.push(`• Delivery PIN Code: ${data.pincode.trim()}`);
      }
      if (data.cityOrAddress.trim()) {
        lines.push(`• Delivery Location: ${data.cityOrAddress.trim()}`);
      }
    }
    if (data.email.trim()) {
      lines.push(`• Email: ${data.email.trim()}`);
    }
    if (data.message.trim()) {
      lines.push(`• Message: ${data.message.trim()}`);
    }

    const text = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/919934298080?text=${text}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const whatsappUrl = createWhatsAppUrl(formData);

    // Automatically trigger WhatsApp submission
    try {
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      if (onSuccess) {
        onSuccess();
      }
    }, 400);
  };

  if (submittedData) {
    return (
      <div className="relative bg-[#FAF8F5] border border-[#CFDFD4] rounded-2xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-300 overflow-hidden">
        {/* Animated Countdown Progress Bar at top edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#E2ECE5]">
          <div
            className="h-full bg-[#153A2A] transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 5) * 100}%` }}
          />
        </div>

        {/* Immediate Close Button */}
        <button
          type="button"
          onClick={handleReset}
          aria-label="Close notification"
          className="absolute top-4 right-4 p-1.5 text-[#5B6D65] hover:text-[#153A2A] hover:bg-[#EAE4D7] rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-[#E2EFE6] text-[#153A2A] rounded-xl flex items-center justify-center mb-5">
          <CheckCircle2 className="w-7 h-7 text-[#153A2A]" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#153A2A]">
            Request Sent to WhatsApp
          </h3>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#153A2A] bg-[#E2ECE5] px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#153A2A] animate-ping" />
            <span>Closing in {countdown}s</span>
          </span>
        </div>

        <p className="text-sm text-[#4E5E57] mb-5 leading-relaxed">
          Thank you, <strong className="font-semibold text-[#183628]">{submittedData.name}</strong>. Your consultation details have been forwarded to WhatsApp (<span className="font-medium text-[#153A2A]">+91 9934298080</span>).
        </p>

        <div className="p-4 rounded-xl bg-[#F4EFE5] border border-[#E4DCCE] text-xs text-[#52635B] space-y-1.5 mb-6">
          <div><strong className="text-[#1A382A]">Name:</strong> {submittedData.name}</div>
          <div><strong className="text-[#1A382A]">Contact Phone:</strong> {submittedData.phone}</div>
          <div>
            <strong className="text-[#1A382A]">Consultation Mode:</strong>{' '}
            {submittedData.consultationMode === 'online' ? (
              <span className="text-[#183628] font-medium">Online Consultation (Medicines to be Parcelled)</span>
            ) : (
              <span className="text-[#183628] font-medium">In-Clinic Visit (Patna)</span>
            )}
          </div>
          {submittedData.consultationMode === 'online' && (
            <>
              {submittedData.pincode && <div><strong className="text-[#1A382A]">Delivery PIN Code:</strong> {submittedData.pincode}</div>}
              {submittedData.cityOrAddress && <div><strong className="text-[#1A382A]">Delivery City/State:</strong> {submittedData.cityOrAddress}</div>}
            </>
          )}
          {submittedData.email && <div><strong className="text-[#1A382A]">Email:</strong> {submittedData.email}</div>}
          {submittedData.message && <div><strong className="text-[#1A382A]">Message:</strong> {submittedData.message}</div>}
          <div className="pt-1 text-[#8B6128] font-medium">Dr. B. Bhattacharyya Clinic (+91 9934298080)</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={createWhatsAppUrl(submittedData)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-lg transition-colors shadow-xs"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" size={18} />
            <span>Open WhatsApp (+91 9934298080)</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-[#153A2A] hover:bg-[#EDE6D8] rounded-lg transition-colors cursor-pointer"
          >
            Dismiss Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#FAF8F5] border border-[#DDD3C4] hover:border-[#CDC0AD] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative top accent border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#153A2A] via-[#2A654C] to-[#C9A265]" />

      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#153A2A]">
          Send a Message / Consultation Request
        </h3>
        <p className="text-xs sm:text-sm text-[#54645E] mt-1.5 leading-relaxed">
          Schedule your consultation at <strong className="font-semibold text-[#153A2A]">Dr. B. Bhattacharyya Clinic Patna</strong> or request a remote online consultation with medicines parcelled directly to your doorstep.
        </p>
      </div>

      <div className="space-y-4">
        {/* Consultation Mode Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#183628] mb-1.5">
            How would you like to consult?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setFormData({ ...formData, consultationMode: 'clinic' });
                if (errors.pincode) setErrors({ ...errors, pincode: '' });
              }}
              className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                formData.consultationMode === 'clinic'
                  ? 'border-[#153A2A] bg-[#EAF2ED] text-[#153A2A] shadow-xs ring-1 ring-[#153A2A]/20'
                  : 'border-[#DCD4C7] bg-white text-[#52635B] hover:border-[#B5C7BB]'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${formData.consultationMode === 'clinic' ? 'bg-[#153A2A] text-white' : 'bg-[#EFE9DE] text-[#6A7C73]'}`}>
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block text-[#153A2A]">In-Clinic Visit</span>
                <span className="text-[11px] text-[#55675F] leading-tight block mt-0.5">
                  At East Patel Nagar, Patna
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, consultationMode: 'online' })}
              className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                formData.consultationMode === 'online'
                  ? 'border-[#153A2A] bg-[#EAF2ED] text-[#153A2A] shadow-xs ring-1 ring-[#153A2A]/20'
                  : 'border-[#DCD4C7] bg-white text-[#52635B] hover:border-[#B5C7BB]'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${formData.consultationMode === 'online' ? 'bg-[#153A2A] text-white' : 'bg-[#EFE9DE] text-[#6A7C73]'}`}>
                <Package className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block text-[#153A2A]">Online + Medicine Parcel</span>
                <span className="text-[11px] text-[#55675F] leading-tight block mt-0.5">
                  Phone/Video &amp; Home Delivery
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* When User Chooses Online Delivery: Prompt for Delivery PIN Code and Destination */}
        {formData.consultationMode === 'online' && (
          <div className="p-4 bg-[#F5EFE4] border border-[#DFCDB2] rounded-xl text-xs text-[#4F6057] animate-in fade-in slide-in-from-top-2 duration-200 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DAC2]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#153A2A]" />
                <span className="font-bold text-[#153A2A] text-xs">
                  Medicine Parcel Delivery Details
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[#8B6128] bg-[#FAF5EC] border border-[#E4D5BC] px-2.5 py-0.5 rounded-full">
                Pan-India Parcel
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Delivery PIN Code (Required for online delivery) */}
              <div className="sm:col-span-5">
                <label htmlFor="pincode" className="block text-xs font-semibold text-[#183628] mb-1">
                  Delivery PIN Code <span className="text-[#B91C1C]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7D8F86]">
                    <Hash className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setFormData({ ...formData, pincode: val });
                      if (errors.pincode) setErrors({ ...errors, pincode: '' });
                    }}
                    placeholder="e.g. 800001"
                    className={`w-full pl-9 pr-3 py-2 bg-white text-xs rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#153A2A] ${
                      errors.pincode ? 'border-[#B91C1C] bg-[#FEF2F2]' : 'border-[#D5CCC0]'
                    }`}
                  />
                </div>
                {errors.pincode && (
                  <p className="text-[11px] text-[#B91C1C] mt-1 font-medium">{errors.pincode}</p>
                )}
              </div>

              {/* City & State / Location */}
              <div className="sm:col-span-7">
                <label htmlFor="cityOrAddress" className="block text-xs font-semibold text-[#183628] mb-1">
                  City, District &amp; State <span className="text-[#84968C] font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7D8F86]">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    id="cityOrAddress"
                    name="cityOrAddress"
                    value={formData.cityOrAddress}
                    onChange={(e) => setFormData({ ...formData, cityOrAddress: e.target.value })}
                    placeholder="e.g. Gaya, Ranchi, Delhi, Patna, etc."
                    className="w-full pl-9 pr-3 py-2 bg-white text-xs rounded-lg border border-[#D5CCC0] focus:outline-none focus:ring-2 focus:ring-[#153A2A]"
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#6E8076] leading-tight">
              Please enter your 6-digit postal PIN code so we can verify courier serviceability and safely parcel your prescribed medicines.
            </p>
          </div>
        )}

        {/* Name (Required) */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-[#183628] mb-1.5">
            Full Name <span className="text-[#B91C1C]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7D8F86]">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="e.g. Rahul Sharma"
              className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#153A2A] ${
                errors.name ? 'border-[#DC2626] bg-red-50/20' : 'border-[#D5CCC0] hover:border-[#A2B5A8]'
              }`}
            />
          </div>
          {errors.name && <p className="text-xs text-[#DC2626] mt-1">{errors.name}</p>}
        </div>

        {/* Contact Info: Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone (Required) */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-[#183628] mb-1.5">
              Phone Number <span className="text-[#B91C1C]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7D8F86]">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="+91 98765 43210"
                className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#153A2A] ${
                  errors.phone ? 'border-[#DC2626] bg-red-50/20' : 'border-[#D5CCC0] hover:border-[#A2B5A8]'
                }`}
              />
            </div>
            {errors.phone && <p className="text-xs text-[#DC2626] mt-1">{errors.phone}</p>}
          </div>

          {/* Email (Optional) */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-[#183628] mb-1.5">
              Email Address <span className="text-[#84968C] font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7D8F86]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="your.email@example.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#153A2A] ${
                  errors.email ? 'border-[#DC2626] bg-red-50/20' : 'border-[#D5CCC0] hover:border-[#A2B5A8]'
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-[#DC2626] mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-[#183628] mb-1.5">
            Health Query or Symptoms
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3.5 text-[#7D8F86] pointer-events-none">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your health query, symptoms, or consultation preference here..."
              className="w-full pl-10 pr-4 py-2.5 bg-white text-sm rounded-lg border border-[#D5CCC0] hover:border-[#A2B5A8] focus:outline-none focus:ring-2 focus:ring-[#153A2A] resize-y"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 pt-4 border-t border-[#E8E1D5]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center py-3.5 px-6 text-sm font-semibold text-white bg-[#153A2A] hover:bg-[#0E271C] active:bg-[#071911] rounded-lg transition-all shadow-xs hover:shadow-md disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Submitting...</span>
            </span>
          ) : (
            <span>Submit Consultation Request</span>
          )}
        </button>

        <p className="text-[11px] text-[#6A7B73] text-center mt-3">
          Submits directly to WhatsApp: <strong className="text-[#183628] font-semibold">+91 9934298080</strong>. Strict medical confidentiality guaranteed.
        </p>
      </div>
    </form>
  );
};
