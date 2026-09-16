/**
 * COORG LAYA RESORT - CENTRALIZED RESORT DATA & CONTENT ARCHITECTURE
 * 
 * STRICT CONTENT INTEGRITY POLICY:
 * - All business facts are strictly verified.
 * - No room tiers, prices, bed types, phone/WhatsApp numbers, awards, or fake distances are invented.
 * - Future-ready empty structures are provided for planned enhancements.
 */

export interface ResortContact {
  phone: string | null;
  whatsapp: string | null;
  email: string;
  reservationEmail: string;
  address: {
    line1: string;
    line2: string;
    village: string;
    post: string;
    town: string;
    pincode: string;
    district: string;
    state: string;
    country: string;
    fullFormatted: string;
  };
  mapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  socials: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tripadvisor?: string;
  };
}

export interface AccommodationOverview {
  totalRooms: number;
  maxGuestsApprox: number;
  headline: string;
  description: string;
  features: string[];
  // Future-ready slots - strictly empty until verified
  roomCategories: Array<{
    id: string;
    name: string;
    description: string;
    capacity: number;
    bedType?: string;
    sizeSqFt?: number;
    priceStarting?: number;
    amenities: string[];
    images: string[];
  }>;
}

export interface VerifiedAmenity {
  id: string;
  number: string;
  title: string;
  description: string;
  category: 'water' | 'recreation' | 'kids' | 'wellness';
  image: string;
  imageAlt: string;
  highlightTag?: string;
}

export interface VerifiedActivity {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  imageAlt: string;
}

export interface EventHosting {
  maxGuestsApprox: number;
  headline: string;
  description: string;
  verifiedEventTypes: Array<{
    id: string;
    name: string;
    tagline: string;
    description: string;
  }>;
  // Future-ready slots - strictly empty until verified
  eventPackages?: Array<{
    id: string;
    name: string;
    details: string;
  }>;
}

export interface NearbyAttraction {
  id: string;
  number: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  disclaimer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Entrance' | 'Rooms' | 'Pool' | 'Kids Play Area' | 'Badminton' | 'Volleyball' | 'Garden' | 'Events';
  image: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ResortPolicies {
  checkInTime: string | null;
  checkOutTime: string | null;
  cancellationPolicy: string | null;
  childPolicy: string | null;
  petPolicy: string | null;
  paymentMethods: string[];
}

export interface ResortData {
  brand: {
    name: string;
    tagline: string;
    subTagline: string;
    locationShort: string;
    domain: string;
  };
  contact: ResortContact;
  accommodation: AccommodationOverview;
  amenities: VerifiedAmenity[];
  activities: VerifiedActivity[];
  events: EventHosting;
  nearby: NearbyAttraction[];
  gallery: GalleryItem[];
  philosophy: {
    headline: string;
    subheading: string;
    birdsongQuote: string;
    paragraphs: string[];
    corePillars: Array<{
      title: string;
      description: string;
    }>;
  };
  policies: ResortPolicies;
  audio: {
    birdsongAudioUrl: string;
    audioDisclaimer: string;
  };
  navLinks: Array<{
    name: string;
    href: string;
  }>;
}

export const resortData: ResortData = {
  brand: {
    name: "Coorg Laya Resort",
    tagline: "A Peaceful Escape Into Coorg",
    subTagline: "Slow down, spend time together, and settle into a more relaxed rhythm in Coorg.",
    locationShort: "COORG · KARNATAKA",
    domain: "https://coorglayaresort.com",
  },
  contact: {
    phone: null, // Hidden until officially verified
    whatsapp: null, // Hidden until officially verified
    email: "reservation@coorgrivernestresort.com",
    reservationEmail: "reservation@coorgrivernestresort.com",
    address: {
      line1: "Teppadakandi, Siddapura Main Road",
      line2: "Basavanahalli Village, Gudde Hosur Post",
      village: "Basavanahalli Village",
      post: "Gudde Hosur Post",
      town: "Kushalnagar",
      pincode: "571234",
      district: "Kodagu",
      state: "Karnataka",
      country: "India",
      fullFormatted: "Teppadakandi, Siddapura Main Road, Basavanahalli Village, Gudde Hosur Post, Kushalnagar - 571234, Kodagu, Karnataka, India",
    },
    mapsUrl: "https://maps.google.com/maps?q=12.4349915%2C75.9235081&z=17&hl=en",
    coordinates: {
      lat: 12.4349915,
      lng: 75.9235081,
    },
    socials: {},
  },
  accommodation: {
    totalRooms: 15,
    maxGuestsApprox: 45,
    headline: "Stay at Coorg Laya",
    description: "Coorg Laya Resort offers 15 rooms with accommodation for up to approximately 45 overnight guests. Settle into quiet, comfortable rooms surrounded by fresh Kodagu greenery.",
    features: [
      "15 Private Guest Rooms",
      "Capacity for approximately 45 overnight guests",
      "Peaceful green surroundings and garden vistas",
      "Serene mornings with natural ambient birdsong",
    ],
    roomCategories: [], // Ready for future verified categories
  },
  amenities: [
    {
      id: "swimming-pool",
      number: "01",
      title: "Swimming Pool",
      description: "Make a little time for a refreshing swim during your stay. Designed with a circular shallow relaxation section surrounded by towering palms and breezy garden lawns.",
      category: "water",
      image: "https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png",
      imageAlt: "Swimming pool with a shallow circular section and surrounding palm trees at Coorg Laya Resort.",
      highlightTag: "Refresh & Unwind",
    },
    {
      id: "kids-play-trampoline",
      number: "02",
      title: "Kids Play Area & Trampoline",
      description: "A dedicated outdoor play space for children featuring an enclosed jumping trampoline and open grass to keep young ones happily engaged throughout the day.",
      category: "kids",
      image: "https://coorglayaresort.com/_next/static/immutable/media/kids-play-trampoline.0vmeruxo86x0z.png",
      imageAlt: "Children's recreation area with an enclosed trampoline at Coorg Laya Resort.",
      highlightTag: "Family Friendly",
    },
    {
      id: "badminton-court",
      number: "03",
      title: "Badminton Court",
      description: "Enjoy casual matches or friendly rallies on the resort's dedicated green lawn court, sheltered by natural bamboo borders and tropical foliage.",
      category: "recreation",
      image: "https://coorglayaresort.com/_next/static/immutable/media/badminton-court.0iu28t8sxg-vh.png",
      imageAlt: "Badminton court on the resort lawn, surrounded by palms and bamboo.",
      highlightTag: "Active Recreation",
    },
    {
      id: "volleyball-court",
      number: "04",
      title: "Volleyball Court",
      description: "Gather with friends and family for an energetic game of outdoor volleyball, perfect for group stays, social gatherings, and lively afternoons.",
      category: "recreation",
      image: "https://coorglayaresort.com/_next/static/immutable/media/garden-lawn.37ug0_wam9ctr.jpeg",
      imageAlt: "Spacious lawn area for volleyball matches and outdoor recreation.",
      highlightTag: "Group Play",
    },
    {
      id: "meditation-gardens",
      number: "05",
      title: "Meditation & Quiet Time",
      description: "Lush garden lawns and elevated stone-paved terraces provide quiet spaces beneath shady trees to pause, meditate, breathe deeply, and listen to the birds.",
      category: "wellness",
      image: "https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg",
      imageAlt: "Green lawn and raised garden terrace surrounded by bamboo and leafy trees at the resort.",
      highlightTag: "Serenity",
    },
  ],
  activities: [
    {
      id: "swimming",
      number: "01",
      title: "Swimming",
      tagline: "Cool down and relax under open skies",
      description: "Enjoy peaceful laps or leisurely dips in the resort swimming pool, an effortless way to slow down your day.",
      iconName: "Waves",
      image: "https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png",
      imageAlt: "Resort swimming pool surrounded by tropical trees.",
    },
    {
      id: "kids-play",
      number: "02",
      title: "Kids Play",
      tagline: "Safe open-air recreation for little explorers",
      description: "Children can freely run on the lawns and enjoy active outdoor games in a safe, tranquil resort environment.",
      iconName: "Smile",
      image: "https://coorglayaresort.com/_next/static/immutable/media/kids-play-trampoline.0vmeruxo86x0z.png",
      imageAlt: "Kids outdoor recreation area at the resort.",
    },
    {
      id: "trampoline",
      number: "03",
      title: "Trampoline",
      tagline: "High-flying joy and playful energy",
      description: "The enclosed jumping trampoline offers hours of bouncing fun for kids and active moments of joy.",
      iconName: "Sparkles",
      image: "https://coorglayaresort.com/_next/static/immutable/media/kids-play-trampoline.0vmeruxo86x0z.png",
      imageAlt: "Enclosed trampoline on the lawn.",
    },
    {
      id: "badminton",
      number: "04",
      title: "Badminton",
      tagline: "Friendly rallies in the cool Coorg breeze",
      description: "Pick up racquets and enjoy an invigorating outdoor badminton match on the landscaped lawn court.",
      iconName: "Activity",
      image: "https://coorglayaresort.com/_next/static/immutable/media/badminton-court.0iu28t8sxg-vh.png",
      imageAlt: "Badminton court setup on open green lawn.",
    },
    {
      id: "volleyball",
      number: "05",
      title: "Volleyball",
      tagline: "Team spirit and spirited outdoor games",
      description: "Team up for a volleyball match on the grounds, bringing friendly competition to your holiday.",
      iconName: "Flame",
      image: "https://coorglayaresort.com/_next/static/immutable/media/garden-lawn.37ug0_wam9ctr.jpeg",
      imageAlt: "Lawn area for volleyball recreation.",
    },
  ],
  events: {
    maxGuestsApprox: 500,
    headline: "Moments Worth Celebrating",
    description: "From intimate birthday gatherings and family functions to large social celebrations, Coorg Laya Resort provides open lawn spaces and a peaceful backdrop for events of up to approximately 500 guests.",
    verifiedEventTypes: [
      {
        id: "birthdays",
        name: "Birthdays",
        tagline: "Joyful open-air birthday celebrations",
        description: "Celebrate milestones with loved ones surrounded by greenery, fresh air, and spacious outdoor seating.",
      },
      {
        id: "family-functions",
        name: "Family Functions",
        tagline: "Cherished reunions and togetherness",
        description: "Bring extended families together in a private, unhurried sanctuary where every generation can unwind.",
      },
      {
        id: "private-celebrations",
        name: "Private Celebrations",
        tagline: "Exclusive gatherings in nature",
        description: "Host private parties and special anniversaries with peaceful seclusion in the heart of Kodagu.",
      },
      {
        id: "social-gatherings",
        name: "Social Gatherings",
        tagline: "Group get-togethers and getaways",
        description: "Spacious grounds accommodate group retreats, team outings, and friendly club get-togethers.",
      },
      {
        id: "special-events",
        name: "Special Events",
        tagline: "Custom gatherings for up to 500 guests",
        description: "Open garden spaces ready to host your personalized outdoor functions in a memorable setting.",
      },
    ],
  },
  nearby: [
    {
      id: "river-kaveri",
      number: "01",
      name: "River Kaveri",
      category: "Nearby Natural Attraction",
      shortDescription: "The lifeblood river of Karnataka flowing through lush Kodagu landscapes.",
      description: "The sacred River Kaveri flows peacefully through the Coorg region, offering scenic riverbank views and gentle nature walks. A wonderful local highlight to visit during your stay.",
      image: "https://coorglayaresort.com/_next/static/immutable/media/kaveri-river.1oewtgxod6v_h.png",
      imageAlt: "River Kaveri flowing through dense green trees, with a small boat on the water.",
      disclaimer: "Nearby natural attraction in the region. Not a direct private riverfront facility.",
    },
    {
      id: "hanging-bridge",
      number: "02",
      name: "Hanging Bridge",
      category: "Nearby Landmark",
      shortDescription: "A picturesque suspended footbridge over river currents.",
      description: "A popular suspension footbridge in the Kushalnagar vicinity offering elevated perspectives over tree canopies and river streams, ideal for leisurely morning visits and photography.",
      image: "https://coorglayaresort.com/_next/static/immutable/media/hanging-bridge.1xtwmt6sk5rax.png",
      imageAlt: "Hanging bridge extending through dense green trees near Coorg Laya Resort.",
      disclaimer: "Nearby visitor attraction in the Kushalnagar area.",
    },
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Resort Exteriors & Palm Pathways",
      category: "Entrance",
      image: "https://coorglayaresort.com/_next/static/immutable/media/resort-exteriors.2bq9ym6x0i3uq.jpeg",
      alt: "White resort buildings and a garden path shaded by palms at Coorg Laya Resort.",
    },
    {
      id: "gal-2",
      title: "Swimming Pool & Circular Deck",
      category: "Pool",
      image: "https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png",
      alt: "Swimming pool with a shallow circular section and surrounding palm trees.",
    },
    {
      id: "gal-3",
      title: "Guest Room Interior - Neutral Olive",
      category: "Rooms",
      image: "https://coorglayaresort.com/_next/static/immutable/media/room-interior-neutral.0i73oyjwh6ntv.jpeg",
      alt: "Room with white bedding, olive accents, a wardrobe and a dressing mirror.",
    },
    {
      id: "gal-4",
      title: "Guest Room Interior - Emerald Feature",
      category: "Rooms",
      image: "https://coorglayaresort.com/_next/static/immutable/media/room-interior-green.1pq4un8cgzr7r.jpeg",
      alt: "Room with a green patterned feature wall, wooden ceiling and comfortable bed.",
    },
    {
      id: "gal-5",
      title: "Kids Trampoline & Lawn Recreation",
      category: "Kids Play Area",
      image: "https://coorglayaresort.com/_next/static/immutable/media/kids-play-trampoline.0vmeruxo86x0z.png",
      alt: "Enclosed trampoline in the resort kids play area.",
    },
    {
      id: "gal-6",
      title: "Badminton Court on the Lawns",
      category: "Badminton",
      image: "https://coorglayaresort.com/_next/static/immutable/media/badminton-court.0iu28t8sxg-vh.png",
      alt: "Badminton court on the resort lawn, surrounded by palms and bamboo.",
    },
    {
      id: "gal-7",
      title: "Raised Garden Terrace & Seating",
      category: "Garden",
      image: "https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg",
      alt: "Green lawn and raised garden terrace surrounded by bamboo and leafy trees.",
    },
    {
      id: "gal-8",
      title: "Verandah Covered Lounge Area",
      category: "Garden",
      image: "https://coorglayaresort.com/_next/static/immutable/media/covered-seating.14m2n6fnxsknf.jpeg",
      alt: "Covered seating area with comfortable sofas, wooden roof beams and plants.",
    },
    {
      id: "gal-9",
      title: "Open Green Lawns & Event Spaces",
      category: "Events",
      image: "https://coorglayaresort.com/_next/static/immutable/media/garden-lawn.37ug0_wam9ctr.jpeg",
      alt: "Open green lawn surrounded by palms and bamboo, suitable for celebrations.",
    },
  ],
  philosophy: {
    headline: "A Sanctuary Rooted in Nature",
    subheading: "Where simplicity meets peaceful Kodagu hospitality.",
    birdsongQuote: "Wake Up to Birdsong.",
    paragraphs: [
      "Coorg Laya Resort is built around the idea of genuine relaxation. Tucked into the lush greenery of Kushalnagar, Kodagu, the property invites guests to step away from busy schedules and return to a simpler, more restorative pace.",
      "Mornings begin with crisp air and the natural chorus of birdsong. Days are spent at leisure — swimming in the pool, enjoying friendly matches of badminton or volleyball, watching children jump happily on the trampoline, or simply sitting with a warm cup of coffee on the garden terrace.",
      "With 15 private guest rooms accommodating up to 45 overnight guests and expansive lawn space for celebrations of up to 500 guests, Coorg Laya offers the ideal balance of intimate privacy and open-air hospitality.",
    ],
    corePillars: [
      {
        title: "Birdsong & Nature",
        description: "Awaken each morning to natural birdsong and gentle breezes rustling through surrounding trees.",
      },
      {
        title: "Unrushed Leisure",
        description: "Enjoy open lawns, swimming pool, outdoor sports, and quiet corners designed for mindful rest.",
      },
      {
        title: "Celebrations in Greenery",
        description: "Spacious outdoor lawns capable of hosting birthdays, family reunions, and events for up to 500 guests.",
      },
    ],
  },
  policies: {
    checkInTime: null,
    checkOutTime: null,
    cancellationPolicy: null,
    childPolicy: null,
    petPolicy: null,
    paymentMethods: [],
  },
  audio: {
    birdsongAudioUrl: "https://coorglayaresort.com/audio/birdsong-mild-sunny-day.ogg",
    audioDisclaimer: "Illustrative ambient nature recording. Audio is an ambient illustrative soundscape.",
  },
  navLinks: [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Amenities", href: "/amenities" },
    { name: "Activities", href: "/activities" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Nearby", href: "/nearby" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};
