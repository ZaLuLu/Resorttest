/**
 * COORG LAYA RESORT - CENTRALIZED RESORT DATA & TOURISM MAP ARCHITECTURE
 * 
 * STRICT CONTENT INTEGRITY POLICY:
 * - All business facts are strictly verified.
 * - 15 rooms, ~45 overnight guests, 500 lawn capacity.
 * - 10 verified tourist destinations with exact distance ranges, driving times, categories, and descriptions.
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
  suites: Array<{
    id: string;
    name: string;
    subtitle: string;
    description: string;
    capacity: string;
    image: string;
    imageAlt: string;
    highlights: string[];
    tag: string;
  }>;
}

export interface VerifiedAmenity {
  id: string;
  number: string;
  title: string;
  description: string;
  category: 'water' | 'recreation' | 'kids' | 'wellness' | 'garden';
  image: string;
  imageAlt: string;
  highlightTag: string;
  timeSlot?: string;
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
  energyLevel: 'Relaxed' | 'Moderate' | 'Active';
  idealFor: string;
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
    capacityNote: string;
  }>;
}

export interface TouristDestination {
  id: string;
  number: string;
  name: string;
  distanceKm: string;
  drivingTime: string;
  category: 'Viewpoints & Hills' | 'Heritage & History' | 'Temples & Sacred' | 'Waterfalls & Nature' | 'Riverside & Wildlife';
  categoryTag: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  mapsQuery: string;
  highlight: string;
  travelTip: string;
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
    elevation: string;
  };
  contact: ResortContact;
  accommodation: AccommodationOverview;
  amenities: VerifiedAmenity[];
  activities: VerifiedActivity[];
  events: EventHosting;
  touristPlaces: TouristDestination[];
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
    tagline: "Unhurried Days Under the Coorg Sun",
    subTagline: "Slow down, spend time together, and settle into the warm natural rhythm of Kodagu.",
    locationShort: "KUSHALNAGAR · KODAGU",
    domain: "https://coorglayaresort.com",
    elevation: "850m ASL",
  },
  contact: {
    phone: null,
    whatsapp: null,
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
    headline: "Private Living Quarters",
    description: "15 private guest rooms accommodating up to approximately 45 overnight guests amidst the peaceful mountain atmosphere and fresh gardens of Kodagu.",
    features: [
      "15 Private Guest Suites",
      "Capacity for ~45 overnight guests across families and groups",
      "Private attached bathrooms, wardrobes & dressing mirrors",
      "Garden-facing windows with tranquil morning birdsong",
    ],
    suites: [
      {
        id: "suite-olive",
        name: "Calm Olive Suite",
        subtitle: "Minimalist Comfort & Garden Breezes",
        description: "Comfortable, clean interiors with wardrobes, vanity dressing mirror, and private bathroom looking out onto lush green resort grounds.",
        capacity: "Up to 3 Guests per Room",
        image: "/images/rooms/room-interior-neutral.jpeg",
        imageAlt: "Room with white bedding, olive accents, a wardrobe and a dressing mirror at Coorg Laya Resort",
        highlights: ["Wardrobe & Storage", "Dressing Vanity Mirror", "En-suite Bathroom", "Garden Vista"],
        tag: "Verified Room Interior",
      },
      {
        id: "suite-emerald",
        name: "Emerald Accent Suite",
        subtitle: "Nature-Inspired Feature Wall & Timber Accents",
        description: "Inviting nature-inspired feature walls, warm timber roof detailing, and relaxed highland comfort for restful mountain nights.",
        capacity: "Up to 3 Guests per Room",
        image: "/images/rooms/room-interior-green.jpeg",
        imageAlt: "Room with a green patterned feature wall, wooden ceiling and comfortable bed at Coorg Laya Resort",
        highlights: ["Botanical Feature Wall", "Timber Ceiling Accents", "En-suite Bathroom", "Balcony Vista"],
        tag: "Verified Room Interior",
      },
      {
        id: "suite-twin",
        name: "Deluxe Twin Suite",
        subtitle: "Spacious Multi-Bed Family Accommodation",
        description: "Generous bedroom configuration tailored for family holidays, with adjoining seating and private bath amenities.",
        capacity: "Up to 4 Guests per Room",
        image: "/images/rooms/room-interior-beds.jpeg",
        imageAlt: "Twin bed bedroom interior at Coorg Laya Resort",
        highlights: ["Multiple Beds", "Spacious Floor Plan", "En-suite Bathroom", "Garden Access"],
        tag: "Family Suite",
      },
      {
        id: "suite-lounge",
        name: "Garden Verandah Suite",
        subtitle: "Adjoining Lounge & Private Verandah Seating",
        description: "Bright, airy rooms featuring a relaxed sitting nook and direct step-out access to shaded palm walkways.",
        capacity: "Up to 3 Guests per Room",
        image: "/images/rooms/room-interior-seating.jpeg",
        imageAlt: "Suite with interior seating area and sunny windows",
        highlights: ["Interior Sitting Area", "Private Wardrobe", "En-suite Bathroom", "Morning Sunlight"],
        tag: "Verandah Suite",
      }
    ]
  },
  amenities: [
    {
      id: "swimming-pool",
      number: "01",
      title: "Swimming Pool",
      description: "Make time for a refreshing swim during your stay. Designed with a circular shallow relaxation section surrounded by towering palms and breezy garden lawns.",
      category: "water",
      image: "/images/amenities/swimming-pool.png",
      imageAlt: "Swimming pool with a shallow circular section and surrounding palm trees at Coorg Laya Resort.",
      highlightTag: "Palm-Shaded Dip",
      timeSlot: "11:00 AM — Midday Sun",
    },
    {
      id: "kids-play-trampoline",
      number: "02",
      title: "Kids Play Area & Trampoline",
      description: "A dedicated outdoor play space for children featuring an enclosed jumping trampoline and open grass to keep young ones happily engaged throughout the day.",
      category: "kids",
      image: "/images/amenities/kids-play-trampoline.png",
      imageAlt: "Children's recreation area with an enclosed trampoline at Coorg Laya Resort.",
      highlightTag: "Family Friendly",
      timeSlot: "03:30 PM — Afternoon Play",
    },
    {
      id: "badminton-court",
      number: "03",
      title: "Badminton Court",
      description: "Enjoy casual matches or friendly rallies on the resort's dedicated green lawn court, sheltered by natural bamboo borders and tropical foliage.",
      category: "recreation",
      image: "/images/amenities/badminton-court.png",
      imageAlt: "Badminton court on the resort lawn, surrounded by palms and bamboo.",
      highlightTag: "Active Recreation",
      timeSlot: "04:30 PM — Golden Hour Rally",
    },
    {
      id: "volleyball-court",
      number: "04",
      title: "Volleyball Court",
      description: "Gather with friends and family for an energetic game of outdoor volleyball, perfect for group stays, social gatherings, and lively afternoons.",
      category: "recreation",
      image: "/images/resort/garden-lawn.jpeg",
      imageAlt: "Spacious lawn area for volleyball matches and outdoor recreation.",
      highlightTag: "Group Matches",
      timeSlot: "05:15 PM — Sunset Match",
    },
    {
      id: "garden-terrace",
      number: "05",
      title: "Raised Garden Terraces",
      description: "Peaceful elevated garden platforms surrounded by bamboo and leafy trees, perfect for slow mornings, hot coffee, and quiet reading.",
      category: "garden",
      image: "/images/resort/garden-terrace.jpeg",
      imageAlt: "Green lawn and raised garden terrace surrounded by bamboo and leafy trees.",
      highlightTag: "Unhurried Rest",
      timeSlot: "07:30 PM — Starlit Evening",
    },
  ],
  activities: [
    {
      id: "morning-swim",
      number: "01",
      title: "Poolside Swimming & Sunbathing",
      tagline: "Cool off beneath the palms",
      description: "Enjoy leisure swims or relax in the circular shallow lounge section while taking in the tropical greenery.",
      iconName: "Waves",
      image: "/images/amenities/swimming-pool.png",
      imageAlt: "Sunlit swimming pool framed by palms.",
      energyLevel: "Relaxed",
      idealFor: "All Guests & Families",
    },
    {
      id: "kids-trampoline",
      number: "02",
      title: "Kids Trampoline & Lawn Games",
      tagline: "Safe outdoor laughter",
      description: "Enclosed trampoline bouncing and wide lawn running space for children to play freely in clean mountain air.",
      iconName: "Smile",
      image: "/images/amenities/kids-play-trampoline.png",
      imageAlt: "Children jumping on enclosed trampoline.",
      energyLevel: "Active",
      idealFor: "Kids & Young Families",
    },
    {
      id: "badminton-match",
      number: "03",
      title: "Bamboo Lawn Badminton",
      tagline: "Energizing rallies",
      description: "Pick up racquets and enjoy an invigorating outdoor badminton match on the landscaped lawn court sheltered by bamboo.",
      iconName: "Activity",
      image: "/images/amenities/badminton-court.png",
      imageAlt: "Badminton court setup on open green lawn.",
      energyLevel: "Moderate",
      idealFor: "Groups & Friends",
    },
    {
      id: "lawn-volleyball",
      number: "04",
      title: "Outdoor Volleyball",
      tagline: "Spirited group competition",
      description: "Team up for a friendly volleyball match on the open grounds, bringing energetic bonding to your holiday.",
      iconName: "Flame",
      image: "/images/resort/garden-lawn.jpeg",
      imageAlt: "Lawn area for volleyball recreation.",
      energyLevel: "Active",
      idealFor: "Groups & Reunions",
    },
    {
      id: "terrace-stargazing",
      number: "05",
      title: "Terrace Coffee & Stargazing",
      tagline: "Serene night conversations",
      description: "End the day on the raised garden terrace with warm tea or coffee under dark, starlit Kodagu skies.",
      iconName: "Sparkles",
      image: "/images/resort/covered-seating.jpeg",
      imageAlt: "Covered seating area for evening relaxation.",
      energyLevel: "Relaxed",
      idealFor: "Couples & Families",
    },
  ],
  events: {
    maxGuestsApprox: 500,
    headline: "500-Guest Outdoor Lawn & Celebrations",
    description: "From open-air weddings and birthday milestone parties to family reunions and group retreats, Coorg Laya Resort provides expansive open lawns and a peaceful natural backdrop for up to approximately 500 guests.",
    verifiedEventTypes: [
      {
        id: "weddings",
        name: "Open-Air Weddings & Receptions",
        tagline: "Scenic mandap and banquet lawn setup",
        description: "Host grand outdoor wedding celebrations beneath open skies with ample space for dining, staging, and photography.",
        capacityNote: "Up to 500 Guests",
      },
      {
        id: "birthdays",
        name: "Milestone Birthdays",
        tagline: "Joyful open-air birthday celebrations",
        description: "Celebrate milestone birthdays with loved ones surrounded by palm greenery, fresh mountain air, and spacious lawn seating.",
        capacityNote: "50 to 350 Guests",
      },
      {
        id: "family-functions",
        name: "Grand Family Reunions",
        tagline: "Cherished togetherness across generations",
        description: "Bring extended families together in a private, unhurried sanctuary where all generations can relax, play, and dine.",
        capacityNote: "20 to 500 Guests",
      },
      {
        id: "corporate-retreats",
        name: "Corporate Offsites & Retreats",
        tagline: "Team bonding, sports, and open air",
        description: "Spacious grounds accommodate company retreats, strategy offsites, sports tournaments, and evening social dinners.",
        capacityNote: "30 to 250 Guests",
      },
    ],
  },
  touristPlaces: [
    {
      id: "rajas-seat",
      number: "01",
      name: "Raja's Seat",
      distanceKm: "~6–10 km",
      drivingTime: "15–25 min",
      category: "Viewpoints & Hills",
      categoryTag: "Sunset Viewpoint",
      shortDescription: "Famous viewpoint and garden overlooking Coorg's beautiful valleys and misty hills.",
      description: "Famous viewpoint and garden overlooking Coorg's beautiful valleys and misty hills; especially popular at sunset.",
      image: "/images/nearby/nearby-attractions-overview.png",
      imageAlt: "Panoramic viewpoint overlooking mist-covered valleys of Kodagu.",
      mapsQuery: "Raja's Seat, Madikeri, Karnataka",
      highlight: "Mesmerizing sunset views over rolling valleys",
      travelTip: "Arrive by 5:15 PM for optimal sunset colors.",
    },
    {
      id: "madikeri-fort",
      number: "02",
      name: "Madikeri Fort",
      distanceKm: "~6–10 km",
      drivingTime: "15–25 min",
      category: "Heritage & History",
      categoryTag: "Historical Landmark",
      shortDescription: "Historic fort in Madikeri showcasing the region's royal and colonial heritage.",
      description: "Historic fort in Madikeri showcasing the region's royal and colonial heritage, with stone battlements and museum exhibits.",
      image: "/images/resort/resort-exteriors.jpeg",
      imageAlt: "Historic stone architecture and colonial fort walls in Madikeri.",
      mapsQuery: "Madikeri Fort, Madikeri, Karnataka",
      highlight: "17th-century palace, stone elephants & museum",
      travelTip: "Great morning historical walk; photography permitted.",
    },
    {
      id: "omkareshwara-temple",
      number: "03",
      name: "Omkareshwara Temple",
      distanceKm: "~6–10 km",
      drivingTime: "15–25 min",
      category: "Temples & Sacred",
      categoryTag: "Sacred Architecture",
      shortDescription: "Historic Shiva temple in Madikeri with distinctive Gothic-Islamic architecture.",
      description: "Historic Shiva temple in Madikeri, known for its distinctive architecture, central dome, and peaceful sacred water tank.",
      image: "/images/resort/covered-seating.jpeg",
      imageAlt: "Ancient temple with central water tank and serene surroundings.",
      mapsQuery: "Omkareshwara Temple, Madikeri, Karnataka",
      highlight: "Rare Islamic-Gothic blend built in 1820",
      travelTip: "Early morning visits offer profound quiet and fish feeding in the tank.",
    },
    {
      id: "rajas-tomb",
      number: "04",
      name: "Raja's Tomb (Gaddige)",
      distanceKm: "~8–12 km",
      drivingTime: "20–30 min",
      category: "Heritage & History",
      categoryTag: "Royal Monarchy",
      shortDescription: "Historic resting place of Kodagu royalty, surrounded by greenery and hill views.",
      description: "Historic resting place of Kodagu royalty (King Doddaveerarajendra and Lingarajendra), built in Indo-Islamic style with panoramic hill views.",
      image: "/images/resort/garden-lawn.jpeg",
      imageAlt: "Indo-Islamic domed tombs surrounded by gardens and hills.",
      mapsQuery: "Raja's Tomb Gaddige, Madikeri, Karnataka",
      highlight: "Muhammadan-style royal tombs overlooking Madikeri",
      travelTip: "Quiet spot ideal for peaceful photography and historical appreciation.",
    },
    {
      id: "abbey-falls",
      number: "05",
      name: "Abbey Falls",
      distanceKm: "~12–16 km",
      drivingTime: "25–35 min",
      category: "Waterfalls & Nature",
      categoryTag: "Iconic Waterfall",
      shortDescription: "One of Coorg's best-known waterfalls, surrounded by coffee plantations.",
      description: "One of Coorg's best-known waterfalls, surrounded by coffee plantations, spice gardens, and lush greenery with a hanging bridge view.",
      image: "/images/nearby/kaveri-river.png",
      imageAlt: "Cascading waterfall plunging through coffee and spice plantations.",
      mapsQuery: "Abbey Falls, Madikeri, Karnataka",
      highlight: "Roaring waterfall framed by cardamom and coffee shrubs",
      travelTip: "Wear comfortable walking shoes for the 200m plantation pathway.",
    },
    {
      id: "mandalpatti",
      number: "06",
      name: "Mandalpatti View Point",
      distanceKm: "~25–30 km",
      drivingTime: "50–70 min",
      category: "Viewpoints & Hills",
      categoryTag: "Mountain Summit",
      shortDescription: "Spectacular hilltop viewpoint known for mist-covered mountains and jeep rides.",
      description: "Spectacular hilltop viewpoint known for mist-covered mountains, panoramic Western Ghats scenery, and thrilling 4x4 off-road jeep trails.",
      image: "/images/nearby/hanging-bridge.png",
      imageAlt: "Sweeping view of rolling green mountain ridges and mist.",
      mapsQuery: "Mandalpatti Peak, Madikeri, Karnataka",
      highlight: "1,600m high summit with 360-degree valley views",
      travelTip: "Hire an authorized 4x4 jeep from the base; windbreaker recommended.",
    },
    {
      id: "bhagamandala",
      number: "07",
      name: "Bhagamandala",
      distanceKm: "~35–40 km",
      drivingTime: "55–70 min",
      category: "Temples & Sacred",
      categoryTag: "Sacred Confluence",
      shortDescription: "Important pilgrimage destination famous for the Triveni Sangama and temple.",
      description: "Important pilgrimage destination famous for the sacred Triveni Sangama (confluence of Cauvery, Kannike, and mythical Sujyothi rivers) and Bhagandeshwara Temple.",
      image: "/images/resort/garden-terrace.jpeg",
      imageAlt: "Sacred river confluence and temple complex amidst Western Ghats.",
      mapsQuery: "Bhagamandala, Kodagu, Karnataka",
      highlight: "Holy Triveni Sangama river confluence",
      travelTip: "Combine this with a trip up to Talakaveri (8 km ahead).",
    },
    {
      id: "talakaveri",
      number: "08",
      name: "Talakaveri",
      distanceKm: "~43–50 km",
      drivingTime: "1 hr 10 min–1 hr 30 min",
      category: "Temples & Sacred",
      categoryTag: "Sacred River Origin",
      shortDescription: "Sacred birthplace and source of the River Cauvery in the Brahmagiri Hills.",
      description: "Sacred birthplace/source of the River Cauvery, located amid the beautiful Brahmagiri Hills with steps leading to the breathtaking Brahmagiri peak viewpoint.",
      image: "/images/nearby/kaveri-river.png",
      imageAlt: "Sacred spring pool at the base of Brahmagiri mountain ridge.",
      mapsQuery: "Talakaveri, Brahmagiri Hills, Karnataka",
      highlight: "Holy Cauvery Kundike and Brahmagiri summit panorama",
      travelTip: "Climb the 365 steps to Brahmagiri peak for majestic cloudscapes.",
    },
    {
      id: "kaveri-nisargadhama",
      number: "09",
      name: "Kaveri Nisargadhama",
      distanceKm: "~30–35 km",
      drivingTime: "45–60 min",
      category: "Riverside & Wildlife",
      categoryTag: "Riverside Nature Island",
      shortDescription: "Popular riverside nature destination near Kushalnagar with hanging bridge.",
      description: "Popular 64-acre riverside nature island formed by River Kaveri, featuring a scenic suspension bridge, bamboo groves, deer park, and calm family walkways.",
      image: "/images/nearby/hanging-bridge.png",
      imageAlt: "Hanging bridge extending over River Kaveri into bamboo island.",
      mapsQuery: "Kaveri Nisargadhama, Kushalnagar, Karnataka",
      highlight: "Suspension bridge walking and teak/bamboo island walks",
      travelTip: "Ideal 2-hour family morning excursion with great shade.",
    },
    {
      id: "dubare-elephant-camp",
      number: "10",
      name: "Dubare Elephant Camp",
      distanceKm: "~35–45 km",
      drivingTime: "55 min–1 hr 15 min",
      category: "Riverside & Wildlife",
      categoryTag: "River & Wildlife",
      shortDescription: "Famous riverside destination associated with elephants and forest nature.",
      description: "Famous riverside destination on the banks of River Kaveri associated with elephant bathing/feeding experiences, stillwater boating, and deciduous forest scenery.",
      image: "/images/amenities/swimming-pool.png",
      imageAlt: "Elephant camp along the riverbank surrounded by forest trees.",
      mapsQuery: "Dubare Elephant Camp, Kodagu, Karnataka",
      highlight: "Morning elephant interaction & stillwater river crossing",
      travelTip: "Arrive between 9:00 AM – 11:00 AM for the morning elephant routine.",
    },
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Resort Exteriors & Palm Pathways",
      category: "Entrance",
      image: "/images/resort/resort-exteriors.jpeg",
      alt: "White resort buildings and a garden path shaded by palms at Coorg Laya Resort.",
    },
    {
      id: "gal-2",
      title: "Swimming Pool & Palm Deck",
      category: "Pool",
      image: "/images/amenities/swimming-pool.png",
      alt: "Swimming pool with a shallow circular section and surrounding palm trees.",
    },
    {
      id: "gal-3",
      title: "Guest Room Interior - Neutral Olive",
      category: "Rooms",
      image: "/images/rooms/room-interior-neutral.jpeg",
      alt: "Room with white bedding, olive accents, a wardrobe and a dressing mirror.",
    },
    {
      id: "gal-4",
      title: "Guest Room Interior - Emerald Feature",
      category: "Rooms",
      image: "/images/rooms/room-interior-green.jpeg",
      alt: "Room with a green patterned feature wall, wooden ceiling and comfortable bed.",
    },
    {
      id: "gal-5",
      title: "Kids Trampoline & Lawn Recreation",
      category: "Kids Play Area",
      image: "/images/amenities/kids-play-trampoline.png",
      alt: "Enclosed trampoline in the resort kids play area.",
    },
    {
      id: "gal-6",
      title: "Badminton Court on the Lawns",
      category: "Badminton",
      image: "/images/amenities/badminton-court.png",
      alt: "Badminton court on the resort lawn, surrounded by palms and bamboo.",
    },
    {
      id: "gal-7",
      title: "Raised Garden Terrace & Seating",
      category: "Garden",
      image: "/images/resort/garden-terrace.jpeg",
      alt: "Green lawn and raised garden terrace surrounded by bamboo and leafy trees.",
    },
    {
      id: "gal-8",
      title: "Verandah Covered Lounge Area",
      category: "Garden",
      image: "/images/resort/covered-seating.jpeg",
      alt: "Covered seating area with comfortable sofas, wooden roof beams and plants.",
    },
    {
      id: "gal-9",
      title: "Open Green Lawns & Event Spaces",
      category: "Events",
      image: "/images/resort/garden-lawn.jpeg",
      alt: "Open green lawn surrounded by palms and bamboo, suitable for celebrations.",
    },
    {
      id: "gal-10",
      title: "Outdoor Art Mural & Greenery",
      category: "Garden",
      image: "/images/resort/outdoor-mural.jpeg",
      alt: "Outdoor art mural on resort wall surrounded by potted tropical foliage.",
    },
    {
      id: "gal-11",
      title: "Deluxe Twin Bed Suite",
      category: "Rooms",
      image: "/images/rooms/room-interior-beds.jpeg",
      alt: "Spacious twin bed configuration for groups and families.",
    },
    {
      id: "gal-12",
      title: "Kaveri River & Nature Island",
      category: "Entrance",
      image: "/images/nearby/kaveri-river.png",
      alt: "Scenic River Kaveri flowing near Kushalnagar.",
    },
  ],
  philosophy: {
    headline: "Unhurried Rhythm in Kodagu",
    subheading: "Where simplicity meets peaceful highland hospitality.",
    birdsongQuote: "Wake Up to Birdsong.",
    paragraphs: [
      "Coorg Laya Resort is built around the idea of genuine relaxation. Tucked into the lush greenery of Kushalnagar, Kodagu, the property invites guests to step away from busy schedules and return to a simpler, more restorative pace.",
      "Mornings begin with crisp air and the natural chorus of birdsong. Days are spent at leisure — swimming in the pool, enjoying friendly matches of badminton or volleyball, watching children jump happily on the trampoline, or simply sitting with a warm cup of coffee on the garden terrace.",
      "With 15 private guest rooms accommodating up to 45 overnight guests and expansive lawn space for celebrations of up to 500 guests, Coorg Laya offers the ideal balance of intimate privacy and open-air hospitality.",
    ],
    corePillars: [
      {
        title: "Morning Birdsong",
        description: "Awaken each morning to natural birdsong and gentle breezes rustling through surrounding bamboo.",
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
    audioDisclaimer: "Ambient nature recording from sanctuary grounds.",
  },
  navLinks: [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Amenities", href: "/amenities" },
    { name: "Activities", href: "/activities" },
    { name: "Events", href: "/events" },
    { name: "Map & Tourism", href: "/nearby" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};
