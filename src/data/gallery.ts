export interface GalleryItem {
  id: string;
  title: string;
  category: 'Clinic' | 'Consultation Area' | 'Reception' | 'Treatment Environment' | 'Doctor' | 'Patient Experience';
  caption: string;
  alt: string;
  src: string;
  visualTheme: {
    bgGradient: string;
    accentColor: string;
    motif: 'room' | 'desk' | 'botanical' | 'reception' | 'books' | 'lounge';
  };
}

export const galleryCategories = [
  'All',
  'Clinic',
  'Consultation Area',
  'Reception',
  'Treatment Environment',
  'Doctor',
  'Patient Experience'
] as const;

export const galleryData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Late Dr. B. Bhattacharyya",
    category: "Doctor",
    caption: "Honouring our venerable founder Late Dr. B. Bhattacharyya, who established the clinic's classical homeopathic legacy in 1940.",
    alt: "Revered Founder Late Dr. B. Bhattacharyya Memorial Portrait with Garland",
    src: "/gallery-1.jpeg",
    visualTheme: {
      bgGradient: "from-[#1F4232] to-[#122A1F]",
      accentColor: "#D4B07B",
      motif: "desk"
    }
  },
  {
    id: "gal-2",
    title: "Late Dr. Anupam Bhattacharyya",
    category: "Doctor",
    caption: "Remembering our visionary senior physician whose compassionate care and devotion shaped our healing tradition.",
    alt: "Memorial portrait of Late Dr. Anupam Bhattacharyya with floral garland",
    src: "/gallery-2.jpeg",
    visualTheme: {
      bgGradient: "from-[#2A4D3B] to-[#1B3628]",
      accentColor: "#A3C8B0",
      motif: "desk"
    }
  },
  {
    id: "gal-3",
    title: "Clinic Inauguration & Team",
    category: "Clinic",
    caption: "Auspicious opening ceremony with Dr. Pankaj Kumar, Dr. Pradeep, and staff at the Patel Nagar, Patna clinic.",
    alt: "Clinic inauguration ceremony gathering with senior doctors and team",
    src: "/gallery-3.jpeg",
    visualTheme: {
      bgGradient: "from-[#1B382B] to-[#0E2219]",
      accentColor: "#E2C99D",
      motif: "room"
    }
  },
  {
    id: "gal-4",
    title: "Specialized Treatments Guide",
    category: "Treatment Environment",
    caption: "Clinical overview of proven homeopathic care for Asthma, Kidney Stone, Arthritis, PCOD, Piles, Sinus, and Migraine.",
    alt: "Hindi clinical treatment guide poster for chronic illnesses and ailments",
    src: "/gallery-4.jpeg",
    visualTheme: {
      bgGradient: "from-[#264B39] to-[#163325]",
      accentColor: "#B7D1BF",
      motif: "botanical"
    }
  },
  {
    id: "gal-5",
    title: "Opening Ceremony Blessing",
    category: "Clinic",
    caption: "Traditional lamp lighting and opening blessings commemorating the founding principles of our Patna clinic.",
    alt: "Opening lamp lighting and team blessing at Dr. Bhattacharyya Homeopathy Clinic",
    src: "/gallery-5.jpeg",
    visualTheme: {
      bgGradient: "from-[#234534] to-[#132A1F]",
      accentColor: "#CDB083",
      motif: "room"
    }
  },
  {
    id: "gal-6",
    title: "Senior Doctors Consultation Chamber",
    category: "Consultation Area",
    caption: "Dr. Pankaj Kumar and Dr. Pradeep conducting thorough constitutional case-taking in the main consultation study chamber.",
    alt: "Dr. Pankaj Kumar and Dr. Pradeep seated at consultation desk with medical reference books",
    src: "/gallery-6.jpeg",
    visualTheme: {
      bgGradient: "from-[#1E3F30] to-[#0F261C]",
      accentColor: "#9FC4AC",
      motif: "books"
    }
  },
  {
    id: "gal-7",
    title: "Clinic Medical Staff & Reception",
    category: "Clinic",
    caption: "Our caring healthcare team and clinical coordinators dedicated to patient well-being at East Patel Nagar, Patna.",
    alt: "Clinic medical and support staff gathered at the clinic entrance",
    src: "/gallery-7.jpeg",
    visualTheme: {
      bgGradient: "from-[#1F4232] to-[#122A1F]",
      accentColor: "#D4B07B",
      motif: "reception"
    }
  },
  {
    id: "gal-8",
    title: "Dr. Pankaj Kumar & Dr. Pradeep",
    category: "Doctor",
    caption: "Senior homeopathic physicians carrying forward generations of classical clinical mastery and holistic healing.",
    alt: "Dr. Pankaj Kumar and Dr. Pradeep beside founder memorial busts",
    src: "/gallery-8.jpeg",
    visualTheme: {
      bgGradient: "from-[#2A4D3B] to-[#1B3628]",
      accentColor: "#A3C8B0",
      motif: "desk"
    }
  },
  {
    id: "gal-9",
    title: "Inaugural Felicitation & Welcome",
    category: "Clinic",
    caption: "Honouring our medical team with traditional floral felicitations during the clinic opening ceremony.",
    alt: "Floral bouquet felicitation ceremony with consulting doctors and guests",
    src: "/gallery-9.jpeg",
    visualTheme: {
      bgGradient: "from-[#1E3F30] to-[#0F261C]",
      accentColor: "#9FC4AC",
      motif: "room"
    }
  },
  {
    id: "gal-10",
    title: "Specialized Clinical Scope",
    category: "Treatment Environment",
    caption: "Specialized constitutional treatment scope spanning Tonsils, Spondylosis, Liver disorders, Allergies, Prostate, and UTI.",
    alt: "Clinical scope chart showing homeopathic treatment for specialized conditions",
    src: "/gallery-10.jpeg",
    visualTheme: {
      bgGradient: "from-[#234534] to-[#132A1F]",
      accentColor: "#CDB083",
      motif: "botanical"
    }
  },
  {
    id: "gal-11",
    title: "Clinical Case: Skin & Vitiligo Results",
    category: "Patient Experience",
    caption: "Documented case outcome: Noticeable repigmentation and skin recovery achieved through constitutional homeopathic remedies.",
    alt: "Clinical before and after recovery comparison of facial skin vitiligo treatment",
    src: "/gallery-11.png",
    visualTheme: {
      bgGradient: "from-[#1B382B] to-[#0E2219]",
      accentColor: "#E2C99D",
      motif: "lounge"
    }
  },
  {
    id: "gal-12",
    title: "Clinical Case: Persistent Nail Recovery",
    category: "Patient Experience",
    caption: "Documented case outcome: Complete resolution of chronic periungual nail fold condition with pure constitutional homeopathy.",
    alt: "Clinical before and after comparison of chronic nail fold skin condition completely healed",
    src: "/gallery-12.png",
    visualTheme: {
      bgGradient: "from-[#2A4D3B] to-[#1B3628]",
      accentColor: "#A3C8B0",
      motif: "lounge"
    }
  }
];
