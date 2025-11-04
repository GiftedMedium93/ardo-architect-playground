export interface Contractor {
  id: string;
  name: string;
  company: string;
  specializations: string[];
  rating: number;
  reviewCount: number;
  certifications: string[];
  insurance: {
    liability: boolean;
    workers_comp: boolean;
    amount: string;
  };
  location: {
    city: string;
    state: string;
    serviceRadius: number; // miles
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  pricing: {
    hourlyRate?: number;
    projectMinimum?: number;
    tier: 'budget' | 'mid-range' | 'premium';
  };
  availability: 'available' | 'limited' | 'booked';
  yearsExperience: number;
  portfolio: {
    projectCount: number;
    images: string[];
  };
  verified: boolean;
  responseTime: string; // e.g., "< 2 hours"
  completionRate: number; // percentage
}

export const contractors: Contractor[] = [
  {
    id: 'c1',
    name: 'John Martinez',
    company: 'Martinez Construction Group',
    specializations: ['General Contracting', 'Commercial Build', 'Renovation'],
    rating: 4.9,
    reviewCount: 127,
    certifications: ['Licensed General Contractor', 'LEED AP', 'OSHA 30'],
    insurance: {
      liability: true,
      workers_comp: true,
      amount: '$2M',
    },
    location: {
      city: 'San Francisco',
      state: 'CA',
      serviceRadius: 50,
    },
    contact: {
      phone: '(415) 555-0123',
      email: 'john@martinezconst.com',
      website: 'martinezconst.com',
    },
    pricing: {
      hourlyRate: 85,
      projectMinimum: 5000,
      tier: 'premium',
    },
    availability: 'limited',
    yearsExperience: 18,
    portfolio: {
      projectCount: 156,
      images: ['🏗️', '🏢', '🏠'],
    },
    verified: true,
    responseTime: '< 1 hour',
    completionRate: 98,
  },
  {
    id: 'c2',
    name: 'Sarah Chen',
    company: 'Chen Electrical Services',
    specializations: ['Electrical', 'Solar Installation', 'Smart Home'],
    rating: 4.8,
    reviewCount: 89,
    certifications: ['Master Electrician', 'NABCEP PV', 'Low Voltage License'],
    insurance: {
      liability: true,
      workers_comp: true,
      amount: '$1M',
    },
    location: {
      city: 'San Jose',
      state: 'CA',
      serviceRadius: 40,
    },
    contact: {
      phone: '(408) 555-0456',
      email: 'sarah@chenelectrical.com',
      website: 'chenelectrical.com',
    },
    pricing: {
      hourlyRate: 95,
      projectMinimum: 500,
      tier: 'premium',
    },
    availability: 'available',
    yearsExperience: 12,
    portfolio: {
      projectCount: 234,
      images: ['⚡', '☀️', '🏡'],
    },
    verified: true,
    responseTime: '< 2 hours',
    completionRate: 99,
  },
  {
    id: 'c3',
    name: 'Mike Johnson',
    company: 'Johnson Plumbing & HVAC',
    specializations: ['Plumbing', 'HVAC', 'Gas Lines'],
    rating: 4.7,
    reviewCount: 156,
    certifications: ['Master Plumber', 'HVAC Universal', 'Gas Fitter'],
    insurance: {
      liability: true,
      workers_comp: true,
      amount: '$1.5M',
    },
    location: {
      city: 'Oakland',
      state: 'CA',
      serviceRadius: 35,
    },
    contact: {
      phone: '(510) 555-0789',
      email: 'mike@johnsonph.com',
    },
    pricing: {
      hourlyRate: 75,
      projectMinimum: 300,
      tier: 'mid-range',
    },
    availability: 'available',
    yearsExperience: 15,
    portfolio: {
      projectCount: 312,
      images: ['🚰', '❄️', '🔥'],
    },
    verified: true,
    responseTime: '< 3 hours',
    completionRate: 96,
  },
  {
    id: 'c4',
    name: 'Lisa Rodriguez',
    company: 'Rodriguez Roofing Solutions',
    specializations: ['Roofing', 'Waterproofing', 'Gutter Systems'],
    rating: 4.9,
    reviewCount: 201,
    certifications: ['GAF Master Elite', 'CertainTeed SELECT', 'OSHA 10'],
    insurance: {
      liability: true,
      workers_comp: true,
      amount: '$2M',
    },
    location: {
      city: 'Sacramento',
      state: 'CA',
      serviceRadius: 60,
    },
    contact: {
      phone: '(916) 555-0234',
      email: 'lisa@rodriguezroofing.com',
      website: 'rodriguezroofing.com',
    },
    pricing: {
      hourlyRate: 70,
      projectMinimum: 2000,
      tier: 'mid-range',
    },
    availability: 'limited',
    yearsExperience: 20,
    portfolio: {
      projectCount: 445,
      images: ['🏠', '☔', '🛠️'],
    },
    verified: true,
    responseTime: '< 2 hours',
    completionRate: 97,
  },
  {
    id: 'c5',
    name: 'David Kim',
    company: 'Kim Carpentry & Millwork',
    specializations: ['Carpentry', 'Custom Cabinetry', 'Finish Work'],
    rating: 4.8,
    reviewCount: 73,
    certifications: ['Journeyman Carpenter', 'AWMAC Certified', 'Fine Woodworking'],
    insurance: {
      liability: true,
      workers_comp: true,
      amount: '$1M',
    },
    location: {
      city: 'Berkeley',
      state: 'CA',
      serviceRadius: 30,
    },
    contact: {
      phone: '(510) 555-0567',
      email: 'david@kimcarpentry.com',
      website: 'kimcarpentry.com',
    },
    pricing: {
      hourlyRate: 80,
      projectMinimum: 1000,
      tier: 'premium',
    },
    availability: 'available',
    yearsExperience: 14,
    portfolio: {
      projectCount: 128,
      images: ['🪚', '🪑', '🚪'],
    },
    verified: true,
    responseTime: '< 4 hours',
    completionRate: 98,
  },
  {
    id: 'c6',
    name: 'Amanda Foster',
    company: 'Foster Landscaping & Irrigation',
    specializations: ['Landscaping', 'Irrigation', 'Hardscaping'],
    rating: 4.6,
    reviewCount: 94,
    certifications: ['Landscape Contractor', 'Irrigation Specialist', 'Pesticide Applicator'],
    insurance: {
      liability: true,
      workers_comp: true,
      amount: '$1M',
    },
    location: {
      city: 'Palo Alto',
      state: 'CA',
      serviceRadius: 25,
    },
    contact: {
      phone: '(650) 555-0890',
      email: 'amanda@fosterlandscape.com',
    },
    pricing: {
      hourlyRate: 60,
      projectMinimum: 800,
      tier: 'mid-range',
    },
    availability: 'available',
    yearsExperience: 10,
    portfolio: {
      projectCount: 167,
      images: ['🌳', '💧', '🪨'],
    },
    verified: true,
    responseTime: '< 6 hours',
    completionRate: 95,
  },
  {
    id: 'c7',
    name: 'Robert Taylor',
    company: 'Taylor Painting & Finishes',
    specializations: ['Interior Painting', 'Exterior Painting', 'Specialty Finishes'],
    rating: 4.7,
    reviewCount: 112,
    certifications: ['EPA Lead-Safe', 'PDCA Member', 'Color Consultant'],
    insurance: {
      liability: true,
      workers_comp: true,
      amount: '$500K',
    },
    location: {
      city: 'Fremont',
      state: 'CA',
      serviceRadius: 45,
    },
    contact: {
      phone: '(510) 555-0345',
      email: 'robert@taylorpainting.com',
      website: 'taylorpainting.com',
    },
    pricing: {
      hourlyRate: 55,
      projectMinimum: 400,
      tier: 'budget',
    },
    availability: 'available',
    yearsExperience: 16,
    portfolio: {
      projectCount: 289,
      images: ['🎨', '🖌️', '🏠'],
    },
    verified: true,
    responseTime: '< 8 hours',
    completionRate: 94,
  },
  {
    id: 'c8',
    name: 'Jennifer Wu',
    company: 'Wu Structural Engineering',
    specializations: ['Structural Engineering', 'Seismic Retrofit', 'Foundation Repair'],
    rating: 4.9,
    reviewCount: 58,
    certifications: ['PE (Civil)', 'SE (Structural)', 'LEED AP'],
    insurance: {
      liability: true,
      workers_comp: true,
      amount: '$5M',
    },
    location: {
      city: 'San Francisco',
      state: 'CA',
      serviceRadius: 100,
    },
    contact: {
      phone: '(415) 555-0678',
      email: 'jennifer@wustructural.com',
      website: 'wustructural.com',
    },
    pricing: {
      hourlyRate: 150,
      projectMinimum: 3000,
      tier: 'premium',
    },
    availability: 'limited',
    yearsExperience: 22,
    portfolio: {
      projectCount: 87,
      images: ['🏗️', '📐', '🏛️'],
    },
    verified: true,
    responseTime: '< 24 hours',
    completionRate: 100,
  },
];

