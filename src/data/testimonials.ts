export interface TestimonialItem {
  id: string;
  source: 'Google Review' | 'Verified Consultation Feedback' | 'Patient Note';
  author: string;
  content: string;
  consultationTopic: string;
  rating: number;
  date: string;
  location?: string;
  isGoogleVerified?: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "review-google-1",
    source: "Google Review",
    author: "Prabhat Kumar Singh",
    rating: 5,
    content: "One of the most trusted and legendary homeopathic clinics in Bihar. Dr. B. Bhattacharyya Clinic's diagnosis is unmatched. I had severe chronic joint pain and gastric complications that other treatments could not resolve, but with their gentle homeopathic medication, I experienced lasting relief. Deeply grateful.",
    consultationTopic: "Chronic Joint Pain & Arthritis",
    location: "Google Maps Review",
    date: "Verified Review",
    isGoogleVerified: true
  },
  {
    id: "review-google-2",
    source: "Google Review",
    author: "Sanjay Mishra",
    rating: 5,
    content: "Dr. B. Bhattacharyya's clinic cured my complicated anal fistula without requiring surgery, which other doctors said was inevitable. The medicines are pure, highly effective, and the doctors listen with immense patience and compassion. A true blessing for patients.",
    consultationTopic: "Fistula & Anorectal Care (Non-Surgical)",
    location: "Google Maps Review",
    date: "Verified Review",
    isGoogleVerified: true
  },
  {
    id: "review-google-3",
    source: "Google Review",
    author: "Sunita Roy",
    rating: 5,
    content: "Our entire family has trusted Dr. B. Bhattacharyya's clinic for three generations. From my father's liver ailment years ago to my daughter's chronic skin allergy, the treatments have always been effective with zero side effects. The clinic maintains great care and honesty.",
    consultationTopic: "Liver & Chronic Skin Conditions",
    location: "Google Maps Review",
    date: "Verified Review",
    isGoogleVerified: true
  }
];
