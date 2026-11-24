// MJR Luxury Diamond Catalogue & Showroom Data
// Authentic luxury diamond jewellery photography, realistic specifications, and demo data

export const CATEGORIES = [
  {
    id: 'rings',
    name: 'Diamond Rings',
    slug: 'rings',
    description: 'Masterfully crafted bands and solitaires radiating eternal light.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
    itemCount: 8
  },
  {
    id: 'necklaces',
    name: 'Diamond Necklaces',
    slug: 'necklaces',
    description: 'Cascading brilliance designed to illuminate delicate collarbones.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    itemCount: 6
  },
  {
    id: 'earrings',
    name: 'Diamond Earrings',
    slug: 'earrings',
    description: 'Captivating drops, halos and studs capturing every flicker of light.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop',
    itemCount: 6
  },
  {
    id: 'bracelets',
    name: 'Diamond Bracelets',
    slug: 'bracelets',
    description: 'Iconic tennis bracelets and contemporary cuffs set in pure gold.',
    image: 'https://images.unsplash.com/photo-1611591475837-1249e0c7ba53?q=80&w=1200&auto=format&fit=crop',
    itemCount: 5
  },
  {
    id: 'solitaires',
    name: 'Solitaire Collection',
    slug: 'solitaires',
    description: 'Hand-selected rare diamonds cut to absolute geometric perfection.',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop',
    itemCount: 7
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'mjr-prod-1',
    name: 'Aethel Solitaire Diamond Ring',
    category: 'rings',
    subCategory: 'Solitaire Rings',
    price: 345000,
    carat: '1.50 ct',
    metal: '18K White Gold',
    cut: 'Ideal',
    color: 'D (Colorless)',
    clarity: 'VVS1',
    shape: 'Round Brilliant',
    certificate: 'GIA Certified',
    badge: 'Signature',
    isNew: false,
    isBestSeller: true,
    isSignature: true,
    rating: 4.9,
    reviewCount: 18,
    description: 'The pinnacle of classic bridal elegance. A hand-selected 1.50 carat round brilliant solitaire held in a delicate four-prong platinum basket over an 18K white gold micro-pavé band.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['10', '12', '14', '16', '18'],
    metalOptions: ['18K White Gold', '18K Yellow Gold', '18K Rose Gold', 'Platinum 950'],
    stock: 4,
    occasion: 'Engagement'
  },
  {
    id: 'mjr-prod-2',
    name: 'Lumière Classic Diamond Pendant',
    category: 'necklaces',
    subCategory: 'Diamond Pendants',
    price: 185000,
    carat: '0.95 ct',
    metal: '18K Yellow Gold',
    cut: 'Excellent',
    color: 'E (Colorless)',
    clarity: 'VVS2',
    shape: 'Round Brilliant',
    certificate: 'IGI Certified',
    badge: 'Best Seller',
    isNew: false,
    isBestSeller: true,
    isSignature: true,
    rating: 5.0,
    reviewCount: 24,
    description: 'A solitaire diamond suspended effortlessly within an uninterrupted circle of warm 18K yellow gold, suspended on an Italian diamond-cut cable chain.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['16 inch', '18 inch'],
    metalOptions: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold'],
    stock: 7,
    occasion: 'Everyday Luxury'
  },
  {
    id: 'mjr-prod-3',
    name: 'Riviera Diamond Tennis Bracelet',
    category: 'bracelets',
    subCategory: 'Diamond Bracelets',
    price: 520000,
    carat: '4.20 ct TW',
    metal: 'Platinum 950',
    cut: 'Ideal',
    color: 'F (Colorless)',
    clarity: 'VS1',
    shape: 'Round Brilliant',
    certificate: 'IGI Certified',
    badge: 'Exclusive',
    isNew: true,
    isBestSeller: true,
    isSignature: true,
    rating: 4.9,
    reviewCount: 14,
    description: 'An unbroken river of fifty-six precisely calibrated round brilliant diamonds, each hand-set in a low-profile four-prong setting with a concealed double-safety clasp.',
    image: 'https://images.unsplash.com/photo-1611591475837-1249e0c7ba53?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1611591475837-1249e0c7ba53?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['6.5 inch', '7.0 inch', '7.5 inch'],
    metalOptions: ['Platinum 950', '18K White Gold', '18K Yellow Gold'],
    stock: 3,
    occasion: 'Anniversary'
  },
  {
    id: 'mjr-prod-4',
    name: 'Petale Floral Diamond Stud Earrings',
    category: 'earrings',
    subCategory: 'Diamond Earrings',
    price: 210000,
    carat: '1.20 ct TW',
    metal: '18K Rose Gold',
    cut: 'Excellent',
    color: 'D (Colorless)',
    clarity: 'VVS2',
    shape: 'Marquise & Round',
    certificate: 'GIA Certified',
    badge: 'New Arrival',
    isNew: true,
    isBestSeller: false,
    isSignature: true,
    rating: 4.8,
    reviewCount: 9,
    description: 'Inspired by blossoming botanical silhouettes, delicate marquise and round diamonds create a delicate floral cluster that rests weightlessly against the lobe.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['Standard Post'],
    metalOptions: ['18K Rose Gold', '18K White Gold', '18K Yellow Gold'],
    stock: 6,
    occasion: 'Evening'
  },
  {
    id: 'mjr-prod-5',
    name: 'Aura Halo Diamond Engagement Ring',
    category: 'rings',
    subCategory: 'Engagement Rings',
    price: 465000,
    carat: '1.80 ct TW',
    metal: 'Platinum 950',
    cut: 'Ideal',
    color: 'E (Colorless)',
    clarity: 'VVS1',
    shape: 'Cushion',
    certificate: 'GIA Certified',
    badge: 'Best Seller',
    isNew: false,
    isBestSeller: true,
    isSignature: true,
    rating: 5.0,
    reviewCount: 31,
    description: 'A radiant cushion-cut centre diamond embraced by a seamless halo of micro-brilliants that amplifies its fire, set atop a tapering French pavé shank.',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['11', '12', '13', '14', '15', '16'],
    metalOptions: ['Platinum 950', '18K White Gold', '18K Yellow Gold'],
    stock: 2,
    occasion: 'Engagement'
  },
  {
    id: 'mjr-prod-6',
    name: 'Seraphina Emerald-Cut Diamond Choker',
    category: 'necklaces',
    subCategory: 'Diamond Necklaces',
    price: 890000,
    carat: '5.50 ct TW',
    metal: '18K White Gold',
    cut: 'Very Good',
    color: 'D (Colorless)',
    clarity: 'FL (Flawless)',
    shape: 'Emerald',
    certificate: 'GIA Certified',
    badge: 'High Jewellery',
    isNew: true,
    isBestSeller: false,
    isSignature: true,
    rating: 5.0,
    reviewCount: 7,
    description: 'An architectural statement piece featuring alternating emerald and baguette-cut diamonds articulating smoothly around the neck for unforgettable evening poise.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['15 inch Collar'],
    metalOptions: ['18K White Gold', 'Platinum 950'],
    stock: 1,
    occasion: 'Bridal'
  },
  {
    id: 'mjr-prod-7',
    name: 'Céleste Oval Solitaire Diamond Ring',
    category: 'rings',
    subCategory: 'Solitaire Rings',
    price: 610000,
    carat: '2.10 ct',
    metal: '18K Yellow Gold',
    cut: 'Ideal',
    color: 'E (Colorless)',
    clarity: 'VVS2',
    shape: 'Oval',
    certificate: 'GIA Certified',
    badge: 'Exclusive',
    isNew: false,
    isBestSeller: true,
    isSignature: true,
    rating: 4.9,
    reviewCount: 22,
    description: 'An elongated 2.10 carat oval diamond exhibiting breathtaking fire and brilliance, cradled in a hidden diamond collar over an unembellished 18K yellow gold band.',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['10', '12', '14', '16'],
    metalOptions: ['18K Yellow Gold', '18K White Gold', 'Platinum 950'],
    stock: 3,
    occasion: 'Engagement'
  },
  {
    id: 'mjr-prod-8',
    name: 'Éternité Diamond Eternity Band',
    category: 'rings',
    subCategory: 'Diamond Bands',
    price: 275000,
    carat: '2.00 ct TW',
    metal: '18K White Gold',
    cut: 'Ideal',
    color: 'F (Colorless)',
    clarity: 'VS1',
    shape: 'Princess',
    certificate: 'IGI Certified',
    badge: 'New Arrival',
    isNew: true,
    isBestSeller: true,
    isSignature: true,
    rating: 4.9,
    reviewCount: 16,
    description: 'A seamless circle of channel-set princess cut diamonds celebrating enduring commitment with clean geometric lines and comfortable daily wear.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop'
    ],
    availableSizes: ['11', '13', '15', '17'],
    metalOptions: ['18K White Gold', 'Platinum 950', '18K Yellow Gold'],
    stock: 5,
    occasion: 'Anniversary'
  }
];

export const SHOWROOM_LOCATIONS = [
  {
    id: 'mumbai-flagship',
    name: 'MJR Flagship Atelier — Mumbai',
    city: 'Mumbai',
    area: 'Bandra West',
    address: 'Plot 18, Pali Hill Luxury Enclave, Bandra West',
    stateZip: 'Mumbai, Maharashtra 400050',
    phone: '+91 (022) 8800 2400',
    email: 'mumbai@mjrjewels.com',
    whatsapp: '+919820011222',
    hours: 'Monday to Sunday: 11:00 AM – 8:30 PM (By Private Appointment)',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop',
    features: ['Private Salon Lounges', 'Master Gemologist on site', 'Bespoke Design Studio', 'Complimentary Champagne Bar']
  },
  {
    id: 'delhi-salon',
    name: 'MJR High Jewellery Salon — New Delhi',
    city: 'New Delhi',
    area: 'Mehrauli Heritage District',
    address: 'One Style Mile, Near Qutub Minar, Mehrauli',
    stateZip: 'New Delhi 110030',
    phone: '+91 (011) 4590 3100',
    email: 'delhi@mjrjewels.com',
    whatsapp: '+919811033444',
    hours: 'Tuesday to Sunday: 11:30 AM – 8:00 PM (Monday Closed)',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    features: ['Bridal Trousseau Suites', 'Secure VIP Valet Parking', 'High Jewellery Vault', 'IGI Diamond Certification Bureau']
  },
  {
    id: 'bengaluru-boutique',
    name: 'MJR Contemporary Boutique — Bengaluru',
    city: 'Bengaluru',
    area: 'Indiranagar 100ft Road',
    address: '612, 100 Feet Road, HAL 2nd Stage, Indiranagar',
    stateZip: 'Bengaluru, Karnataka 560038',
    phone: '+91 (080) 6720 1800',
    email: 'bengaluru@mjrjewels.com',
    whatsapp: '+919845055666',
    hours: 'Monday to Sunday: 10:30 AM – 8:00 PM',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
    features: ['Minimalist Viewing Bar', 'Solitaire Touch Experience', 'Immediate Finger Sizing', 'Same-Day Insured Courier Desk']
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Aanya Singhania',
    city: 'Mumbai',
    product: 'Aethel Solitaire Diamond Ring (1.50 ct)',
    rating: 5,
    date: '14 October 2026',
    verified: true,
    comment: 'The craftsmanship at MJR is in a league of its own. When the velvet box opened in our private Bandra salon appointment, the fire and brilliance of the diamond literally took my breath away. Unmatched personal attention.'
  },
  {
    id: 'test-2',
    name: 'Vikram & Radhika Mehta',
    city: 'New Delhi',
    product: 'Riviera Diamond Tennis Bracelet & Halo Ring',
    rating: 5,
    date: '28 September 2026',
    verified: true,
    comment: 'Having shopped in Place Vendôme and New Bond Street, I can honestly say MJR brings true global high-jewellery standards right home to India. The GIA grading reports and secure delivery were seamless.'
  },
  {
    id: 'test-3',
    name: 'Nandini Kothari',
    city: 'Bengaluru',
    product: 'Lumière Classic Diamond Pendant',
    rating: 5,
    date: '05 November 2026',
    verified: true,
    comment: 'Understated, sophisticated and timeless. I wear my Lumière pendant every single day—it catches sunlight in the most delicate way. The packaging alone feels like pure art.'
  }
];

export const EDUCATION_4CS = [
  {
    id: 'cut',
    title: 'CUT',
    subtitle: 'The Soul of Brilliance',
    gradeRange: 'Ideal to Excellent',
    description: 'The Cut determines how light enters and bounces inside the diamond before exiting through the crown. While nature dictates color and clarity, cut is the only element shaped directly by human hands.',
    details: [
      'Ideal proportions optimize internal total reflection',
      'Minimizes light leakage through bottom pavilions',
      'Produces the signature MJR scintillation and fiery flashes'
    ],
    metric: 'Proportion & Symmetry'
  },
  {
    id: 'colour',
    title: 'COLOUR',
    subtitle: 'The Pure Absence of Hue',
    gradeRange: 'D, E, F (Colorless Tiers)',
    description: 'In fine diamonds, supreme rarity is defined by absolute colorlessness. MJR exclusively curates diamonds in the top colorless and near-colorless grades, allowing pristine icy sparkle.',
    details: [
      'D Grade: Highest attainable colorless standard',
      'E & F Grades: Visually flawless to trained gemologists',
      'Set exclusively in 18K white gold or pure platinum'
    ],
    metric: 'D to Z Color Scale'
  },
  {
    id: 'clarity',
    title: 'CLARITY',
    subtitle: 'Nature’s Unique Fingerprint',
    gradeRange: 'FL to VS1 (Eye Clean Guarantee)',
    description: 'Formed deep in the earth under immense heat and pressure, diamonds carry natural microscopic signatures. MJR selects only stones with no inclusions perceptible to the naked human eye.',
    details: [
      'FL / IF: Internally Flawless under 10x magnification',
      'VVS1 - VVS2: Extremely minute inclusions',
      '100% Eye-Clean guarantee across every piece'
    ],
    metric: 'GIA Clarity Standard'
  },
  {
    id: 'carat',
    title: 'CARAT',
    subtitle: 'Weight & Presence',
    gradeRange: '0.50 ct to 10.00+ ct',
    description: 'Carat measures diamond weight (1 carat = 200 milligrams). Because larger rough crystals are exponentially rarer in nature, value increases exponentially with carat weight.',
    details: [
      'Calibrated to exact hundredths of a carat',
      'Proportionally balanced with diameter for maximum presence',
      'Individual gemological certification card with every stone'
    ],
    metric: '1 Carat = 0.200 Grams'
  }
];
