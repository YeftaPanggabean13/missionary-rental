export type BikeCategory = 'Cruiser' | 'Adventure' | 'Sport' | 'Touring' | 'Classic / Vintage' | 'Standard';

export interface Motorbike {
  id: string;
  make: string;
  model: string;
  year: number;
  category: BikeCategory;
  city: string;
  state: string;
  dailyRate: number;
  securityDeposit: number; // Pre-authorized, not charged upfront
  engineDisplacement: string; // e.g. "1,254 cc"
  horsepower: string; // e.g. "136 hp"
  seatHeight: string; // e.g. "33.5 in"
  weight: string; // e.g. "549 lbs"
  transmission: string; // e.g. "6-Speed Manual"
  images: string[];
  owner: {
    name: string;
    avatar: string;
    memberSince: string;
    verified: boolean;
    responseRate: string;
    responseTime: string;
    totalTrips: number;
    rating: number;
  };
  features: string[];
  description: string;
  guidelines: string;
}

export interface BookingDetails {
  bikeId: string;
  startDate: string;
  endDate: string;
  days: number;
  insuranceTier: 'minimum' | 'standard' | 'premium';
  pickupType: 'pickup' | 'delivery';
  riderName: string;
  riderEmail: string;
  riderPhone: string;
  licenseNumber: string;
  licenseState: string;
  notes: string;
}

export interface HandoverInspectionItem {
  id: string;
  label: string;
  category: 'exterior' | 'mechanical' | 'documentation';
  description: string;
  status: 'passed' | 'flagged' | 'pending';
  photoUrl?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: 'Owner' | 'Renter';
  location: string;
  motorcycle: string;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'renter' | 'owner' | 'insurance';
}
