export interface Treatment {
  id: string;
  name: string;
  shortDescription: string;
  detailedOverview: string;
  iconName: string;
  imageUrl: string;
  imageAlt: string;
  fallbackImageUrl?: string;
  tag: string;
  topicsDiscussed: string[];
  consultationProcess: string;
  whenToSeekImmediateCare: string[];
  commonInquiries: string[];
}

export const treatmentsData: Treatment[] = [
  {
    id: "asthma",
    name: "Asthma",
    shortDescription: "Classical constitutional support to reduce airway hypersensitivity, nocturnal wheezing, and seasonal bronchospasms.",
    detailedOverview: "Bronchial asthma involves chronic hyper-reactivity of the respiratory tract triggered by dust, weather shifts, emotional tension, or allergens. Rather than temporary bronchodilation alone, classical homeopathy seeks to strengthen lung vital capacity and decrease mucosal irritability.",
    iconName: "Wind",
    tag: "Respiratory Care",
    imageUrl: "/treatments/asthma.jpg",
    imageAlt: "Homeopathic care for asthma and respiratory health",
    fallbackImageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Nocturnal coughing spells, shortness of breath, and chest tightness",
      "Wheezing aggravated by cold winds, damp air, or pollution",
      "Environmental and emotional triggers causing sudden bronchospasms",
      "Long-term reliance on emergency nebulizers and inhalers"
    ],
    consultationProcess: "We carefully record your exact exacerbation times, family asthma tendencies, posture preferences during attacks, and seasonal triggers to personalize remedy selection.",
    whenToSeekImmediateCare: [
      "Severe breathlessness where you cannot speak full sentences",
      "Inhalers provide zero relief during an acute severe asthma attack",
      "Bluish discoloration of fingernails, lips, or tongue (cyanosis)",
      "Chest wall retraction with extreme fatigue or confusion"
    ],
    commonInquiries: [
      "Can I continue my regular inhaler while starting homeopathic treatment?",
      "How does homeopathy help minimise sudden weather-change flare-ups?",
      "Is homeopathic asthma treatment safe for young children?"
    ]
  },
  {
    id: "kidney-stones",
    name: "Kidney Stones",
    shortDescription: "Gentle homeopathic therapies aimed at easing renal colic spasms, assisting natural stone passage, and preventing recurrent crystalluria.",
    detailedOverview: "Renal calculi form due to metabolic imbalances, crystal precipitation (calcium oxalate, uric acid), and inadequate hydration. Homeopathy relaxes the ureteric musculature to ease passage while correcting constitutional diathesis to prevent future stone formation.",
    iconName: "Droplets",
    tag: "Renal & Urinary",
    imageUrl: "/treatments/kidney-stones.jpg",
    imageAlt: "Homeopathic care for kidney stone concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Sharp spasmodic flank pain radiating toward the groin or lower abdomen",
      "Burning sensations during urination and micro-hematuria (blood in urine)",
      "Recurrent history of stones even after previous expulsion or lithotripsy",
      "Hydration patterns, dietary oxalates, and metabolic tendencies"
    ],
    consultationProcess: "Evaluation of ultrasound and kidney function reports, stone size and location, urine analysis, and personalised dietary advice alongside constitutional remedies.",
    whenToSeekImmediateCare: [
      "Complete inability to pass urine (acute urinary retention)",
      "Unbearable intractable pain accompanied by persistent vomiting",
      "High fever with chills and severe flank pain indicating pyelonephritis",
      "Gross continuous visible blood or clots in urine"
    ],
    commonInquiries: [
      "What stone sizes can respond well to homeopathic management?",
      "Can homeopathy prevent new stones from forming repeatedly?",
      "How quickly can pain relief be expected during mild episodes?"
    ]
  },
  {
    id: "arthritis-sciatica",
    name: "Arthritis / Sciatica",
    shortDescription: "Targeted remedies for nerve pain radiating down the leg, joint morning stiffness, osteoarthritis, and chronic inflammatory aches.",
    detailedOverview: "Joint degeneration and nerve compression (such as sciatica along the lumbar-sacral pathway) cause severe limitation in mobility and restorative sleep. Homeopathic remedies reduce localized inflammation, ease muscle spasms, and support cartilage longevity without stomach irritation.",
    iconName: "Bone",
    tag: "Joints & Nerves",
    imageUrl: "/treatments/arthritis-sciatica.jpg",
    imageAlt: "Homeopathic care for arthritis and sciatica",
    fallbackImageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Electric, shooting, or burning pain radiating from lower back down the leg",
      "Morning stiffness in knees, fingers, and hips that improves after gentle movement",
      "Joint swelling, crepitus (cracking sounds), and weather-sensitive aches",
      "Postural habits, disc prolapse history, and previous painkiller reliance"
    ],
    consultationProcess: "Detailed examination of movement modalities (pain better by rest vs motion, heat vs cold), spinal imaging reviews, and constitutional remedy formulation.",
    whenToSeekImmediateCare: [
      "Sudden loss of bowel or bladder control (cauda equina red flag)",
      "Rapidly developing foot drop or severe numbness in the groin/legs",
      "Hot, red, swollen joint accompanied by high fever (septic arthritis)",
      "Inability to bear any weight following sudden trauma"
    ],
    commonInquiries: [
      "Can homeopathy replace long-term NSAIDs and painkillers?",
      "Does treatment help in advanced cervical or lumbar sciatica?",
      "How long does it take to notice improvement in morning joint stiffness?"
    ]
  },
  {
    id: "pcod",
    name: "PCOD (Polycystic Ovarian Disease)",
    shortDescription: "Restoring hormonal equilibrium, regulating irregular menstrual cycles, and managing hormonal acne, weight gain, and hirsutism.",
    detailedOverview: "PCOD and PCOS stem from endocrine imbalance, insulin resistance, and ovarian follicular dysregulation. Classical homeopathy treats the whole constitutional picture to stimulate spontaneous ovulation, regulate period intervals, and resolve metabolic symptoms naturally.",
    iconName: "Heart",
    tag: "Women's Health",
    imageUrl: "/treatments/pcod.jpg",
    imageAlt: "Homeopathic care for PCOD and women's health",
    fallbackImageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Delayed, missed, or excessively prolonged menstrual cycles",
      "Persistent hormonal cystic acne, facial hair growth, and scalp hair thinning",
      "Unexplained weight gain and difficulty losing weight",
      "Mood fluctuations, fatigue, and ovarian ultrasound pelvic findings"
    ],
    consultationProcess: "Comprehensive tracking of your cycle history, hormonal panel tests (LH/FSH ratio, AMH, thyroid), metabolic stress levels, and emotional wellness.",
    whenToSeekImmediateCare: [
      "Extremely heavy, flooding bleeding with large clots causing dizziness",
      "Sudden, acute, severe lower quadrant abdominal pain (ovarian torsion risk)",
      "Severe pelvic infection signs with fever and foul-smelling discharge",
      "Fainting spells or severe acute anemia from prolonged menorrhagia"
    ],
    commonInquiries: [
      "Can periods become regular without continuous oral contraceptive pills?",
      "How does homeopathy address cysts seen on pelvic ultrasonography?",
      "Does homeopathic treatment support fertility in women with PCOD?"
    ]
  },
  {
    id: "piles-hemorrhoids",
    name: "Piles / Hemorrhoids",
    shortDescription: "Non-surgical homeopathic relief for painful, bleeding, or protruding hemorrhoidal veins and chronic constipation strain.",
    detailedOverview: "Swollen venous cushions in the anal canal cause painful bowel evacuation, burning, itching, and bright red rectal bleeding. Homeopathic treatment restores venous tone, regulates chronic intestinal transit, and heals inflamed mucosal tissue gently.",
    iconName: "Flame",
    tag: "Anorectal Care",
    imageUrl: "/treatments/piles-hemorrhoids.jpg",
    imageAlt: "Homeopathic care for piles and hemorrhoid concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Bleeding during defecation (painless drops or spurts of fresh red blood)",
      "Protrusion of mass from the rectum that needs manual replacement",
      "Throbbing pain, burning, and severe itching around the anal verge",
      "Chronic constipation, hard stools, and prolonged straining habits"
    ],
    consultationProcess: "Assessing hemorrhoidal grade (Internal Grade 1-3, External), bowel motility patterns, diet and fiber intake, and prescribing targeted constitutional remedies.",
    whenToSeekImmediateCare: [
      "Sudden, excruciating, thrombosed external pile that is hard and purple",
      "Persistent profuse rectal bleeding leading to pallor and faintness",
      "Fever and swelling indicating perianal abscess formation",
      "Black, tarry, sticky stools indicating upper gastrointestinal bleeding"
    ],
    commonInquiries: [
      "Can piles be treated successfully without undergoing surgery?",
      "How quickly does homeopathic medicine stop rectal bleeding?",
      "What dietary adjustments prevent recurrence after healing?"
    ]
  },
  {
    id: "sinusitis",
    name: "Sinusitis",
    shortDescription: "Clearing sinus blockage, chronic frontal headaches, post-nasal drip, and recurrent inflammatory nasal congestion.",
    detailedOverview: "Inflammation of the paranasal sinus cavities (frontal, maxillary, ethmoid) causes heavy facial pressure, throbbing headaches, and stubborn nasal catarrh. Homeopathy drains stagnant mucus, reduces mucosal hypertrophy, and eliminates constitutional sinus susceptibility.",
    iconName: "Smile",
    tag: "ENT Care",
    imageUrl: "/treatments/sinusitis.jpg",
    imageAlt: "Homeopathic care for sinusitis and sinus health",
    fallbackImageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Frontal and brow headaches aggravated by bending down",
      "Thick yellowish-green nasal discharge and persistent post-nasal drip",
      "Loss of smell (anosmia), facial heaviness, and morning blocked nose",
      "Sensitivity to AC, dust, sudden temperature shifts, and humidity"
    ],
    consultationProcess: "Detailed review of sinus X-ray or CT scans, nasal polyp tendencies, previous antibiotic cycles, and environmental allergies.",
    whenToSeekImmediateCare: [
      "Swelling, redness, or tenderness around the eyes or forehead",
      "Double vision or sudden reduction in visual acuity",
      "Stiff neck accompanied by high fever and severe headache",
      "Altered mental status or severe lethargy"
    ],
    commonInquiries: [
      "Can homeopathy cure chronic sinusitis without repeated nasal sprays?",
      "How does treatment address hypertrophied turbinates or deviated septum issues?",
      "Will it help prevent frequent sinus infections every winter season?"
    ]
  },
  {
    id: "vitiligo",
    name: "Vitiligo (White Patches / Leukoderma)",
    shortDescription: "Constitutional treatment stimulating melanocyte re-pigmentation and halting the progressive spread of depigmented patches.",
    detailedOverview: "Vitiligo is an autoimmune condition where the body's immune system attacks pigment-producing melanocytes. Classical homeopathy works deeply at the immune and constitutional level to halt patch expansion and stimulate natural marginal re-pigmentation safely.",
    iconName: "Sun",
    tag: "Dermatology",
    imageUrl: "/treatments/vitiligo.jpg",
    imageAlt: "Homeopathic care for vitiligo and white patch concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Appearance of chalky white or hypopigmented patches on skin and lips",
      "Rate of lesion spread and symmetry of patch distribution",
      "Associated autoimmune markers (thyroid, family history, stress triggers)",
      "Previous exposure to chemical depigmenters, burns, or friction trauma"
    ],
    consultationProcess: "Mapping patch locations, assessing active vs stable disease phases, thyroid profile review, and constitutional prescribing to restore immune tolerance.",
    whenToSeekImmediateCare: [
      "Rapid sudden widespread eruption of blistering skin lesions",
      "Signs of secondary infection in ulcerated skin areas",
      "Severe sunburn or blistering over depigmented skin after sun exposure",
      "Associated acute systemic autoimmune symptoms"
    ],
    commonInquiries: [
      "How long does re-pigmentation usually take to become visible?",
      "Are there specific dietary restrictions (sour foods, fish) in homeopathy?",
      "Can stable patches on fingers and lips also regain natural skin colour?"
    ]
  },
  {
    id: "hair-fall-alopecia",
    name: "Hair Fall / Alopecia",
    shortDescription: "Root-cause therapy for patchy alopecia areata, excessive thinning, telogen effluvium, dandruff, and weak hair roots.",
    detailedOverview: "Excessive hair loss and patchy bald spots are rooted in nutritional absorption deficits, hormonal shifts, autoimmune scalp attacks, stress, or chronic dandruff. Homeopathic remedies nourish follicle vitality and rebalance internal factors without steroids.",
    iconName: "Sparkles",
    tag: "Scalp Health",
    imageUrl: "/treatments/hair-fall-alopecia.jpg",
    imageAlt: "Homeopathic care for hair fall and alopecia",
    fallbackImageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Sudden coin-shaped smooth bald patches (alopecia areata)",
      "Diffuse hair thinning after fever, pregnancy, or intense emotional stress",
      "Persistent itchy dandruff, seborrheic dermatitis, and greasy scalp",
      "Iron deficiency, thyroid dysregulation, and genetic shedding patterns"
    ],
    consultationProcess: "Scalp evaluation, pull test review, assessment of systemic lab markers (ferritin, thyroid, vitamin D), and individualised constitutional remedies.",
    whenToSeekImmediateCare: [
      "Total body hair loss accompanied by systemic weakness or weight drop",
      "Severe scalp inflammation, painful pustules, and scarring skin lesions",
      "Signs of fungal kerion (boggy, painful inflammatory scalp mass)",
      "Rapid uncontrolled hair shedding with unexplained severe illness"
    ],
    commonInquiries: [
      "Can homeopathy trigger hair regrowth in smooth alopecia areata patches?",
      "Does the medicine contain any chemicals, steroids, or minoxidil?",
      "How soon can a reduction in daily hair fall be noticed?"
    ]
  },
  {
    id: "psoriasis",
    name: "Psoriasis",
    shortDescription: "Deep-acting immune-modulating remedies addressing silvery scales, intense itching plaques, and chronic skin flare-ups.",
    detailedOverview: "Psoriasis is a chronic autoimmune disorder characterized by accelerated skin cell turnover, resulting in thick, silvery-scaled plaques on elbows, knees, scalp, and torso. Homeopathy treats immune hyper-reactivity to produce lasting clearance without steroid dependency.",
    iconName: "ShieldAlert",
    tag: "Chronic Dermatology",
    imageUrl: "/treatments/psoriasis.jpg",
    imageAlt: "Homeopathic care for psoriasis and skin health",
    fallbackImageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Thick, raised, reddish plaques covered with dry silvery-white scales",
      "Intense itching, skin cracking, and bleeding when scales are shed",
      "Winter aggravation, emotional stress flares, and guttate eruptions",
      "Joint stiffness and pain indicating psoriatic arthritis tendencies"
    ],
    consultationProcess: "Full-body plaque mapping, identification of emotional and seasonal triggers, past topical steroid usage history, and constitutional prescribing.",
    whenToSeekImmediateCare: [
      "Generalized pustular eruptions with fever and shivering",
      "Erythrodermic psoriasis covering over 80% of body with dehydration",
      "Severe secondary bacterial infection with hot red pus discharge",
      "Inability to regulate body temperature due to widespread exfoliative skin"
    ],
    commonInquiries: [
      "Will the skin rebound if I reduce strong topical steroid ointments?",
      "Can homeopathy help cure scalp psoriasis and related nail pitting?",
      "How does homeopathy prevent winter recurrences of psoriasis?"
    ]
  },
  {
    id: "migraine",
    name: "Migraine",
    shortDescription: "Reducing the intensity and frequency of throbbing unilateral headaches, light sensitivity, nausea, and stress-induced episodes.",
    detailedOverview: "Migraine is a neurovascular condition causing intense pulsing pain, typically on one side of the head, accompanied by sensory sensitivity and digestive upset. Homeopathy addresses neurovascular vasospasm triggers and constitutional sensitivity for sustainable relief.",
    iconName: "Brain",
    tag: "Neurological",
    imageUrl: "/treatments/migraine.jpg",
    imageAlt: "Homeopathic care for migraine and headache concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "One-sided throbbing headache aggravated by sound, light, and movement",
      "Visual aura, zigzag lines, nausea, and vomiting during peak pain",
      "Triggers like lack of sleep, skipping meals, sun exposure, and mental stress",
      "Hormonal migraines linked to menstrual cycle dates"
    ],
    consultationProcess: "In-depth migraine diary assessment, food trigger analysis, sleep architecture review, and personalised constitutional remedy selection.",
    whenToSeekImmediateCare: [
      "Sudden onset 'thunderclap' headache reaching peak intensity in seconds",
      "Headache with high fever, stiff neck, confusion, or speech difficulty",
      "Headache accompanied by numbness, facial drooping, or limb weakness",
      "First severe headache occurring after head injury or age 50"
    ],
    commonInquiries: [
      "Can homeopathy reduce reliance on regular triptans and painkillers?",
      "How are hormonal menstrual migraines managed through homeopathy?",
      "Can constitutional remedies permanently reduce migraine attack frequency?"
    ]
  },
  {
    id: "tonsillitis",
    name: "Tonsillitis",
    shortDescription: "Effective natural relief for recurrent throat swelling, difficulty swallowing, tonsillar crypts, and fever tendencies without surgery.",
    detailedOverview: "Recurrent tonsillar infections and adenoid hypertrophy are common in children and adults with vulnerable lymphatic defences. Homeopathic care reduces enlarged tonsillar tissue, clears crypt debris, and enhances immune resistance, frequently avoiding surgical tonsillectomy.",
    iconName: "Thermometer",
    tag: "Throat & ENT",
    imageUrl: "/treatments/tonsillitis.jpg",
    imageAlt: "Homeopathic care for tonsillitis and throat health",
    fallbackImageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Swollen, beefy red tonsils with white or yellowish exudate spots",
      "Painful swallowing (dysphagia) radiating into the ears",
      "Recurrent fever spikes, throat tickling, and enlarged neck lymph nodes",
      "Mouth breathing, snoring, and sleep disruption due to enlarged tonsils"
    ],
    consultationProcess: "Evaluation of throat examination findings, frequency of antibiotic courses, cold drink sensitivity, and constitutional lymphatic remedies.",
    whenToSeekImmediateCare: [
      "Inability to swallow liquids or saliva (drooling)",
      "Trismus (inability to open the mouth) indicating peritonsillar abscess",
      "Audible stridor or difficulty breathing due to airway obstruction",
      "High continuous fever with severe neck stiffness and lethargy"
    ],
    commonInquiries: [
      "Can enlarged grade 3 tonsils shrink with homeopathic medicines?",
      "Is it possible to completely avoid surgical tonsillectomy?",
      "How does homeopathy prevent frequent throat catches after cold drinks?"
    ]
  },
  {
    id: "spondylosis",
    name: "Spondylosis",
    shortDescription: "Relieving cervical and lumbar disc compression, neck stiffness, vertigo sensations, and tingling numbness in arms or legs.",
    detailedOverview: "Age-related wear and tear of spinal vertebrae, osteophyte spurs, and disc desiccation cause severe pain radiating to shoulders (cervical) or hips and legs (lumbar). Homeopathy relieves neurovascular pinching, relaxes paraspinal spasms, and enhances functional flexibility.",
    iconName: "Activity",
    tag: "Spine & Neck",
    imageUrl: "/treatments/spondylosis.jpg",
    imageAlt: "Homeopathic care for spondylosis and spinal health",
    fallbackImageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Stiff, painful neck with dizziness (cervical vertigo) upon looking up or down",
      "Radiating tingling, numbness, or weakness in the arm, hand, or fingers",
      "Lower back stiffness, inability to bend, and pain when standing long",
      "MRI and X-ray findings showing disc bulge, canal stenosis, and osteophytes"
    ],
    consultationProcess: "Detailed review of spinal imaging, ergonomic desk posture evaluation, nerve root testing, and constitutional musculoskeletal prescribing.",
    whenToSeekImmediateCare: [
      "Sudden loss of bowel or bladder control (surgical emergency)",
      "Rapid progressive weakness in hands (dropping cups) or legs (stumbling)",
      "Severe intractable pain unaffected by any posture or bed rest",
      "Signs of spinal cord compression (myelopathy) with unsteady gait"
    ],
    commonInquiries: [
      "Can homeopathy relieve cervical vertigo without heavy sedatives?",
      "Does treatment help in reversing disc bulge or stopping degeneration?",
      "What gentle exercises complement homeopathic treatment for spondylosis?"
    ]
  },
  {
    id: "liver-disorders",
    name: "Liver Disorders",
    shortDescription: "Therapies supporting sluggish liver function, fatty liver (Grade 1 & 2), jaundice recovery, elevated liver enzymes, and appetite loss.",
    detailedOverview: "The liver governs vital metabolic detoxification, bile synthesis, and fat processing. Non-alcoholic fatty liver disease (NAFLD), elevated SGOT/SGPT, and chronic sluggish digestion respond exceptionally well to hepatoprotective homeopathic constitutional remedies.",
    iconName: "Pill",
    tag: "Hepatic Health",
    imageUrl: "/treatments/liver-disorders.jpg",
    imageAlt: "Homeopathic care for liver health and related concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Ultrasound detection of Grade 1 or Grade 2 Fatty Liver changes",
      "Elevated transaminases (SGOT, SGPT) and mild bilirubin fluctuations",
      "Heaviness or dull aching in the right hypochondriac abdominal region",
      "Poor appetite, bitter taste in mouth, chronic fatigue, and nausea"
    ],
    consultationProcess: "Review of liver function tests (LFT), lipid profile, abdominal sonography, dietary patterns, and constitutional prescribing to restore hepatocytes.",
    whenToSeekImmediateCare: [
      "Deep yellow discoloration of eyes and skin (acute progressive jaundice)",
      "Abdominal distension with fluid accumulation (ascites) and ankle edema",
      "Vomiting of blood (hematemesis) or black tarry stools (melena)",
      "Confusion, disorientation, or drowsiness indicating hepatic encephalopathy"
    ],
    commonInquiries: [
      "Can fatty liver (Grade 1 & 2) normalize with homeopathic remedies?",
      "How soon can elevated SGOT and SGPT enzymes show improvement?",
      "What dietary habits should be combined with liver treatment?"
    ]
  },
  {
    id: "stomach-gas",
    name: "Stomach & Gas Issues",
    shortDescription: "Holistic care for chronic flatulence, sour belching, indigestion, acid reflux, gastric heaviness, and irritable bowel syndrome.",
    detailedOverview: "Gastric distress, acid peptic disorders, bloating, and irregular bowel motility reflect an imbalance between gut mucosal defences and gastrointestinal secretions. Homeopathy restores digestive fire, calms gut hypersensitivity, and resolves chronic acidity without long-term antacid dependence.",
    iconName: "Salad",
    tag: "Gastrointestinal",
    imageUrl: "/treatments/stomach-gas.jpg",
    imageAlt: "Homeopathic care for digestive and gas-related concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Severe abdominal bloating, fullness, and excessive gas after simple meals",
      "Sour, burning belching, waterbrash, and retrosternal heartburn",
      "Sluggish digestion, morning nausea, and coated tongue",
      "Alternating constipation and diarrhea characteristic of irritable bowel syndrome (IBS)"
    ],
    consultationProcess: "Investigation of dietary triggers, meal timings, stress connections, previous endoscopy findings, and personalised constitutional remedy formulation.",
    whenToSeekImmediateCare: [
      "Persistent vomiting, inability to keep fluids down, or dehydration",
      "Severe, sharp, knife-like abdominal pain with guarding and rigidity",
      "Unexplained rapid weight loss alongside difficulty swallowing food",
      "Vomiting coffee-ground material or passing pitch-black stools"
    ],
    commonInquiries: [
      "Can I gradually taper off daily antacids (PPIs like omeprazole/pantoprazole)?",
      "How does homeopathy treat nervous stomach and stress-induced gas?",
      "Does treatment address chronic non-ulcer dyspepsia permanently?"
    ]
  },
  {
    id: "allergies",
    name: "Allergies",
    shortDescription: "Desensitising constitutional treatments for allergic rhinitis, pollen sensitivity, food intolerance, and recurrent skin urticaria.",
    detailedOverview: "Allergies stem from an overactive immune response to harmless environmental triggers like dust mites, pollen, pet dander, or foods. Rather than suppressing histamine release temporarily, homeopathy retrains the immune system to decrease allergic sensitivity naturally.",
    iconName: "Flower2",
    tag: "Immune Response",
    imageUrl: "/treatments/allergies.jpg",
    imageAlt: "Homeopathic care for allergies and related symptoms",
    fallbackImageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Paroxysmal sneezing (10-20 sneezes in morning), watery eyes, and runny nose",
      "Sudden red, itchy wheals on the skin (acute and chronic urticaria / hives)",
      "Food allergies or intolerances causing gastric and cutaneous distress",
      "Dust, smoke, and strong smell sensitivities affecting respiration"
    ],
    consultationProcess: "Evaluating allergy history, IgE levels if available, environmental exposures, seasonality, and constitutional remedies to strengthen natural resilience.",
    whenToSeekImmediateCare: [
      "Swelling of the lips, tongue, throat, or uvula causing airway blockage",
      "Sudden shortness of breath, wheezing, or stridor (anaphylaxis)",
      "Rapid drop in blood pressure with dizziness, fainting, or clammy skin",
      "Widespread severe blistering allergic drug reactions"
    ],
    commonInquiries: [
      "How does homeopathy cure the allergic tendency rather than just symptoms?",
      "Can chronic morning sneezing in air conditioning be resolved?",
      "Is homeopathic allergy treatment safe for daily long-term use?"
    ]
  },
  {
    id: "prostate-problems",
    name: "Prostate Problems",
    shortDescription: "Managing benign prostatic hyperplasia (BPH), frequent nighttime urination, weak stream, and pelvic discomfort.",
    detailedOverview: "Enlargement of the prostate gland (BPH) and chronic prostatitis cause distressing urinary symptoms in men above 45. Homeopathic medicines relieve bladder neck obstruction, decrease gland congestion, and restore comfortable urinary outflow.",
    iconName: "ShieldPlus",
    tag: "Men's Health",
    imageUrl: "/treatments/prostate-problems.jpg",
    imageAlt: "Homeopathic care for prostate and urinary health concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Hesitancy in starting urination, weak or interrupted urinary flow",
      "Nocturia (waking 4-6 times every night to urinate) disturbing rest",
      "Feeling of incomplete bladder emptying and post-void dribbling",
      "Perineal heaviness, pelvic aching, and PSA monitoring"
    ],
    consultationProcess: "Ultrasound evaluation of prostate volume and post-void residual urine (PVRU), serum PSA test review, and constitutional prescribing.",
    whenToSeekImmediateCare: [
      "Acute urinary retention (complete inability to pass any urine with full bladder)",
      "Severe burning, high fever, and shaking chills indicating acute prostatitis",
      "Gross hematuria (visible blood or blood clots in urine)",
      "Severe lower abdominal pain with palpable distended bladder"
    ],
    commonInquiries: [
      "Can enlarged prostate volume be controlled or reduced without surgery?",
      "How quickly does nighttime urination frequency improve with treatment?",
      "Does homeopathy address elevated PSA levels safely?"
    ]
  },
  {
    id: "fistula-fissure",
    name: "Fistula / Fissure",
    shortDescription: "Non-invasive healing for persistent anal fissure cuts, burning spasms, and chronic discharging anal fistulae.",
    detailedOverview: "Anal fissures (tears in the anoderm with intense sphincter spasm) and anal fistulae (abnormal epithelialised tracks discharging pus) cause severe pain and recurrent suffering. Classical homeopathy promotes deep tissue granulation, relieves sphincter tension, and seals tracks naturally.",
    iconName: "Flame",
    tag: "Anorectal Care",
    imageUrl: "/treatments/fistula-fissure.jpg",
    imageAlt: "Homeopathic care for fistula and anal fissure concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Sharp, tearing pain during defecation that persists for hours afterward",
      "Bright red blood streaks on toilet tissue and severe anal spasms",
      "Intermittent swelling, pain, and pus or serous discharge from a fistula opening",
      "History of failed fissure surgeries or recurring abscess drainages"
    ],
    consultationProcess: "Gentle clinical history, assessment of sphincter tone and bowel habits, review of pelvic MRI fistulogram if available, and prescribing deep-acting tissue healing remedies.",
    whenToSeekImmediateCare: [
      "High fever with throbbing, intense perianal swelling (perianal abscess)",
      "Extensive spreading redness, heat, and severe pain in the groin/buttocks",
      "Uncontrolled rectal bleeding with lightheadedness",
      "Faecal incontinence or sudden involuntary discharge"
    ],
    commonInquiries: [
      "Can an anal fistula heal completely with homeopathy without ksharsutra or surgery?",
      "How does homeopathy soothe the excruciating burning pain of an acute fissure?",
      "What steps guarantee that the fissure does not tear again after hard stools?"
    ]
  },
  {
    id: "pediatric-illnesses",
    name: "Paediatric / Child-related Illnesses",
    shortDescription: "Gentle sweet pills for recurrent colds, low immunity, teething troubles, bedwetting, worm infestations, and delayed milestones.",
    detailedOverview: "Children respond with remarkable speed to homeopathic remedies because their vital force is untainted by long-term chemical suppression. The sweet, pleasant taste makes administration effortless for parents while building robust natural immunity.",
    iconName: "Baby",
    tag: "Child Health",
    imageUrl: "/treatments/pediatric-illnesses.jpg",
    imageAlt: "Homeopathic care for children's health concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Frequent colds, coughs, and earaches after starting playschool",
      "Teething irritability, loose motions, and sleep restlessness in toddlers",
      "Nocturnal enuresis (bedwetting) in children beyond age 5",
      "Poor appetite, finicky eating, worm infestations, and sluggish growth"
    ],
    consultationProcess: "Warm, gentle observation of the child's temperament, physical constitution, birth history, milestone timings, and constitutional remedies.",
    whenToSeekImmediateCare: [
      "High fever with febrile seizures, lethargy, or refusal to drink any fluids",
      "Rapid breathing, grunting, chest indrawing, or cyanosis in infants",
      "Inconsolable high-pitched crying with sunken fontanelle or dry mouth",
      "Purpuric rash (small purple spots that do not fade when pressed)"
    ],
    commonInquiries: [
      "Are homeopathic medicines truly safe and chemical-free for infants?",
      "Do children easily accept the sweet homeopathic globule pills?",
      "Can homeopathy build long-term immunity against frequent school infections?"
    ]
  },
  {
    id: "uti",
    name: "UTI (Urinary Tract Infection)",
    shortDescription: "Rapid relief from burning urination, frequency, pelvic heaviness, and constitutional protection against recurring chronic UTIs.",
    detailedOverview: "Urinary tract infections cause distressing dysuria, painful bladder spasms, and urgency. While acute relief is prioritised, homeopathy excels at addressing constitutional susceptibility, preventing the endless cycle of antibiotic resistance in recurrent UTI patients.",
    iconName: "Droplet",
    tag: "Urinary Care",
    imageUrl: "/treatments/uti.jpg",
    imageAlt: "Homeopathic care for urinary tract infection concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Intense burning or scalding sensation during and after urination",
      "Constant urge to urinate with only a few painful drops passed",
      "Cloudy, pungent urine with lower pelvic heaviness and soreness",
      "Recurrent monthly infections triggered by intimacy, travel, or dehydration"
    ],
    consultationProcess: "Analysis of urine routine & culture reports, previous antibiotic sensitivities, hydration routines, and prescribing targeted urinary antiseptics and constitutional remedies.",
    whenToSeekImmediateCare: [
      "High fever with shivering, chills, nausea, and severe flank back pain (kidney involvement)",
      "Gross hematuria (passing obvious frank blood or clots in urine)",
      "Confusion, sudden disorientation, or severe lethargy in elderly patients",
      "Complete inability to void urine despite extreme urge"
    ],
    commonInquiries: [
      "Can homeopathy clear stubborn E. coli bacteria without antibiotics?",
      "How does treatment prevent recurrent urinary infections in women?",
      "How quickly do burning and painful urination subside with remedies?"
    ]
  },
  {
    id: "sexual-health",
    name: "Sexual Health Disorders",
    shortDescription: "Confidential and empathetic consultations for vitality, performance anxiety, premature ejaculation, and hormonal stamina balance.",
    detailedOverview: "Sexual health concerns are intricately tied to physical stamina, autonomic nerve tone, hormonal equilibrium, and psychological stress. Dr. B. Bhattacharyya Clinic provides completely private, dignified, and scientifically grounded constitutional homeopathy to revitalize confidence and vitality.",
    iconName: "HeartHandshake",
    tag: "Reproductive Wellness",
    imageUrl: "/treatments/sexual-health.jpg",
    imageAlt: "Homeopathic care for sexual health concerns",
    fallbackImageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    topicsDiscussed: [
      "Erectile difficulties, diminished firmness, and performance anxiety",
      "Premature ejaculation, lack of control, and nocturnal emissions",
      "Low libido, loss of physical stamina, chronic fatigue, and exhaustion",
      "Sperm count and motility concerns discussed in complete privacy"
    ],
    consultationProcess: "Gentle, confidential assessment of psychological stress, lifestyle fatigue, metabolic markers (testosterone, thyroid, diabetes), and tailored constitutional prescribing.",
    whenToSeekImmediateCare: [
      "Sudden severe testicular pain with swelling (testicular torsion emergency)",
      "Prolonged painful erection lasting over 4 hours (priapism)",
      "Signs of acute urethral discharge or ulcerating sexually transmitted sores",
      "Severe pelvic trauma or visible blood in semen with high fever"
    ],
    commonInquiries: [
      "Is the consultation completely private, confidential, and judgment-free?",
      "Are homeopathic medicines safe without causing dependency or side effects?",
      "How does constitutional treatment improve stamina and nervous confidence?"
    ]
  }
];
