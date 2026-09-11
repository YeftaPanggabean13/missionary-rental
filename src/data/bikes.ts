import { Motorbike, TestimonialItem, FaqItem } from '../types';

export const MOTORBIKES: Motorbike[] = [
  {
    id: 'bike-1',
    make: 'BMW',
    model: 'R 1250 GS Adventure',
    year: 2023,
    category: 'Adventure',
    city: 'Denver',
    state: 'CO',
    dailyRate: 165,
    securityDeposit: 500,
    engineDisplacement: '1,254 cc Boxer Twin',
    horsepower: '136 hp @ 7,750 RPM',
    seatHeight: '35.0 in',
    weight: '591 lbs',
    transmission: '6-Speed with Quickshifter',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Marcus Thorne',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Member since 2021',
      verified: true,
      responseRate: '100%',
      responseTime: 'Under 1 hour',
      totalTrips: 42,
      rating: 4.98
    },
    features: ['Aluminum Panniers', 'Heated Grips & Seats', 'TFT Display with GPS Nav', 'Cruise Control', 'Engine Guard Bars'],
    description: 'Equipped for Rocky Mountain passes, the Million Dollar Highway, or weekend camping loops. Kept in climate-controlled garage, serviced strictly by BMW Motorrad Denver.',
    guidelines: 'Rider must have at least 2 years of adventure or big-twin riding experience. Return with 91+ octane full tank.'
  },
  {
    id: 'bike-2',
    make: 'Harley-Davidson',
    model: 'Street Glide Special',
    year: 2022,
    category: 'Cruiser',
    city: 'Los Angeles',
    state: 'CA',
    dailyRate: 185,
    securityDeposit: 500,
    engineDisplacement: 'Milwaukee-Eight 114 (1,868 cc)',
    horsepower: '100 hp @ 5,020 RPM',
    seatHeight: '27.2 in',
    weight: '827 lbs',
    transmission: '6-Speed Cruise Drive',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Jesse Walker',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Member since 2020',
      verified: true,
      responseRate: '98%',
      responseTime: 'Within 2 hours',
      totalTrips: 67,
      rating: 4.95
    },
    features: ['Boom! Box GTS Infotainment', 'Vance & Hines Exhaust', 'Highway Pegs', 'Hard Locking Saddlebags', 'ABS Reflex Brakes'],
    description: 'The definitive American highway cruiser. Ideal for rolling up the Pacific Coast Highway through Malibu and Big Sur. Deep rumble, comfortable touring ergonomics.',
    guidelines: 'No burnouts or track use. Minimum 25 years old. Phone mount and USB charger included.'
  },
  {
    id: 'bike-3',
    make: 'Triumph',
    model: 'Bonneville T120 Black',
    year: 2023,
    category: 'Classic / Vintage',
    city: 'Austin',
    state: 'TX',
    dailyRate: 135,
    securityDeposit: 400,
    engineDisplacement: '1,200 cc Parallel Twin',
    horsepower: '80 hp @ 6,550 RPM',
    seatHeight: '31.1 in',
    weight: '520 lbs',
    transmission: '6-Speed Torque-Assist',
    images: [
      'https://images.unsplash.com/photo-1558981804-03c059ae6ec7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Claire Vance',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Member since 2022',
      verified: true,
      responseRate: '100%',
      responseTime: 'Under 30 mins',
      totalTrips: 31,
      rating: 5.0
    },
    features: ['Brembo Front Brakes', 'Cruise Control', 'Leather Waxed Canvas Panniers', 'Heated Grips', 'Road & Rain Ride Modes'],
    description: 'Timeless British heritage with modern electronic precision. Perfect for exploring Texas Hill Country roads like the Twisted Sisters or evening rides down South Congress.',
    guidelines: 'Please park in safe off-street locations overnight. Disc brake lock provided upon pickup.'
  },
  {
    id: 'bike-4',
    make: 'Ducati',
    model: 'DesertX 937',
    year: 2024,
    category: 'Adventure',
    city: 'Phoenix',
    state: 'AZ',
    dailyRate: 175,
    securityDeposit: 600,
    engineDisplacement: '937 cc Testastretta 11°',
    horsepower: '110 hp @ 9,250 RPM',
    seatHeight: '34.4 in',
    weight: '492 lbs',
    transmission: '6-Speed DQS Up/Down',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Ramon Ortega',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Member since 2023',
      verified: true,
      responseRate: '95%',
      responseTime: 'Under 1 hour',
      totalTrips: 19,
      rating: 4.92
    },
    features: ['21" Front Spoke Wheel', 'KYB Long-Travel Suspension', '6 Riding Modes with Rally Mode', 'Garmin Zumo Nav Bracket', 'Tubeless Off-Road Tires'],
    description: 'A genuine Dakar-inspired machine. Incredible agility on asphalt mountain twisties and unpaved desert trails throughout the Arizona backcountry.',
    guidelines: 'Desert dirt riding welcomed, but no single-track rock-crawling. Pre-trip walkthrough takes about 15 minutes.'
  },
  {
    id: 'bike-5',
    make: 'Indian Motorcycle',
    model: 'Scout Bobber Twenty',
    year: 2023,
    category: 'Cruiser',
    city: 'Nashville',
    state: 'TN',
    dailyRate: 145,
    securityDeposit: 450,
    engineDisplacement: '1,133 cc Liquid-Cooled V-Twin',
    horsepower: '100 hp @ 8,100 RPM',
    seatHeight: '25.6 in',
    weight: '553 lbs',
    transmission: '6-Speed Manual',
    images: [
      'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Hank Dawson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Member since 2019',
      verified: true,
      responseRate: '100%',
      responseTime: 'Under 15 mins',
      totalTrips: 88,
      rating: 4.97
    },
    features: ['Ape-Hanger Handlebars', 'Floating Solo Saddle', 'Wire Spoke Wheels', 'Dual Vance & Hines Pipes', 'USB Port'],
    description: 'Raw, aggressive bobber styling with modern liquid-cooled punch. Turns heads everywhere in Nashville and rolls smoothly down the Natchez Trace Parkway.',
    guidelines: 'Solo rider only (no passenger pegs). Helmet and gloves available if needed.'
  },
  {
    id: 'bike-6',
    make: 'Yamaha',
    model: 'MT-09 SP',
    year: 2024,
    category: 'Sport',
    city: 'Seattle',
    state: 'WA',
    dailyRate: 130,
    securityDeposit: 450,
    engineDisplacement: '890 cc CP3 Inline-Triple',
    horsepower: '117 hp @ 10,000 RPM',
    seatHeight: '32.5 in',
    weight: '419 lbs',
    transmission: '6-Speed with Auto-Blipper',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981804-03c059ae6ec7?auto=format&fit=crop&w=1200&q=80'
    ],
    owner: {
      name: 'Derek Lin',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Member since 2022',
      verified: true,
      responseRate: '99%',
      responseTime: 'Under 45 mins',
      totalTrips: 27,
      rating: 4.96
    },
    features: ['Öhlins Fully Adjustable Rear Shock', 'KYB DLC Front Forks', 'Cruise Control', '6-Axis IMU Lean-Sensitive Traction', 'Brembo Radial Master Cylinder'],
    description: 'Instant torque, thrilling triple exhaust note, and razor-sharp handling. Ideal for exploring North Cascades Highway or Bainbridge Island loops.',
    guidelines: 'Strictly street use only. Must hold valid motorcycle endorsement for at least 3 years.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'Twisted Road made it straightforward to rent out my BMW GS when I travel for work. Knowing riders are pre-screened and that the photo inspection protects both of us gives me total peace of mind. I earned over $4,200 this summer alone.',
    author: 'Marcus Thorne',
    role: 'Owner',
    location: 'Denver, Colorado',
    motorcycle: 'BMW R 1250 GS Adventure',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'test-2',
    quote: 'I flew into LAX for a 4-day solo ride up Big Sur. Rental agencies wanted $300/day for a stripped-down stock cruiser. On Twisted Road, I booked Jesse\'s Street Glide directly. Clear pricing upfront, no surprise deposit charges, and an awesome bike.',
    author: 'Elena Rostova',
    role: 'Renter',
    location: 'Chicago, Illinois (rented in LA)',
    motorcycle: 'Harley-Davidson Street Glide',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 'test-3',
    quote: 'Listing my Bonneville was simple — literally took 5 minutes on my phone. Payouts arrive directly to my bank after each rental, minus the clear 20% platform fee. No hidden fees or corporate runaround.',
    author: 'Claire Vance',
    role: 'Owner',
    location: 'Austin, Texas',
    motorcycle: 'Triumph Bonneville T120',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How does the security deposit work for renters?',
    answer: 'The security deposit is a temporary pre-authorization hold on your credit card, not an upfront charge. It is held during the rental period and automatically released within 48 hours of return once the owner verifies the bike was returned in the agreed condition with no damage or unpaid tolls.',
    category: 'renter'
  },
  {
    question: 'How do owner payouts work, and what is the commission?',
    answer: 'Owners receive 80% of the total rental fee directly to their bank account (20% covers platform operations, payment processing, verified rider screening, and insurance support). Payouts are triggered automatically 24 hours after the return inspection is completed.',
    category: 'owner'
  },
  {
    question: 'Why is the photo inspection at handover mandatory?',
    answer: 'Before taking off and immediately upon return, both rider and owner take a quick 4-point photographic walkthrough (360° exterior, fuel level, and odometer). These time-stamped photos create an indisputable record that protects the rider from pre-existing blemishes and protects the owner against new damage.',
    category: 'insurance'
  },
  {
    question: 'Are rentals instant, or does the owner have to approve?',
    answer: 'To preserve community safety and bike care, Twisted Road operates on a request-to-book model. Owners typically review and approve booking requests within a few hours (maximum 24 hours). You are only charged once the owner formally confirms your reservation.',
    category: 'renter'
  },
  {
    question: 'What requirements must a rider meet to rent?',
    answer: 'Renters must be at least 21 years old (25+ for select high-displacement bikes), hold a valid unrestricted motorcycle license or endorsement, and pass our automated identity and driving record screening.',
    category: 'renter'
  },
  {
    question: 'What insurance protection is included?',
    answer: 'Every trip booked through Twisted Road is backed by comprehensive liability coverage up to $1,000,000, along with comprehensive and collision physical damage coverage and 24/7 emergency roadside assistance.',
    category: 'insurance'
  }
];
