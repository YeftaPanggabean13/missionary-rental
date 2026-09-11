export type BikeCategory = 
  | 'Matic Harian' 
  | 'Maxi Scooter' 
  | 'Retro & Estetik' 
  | 'Adventure & Trail' 
  | 'Sport & Heritage';

export interface Motorbike {
  id: string;
  make: string;
  model: string;
  year: number;
  category: BikeCategory;
  area: string; // e.g. "Stasiun Hall & Dago", "Pasteur & Lembang"
  dailyRate: number; // in IDR, e.g. 95000
  depositInfo: string; // e.g. "Cukup KTP Asli (Tanpa Uang Tunai)"
  engineDisplacement: string; // e.g. "110 cc eSP+"
  fuelConsumption: string; // e.g. "59 km / liter"
  transmission: string; // e.g. "Otomatis (CVT)"
  trunkCapacity: string; // e.g. "15.4 Liter (Muat Tas)"
  images: string[];
  facilities: string[];
  description: string;
  bestFor: string;
  guidelines: string;
  rating: number;
  tripsCount: number;
  isPopular?: boolean;
  unitCondition: 'Prima & Bersih' | 'Unit Baru 2024' | 'Favorit Wisatawan';
}

export interface BookingDetails {
  bikeId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  days: number;
  pickupLocation: string;
  pickupAddressDetail?: string;
  returnLocation: string;
  includeHelmExtra: boolean;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  identityNumber: string;
  transportArrival?: string;
  notes?: string;
}

export interface HandoverInspectionItem {
  id: string;
  label: string;
  category: 'exterior' | 'completeness' | 'performance';
  description: string;
  status: 'passed' | 'flagged' | 'pending';
  photoUrl?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  origin: string;
  route: string;
  motorcycle: string;
  avatar: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'syarat' | 'antar-jemput' | 'fasilitas' | 'pembayaran';
}

