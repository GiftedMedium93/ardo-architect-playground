export interface LocalizedContractor {
  id: string;
  name: string;
  specialty: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  serviceRadius: number; // miles
  availability: 'available' | 'busy' | 'booked';
  rating: number;
  reviewCount: number;
  yearsInBusiness: number;
  licenses: string[];
  insurance: {
    liability: number;
    workersComp: boolean;
  };
  pricing: {
    hourlyRate: number;
    minimumCharge: number;
  };
  portfolio: {
    projectCount: number;
    photos: string[];
  };
  verified: boolean;
}

export const localizedContractors: LocalizedContractor[] = [
  {
    id: 'lc-001',
    name: 'Premier Construction Group',
    specialty: ['General Contractor', 'Remodeling', 'New Construction'],
    address: {
      street: '1234 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    coordinates: { lat: 34.0522, lng: -118.2437 },
    contact: {
      phone: '(310) 555-0100',
      email: 'info@premierconstructiongroup.com',
      website: 'https://premierconstructiongroup.com'
    },
    serviceRadius: 50,
    availability: 'available',
    rating: 4.9,
    reviewCount: 287,
    yearsInBusiness: 15,
    licenses: ['CA-B-123456', 'EPA Lead-Safe'],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 85,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 342,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-002',
    name: 'Elite Plumbing Services',
    specialty: ['Plumbing', 'Water Heaters', 'Drain Cleaning'],
    address: {
      street: '5678 Oak Avenue',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    coordinates: { lat: 40.7128, lng: -74.0060 },
    contact: {
      phone: '(212) 555-0200',
      email: 'service@eliteplumbing.com',
      website: 'https://eliteplumbing.com'
    },
    serviceRadius: 30,
    availability: 'busy',
    rating: 4.8,
    reviewCount: 512,
    yearsInBusiness: 22,
    licenses: ['NY-P-789012', 'Master Plumber'],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 95,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 1847,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-003',
    name: 'Precision Electrical Solutions',
    specialty: ['Electrical', 'Solar Installation', 'EV Charging'],
    address: {
      street: '9012 Pine Road',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA'
    },
    coordinates: { lat: 41.8781, lng: -87.6298 },
    contact: {
      phone: '(312) 555-0300',
      email: 'info@precisionelectrical.com',
      website: 'https://precisionelectrical.com'
    },
    serviceRadius: 40,
    availability: 'available',
    rating: 4.9,
    reviewCount: 423,
    yearsInBusiness: 18,
    licenses: ['IL-E-345678', 'Master Electrician', 'NABCEP Solar'],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 105,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 956,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-004',
    name: 'Artisan Tile & Stone',
    specialty: ['Tile Installation', 'Stone Work', 'Backsplash'],
    address: {
      street: '3456 Maple Drive',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      country: 'USA'
    },
    coordinates: { lat: 25.7617, lng: -80.1918 },
    contact: {
      phone: '(305) 555-0400',
      email: 'contact@artisantile.com',
      website: 'https://artisantile.com'
    },
    serviceRadius: 25,
    availability: 'available',
    rating: 5.0,
    reviewCount: 198,
    yearsInBusiness: 12,
    licenses: ['FL-T-901234'],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 75,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 487,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-005',
    name: 'Master HVAC Systems',
    specialty: ['HVAC', 'Air Conditioning', 'Heating', 'Ventilation'],
    address: {
      street: '7890 Cedar Lane',
      city: 'Houston',
      state: 'TX',
      zip: '77001',
      country: 'USA'
    },
    coordinates: { lat: 29.7604, lng: -95.3698 },
    contact: {
      phone: '(713) 555-0500',
      email: 'service@masterhvac.com',
      website: 'https://masterhvac.com'
    },
    serviceRadius: 60,
    availability: 'busy',
    rating: 4.7,
    reviewCount: 634,
    yearsInBusiness: 25,
    licenses: ['TX-H-567890', 'EPA 608 Universal'],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 90,
      minimumCharge: 125
    },
    portfolio: {
      projectCount: 2134,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-006',
    name: 'Custom Carpentry Works',
    specialty: ['Carpentry', 'Custom Cabinets', 'Trim Work'],
    address: {
      street: '2345 Birch Street',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'USA'
    },
    coordinates: { lat: 47.6062, lng: -122.3321 },
    contact: {
      phone: '(206) 555-0600',
      email: 'info@customcarpentry.com',
      website: 'https://customcarpentry.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.9,
    reviewCount: 276,
    yearsInBusiness: 20,
    licenses: ['WA-C-234567'],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 80,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 623,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-007',
    name: 'Professional Painting Co',
    specialty: ['Painting', 'Drywall', 'Wallpaper'],
    address: {
      street: '6789 Elm Avenue',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
      country: 'USA'
    },
    coordinates: { lat: 42.3601, lng: -71.0589 },
    contact: {
      phone: '(617) 555-0700',
      email: 'contact@propainting.com',
      website: 'https://propainting.com'
    },
    serviceRadius: 45,
    availability: 'available',
    rating: 4.6,
    reviewCount: 389,
    yearsInBusiness: 14,
    licenses: ['MA-P-890123'],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 65,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 1245,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-008',
    name: 'Superior Roofing Solutions',
    specialty: ['Roofing', 'Gutters', 'Siding'],
    address: {
      street: '4567 Willow Court',
      city: 'Phoenix',
      state: 'AZ',
      zip: '85001',
      country: 'USA'
    },
    coordinates: { lat: 33.4484, lng: -112.0740 },
    contact: {
      phone: '(602) 555-0800',
      email: 'info@superiorroofing.com',
      website: 'https://superiorroofing.com'
    },
    serviceRadius: 55,
    availability: 'booked',
    rating: 4.8,
    reviewCount: 445,
    yearsInBusiness: 19,
    licenses: ['AZ-R-456789', 'GAF Master Elite'],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 95,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 892,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-009',
    name: 'Luxury Flooring Specialists',
    specialty: ['Flooring', 'Hardwood', 'Tile', 'Carpet'],
    address: {
      street: '8901 Spruce Boulevard',
      city: 'Denver',
      state: 'CO',
      zip: '80201',
      country: 'USA'
    },
    coordinates: { lat: 39.7392, lng: -104.9903 },
    contact: {
      phone: '(303) 555-0900',
      email: 'service@luxuryflooring.com',
      website: 'https://luxuryflooring.com'
    },
    serviceRadius: 40,
    availability: 'available',
    rating: 4.9,
    reviewCount: 312,
    yearsInBusiness: 16,
    licenses: ['CO-F-123456', 'NWFA Certified'],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 70,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 734,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-010',
    name: 'Expert Landscaping & Hardscape',
    specialty: ['Landscaping', 'Hardscape', 'Irrigation', 'Outdoor Living'],
    address: {
      street: '1357 Aspen Way',
      city: 'San Diego',
      state: 'CA',
      zip: '92101',
      country: 'USA'
    },
    coordinates: { lat: 32.7157, lng: -117.1611 },
    contact: {
      phone: '(619) 555-1000',
      email: 'info@expertlandscaping.com',
      website: 'https://expertlandscaping.com'
    },
    serviceRadius: 50,
    availability: 'busy',
    rating: 4.7,
    reviewCount: 267,
    yearsInBusiness: 13,
    licenses: ['CA-L-789012', 'Irrigation Contractor'],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 85,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 521,
      photos: []
    },
    verified: true
  }
];

export function findContractorsByLocation(lat: number, lng: number, maxDistance: number = 50): LocalizedContractor[] {
  return localizedContractors.filter(contractor => {
    const distance = calculateDistance(lat, lng, contractor.coordinates.lat, contractor.coordinates.lng);
    return distance <= maxDistance && distance <= contractor.serviceRadius;
  }).sort((a, b) => {
    const distA = calculateDistance(lat, lng, a.coordinates.lat, a.coordinates.lng);
    const distB = calculateDistance(lat, lng, b.coordinates.lat, b.coordinates.lng);
    return distA - distB;
  });
}

export function findContractorsBySpecialty(specialty: string): LocalizedContractor[] {
  return localizedContractors.filter(contractor =>
    contractor.specialty.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
  );
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

