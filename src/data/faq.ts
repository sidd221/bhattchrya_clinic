export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Consultation' | 'Preparation' | 'Appointments' | 'General';
}

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    category: "Appointments",
    question: "Where is Dr. B. Bhattacharyya Clinic located in Patna?",
    answer: "Dr. B. Bhattacharyya Clinic is located at 724, East Patel Nagar (near Adarsh Colony & North Shastri Nagar), Patna, Bihar 801103. The clinic is centrally situated and easily accessible from Bailey Road, Rajbansi Nagar, and Ashiana Nagar. For patients unable to travel to the clinic in person, remote online consultations with resident doctors and pan-India medicine parcel delivery are also available."
  },
  {
    id: "faq-2",
    category: "Appointments",
    question: "How can I book a consultation with the doctors at Dr. B. Bhattacharyya Clinic?",
    answer: "You can book a consultation with the experienced doctors at Dr. B. Bhattacharyya Clinic directly through this website using the booking request form, by calling the clinic desk at +91 7050086029, or by sending a WhatsApp message to +91 9934298080. You can choose either an in-clinic visit in Patna or an online consultation. We recommend scheduling your appointment at least 24 hours in advance so dedicated, unhurried time is reserved for your case study."
  },
  {
    id: "faq-3",
    category: "Consultation",
    question: "What can I expect during my first homeopathic consultation?",
    answer: "Your initial consultation with the doctor at Dr. B. Bhattacharyya Clinic is an unhurried, comprehensive conversation typically lasting 45 to 60 minutes. Rather than focusing merely on isolated complaints, the consulting doctor takes time to understand your overall lifestyle, emotional well-being, sleep patterns, past clinical history, and physical sensitivities. This complete constitutional picture guides the selection of an individualised homeopathic remedy."
  },
  {
    id: "faq-4",
    category: "Consultation",
    question: "What health concerns can be discussed with the clinic doctors?",
    answer: "You can discuss a wide spectrum of acute, chronic, and recurring conditions with the doctors available at Dr. B. Bhattacharyya Clinic. Frequent areas of consultation include respiratory and allergic disorders (sinusitis, bronchitis, asthma, rhinitis), chronic digestive complaints (acidity, GERD, IBS, liver sluggishness), skin issues (eczema, psoriasis, acne, urticaria), joint and musculoskeletal pain (arthritis, cervical spondylosis, sciatica), chronic migraines, and general constitutional vitality concerns."
  },
  {
    id: "faq-5",
    category: "Preparation",
    question: "What should I bring to my first consultation?",
    answer: "Please bring any previous medical reports, recent blood tests, prescriptions, imaging (X-rays, ultrasounds, MRI/CT scans), and hospital discharge summaries. Having a list of all current allopathic or conventional medications you are taking is also helpful, as homeopathic remedies can be thoughtfully and safely integrated alongside ongoing treatments."
  },
  {
    id: "faq-6",
    category: "Appointments",
    question: "What are the clinic’s consultation hours?",
    answer: "The clinic is open Monday through Saturday from 9:00 AM to 1:00 PM (morning session) and 5:00 PM to 8:00 PM (evening session), with Sunday morning visits available by prior confirmation. Because consultations are conducted thoroughly and unhurriedly, patients are kindly requested to book their consultation slot at least a day prior."
  },
  {
    id: "faq-online",
    category: "Consultation",
    question: "Do you offer online consultations with doctors and deliver medicines by parcel?",
    answer: "Yes, absolutely. For patients who reside outside Patna, in other districts of Bihar, or in any state across India, the doctors at Dr. B. Bhattacharyya Clinic provide comprehensive online consultations via phone or video call. Following a detailed constitutional case evaluation, authentic prescribed homeopathic medicines are safely packed in tamper-evident packaging and parcelled directly to your doorstep with tracking."
  }
];
