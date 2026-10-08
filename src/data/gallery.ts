export interface GalleryItem {
  id: string;
  title: string;
  category: 'Clinic' | 'Consultation Area' | 'Reception' | 'Treatment Environment' | 'Doctor' | 'Patient Experience';
  caption: string;
  alt: string;
  src?: string; // Optional real image path
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
    title: "Quiet Consultation Chamber",
    category: "Consultation Area",
    caption: "Designed for open, unhurried dialogues in a private, natural daylight-filled setting.",
    alt: "Private homeopathic consultation room with natural sunlight and comfortable seating",
    src: "/gallery/gallery-1.jpg",
    visualTheme: {
      bgGradient: "from-[#1F4232] to-[#122A1F]",
      accentColor: "#D4B07B",
      motif: "room"
    }
  },
  {
    id: "gal-2",
    title: "Serene Welcoming Lounge",
    category: "Reception",
    caption: "A calming arrival space featuring warm earthen tones, living botanical plants, and herbal tea.",
    alt: "Calm and clean clinic reception lounge with comfortable seating and botanical greenery",
    src: "/gallery/gallery-2.jpg",
    visualTheme: {
      bgGradient: "from-[#2A4D3B] to-[#1B3628]",
      accentColor: "#A3C8B0",
      motif: "reception"
    }
  },
  {
    id: "gal-3",
    title: "The Classical Dispensary",
    category: "Treatment Environment",
    caption: "Carefully curated pharmacopoeia of classical homeopathic dilutions and mother tinctures.",
    alt: "Organized dispensary of homeopathic remedies, amber glass bottles, and tinctures",
    src: "/gallery/gallery-3.jpg",
    visualTheme: {
      bgGradient: "from-[#1B382B] to-[#0E2219]",
      accentColor: "#E2C99D",
      motif: "botanical"
    }
  },
  {
    id: "gal-4",
    title: "Doctor's Study & Repertory",
    category: "Doctor",
    caption: "Classical homeopathic repertories, materia medica volumes, and digital case-taking records.",
    alt: "Doctor's consultation desk with case journals, repertory books, and natural lighting",
    src: "/gallery/gallery-4.jpg",
    visualTheme: {
      bgGradient: "from-[#264B39] to-[#163325]",
      accentColor: "#B7D1BF",
      motif: "books"
    }
  },
  {
    id: "gal-5",
    title: "Tranquil Patient Waiting Corner",
    category: "Patient Experience",
    caption: "Every interior touchpoint is arranged to minimise clinical anxiety and foster calm.",
    alt: "Warm reading corner in patient lounge with wellness literature and comfortable armchair",
    src: "/gallery/gallery-5.jpg",
    visualTheme: {
      bgGradient: "from-[#234534] to-[#132A1F]",
      accentColor: "#CDB083",
      motif: "lounge"
    }
  },
  {
    id: "gal-6",
    title: "Botanical Pharmacopoeia",
    category: "Treatment Environment",
    caption: "Authentic, certified homeopathic preparations prepared according to classical standards.",
    alt: "Botanical apothecary with certified homeopathic mother tinctures",
    src: "/gallery/gallery-6.jpg",
    visualTheme: {
      bgGradient: "from-[#1E3F30] to-[#0F261C]",
      accentColor: "#9FC4AC",
      motif: "botanical"
    }
  },
  {
    id: "gal-7",
    title: "Diagnostic Examination Room",
    category: "Consultation Area",
    caption: "Equipped with diagnostic equipment to complement classical constitutional case taking.",
    alt: "Private diagnostic and clinical examination room",
    src: "/gallery/gallery-7.jpg",
    visualTheme: {
      bgGradient: "from-[#1F4232] to-[#122A1F]",
      accentColor: "#D4B07B",
      motif: "room"
    }
  },
  {
    id: "gal-8",
    title: "Reception & Welcome Desk",
    category: "Reception",
    caption: "Coordinated appointments, unhurried patient intake, and prompt dispatch of courier medicines.",
    alt: "Front office reception and patient appointment desk",
    src: "/gallery/gallery-8.jpg",
    visualTheme: {
      bgGradient: "from-[#2A4D3B] to-[#1B3628]",
      accentColor: "#A3C8B0",
      motif: "reception"
    }
  },
  {
    id: "gal-9",
    title: "Clinic Entryway & Grounds",
    category: "Clinic",
    caption: "Centrally located in East Patel Nagar, Patna with quiet and accessible ground access.",
    alt: "Ground floor clinic entrance with welcoming environment",
    src: "/gallery/gallery-9.jpg",
    visualTheme: {
      bgGradient: "from-[#1E3F30] to-[#0F261C]",
      accentColor: "#9FC4AC",
      motif: "desk"
    }
  },
  {
    id: "gal-10",
    title: "Constitutional Intake Desk",
    category: "Consultation Area",
    caption: "Holistic assessment connecting physiological reports with constitutional health profile.",
    alt: "Case-taking desk with clinical reference materials",
    src: "/gallery/gallery-10.jpg",
    visualTheme: {
      bgGradient: "from-[#234534] to-[#132A1F]",
      accentColor: "#CDB083",
      motif: "books"
    }
  }
];
