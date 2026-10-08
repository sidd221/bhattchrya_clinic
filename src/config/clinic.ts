/**
 * Dr. B. Bhattacharyya Clinic - Central Configuration
 *
 * All clinic contact details, operating hours, and location pointers are maintained here
 * so they can easily be customized in a single place without modifying component code.
 */

export interface ClinicConfig {
  name: string;
  tagline: string;
  philosophy: string;
  phone: string;
  phoneRaw: string;
  secondaryPhone?: string;
  secondaryPhoneRaw?: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    landmark: string;
  };
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  priorBookingNote?: string;
  consultationFeeInfo: string;
  mapsEmbedUrl: string;
  mapsDirectionsUrl: string;
  googleBusinessProfileUrl: string;
  googleReviewUrl: string;
  websiteUrl: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export const clinic: ClinicConfig = {
  name: "Dr. B. Bhattacharyya Clinic",
  tagline: "Compassionate Homeopathic Care & Consultation",
  philosophy: "A thoughtful, individualised approach to wellbeing that begins with listening.",
  phone: "+91 7050086029",
  phoneRaw: "+917050086029",
  secondaryPhone: "+91 9934298080",
  secondaryPhoneRaw: "+919934298080",
  whatsapp: "+91 9934298080",
  whatsappRaw: "919934298080",
  email: "drbbhattacharya990@gmail.com",
  address: {
    line1: "724, East Patel Nagar",
    line2: "Adarsh Colony, North Shastri Nagar",
    city: "Patna",
    state: "Bihar",
    postalCode: "801103",
    landmark: "Near Adarsh Colony, East Patel Nagar, Patna"
  },
  openingHours: {
    weekdays: "Monday – Saturday: 9:00 AM – 8:00 PM",
    saturday: "Monday – Saturday: 9:00 AM – 8:00 PM",
    sunday: "Sunday: Medicine is available"
  },
  priorBookingNote: "Please book your slot a day prior.",
  consultationFeeInfo: "Consultation slots are reserved by prior appointment.",
  // Embeddable Google Maps iframe URL (Dr. B. Bhattacharya Clinic)
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28781.2402360916!2d85.06361881083983!3d25.616377000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57fd25415403%3A0xa29c17e79f4b4bdb!2sDr.B.Bhattacharya%20Clinic!5e0!3m2!1sen!2sin!4v1790570135976!5m2!1sen!2sin",
  mapsDirectionsUrl: "https://maps.app.goo.gl/ngNTeUMADhmzJViu8",
  googleBusinessProfileUrl: "https://maps.app.goo.gl/ngNTeUMADhmzJViu8",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ01RBJf1X7TkR20tLn-cXnKI",
  websiteUrl: "https://bhattacharyaclinic.vercel.app",
  socials: {
    instagram: "https://instagram.com/bhattacharyaclinic",
    facebook: "https://www.facebook.com/b.bhattacharya.clinic/",
    youtube: "https://youtube.com/@bhattacharyaclinic"
  }
};
