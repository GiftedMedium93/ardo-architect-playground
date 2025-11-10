export interface ProjectTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedCost: number;
  timeline: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  squareFootage: number;
  features: string[];
  materials: string[];
  products: string[];
  aiPartner: string;
  thumbnail?: string;
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: "modern-kitchen",
    name: "Modern Kitchen Remodel",
    category: "Kitchen",
    description: "Contemporary kitchen design with quartz countertops, stainless steel appliances, and premium oak flooring. Features open layout with island seating.",
    estimatedCost: 45000,
    timeline: "6-8 weeks",
    difficulty: "Intermediate",
    squareFootage: 250,
    features: [
      "Quartz countertops",
      "Stainless steel appliances",
      "Oak hardwood flooring",
      "Recessed LED lighting",
      "Kitchen island with seating",
      "Custom cabinetry"
    ],
    materials: [
      "Premium Oak Hardwood Flooring",
      "Quartz Countertop Slab",
      "Carrara Marble Tile (backsplash)",
      "LED Recessed Lighting"
    ],
    products: [
      "mp-001", // Oak Flooring
      "mp-003", // Quartz Countertop
      "mp-002", // Marble Tile
      "mp-004"  // LED Lights
    ],
    aiPartner: "Mies" // Minimalist & Elegant
  },
  {
    id: "luxury-bathroom",
    name: "Luxury Spa Bathroom",
    category: "Bathroom",
    description: "High-end bathroom retreat with marble tile, rainfall shower, freestanding tub, and heated floors. Designed for ultimate relaxation.",
    estimatedCost: 38000,
    timeline: "5-7 weeks",
    difficulty: "Advanced",
    squareFootage: 180,
    features: [
      "Carrara marble tile",
      "Rainfall shower system",
      "Freestanding soaking tub",
      "Heated floor system",
      "Double vanity with quartz top",
      "Modern pendant lighting"
    ],
    materials: [
      "Carrara Marble Tile 12x24\"",
      "Quartz Countertop Slab",
      "Porcelain Subway Tile",
      "Modern Pendant Light Fixture"
    ],
    products: [
      "mp-002", // Marble Tile
      "mp-003", // Quartz Countertop
      "mp-006", // Subway Tile
      "mp-005"  // Pendant Light
    ],
    aiPartner: "Tadao" // Concrete & Light
  },
  {
    id: "home-office",
    name: "Professional Home Office",
    category: "Office",
    description: "Productive workspace with built-in shelving, ergonomic desk setup, and acoustic panels. Perfect for remote work professionals.",
    estimatedCost: 15000,
    timeline: "3-4 weeks",
    difficulty: "Beginner",
    squareFootage: 150,
    features: [
      "Built-in shelving system",
      "Ergonomic desk and chair",
      "Acoustic wall panels",
      "Task and ambient lighting",
      "Luxury vinyl plank flooring",
      "Cable management system"
    ],
    materials: [
      "Luxury Vinyl Plank Flooring",
      "LED Recessed Lighting",
      "Acoustic panels",
      "Built-in cabinetry"
    ],
    products: [
      "mp-007", // Vinyl Flooring
      "mp-004"  // LED Lights
    ],
    aiPartner: "Le Corbusier" // Modernist & Functional
  },
  {
    id: "living-room",
    name: "Contemporary Living Room",
    category: "Living",
    description: "Open-concept living space with fireplace feature wall, built-in entertainment center, and premium hardwood floors.",
    estimatedCost: 32000,
    timeline: "5-6 weeks",
    difficulty: "Intermediate",
    squareFootage: 400,
    features: [
      "Fireplace feature wall",
      "Built-in entertainment center",
      "Oak hardwood flooring",
      "Recessed and pendant lighting",
      "Custom window treatments",
      "Accent wall with texture"
    ],
    materials: [
      "Premium Oak Hardwood Flooring",
      "Modern Pendant Light Fixture",
      "LED Recessed Lighting",
      "Stone veneer (fireplace)"
    ],
    products: [
      "mp-001", // Oak Flooring
      "mp-005", // Pendant Light
      "mp-004"  // LED Lights
    ],
    aiPartner: "Frank" // Organic & Nature-Inspired
  },
  {
    id: "bedroom-suite",
    name: "Master Bedroom Suite",
    category: "Bedroom",
    description: "Luxurious master bedroom with walk-in closet, en-suite bathroom, and serene design aesthetic. Includes custom built-ins.",
    estimatedCost: 42000,
    timeline: "7-9 weeks",
    difficulty: "Advanced",
    squareFootage: 450,
    features: [
      "Walk-in closet system",
      "En-suite bathroom",
      "Tray ceiling with lighting",
      "Hardwood flooring",
      "Custom built-in nightstands",
      "Accent wall with texture"
    ],
    materials: [
      "Premium Oak Hardwood Flooring",
      "LED Recessed Lighting",
      "Modern Pendant Light Fixture",
      "Custom cabinetry"
    ],
    products: [
      "mp-001", // Oak Flooring
      "mp-004", // LED Lights
      "mp-005"  // Pendant Light
    ],
    aiPartner: "Zaha" // Parametric & Futuristic
  },
  {
    id: "restaurant-interior",
    name: "Modern Restaurant Interior",
    category: "Commercial",
    description: "Stylish restaurant design with open kitchen, bar area, and dining space. Features industrial-modern aesthetic.",
    estimatedCost: 125000,
    timeline: "12-16 weeks",
    difficulty: "Advanced",
    squareFootage: 2500,
    features: [
      "Open kitchen design",
      "Bar and lounge area",
      "Dining room seating for 80",
      "Commercial-grade flooring",
      "Pendant and track lighting",
      "Acoustic ceiling treatment"
    ],
    materials: [
      "Luxury Vinyl Plank Flooring",
      "Porcelain Subway Tile",
      "Modern Pendant Light Fixture",
      "LED Recessed Lighting"
    ],
    products: [
      "mp-007", // Vinyl Flooring
      "mp-006", // Subway Tile
      "mp-005", // Pendant Light
      "mp-004"  // LED Lights
    ],
    aiPartner: "Bjarke" // Playful & Innovative
  },
  {
    id: "retail-store",
    name: "Boutique Retail Store",
    category: "Commercial",
    description: "Inviting retail space with product displays, fitting rooms, and checkout area. Designed to enhance customer experience.",
    estimatedCost: 85000,
    timeline: "10-12 weeks",
    difficulty: "Advanced",
    squareFootage: 1800,
    features: [
      "Product display walls",
      "Fitting room area",
      "Checkout counter",
      "Track lighting system",
      "Luxury vinyl flooring",
      "Storefront window display"
    ],
    materials: [
      "Luxury Vinyl Plank Flooring",
      "LED Recessed Lighting",
      "Modern Pendant Light Fixture",
      "Custom millwork"
    ],
    products: [
      "mp-007", // Vinyl Flooring
      "mp-004", // LED Lights
      "mp-005"  // Pendant Light
    ],
    aiPartner: "Renzo" // Transparent & Structural
  },
  {
    id: "office-space",
    name: "Corporate Office Space",
    category: "Commercial",
    description: "Professional office environment with open workspace, conference rooms, and break area. Designed for productivity and collaboration.",
    estimatedCost: 95000,
    timeline: "10-14 weeks",
    difficulty: "Intermediate",
    squareFootage: 3000,
    features: [
      "Open workspace layout",
      "Conference rooms (3)",
      "Break room and kitchen",
      "Private offices (5)",
      "Reception area",
      "IT server room"
    ],
    materials: [
      "Luxury Vinyl Plank Flooring",
      "LED Recessed Lighting",
      "Acoustic ceiling tiles",
      "Glass partition walls"
    ],
    products: [
      "mp-007", // Vinyl Flooring
      "mp-004"  // LED Lights
    ],
    aiPartner: "Norman" // High-Tech & Sustainable
  },
  {
    id: "outdoor-patio",
    name: "Luxury Outdoor Patio",
    category: "Outdoor",
    description: "Entertainment-ready outdoor living space with kitchen, dining area, and lounge seating. Features weather-resistant materials.",
    estimatedCost: 52000,
    timeline: "8-10 weeks",
    difficulty: "Intermediate",
    squareFootage: 600,
    features: [
      "Outdoor kitchen with grill",
      "Dining area for 8",
      "Lounge seating area",
      "Fire pit feature",
      "Pergola structure",
      "Landscape lighting"
    ],
    materials: [
      "Porcelain tile (outdoor rated)",
      "LED outdoor lighting",
      "Weather-resistant cabinetry",
      "Natural stone accents"
    ],
    products: [
      "mp-006", // Tile
      "mp-004"  // LED Lights
    ],
    aiPartner: "Jeanne" // Landscape Integration
  },
  {
    id: "full-home-renovation",
    name: "Complete Home Renovation",
    category: "Whole Home",
    description: "Comprehensive whole-home remodel including kitchen, bathrooms, living spaces, and bedrooms. Transform your entire home.",
    estimatedCost: 185000,
    timeline: "16-24 weeks",
    difficulty: "Advanced",
    squareFootage: 2200,
    features: [
      "Kitchen remodel",
      "Master bathroom renovation",
      "Guest bathroom update",
      "Living room redesign",
      "Bedroom updates (3)",
      "New flooring throughout",
      "Updated lighting fixtures",
      "Fresh paint and finishes"
    ],
    materials: [
      "Premium Oak Hardwood Flooring",
      "Luxury Vinyl Plank Flooring",
      "Quartz Countertop Slab",
      "Carrara Marble Tile",
      "Porcelain Subway Tile",
      "LED Recessed Lighting",
      "Modern Pendant Light Fixture"
    ],
    products: [
      "mp-001", // Oak Flooring
      "mp-007", // Vinyl Flooring
      "mp-003", // Quartz Countertop
      "mp-002", // Marble Tile
      "mp-006", // Subway Tile
      "mp-004", // LED Lights
      "mp-005"  // Pendant Light
    ],
    aiPartner: "Rem" // Conceptual & Urban
  }
];

export const getTemplatesByCategory = (category: string) => {
  if (category === "all") return projectTemplates;
  return projectTemplates.filter(t => t.category === category);
};

export const getTemplateById = (id: string) => {
  return projectTemplates.find(t => t.id === id);
};

export const categories = Array.from(new Set(projectTemplates.map(t => t.category)));

