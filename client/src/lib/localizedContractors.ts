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
// Expanded contractor network: 110 contractors across 32 major US cities
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
    id: 'lc-011',
    name: 'Expert Experts',
    specialty: ["General Contractor", "Remodeling", "New Construction"],
    address: {
      street: '2455 Birch Drive',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    coordinates: { lat: 34.0743, lng: -118.2637 },
    contact: {
      phone: '(739) 555-8892',
      email: 'info@expertexperts.com',
      website: 'https://expertexperts.com'
    },
    serviceRadius: 55,
    availability: 'booked',
    rating: 4.8,
    reviewCount: 224,
    yearsInBusiness: 18,
    licenses: ["CA-G-160273"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 98,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 515,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-012',
    name: 'Advanced Team',
    specialty: ["Flooring", "Hardwood", "Tile"],
    address: {
      street: '6295 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    coordinates: { lat: 33.9536, lng: -118.2017 },
    contact: {
      phone: '(584) 555-8335',
      email: 'info@advancedteam.com',
      website: 'https://advancedteam.com'
    },
    serviceRadius: 30,
    availability: 'available',
    rating: 4.9,
    reviewCount: 154,
    yearsInBusiness: 7,
    licenses: ["CA-F-336284"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 102,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 2179,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-013',
    name: 'Classic Services',
    specialty: ["Flooring", "Hardwood", "Tile"],
    address: {
      street: '7722 Cedar Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    coordinates: { lat: 34.1278, lng: -118.2167 },
    contact: {
      phone: '(855) 555-8107',
      email: 'info@classicservices.com',
      website: 'https://classicservices.com'
    },
    serviceRadius: 50,
    availability: 'available',
    rating: 4.6,
    reviewCount: 313,
    yearsInBusiness: 6,
    licenses: ["CA-F-505443"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 74,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 1098,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-014',
    name: 'Ace Construction Group',
    specialty: ["Insulation", "Weatherproofing"],
    address: {
      street: '9600 Elm Drive',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    coordinates: { lat: 34.0066, lng: -118.2114 },
    contact: {
      phone: '(306) 555-7489',
      email: 'info@aceconstructiongroup.com',
      website: 'https://aceconstructiongroup.com'
    },
    serviceRadius: 40,
    availability: 'available',
    rating: 5.0,
    reviewCount: 346,
    yearsInBusiness: 19,
    licenses: ["CA-I-823293"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 64,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 2123,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-015',
    name: 'Premier Solutions',
    specialty: ["Plumbing", "Water Heaters", "Drain Cleaning"],
    address: {
      street: '7205 Maple Way',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    coordinates: { lat: 34.0167, lng: -118.2292 },
    contact: {
      phone: '(495) 555-4699',
      email: 'info@premiersolutions.com',
      website: 'https://premiersolutions.com'
    },
    serviceRadius: 25,
    availability: 'busy',
    rating: 4.6,
    reviewCount: 652,
    yearsInBusiness: 9,
    licenses: ["CA-P-958812"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 87,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 584,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-016',
    name: 'Best Designs',
    specialty: ["Landscaping", "Hardscape", "Irrigation"],
    address: {
      street: '7606 Maple Drive',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    coordinates: { lat: 40.7266, lng: -74.0322 },
    contact: {
      phone: '(255) 555-9771',
      email: 'info@bestdesigns.com',
      website: 'https://bestdesigns.com'
    },
    serviceRadius: 55,
    availability: 'available',
    rating: 4.7,
    reviewCount: 527,
    yearsInBusiness: 29,
    licenses: ["NY-L-119435"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 76,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 478,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-017',
    name: 'Professional Contractors',
    specialty: ["Landscaping", "Hardscape", "Irrigation"],
    address: {
      street: '3514 Elm Way',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    coordinates: { lat: 40.6685, lng: -74.0735 },
    contact: {
      phone: '(652) 555-7198',
      email: 'info@professionalcontractors.com',
      website: 'https://professionalcontractors.com'
    },
    serviceRadius: 50,
    availability: 'available',
    rating: 4.8,
    reviewCount: 235,
    yearsInBusiness: 28,
    licenses: ["NY-L-448789"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 117,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 1959,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-018',
    name: 'Luxury Builders',
    specialty: ["Fencing", "Decking", "Pergolas"],
    address: {
      street: '5520 Pine Lane',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    coordinates: { lat: 40.8092, lng: -73.9333 },
    contact: {
      phone: '(710) 555-9682',
      email: 'info@luxurybuilders.com',
      website: 'https://luxurybuilders.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.8,
    reviewCount: 160,
    yearsInBusiness: 16,
    licenses: ["NY-F-211021"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 78,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 1284,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-019',
    name: 'Professional Specialists',
    specialty: ["Masonry", "Brickwork", "Concrete"],
    address: {
      street: '8291 Oak Road',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA'
    },
    coordinates: { lat: 41.8254, lng: -87.6255 },
    contact: {
      phone: '(997) 555-2758',
      email: 'info@professionalspecialists.com',
      website: 'https://professionalspecialists.com'
    },
    serviceRadius: 30,
    availability: 'busy',
    rating: 4.6,
    reviewCount: 185,
    yearsInBusiness: 23,
    licenses: ["IL-M-330324"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 62,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 1302,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-020',
    name: 'Perfect Builders',
    specialty: ["Welding", "Metal Fabrication", "Structural Steel"],
    address: {
      street: '1918 Elm Street',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA'
    },
    coordinates: { lat: 41.8543, lng: -87.5943 },
    contact: {
      phone: '(977) 555-4477',
      email: 'info@perfectbuilders.com',
      website: 'https://perfectbuilders.com'
    },
    serviceRadius: 50,
    availability: 'available',
    rating: 4.6,
    reviewCount: 455,
    yearsInBusiness: 11,
    licenses: ["IL-W-740992"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 95,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 1127,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-021',
    name: 'Luxury Designs',
    specialty: ["General Contractor", "Remodeling", "New Construction"],
    address: {
      street: '5880 Maple Street',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA'
    },
    coordinates: { lat: 41.9485, lng: -87.6871 },
    contact: {
      phone: '(529) 555-8709',
      email: 'info@luxurydesigns.com',
      website: 'https://luxurydesigns.com'
    },
    serviceRadius: 60,
    availability: 'booked',
    rating: 4.8,
    reviewCount: 553,
    yearsInBusiness: 9,
    licenses: ["IL-G-747660"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 93,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 790,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-022',
    name: 'Ace Services',
    specialty: ["General Contractor", "Remodeling", "New Construction"],
    address: {
      street: '3123 Birch Drive',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      country: 'USA'
    },
    coordinates: { lat: 25.8322, lng: -80.1251 },
    contact: {
      phone: '(760) 555-8583',
      email: 'info@aceservices.com',
      website: 'https://aceservices.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 5.0,
    reviewCount: 210,
    yearsInBusiness: 13,
    licenses: ["FL-G-619485"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 62,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 2393,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-023',
    name: 'Ultimate Designs',
    specialty: ["Welding", "Metal Fabrication", "Structural Steel"],
    address: {
      street: '5093 Elm Way',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      country: 'USA'
    },
    coordinates: { lat: 25.8234, lng: -80.1281 },
    contact: {
      phone: '(906) 555-4046',
      email: 'info@ultimatedesigns.com',
      website: 'https://ultimatedesigns.com'
    },
    serviceRadius: 60,
    availability: 'available',
    rating: 4.7,
    reviewCount: 103,
    yearsInBusiness: 18,
    licenses: ["FL-W-187645"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 118,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 2030,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-024',
    name: 'Trusted Construction Group',
    specialty: ["Insulation", "Weatherproofing"],
    address: {
      street: '7595 Birch Road',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      country: 'USA'
    },
    coordinates: { lat: 25.6941, lng: -80.2051 },
    contact: {
      phone: '(425) 555-5050',
      email: 'info@trustedconstructiongroup.com',
      website: 'https://trustedconstructiongroup.com'
    },
    serviceRadius: 35,
    availability: 'booked',
    rating: 4.6,
    reviewCount: 712,
    yearsInBusiness: 15,
    licenses: ["FL-I-717617"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 65,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 861,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-025',
    name: 'Advanced Works',
    specialty: ["Windows", "Doors", "Skylights"],
    address: {
      street: '2681 Oak Street',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      country: 'USA'
    },
    coordinates: { lat: 25.7906, lng: -80.1515 },
    contact: {
      phone: '(750) 555-9973',
      email: 'info@advancedworks.com',
      website: 'https://advancedworks.com'
    },
    serviceRadius: 25,
    availability: 'booked',
    rating: 4.9,
    reviewCount: 94,
    yearsInBusiness: 11,
    licenses: ["FL-W-858990"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 75,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 829,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-026',
    name: 'Advanced Experts',
    specialty: ["Carpentry", "Custom Cabinets", "Trim Work"],
    address: {
      street: '7936 Maple Lane',
      city: 'Houston',
      state: 'TX',
      zip: '77001',
      country: 'USA'
    },
    coordinates: { lat: 29.7954, lng: -95.4335 },
    contact: {
      phone: '(364) 555-7001',
      email: 'info@advancedexperts.com',
      website: 'https://advancedexperts.com'
    },
    serviceRadius: 25,
    availability: 'available',
    rating: 4.8,
    reviewCount: 658,
    yearsInBusiness: 11,
    licenses: ["TX-C-379924"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 113,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 1492,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-027',
    name: 'Luxury Team',
    specialty: ["Plumbing", "Water Heaters", "Drain Cleaning"],
    address: {
      street: '4430 Birch Drive',
      city: 'Houston',
      state: 'TX',
      zip: '77001',
      country: 'USA'
    },
    coordinates: { lat: 29.7318, lng: -95.3641 },
    contact: {
      phone: '(726) 555-3885',
      email: 'info@luxuryteam.com',
      website: 'https://luxuryteam.com'
    },
    serviceRadius: 25,
    availability: 'booked',
    rating: 4.6,
    reviewCount: 556,
    yearsInBusiness: 28,
    licenses: ["TX-P-376880"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 120,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 778,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-028',
    name: 'Master Team',
    specialty: ["Electrical", "Solar Installation", "EV Charging"],
    address: {
      street: '5082 Elm Way',
      city: 'Houston',
      state: 'TX',
      zip: '77001',
      country: 'USA'
    },
    coordinates: { lat: 29.7253, lng: -95.3645 },
    contact: {
      phone: '(954) 555-3498',
      email: 'info@masterteam.com',
      website: 'https://masterteam.com'
    },
    serviceRadius: 45,
    availability: 'busy',
    rating: 5.0,
    reviewCount: 178,
    yearsInBusiness: 20,
    licenses: ["TX-E-929842"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 90,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 2282,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-029',
    name: 'Artisan Builders',
    specialty: ["Foundation Repair", "Waterproofing"],
    address: {
      street: '4979 Pine Avenue',
      city: 'Houston',
      state: 'TX',
      zip: '77001',
      country: 'USA'
    },
    coordinates: { lat: 29.6814, lng: -95.2724 },
    contact: {
      phone: '(384) 555-2593',
      email: 'info@artisanbuilders.com',
      website: 'https://artisanbuilders.com'
    },
    serviceRadius: 45,
    availability: 'available',
    rating: 4.6,
    reviewCount: 402,
    yearsInBusiness: 29,
    licenses: ["TX-F-777218"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 91,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 1845,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-030',
    name: 'Elite Solutions',
    specialty: ["HVAC", "Air Conditioning", "Heating"],
    address: {
      street: '7333 Oak Lane',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'USA'
    },
    coordinates: { lat: 47.5712, lng: -122.321 },
    contact: {
      phone: '(779) 555-9861',
      email: 'info@elitesolutions.com',
      website: 'https://elitesolutions.com'
    },
    serviceRadius: 25,
    availability: 'busy',
    rating: 4.6,
    reviewCount: 50,
    yearsInBusiness: 19,
    licenses: ["WA-H-894523"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 101,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 1870,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-031',
    name: 'Pro Solutions',
    specialty: ["Fencing", "Decking", "Pergolas"],
    address: {
      street: '2407 Main Lane',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'USA'
    },
    coordinates: { lat: 47.5921, lng: -122.325 },
    contact: {
      phone: '(681) 555-3675',
      email: 'info@prosolutions.com',
      website: 'https://prosolutions.com'
    },
    serviceRadius: 30,
    availability: 'busy',
    rating: 4.9,
    reviewCount: 642,
    yearsInBusiness: 8,
    licenses: ["WA-F-334493"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 67,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 2012,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-032',
    name: 'Modern Experts',
    specialty: ["Carpentry", "Custom Cabinets", "Trim Work"],
    address: {
      street: '2170 Cedar Way',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'USA'
    },
    coordinates: { lat: 47.5221, lng: -122.3907 },
    contact: {
      phone: '(968) 555-7894',
      email: 'info@modernexperts.com',
      website: 'https://modernexperts.com'
    },
    serviceRadius: 50,
    availability: 'available',
    rating: 4.8,
    reviewCount: 385,
    yearsInBusiness: 28,
    licenses: ["WA-C-881230"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 75,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 631,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-033',
    name: 'Professional Solutions',
    specialty: ["Masonry", "Brickwork", "Concrete"],
    address: {
      street: '6698 Oak Avenue',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'USA'
    },
    coordinates: { lat: 47.6852, lng: -122.353 },
    contact: {
      phone: '(394) 555-8254',
      email: 'info@professionalsolutions.com',
      website: 'https://professionalsolutions.com'
    },
    serviceRadius: 45,
    availability: 'booked',
    rating: 5.0,
    reviewCount: 284,
    yearsInBusiness: 24,
    licenses: ["WA-M-892598"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 84,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 1521,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-034',
    name: 'Best Services',
    specialty: ["Windows", "Doors", "Skylights"],
    address: {
      street: '8749 Maple Drive',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'USA'
    },
    coordinates: { lat: 47.7042, lng: -122.2685 },
    contact: {
      phone: '(771) 555-8208',
      email: 'info@bestservices.com',
      website: 'https://bestservices.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.7,
    reviewCount: 253,
    yearsInBusiness: 8,
    licenses: ["WA-W-492132"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 87,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 1962,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-035',
    name: 'Master Specialists',
    specialty: ["HVAC", "Air Conditioning", "Heating"],
    address: {
      street: '1850 Pine Way',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
      country: 'USA'
    },
    coordinates: { lat: 42.2823, lng: -70.9988 },
    contact: {
      phone: '(596) 555-4879',
      email: 'info@masterspecialists.com',
      website: 'https://masterspecialists.com'
    },
    serviceRadius: 35,
    availability: 'busy',
    rating: 4.8,
    reviewCount: 585,
    yearsInBusiness: 25,
    licenses: ["MA-H-193757"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 95,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 1731,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-036',
    name: 'Expert Pros',
    specialty: ["General Contractor", "Remodeling", "New Construction"],
    address: {
      street: '6745 Pine Lane',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
      country: 'USA'
    },
    coordinates: { lat: 42.328, lng: -71.0928 },
    contact: {
      phone: '(406) 555-5790',
      email: 'info@expertpros.com',
      website: 'https://expertpros.com'
    },
    serviceRadius: 45,
    availability: 'busy',
    rating: 4.7,
    reviewCount: 724,
    yearsInBusiness: 9,
    licenses: ["MA-G-884857"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 104,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 1181,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-037',
    name: 'Ideal Works',
    specialty: ["Flooring", "Hardwood", "Tile"],
    address: {
      street: '360 Pine Avenue',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
      country: 'USA'
    },
    coordinates: { lat: 42.3716, lng: -71.045 },
    contact: {
      phone: '(916) 555-3807',
      email: 'info@idealworks.com',
      website: 'https://idealworks.com'
    },
    serviceRadius: 50,
    availability: 'busy',
    rating: 4.6,
    reviewCount: 178,
    yearsInBusiness: 25,
    licenses: ["MA-F-131075"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 98,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 860,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-038',
    name: 'Advanced Systems',
    specialty: ["Plumbing", "Water Heaters", "Drain Cleaning"],
    address: {
      street: '2227 Birch Avenue',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
      country: 'USA'
    },
    coordinates: { lat: 42.3146, lng: -71.0843 },
    contact: {
      phone: '(791) 555-9456',
      email: 'info@advancedsystems.com',
      website: 'https://advancedsystems.com'
    },
    serviceRadius: 55,
    availability: 'busy',
    rating: 4.8,
    reviewCount: 262,
    yearsInBusiness: 28,
    licenses: ["MA-P-654946"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 106,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 1839,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-039',
    name: 'Ideal Contractors',
    specialty: ["Flooring", "Hardwood", "Tile"],
    address: {
      street: '6664 Elm Street',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
      country: 'USA'
    },
    coordinates: { lat: 42.4363, lng: -71.0876 },
    contact: {
      phone: '(975) 555-3262',
      email: 'info@idealcontractors.com',
      website: 'https://idealcontractors.com'
    },
    serviceRadius: 55,
    availability: 'booked',
    rating: 4.6,
    reviewCount: 458,
    yearsInBusiness: 16,
    licenses: ["MA-F-127651"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 61,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 2018,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-040',
    name: 'Prime Experts',
    specialty: ["Carpentry", "Custom Cabinets", "Trim Work"],
    address: {
      street: '2431 Elm Drive',
      city: 'Phoenix',
      state: 'AZ',
      zip: '85001',
      country: 'USA'
    },
    coordinates: { lat: 33.419, lng: -112.1563 },
    contact: {
      phone: '(598) 555-1584',
      email: 'info@primeexperts.com',
      website: 'https://primeexperts.com'
    },
    serviceRadius: 60,
    availability: 'available',
    rating: 4.9,
    reviewCount: 476,
    yearsInBusiness: 24,
    licenses: ["AZ-C-528464"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 120,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 2313,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-041',
    name: 'Quality Co',
    specialty: ["General Contractor", "Remodeling", "New Construction"],
    address: {
      street: '8082 Main Lane',
      city: 'Phoenix',
      state: 'AZ',
      zip: '85001',
      country: 'USA'
    },
    coordinates: { lat: 33.4817, lng: -112.0295 },
    contact: {
      phone: '(717) 555-6044',
      email: 'info@qualityco.com',
      website: 'https://qualityco.com'
    },
    serviceRadius: 30,
    availability: 'busy',
    rating: 4.7,
    reviewCount: 454,
    yearsInBusiness: 17,
    licenses: ["AZ-G-680304"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 73,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 530,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-042',
    name: 'Reliable Construction Group',
    specialty: ["Smart Home", "Security Systems"],
    address: {
      street: '1513 Elm Lane',
      city: 'Phoenix',
      state: 'AZ',
      zip: '85001',
      country: 'USA'
    },
    coordinates: { lat: 33.3692, lng: -112.0166 },
    contact: {
      phone: '(721) 555-2112',
      email: 'info@reliableconstructiongroup.com',
      website: 'https://reliableconstructiongroup.com'
    },
    serviceRadius: 45,
    availability: 'booked',
    rating: 4.6,
    reviewCount: 547,
    yearsInBusiness: 29,
    licenses: ["AZ-S-741937"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 88,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 2315,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-043',
    name: 'Custom Co',
    specialty: ["Fencing", "Decking", "Pergolas"],
    address: {
      street: '4318 Elm Road',
      city: 'Phoenix',
      state: 'AZ',
      zip: '85001',
      country: 'USA'
    },
    coordinates: { lat: 33.4855, lng: -112.0078 },
    contact: {
      phone: '(774) 555-2722',
      email: 'info@customco.com',
      website: 'https://customco.com'
    },
    serviceRadius: 25,
    availability: 'booked',
    rating: 4.7,
    reviewCount: 162,
    yearsInBusiness: 29,
    licenses: ["AZ-F-630993"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 119,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 325,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-044',
    name: 'Classic Systems',
    specialty: ["Pool Installation", "Spa", "Water Features"],
    address: {
      street: '4225 Maple Way',
      city: 'Phoenix',
      state: 'AZ',
      zip: '85001',
      country: 'USA'
    },
    coordinates: { lat: 33.4376, lng: -112.119 },
    contact: {
      phone: '(727) 555-9211',
      email: 'info@classicsystems.com',
      website: 'https://classicsystems.com'
    },
    serviceRadius: 60,
    availability: 'available',
    rating: 5.0,
    reviewCount: 289,
    yearsInBusiness: 8,
    licenses: ["AZ-P-657217"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 102,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 1921,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-045',
    name: 'Expert Experts',
    specialty: ["Painting", "Drywall", "Wallpaper"],
    address: {
      street: '1931 Birch Lane',
      city: 'Denver',
      state: 'CO',
      zip: '80201',
      country: 'USA'
    },
    coordinates: { lat: 39.7616, lng: -105.0814 },
    contact: {
      phone: '(339) 555-1756',
      email: 'info@expertexperts.com',
      website: 'https://expertexperts.com'
    },
    serviceRadius: 50,
    availability: 'busy',
    rating: 4.6,
    reviewCount: 414,
    yearsInBusiness: 18,
    licenses: ["CO-P-464152"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 106,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 359,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-046',
    name: 'Premier Pros',
    specialty: ["Painting", "Drywall", "Wallpaper"],
    address: {
      street: '5923 Maple Road',
      city: 'Denver',
      state: 'CO',
      zip: '80201',
      country: 'USA'
    },
    coordinates: { lat: 39.7661, lng: -105.089 },
    contact: {
      phone: '(916) 555-5543',
      email: 'info@premierpros.com',
      website: 'https://premierpros.com'
    },
    serviceRadius: 35,
    availability: 'busy',
    rating: 4.8,
    reviewCount: 124,
    yearsInBusiness: 20,
    licenses: ["CO-P-296618"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 97,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 878,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-047',
    name: 'Expert Contractors',
    specialty: ["Pool Installation", "Spa", "Water Features"],
    address: {
      street: '8830 Cedar Drive',
      city: 'Denver',
      state: 'CO',
      zip: '80201',
      country: 'USA'
    },
    coordinates: { lat: 39.7988, lng: -104.9032 },
    contact: {
      phone: '(491) 555-1780',
      email: 'info@expertcontractors.com',
      website: 'https://expertcontractors.com'
    },
    serviceRadius: 45,
    availability: 'busy',
    rating: 4.5,
    reviewCount: 792,
    yearsInBusiness: 8,
    licenses: ["CO-P-511708"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 97,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 1815,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-048',
    name: 'Prime Services',
    specialty: ["Smart Home", "Security Systems"],
    address: {
      street: '611 Cedar Lane',
      city: 'Denver',
      state: 'CO',
      zip: '80201',
      country: 'USA'
    },
    coordinates: { lat: 39.711, lng: -104.9929 },
    contact: {
      phone: '(324) 555-2509',
      email: 'info@primeservices.com',
      website: 'https://primeservices.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.6,
    reviewCount: 745,
    yearsInBusiness: 10,
    licenses: ["CO-S-617138"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 63,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 1611,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-049',
    name: 'Luxury Construction Group',
    specialty: ["Kitchen Remodeling", "Bathroom Remodeling"],
    address: {
      street: '8865 Main Street',
      city: 'San Diego',
      state: 'CA',
      zip: '92101',
      country: 'USA'
    },
    coordinates: { lat: 32.7759, lng: -117.0744 },
    contact: {
      phone: '(488) 555-3023',
      email: 'info@luxuryconstructiongroup.com',
      website: 'https://luxuryconstructiongroup.com'
    },
    serviceRadius: 40,
    availability: 'busy',
    rating: 4.6,
    reviewCount: 304,
    yearsInBusiness: 18,
    licenses: ["CA-K-380729"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 106,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 1823,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-050',
    name: 'Professional Solutions',
    specialty: ["Flooring", "Hardwood", "Tile"],
    address: {
      street: '5187 Pine Street',
      city: 'San Diego',
      state: 'CA',
      zip: '92101',
      country: 'USA'
    },
    coordinates: { lat: 32.6408, lng: -117.1668 },
    contact: {
      phone: '(618) 555-2872',
      email: 'info@professionalsolutions.com',
      website: 'https://professionalsolutions.com'
    },
    serviceRadius: 25,
    availability: 'available',
    rating: 4.5,
    reviewCount: 796,
    yearsInBusiness: 17,
    licenses: ["CA-F-215647"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 76,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 2352,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-051',
    name: 'Ultimate Experts',
    specialty: ["Roofing", "Gutters", "Siding"],
    address: {
      street: '4584 Cedar Way',
      city: 'San Diego',
      state: 'CA',
      zip: '92101',
      country: 'USA'
    },
    coordinates: { lat: 32.6968, lng: -117.1943 },
    contact: {
      phone: '(593) 555-2735',
      email: 'info@ultimateexperts.com',
      website: 'https://ultimateexperts.com'
    },
    serviceRadius: 50,
    availability: 'booked',
    rating: 4.9,
    reviewCount: 341,
    yearsInBusiness: 28,
    licenses: ["CA-R-847598"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 109,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 927,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-052',
    name: 'Professional Experts',
    specialty: ["Smart Home", "Security Systems"],
    address: {
      street: '8504 Birch Drive',
      city: 'San Diego',
      state: 'CA',
      zip: '92101',
      country: 'USA'
    },
    coordinates: { lat: 32.7404, lng: -117.0831 },
    contact: {
      phone: '(472) 555-9856',
      email: 'info@professionalexperts.com',
      website: 'https://professionalexperts.com'
    },
    serviceRadius: 40,
    availability: 'available',
    rating: 4.7,
    reviewCount: 236,
    yearsInBusiness: 21,
    licenses: ["CA-S-136380"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 67,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 1169,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-053',
    name: 'Custom Experts',
    specialty: ["General Contractor", "Remodeling", "New Construction"],
    address: {
      street: '6629 Birch Street',
      city: 'Atlanta',
      state: 'GA',
      zip: '30301',
      country: 'USA'
    },
    coordinates: { lat: 33.6581, lng: -84.4747 },
    contact: {
      phone: '(221) 555-5969',
      email: 'info@customexperts.com',
      website: 'https://customexperts.com'
    },
    serviceRadius: 55,
    availability: 'available',
    rating: 4.9,
    reviewCount: 50,
    yearsInBusiness: 27,
    licenses: ["GA-G-809708"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 113,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 999,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-054',
    name: 'Perfect Construction Group',
    specialty: ["Kitchen Remodeling", "Bathroom Remodeling"],
    address: {
      street: '7378 Pine Drive',
      city: 'Atlanta',
      state: 'GA',
      zip: '30301',
      country: 'USA'
    },
    coordinates: { lat: 33.7156, lng: -84.4545 },
    contact: {
      phone: '(488) 555-6423',
      email: 'info@perfectconstructiongroup.com',
      website: 'https://perfectconstructiongroup.com'
    },
    serviceRadius: 30,
    availability: 'available',
    rating: 4.5,
    reviewCount: 579,
    yearsInBusiness: 25,
    licenses: ["GA-K-142693"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 73,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 149,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-055',
    name: 'Quality Designs',
    specialty: ["Foundation Repair", "Waterproofing"],
    address: {
      street: '591 Elm Street',
      city: 'Atlanta',
      state: 'GA',
      zip: '30301',
      country: 'USA'
    },
    coordinates: { lat: 33.6979, lng: -84.3398 },
    contact: {
      phone: '(361) 555-7870',
      email: 'info@qualitydesigns.com',
      website: 'https://qualitydesigns.com'
    },
    serviceRadius: 60,
    availability: 'available',
    rating: 4.9,
    reviewCount: 422,
    yearsInBusiness: 22,
    licenses: ["GA-F-150187"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 105,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 1609,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-056',
    name: 'Advanced Solutions',
    specialty: ["Masonry", "Brickwork", "Concrete"],
    address: {
      street: '7778 Pine Lane',
      city: 'Atlanta',
      state: 'GA',
      zip: '30301',
      country: 'USA'
    },
    coordinates: { lat: 33.7902, lng: -84.2996 },
    contact: {
      phone: '(736) 555-5093',
      email: 'info@advancedsolutions.com',
      website: 'https://advancedsolutions.com'
    },
    serviceRadius: 45,
    availability: 'busy',
    rating: 4.6,
    reviewCount: 333,
    yearsInBusiness: 6,
    licenses: ["GA-M-298077"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 81,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 1467,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-057',
    name: 'Classic Experts',
    specialty: ["Painting", "Drywall", "Wallpaper"],
    address: {
      street: '3362 Birch Way',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      country: 'USA'
    },
    coordinates: { lat: 32.7627, lng: -96.8723 },
    contact: {
      phone: '(661) 555-6756',
      email: 'info@classicexperts.com',
      website: 'https://classicexperts.com'
    },
    serviceRadius: 50,
    availability: 'available',
    rating: 5.0,
    reviewCount: 373,
    yearsInBusiness: 8,
    licenses: ["TX-P-541258"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 70,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 2021,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-058',
    name: 'Quality Pros',
    specialty: ["Roofing", "Gutters", "Siding"],
    address: {
      street: '6461 Elm Road',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      country: 'USA'
    },
    coordinates: { lat: 32.8134, lng: -96.7234 },
    contact: {
      phone: '(449) 555-3071',
      email: 'info@qualitypros.com',
      website: 'https://qualitypros.com'
    },
    serviceRadius: 30,
    availability: 'available',
    rating: 4.7,
    reviewCount: 241,
    yearsInBusiness: 26,
    licenses: ["TX-R-977003"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 119,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 1392,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-059',
    name: 'Precision Pros',
    specialty: ["Masonry", "Brickwork", "Concrete"],
    address: {
      street: '8730 Cedar Way',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      country: 'USA'
    },
    coordinates: { lat: 32.8277, lng: -96.8335 },
    contact: {
      phone: '(988) 555-9879',
      email: 'info@precisionpros.com',
      website: 'https://precisionpros.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.6,
    reviewCount: 335,
    yearsInBusiness: 18,
    licenses: ["TX-M-575728"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 78,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 1126,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-060',
    name: 'Perfect Specialists',
    specialty: ["Landscaping", "Hardscape", "Irrigation"],
    address: {
      street: '7684 Birch Lane',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      country: 'USA'
    },
    coordinates: { lat: 32.7338, lng: -96.8212 },
    contact: {
      phone: '(372) 555-9376',
      email: 'info@perfectspecialists.com',
      website: 'https://perfectspecialists.com'
    },
    serviceRadius: 40,
    availability: 'busy',
    rating: 4.9,
    reviewCount: 243,
    yearsInBusiness: 14,
    licenses: ["TX-L-581714"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 120,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 1217,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-061',
    name: 'Advanced Designs',
    specialty: ["Flooring", "Hardwood", "Tile"],
    address: {
      street: '4951 Maple Street',
      city: 'Philadelphia',
      state: 'PA',
      zip: '19101',
      country: 'USA'
    },
    coordinates: { lat: 39.9929, lng: -75.1548 },
    contact: {
      phone: '(747) 555-7535',
      email: 'info@advanceddesigns.com',
      website: 'https://advanceddesigns.com'
    },
    serviceRadius: 55,
    availability: 'available',
    rating: 4.7,
    reviewCount: 569,
    yearsInBusiness: 18,
    licenses: ["PA-F-281833"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 90,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 141,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-062',
    name: 'Ideal Experts',
    specialty: ["HVAC", "Air Conditioning", "Heating"],
    address: {
      street: '4922 Main Way',
      city: 'Philadelphia',
      state: 'PA',
      zip: '19101',
      country: 'USA'
    },
    coordinates: { lat: 39.8925, lng: -75.2175 },
    contact: {
      phone: '(874) 555-6140',
      email: 'info@idealexperts.com',
      website: 'https://idealexperts.com'
    },
    serviceRadius: 30,
    availability: 'booked',
    rating: 4.7,
    reviewCount: 96,
    yearsInBusiness: 27,
    licenses: ["PA-H-995075"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 119,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 814,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-063',
    name: 'Modern Experts',
    specialty: ["Kitchen Remodeling", "Bathroom Remodeling"],
    address: {
      street: '8031 Main Street',
      city: 'Philadelphia',
      state: 'PA',
      zip: '19101',
      country: 'USA'
    },
    coordinates: { lat: 40.0236, lng: -75.228 },
    contact: {
      phone: '(211) 555-5893',
      email: 'info@modernexperts.com',
      website: 'https://modernexperts.com'
    },
    serviceRadius: 35,
    availability: 'busy',
    rating: 4.7,
    reviewCount: 481,
    yearsInBusiness: 18,
    licenses: ["PA-K-569465"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 114,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 1935,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-064',
    name: 'Custom Designs',
    specialty: ["Fencing", "Decking", "Pergolas"],
    address: {
      street: '2695 Oak Drive',
      city: 'Philadelphia',
      state: 'PA',
      zip: '19101',
      country: 'USA'
    },
    coordinates: { lat: 39.8725, lng: -75.0963 },
    contact: {
      phone: '(964) 555-1532',
      email: 'info@customdesigns.com',
      website: 'https://customdesigns.com'
    },
    serviceRadius: 35,
    availability: 'busy',
    rating: 4.8,
    reviewCount: 175,
    yearsInBusiness: 17,
    licenses: ["PA-F-281125"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 64,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 2060,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-065',
    name: 'Artisan Contractors',
    specialty: ["General Contractor", "Remodeling", "New Construction"],
    address: {
      street: '8488 Oak Lane',
      city: 'San Francisco',
      state: 'CA',
      zip: '94101',
      country: 'USA'
    },
    coordinates: { lat: 37.752, lng: -122.345 },
    contact: {
      phone: '(209) 555-9583',
      email: 'info@artisancontractors.com',
      website: 'https://artisancontractors.com'
    },
    serviceRadius: 35,
    availability: 'booked',
    rating: 4.7,
    reviewCount: 124,
    yearsInBusiness: 8,
    licenses: ["CA-G-365396"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 115,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 1747,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-066',
    name: 'Premier Systems',
    specialty: ["Tile Installation", "Stone Work", "Backsplash"],
    address: {
      street: '5648 Maple Way',
      city: 'San Francisco',
      state: 'CA',
      zip: '94101',
      country: 'USA'
    },
    coordinates: { lat: 37.7599, lng: -122.3894 },
    contact: {
      phone: '(701) 555-9362',
      email: 'info@premiersystems.com',
      website: 'https://premiersystems.com'
    },
    serviceRadius: 35,
    availability: 'busy',
    rating: 4.9,
    reviewCount: 740,
    yearsInBusiness: 23,
    licenses: ["CA-T-793380"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 107,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 1651,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-067',
    name: 'Modern Experts',
    specialty: ["Masonry", "Brickwork", "Concrete"],
    address: {
      street: '2192 Maple Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94101',
      country: 'USA'
    },
    coordinates: { lat: 37.7212, lng: -122.4222 },
    contact: {
      phone: '(892) 555-3488',
      email: 'info@modernexperts.com',
      website: 'https://modernexperts.com'
    },
    serviceRadius: 45,
    availability: 'busy',
    rating: 4.7,
    reviewCount: 199,
    yearsInBusiness: 11,
    licenses: ["CA-M-470278"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 99,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 2248,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-068',
    name: 'Superior Team',
    specialty: ["General Contractor", "Remodeling", "New Construction"],
    address: {
      street: '3203 Birch Street',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
      country: 'USA'
    },
    coordinates: { lat: 45.4959, lng: -122.7649 },
    contact: {
      phone: '(314) 555-2439',
      email: 'info@superiorteam.com',
      website: 'https://superiorteam.com'
    },
    serviceRadius: 35,
    availability: 'busy',
    rating: 5.0,
    reviewCount: 338,
    yearsInBusiness: 7,
    licenses: ["OR-G-314051"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 98,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 1937,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-069',
    name: 'Modern Systems',
    specialty: ["Demolition", "Site Preparation"],
    address: {
      street: '3060 Main Road',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
      country: 'USA'
    },
    coordinates: { lat: 45.5834, lng: -122.6691 },
    contact: {
      phone: '(973) 555-2315',
      email: 'info@modernsystems.com',
      website: 'https://modernsystems.com'
    },
    serviceRadius: 55,
    availability: 'booked',
    rating: 4.8,
    reviewCount: 636,
    yearsInBusiness: 24,
    licenses: ["OR-D-362974"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 74,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 2386,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-070',
    name: 'Classic Pros',
    specialty: ["Demolition", "Site Preparation"],
    address: {
      street: '2380 Oak Street',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
      country: 'USA'
    },
    coordinates: { lat: 45.4666, lng: -122.6492 },
    contact: {
      phone: '(788) 555-3396',
      email: 'info@classicpros.com',
      website: 'https://classicpros.com'
    },
    serviceRadius: 40,
    availability: 'booked',
    rating: 4.6,
    reviewCount: 163,
    yearsInBusiness: 26,
    licenses: ["OR-D-480236"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 72,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 849,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-071',
    name: 'Expert Specialists',
    specialty: ["Flooring", "Hardwood", "Tile"],
    address: {
      street: '9617 Main Way',
      city: 'Las Vegas',
      state: 'NV',
      zip: '89101',
      country: 'USA'
    },
    coordinates: { lat: 36.0965, lng: -115.2254 },
    contact: {
      phone: '(394) 555-1283',
      email: 'info@expertspecialists.com',
      website: 'https://expertspecialists.com'
    },
    serviceRadius: 45,
    availability: 'available',
    rating: 4.6,
    reviewCount: 200,
    yearsInBusiness: 5,
    licenses: ["NV-F-282529"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 93,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 1340,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-072',
    name: 'Expert Works',
    specialty: ["Masonry", "Brickwork", "Concrete"],
    address: {
      street: '8107 Main Way',
      city: 'Las Vegas',
      state: 'NV',
      zip: '89101',
      country: 'USA'
    },
    coordinates: { lat: 36.084, lng: -115.2003 },
    contact: {
      phone: '(419) 555-5312',
      email: 'info@expertworks.com',
      website: 'https://expertworks.com'
    },
    serviceRadius: 45,
    availability: 'booked',
    rating: 4.7,
    reviewCount: 642,
    yearsInBusiness: 21,
    licenses: ["NV-M-915421"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 73,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 2072,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-073',
    name: 'Master Designs',
    specialty: ["Smart Home", "Security Systems"],
    address: {
      street: '9540 Cedar Lane',
      city: 'Las Vegas',
      state: 'NV',
      zip: '89101',
      country: 'USA'
    },
    coordinates: { lat: 36.2566, lng: -115.07 },
    contact: {
      phone: '(494) 555-7349',
      email: 'info@masterdesigns.com',
      website: 'https://masterdesigns.com'
    },
    serviceRadius: 55,
    availability: 'available',
    rating: 4.7,
    reviewCount: 354,
    yearsInBusiness: 24,
    licenses: ["NV-S-291954"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 83,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 1341,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-074',
    name: 'Expert Co',
    specialty: ["Pool Installation", "Spa", "Water Features"],
    address: {
      street: '9277 Birch Avenue',
      city: 'Las Vegas',
      state: 'NV',
      zip: '89101',
      country: 'USA'
    },
    coordinates: { lat: 36.2323, lng: -115.0415 },
    contact: {
      phone: '(963) 555-7077',
      email: 'info@expertco.com',
      website: 'https://expertco.com'
    },
    serviceRadius: 50,
    availability: 'available',
    rating: 4.7,
    reviewCount: 355,
    yearsInBusiness: 17,
    licenses: ["NV-P-433115"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 90,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 1276,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-075',
    name: 'Premier Contractors',
    specialty: ["Insulation", "Weatherproofing"],
    address: {
      street: '7487 Birch Way',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'USA'
    },
    coordinates: { lat: 30.262, lng: -97.8079 },
    contact: {
      phone: '(429) 555-5357',
      email: 'info@premiercontractors.com',
      website: 'https://premiercontractors.com'
    },
    serviceRadius: 25,
    availability: 'booked',
    rating: 4.6,
    reviewCount: 280,
    yearsInBusiness: 8,
    licenses: ["TX-I-692067"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 98,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 2439,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-076',
    name: 'Classic Construction Group',
    specialty: ["Kitchen Remodeling", "Bathroom Remodeling"],
    address: {
      street: '1819 Pine Drive',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'USA'
    },
    coordinates: { lat: 30.2628, lng: -97.803 },
    contact: {
      phone: '(357) 555-8400',
      email: 'info@classicconstructiongroup.com',
      website: 'https://classicconstructiongroup.com'
    },
    serviceRadius: 25,
    availability: 'available',
    rating: 4.8,
    reviewCount: 394,
    yearsInBusiness: 15,
    licenses: ["TX-K-848506"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 105,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 1715,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-077',
    name: 'Supreme Specialists',
    specialty: ["Fencing", "Decking", "Pergolas"],
    address: {
      street: '8925 Main Avenue',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'USA'
    },
    coordinates: { lat: 30.3412, lng: -97.7984 },
    contact: {
      phone: '(755) 555-8844',
      email: 'info@supremespecialists.com',
      website: 'https://supremespecialists.com'
    },
    serviceRadius: 30,
    availability: 'booked',
    rating: 4.6,
    reviewCount: 281,
    yearsInBusiness: 19,
    licenses: ["TX-F-372543"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 113,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 165,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-078',
    name: 'Supreme Designs',
    specialty: ["Tile Installation", "Stone Work", "Backsplash"],
    address: {
      street: '4321 Oak Lane',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'USA'
    },
    coordinates: { lat: 30.2292, lng: -97.8175 },
    contact: {
      phone: '(699) 555-8435',
      email: 'info@supremedesigns.com',
      website: 'https://supremedesigns.com'
    },
    serviceRadius: 55,
    availability: 'busy',
    rating: 4.8,
    reviewCount: 727,
    yearsInBusiness: 19,
    licenses: ["TX-T-398489"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 109,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 249,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-079',
    name: 'Ultimate Team',
    specialty: ["Windows", "Doors", "Skylights"],
    address: {
      street: '6448 Cedar Drive',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'USA'
    },
    coordinates: { lat: 30.2532, lng: -97.7957 },
    contact: {
      phone: '(956) 555-5903',
      email: 'info@ultimateteam.com',
      website: 'https://ultimateteam.com'
    },
    serviceRadius: 50,
    availability: 'booked',
    rating: 4.7,
    reviewCount: 651,
    yearsInBusiness: 18,
    licenses: ["TX-W-307112"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 86,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 1558,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-080',
    name: 'Ultimate Builders',
    specialty: ["Roofing", "Gutters", "Siding"],
    address: {
      street: '5166 Main Road',
      city: 'Nashville',
      state: 'TN',
      zip: '37201',
      country: 'USA'
    },
    coordinates: { lat: 36.2477, lng: -86.7155 },
    contact: {
      phone: '(934) 555-4098',
      email: 'info@ultimatebuilders.com',
      website: 'https://ultimatebuilders.com'
    },
    serviceRadius: 30,
    availability: 'busy',
    rating: 4.7,
    reviewCount: 604,
    yearsInBusiness: 21,
    licenses: ["TN-R-902650"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 75,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 1058,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-081',
    name: 'Master Builders',
    specialty: ["Roofing", "Gutters", "Siding"],
    address: {
      street: '5569 Cedar Avenue',
      city: 'Nashville',
      state: 'TN',
      zip: '37201',
      country: 'USA'
    },
    coordinates: { lat: 36.1202, lng: -86.782 },
    contact: {
      phone: '(368) 555-4825',
      email: 'info@masterbuilders.com',
      website: 'https://masterbuilders.com'
    },
    serviceRadius: 25,
    availability: 'busy',
    rating: 5.0,
    reviewCount: 261,
    yearsInBusiness: 21,
    licenses: ["TN-R-410412"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 77,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 2328,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-082',
    name: 'Best Designs',
    specialty: ["Tile Installation", "Stone Work", "Backsplash"],
    address: {
      street: '4346 Main Road',
      city: 'Nashville',
      state: 'TN',
      zip: '37201',
      country: 'USA'
    },
    coordinates: { lat: 36.1369, lng: -86.8324 },
    contact: {
      phone: '(883) 555-1546',
      email: 'info@bestdesigns.com',
      website: 'https://bestdesigns.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.8,
    reviewCount: 463,
    yearsInBusiness: 18,
    licenses: ["TN-T-180435"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 88,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 2309,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-083',
    name: 'Perfect Services',
    specialty: ["Demolition", "Site Preparation"],
    address: {
      street: '672 Oak Street',
      city: 'Nashville',
      state: 'TN',
      zip: '37201',
      country: 'USA'
    },
    coordinates: { lat: 36.077, lng: -86.8411 },
    contact: {
      phone: '(357) 555-6077',
      email: 'info@perfectservices.com',
      website: 'https://perfectservices.com'
    },
    serviceRadius: 60,
    availability: 'booked',
    rating: 4.8,
    reviewCount: 317,
    yearsInBusiness: 29,
    licenses: ["TN-D-702732"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 89,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 1697,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-084',
    name: 'Ideal Systems',
    specialty: ["Roofing", "Gutters", "Siding"],
    address: {
      street: '2759 Elm Avenue',
      city: 'Nashville',
      state: 'TN',
      zip: '37201',
      country: 'USA'
    },
    coordinates: { lat: 36.2218, lng: -86.8118 },
    contact: {
      phone: '(621) 555-9444',
      email: 'info@idealsystems.com',
      website: 'https://idealsystems.com'
    },
    serviceRadius: 40,
    availability: 'available',
    rating: 4.9,
    reviewCount: 137,
    yearsInBusiness: 28,
    licenses: ["TN-R-820263"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 71,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 1966,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-085',
    name: 'Modern Works',
    specialty: ["Demolition", "Site Preparation"],
    address: {
      street: '3644 Maple Lane',
      city: 'Minneapolis',
      state: 'MN',
      zip: '55401',
      country: 'USA'
    },
    coordinates: { lat: 44.9171, lng: -93.3464 },
    contact: {
      phone: '(434) 555-9133',
      email: 'info@modernworks.com',
      website: 'https://modernworks.com'
    },
    serviceRadius: 50,
    availability: 'busy',
    rating: 4.8,
    reviewCount: 534,
    yearsInBusiness: 26,
    licenses: ["MN-D-177098"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 86,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 1763,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-086',
    name: 'Classic Pros',
    specialty: ["Landscaping", "Hardscape", "Irrigation"],
    address: {
      street: '9953 Elm Drive',
      city: 'Minneapolis',
      state: 'MN',
      zip: '55401',
      country: 'USA'
    },
    coordinates: { lat: 44.8968, lng: -93.1774 },
    contact: {
      phone: '(443) 555-5541',
      email: 'info@classicpros.com',
      website: 'https://classicpros.com'
    },
    serviceRadius: 60,
    availability: 'busy',
    rating: 5.0,
    reviewCount: 550,
    yearsInBusiness: 8,
    licenses: ["MN-L-329018"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 115,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 1341,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-087',
    name: 'Master Builders',
    specialty: ["Roofing", "Gutters", "Siding"],
    address: {
      street: '8195 Elm Drive',
      city: 'Minneapolis',
      state: 'MN',
      zip: '55401',
      country: 'USA'
    },
    coordinates: { lat: 45.0432, lng: -93.2186 },
    contact: {
      phone: '(749) 555-5051',
      email: 'info@masterbuilders.com',
      website: 'https://masterbuilders.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.7,
    reviewCount: 232,
    yearsInBusiness: 30,
    licenses: ["MN-R-981247"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 106,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 2356,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-088',
    name: 'Expert Solutions',
    specialty: ["Welding", "Metal Fabrication", "Structural Steel"],
    address: {
      street: '5713 Elm Lane',
      city: 'San Antonio',
      state: 'TX',
      zip: '78201',
      country: 'USA'
    },
    coordinates: { lat: 29.4981, lng: -98.5079 },
    contact: {
      phone: '(749) 555-2555',
      email: 'info@expertsolutions.com',
      website: 'https://expertsolutions.com'
    },
    serviceRadius: 50,
    availability: 'booked',
    rating: 4.8,
    reviewCount: 351,
    yearsInBusiness: 10,
    licenses: ["TX-W-499934"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 104,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 1484,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-089',
    name: 'Expert Services',
    specialty: ["Painting", "Drywall", "Wallpaper"],
    address: {
      street: '8339 Birch Avenue',
      city: 'San Antonio',
      state: 'TX',
      zip: '78201',
      country: 'USA'
    },
    coordinates: { lat: 29.512, lng: -98.4168 },
    contact: {
      phone: '(624) 555-3000',
      email: 'info@expertservices.com',
      website: 'https://expertservices.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.9,
    reviewCount: 762,
    yearsInBusiness: 30,
    licenses: ["TX-P-762284"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 92,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 1753,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-090',
    name: 'Superior Co',
    specialty: ["Pool Installation", "Spa", "Water Features"],
    address: {
      street: '3453 Birch Avenue',
      city: 'San Antonio',
      state: 'TX',
      zip: '78201',
      country: 'USA'
    },
    coordinates: { lat: 29.505, lng: -98.5064 },
    contact: {
      phone: '(446) 555-2868',
      email: 'info@superiorco.com',
      website: 'https://superiorco.com'
    },
    serviceRadius: 25,
    availability: 'available',
    rating: 4.6,
    reviewCount: 159,
    yearsInBusiness: 18,
    licenses: ["TX-P-882010"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 116,
      minimumCharge: 250
    },
    portfolio: {
      projectCount: 730,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-091',
    name: 'Precision Works',
    specialty: ["Roofing", "Gutters", "Siding"],
    address: {
      street: '4579 Main Street',
      city: 'San Antonio',
      state: 'TX',
      zip: '78201',
      country: 'USA'
    },
    coordinates: { lat: 29.4554, lng: -98.3993 },
    contact: {
      phone: '(705) 555-5454',
      email: 'info@precisionworks.com',
      website: 'https://precisionworks.com'
    },
    serviceRadius: 40,
    availability: 'available',
    rating: 4.7,
    reviewCount: 280,
    yearsInBusiness: 22,
    licenses: ["TX-R-183869"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 115,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 2378,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-092',
    name: 'Trusted Builders',
    specialty: ["Painting", "Drywall", "Wallpaper"],
    address: {
      street: '3624 Main Lane',
      city: 'Charlotte',
      state: 'NC',
      zip: '28201',
      country: 'USA'
    },
    coordinates: { lat: 35.2072, lng: -80.8248 },
    contact: {
      phone: '(599) 555-3163',
      email: 'info@trustedbuilders.com',
      website: 'https://trustedbuilders.com'
    },
    serviceRadius: 55,
    availability: 'booked',
    rating: 4.5,
    reviewCount: 656,
    yearsInBusiness: 5,
    licenses: ["NC-P-827721"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 64,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 1545,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-093',
    name: 'Trusted Team',
    specialty: ["Electrical", "Solar Installation", "EV Charging"],
    address: {
      street: '9067 Maple Drive',
      city: 'Charlotte',
      state: 'NC',
      zip: '28201',
      country: 'USA'
    },
    coordinates: { lat: 35.248, lng: -80.852 },
    contact: {
      phone: '(881) 555-8128',
      email: 'info@trustedteam.com',
      website: 'https://trustedteam.com'
    },
    serviceRadius: 50,
    availability: 'available',
    rating: 4.5,
    reviewCount: 644,
    yearsInBusiness: 28,
    licenses: ["NC-E-868737"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 109,
      minimumCharge: 300
    },
    portfolio: {
      projectCount: 1249,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-094',
    name: 'Ace Construction Group',
    specialty: ["Masonry", "Brickwork", "Concrete"],
    address: {
      street: '1591 Pine Avenue',
      city: 'Charlotte',
      state: 'NC',
      zip: '28201',
      country: 'USA'
    },
    coordinates: { lat: 35.3207, lng: -80.927 },
    contact: {
      phone: '(851) 555-2156',
      email: 'info@aceconstructiongroup.com',
      website: 'https://aceconstructiongroup.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.9,
    reviewCount: 747,
    yearsInBusiness: 20,
    licenses: ["NC-M-755508"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 67,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 1645,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-095',
    name: 'Superior Services',
    specialty: ["Fencing", "Decking", "Pergolas"],
    address: {
      street: '244 Oak Lane',
      city: 'Charlotte',
      state: 'NC',
      zip: '28201',
      country: 'USA'
    },
    coordinates: { lat: 35.2828, lng: -80.845 },
    contact: {
      phone: '(361) 555-9114',
      email: 'info@superiorservices.com',
      website: 'https://superiorservices.com'
    },
    serviceRadius: 55,
    availability: 'booked',
    rating: 4.6,
    reviewCount: 189,
    yearsInBusiness: 26,
    licenses: ["NC-F-966099"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 93,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 551,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-096',
    name: 'Modern Specialists',
    specialty: ["Smart Home", "Security Systems"],
    address: {
      street: '8372 Oak Avenue',
      city: 'Charlotte',
      state: 'NC',
      zip: '28201',
      country: 'USA'
    },
    coordinates: { lat: 35.2022, lng: -80.7836 },
    contact: {
      phone: '(846) 555-6279',
      email: 'info@modernspecialists.com',
      website: 'https://modernspecialists.com'
    },
    serviceRadius: 30,
    availability: 'booked',
    rating: 4.6,
    reviewCount: 686,
    yearsInBusiness: 21,
    licenses: ["NC-S-600960"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 119,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 1171,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-097',
    name: 'Superior Designs',
    specialty: ["Roofing", "Gutters", "Siding"],
    address: {
      street: '5679 Maple Lane',
      city: 'Indianapolis',
      state: 'IN',
      zip: '46201',
      country: 'USA'
    },
    coordinates: { lat: 39.8147, lng: -86.1518 },
    contact: {
      phone: '(616) 555-7868',
      email: 'info@superiordesigns.com',
      website: 'https://superiordesigns.com'
    },
    serviceRadius: 40,
    availability: 'booked',
    rating: 4.5,
    reviewCount: 240,
    yearsInBusiness: 20,
    licenses: ["IN-R-936260"],
    insurance: {
      liability: 2000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 64,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 441,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-098',
    name: 'Supreme Systems',
    specialty: ["Demolition", "Site Preparation"],
    address: {
      street: '2761 Birch Street',
      city: 'Indianapolis',
      state: 'IN',
      zip: '46201',
      country: 'USA'
    },
    coordinates: { lat: 39.8331, lng: -86.2447 },
    contact: {
      phone: '(243) 555-7111',
      email: 'info@supremesystems.com',
      website: 'https://supremesystems.com'
    },
    serviceRadius: 60,
    availability: 'available',
    rating: 5.0,
    reviewCount: 680,
    yearsInBusiness: 27,
    licenses: ["IN-D-540831"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 109,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 1713,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-099',
    name: 'Supreme Services',
    specialty: ["HVAC", "Air Conditioning", "Heating"],
    address: {
      street: '1739 Birch Drive',
      city: 'Indianapolis',
      state: 'IN',
      zip: '46201',
      country: 'USA'
    },
    coordinates: { lat: 39.7578, lng: -86.076 },
    contact: {
      phone: '(975) 555-4990',
      email: 'info@supremeservices.com',
      website: 'https://supremeservices.com'
    },
    serviceRadius: 25,
    availability: 'available',
    rating: 4.8,
    reviewCount: 456,
    yearsInBusiness: 15,
    licenses: ["IN-H-266835"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 91,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 2191,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-100',
    name: 'Pro Specialists',
    specialty: ["Insulation", "Weatherproofing"],
    address: {
      street: '5586 Cedar Road',
      city: 'Indianapolis',
      state: 'IN',
      zip: '46201',
      country: 'USA'
    },
    coordinates: { lat: 39.7008, lng: -86.1256 },
    contact: {
      phone: '(880) 555-6308',
      email: 'info@prospecialists.com',
      website: 'https://prospecialists.com'
    },
    serviceRadius: 25,
    availability: 'available',
    rating: 4.9,
    reviewCount: 590,
    yearsInBusiness: 20,
    licenses: ["IN-I-457182"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 118,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 315,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-101',
    name: 'Top Co',
    specialty: ["Roofing", "Gutters", "Siding"],
    address: {
      street: '6119 Oak Road',
      city: 'Columbus',
      state: 'OH',
      zip: '43201',
      country: 'USA'
    },
    coordinates: { lat: 39.9906, lng: -82.907 },
    contact: {
      phone: '(334) 555-5504',
      email: 'info@topco.com',
      website: 'https://topco.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 5.0,
    reviewCount: 586,
    yearsInBusiness: 11,
    licenses: ["OH-R-470688"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 116,
      minimumCharge: 200
    },
    portfolio: {
      projectCount: 289,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-102',
    name: 'Prime Construction Group',
    specialty: ["Windows", "Doors", "Skylights"],
    address: {
      street: '5880 Pine Road',
      city: 'Columbus',
      state: 'OH',
      zip: '43201',
      country: 'USA'
    },
    coordinates: { lat: 39.9674, lng: -83.0646 },
    contact: {
      phone: '(991) 555-5362',
      email: 'info@primeconstructiongroup.com',
      website: 'https://primeconstructiongroup.com'
    },
    serviceRadius: 45,
    availability: 'booked',
    rating: 4.8,
    reviewCount: 636,
    yearsInBusiness: 20,
    licenses: ["OH-W-257622"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 97,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 399,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-103',
    name: 'Professional Builders',
    specialty: ["Pool Installation", "Spa", "Water Features"],
    address: {
      street: '263 Cedar Way',
      city: 'Columbus',
      state: 'OH',
      zip: '43201',
      country: 'USA'
    },
    coordinates: { lat: 39.9701, lng: -83.0165 },
    contact: {
      phone: '(304) 555-1271',
      email: 'info@professionalbuilders.com',
      website: 'https://professionalbuilders.com'
    },
    serviceRadius: 50,
    availability: 'booked',
    rating: 4.8,
    reviewCount: 154,
    yearsInBusiness: 12,
    licenses: ["OH-P-833753"],
    insurance: {
      liability: 1000000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 109,
      minimumCharge: 150
    },
    portfolio: {
      projectCount: 417,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-104',
    name: 'Reliable Services',
    specialty: ["Windows", "Doors", "Skylights"],
    address: {
      street: '5453 Cedar Avenue',
      city: 'Columbus',
      state: 'OH',
      zip: '43201',
      country: 'USA'
    },
    coordinates: { lat: 39.9952, lng: -83.0025 },
    contact: {
      phone: '(948) 555-4236',
      email: 'info@reliableservices.com',
      website: 'https://reliableservices.com'
    },
    serviceRadius: 50,
    availability: 'busy',
    rating: 4.6,
    reviewCount: 122,
    yearsInBusiness: 12,
    licenses: ["OH-W-474342"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 88,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 1869,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-105',
    name: 'Artisan Works',
    specialty: ["Insulation", "Weatherproofing"],
    address: {
      street: '5152 Pine Way',
      city: 'Detroit',
      state: 'MI',
      zip: '48201',
      country: 'USA'
    },
    coordinates: { lat: 42.2325, lng: -82.9494 },
    contact: {
      phone: '(917) 555-8921',
      email: 'info@artisanworks.com',
      website: 'https://artisanworks.com'
    },
    serviceRadius: 35,
    availability: 'booked',
    rating: 4.6,
    reviewCount: 647,
    yearsInBusiness: 8,
    licenses: ["MI-I-203465"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 68,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 279,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-106',
    name: 'Custom Systems',
    specialty: ["Insulation", "Weatherproofing"],
    address: {
      street: '9403 Oak Street',
      city: 'Detroit',
      state: 'MI',
      zip: '48201',
      country: 'USA'
    },
    coordinates: { lat: 42.302, lng: -83.0896 },
    contact: {
      phone: '(860) 555-4989',
      email: 'info@customsystems.com',
      website: 'https://customsystems.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.8,
    reviewCount: 781,
    yearsInBusiness: 15,
    licenses: ["MI-I-918128"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 99,
      minimumCharge: 500
    },
    portfolio: {
      projectCount: 950,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-107',
    name: 'Expert Construction Group',
    specialty: ["Foundation Repair", "Waterproofing"],
    address: {
      street: '7390 Maple Drive',
      city: 'Detroit',
      state: 'MI',
      zip: '48201',
      country: 'USA'
    },
    coordinates: { lat: 42.4028, lng: -83.1111 },
    contact: {
      phone: '(344) 555-1486',
      email: 'info@expertconstructiongroup.com',
      website: 'https://expertconstructiongroup.com'
    },
    serviceRadius: 60,
    availability: 'available',
    rating: 4.5,
    reviewCount: 609,
    yearsInBusiness: 10,
    licenses: ["MI-F-538951"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 113,
      minimumCharge: 400
    },
    portfolio: {
      projectCount: 2498,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-108',
    name: 'Artisan Pros',
    specialty: ["Flooring", "Hardwood", "Tile"],
    address: {
      street: '3314 Main Street',
      city: 'Milwaukee',
      state: 'WI',
      zip: '53201',
      country: 'USA'
    },
    coordinates: { lat: 42.9884, lng: -87.9673 },
    contact: {
      phone: '(727) 555-5304',
      email: 'info@artisanpros.com',
      website: 'https://artisanpros.com'
    },
    serviceRadius: 25,
    availability: 'booked',
    rating: 4.8,
    reviewCount: 462,
    yearsInBusiness: 24,
    licenses: ["WI-F-132192"],
    insurance: {
      liability: 1500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 95,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 2032,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-109',
    name: 'Superior Works',
    specialty: ["Masonry", "Brickwork", "Concrete"],
    address: {
      street: '490 Maple Avenue',
      city: 'Milwaukee',
      state: 'WI',
      zip: '53201',
      country: 'USA'
    },
    coordinates: { lat: 42.9959, lng: -88.0057 },
    contact: {
      phone: '(699) 555-4363',
      email: 'info@superiorworks.com',
      website: 'https://superiorworks.com'
    },
    serviceRadius: 25,
    availability: 'available',
    rating: 4.7,
    reviewCount: 68,
    yearsInBusiness: 13,
    licenses: ["WI-M-326142"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 81,
      minimumCharge: 350
    },
    portfolio: {
      projectCount: 1783,
      photos: []
    },
    verified: true
  },
  {
    id: 'lc-110',
    name: 'Master Contractors',
    specialty: ["Painting", "Drywall", "Wallpaper"],
    address: {
      street: '2783 Elm Way',
      city: 'Milwaukee',
      state: 'WI',
      zip: '53201',
      country: 'USA'
    },
    coordinates: { lat: 42.9595, lng: -87.8384 },
    contact: {
      phone: '(980) 555-4055',
      email: 'info@mastercontractors.com',
      website: 'https://mastercontractors.com'
    },
    serviceRadius: 35,
    availability: 'available',
    rating: 4.5,
    reviewCount: 627,
    yearsInBusiness: 6,
    licenses: ["WI-P-662345"],
    insurance: {
      liability: 500000,
      workersComp: true
    },
    pricing: {
      hourlyRate: 64,
      minimumCharge: 450
    },
    portfolio: {
      projectCount: 698,
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

