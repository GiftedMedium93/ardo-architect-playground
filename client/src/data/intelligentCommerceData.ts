/**
 * Intelligent Commerce Engine (ICE) Data
 * 
 * Provides Similar Items Market Window, Availability Salve, Price Volatility analysis,
 * and What-If Scenario capabilities for intelligent material procurement.
 */

export interface SimilarItem {
  id: string;
  name: string;
  category: string;
  type: 'cheaper' | 'similar' | 'luxury';
  originalPrice: number;
  suggestedPrice: number;
  savings: number;
  savingsPercent: number;
  vendor: string;
  availability: number; // 0-100%
  availabilityStatus: 'high' | 'medium' | 'low';
  leadTime: number; // days
  complianceStatus: 'pass' | 'fail' | 'pending';
  complianceNotes: string;
  specifications: Record<string, string>;
  substituteFor: string; // Original product ID
  similarityScore: number; // 0-100%
  bulkDiscount: number; // percentage
  priceVolatility: 'stable' | 'rising' | 'falling';
  priceChange7Day: number; // percentage
  priceChange30Day: number; // percentage
}

export interface AvailabilitySalve {
  productId: string;
  productName: string;
  availabilityScore: number; // 0-100%
  suppliers: {
    name: string;
    stock: number;
    leadTime: number;
    reliability: number; // 0-100%
  }[];
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface PriceVolatilityData {
  productId: string;
  productName: string;
  currentPrice: number;
  forecast7Day: {
    price: number;
    trend: 'up' | 'down' | 'stable';
    confidence: number; // 0-100%
  };
  forecast30Day: {
    price: number;
    trend: 'up' | 'down' | 'stable';
    confidence: number; // 0-100%
  };
  recommendation: 'buy_now' | 'wait' | 'monitor';
  reasoning: string;
}

export interface WhatIfScenario {
  id: string;
  name: string;
  originalProduct: string;
  substituteProduct: string;
  impactAnalysis: {
    costChange: number;
    costChangePercent: number;
    timelineChange: number; // days
    complianceStatus: 'maintained' | 'improved' | 'compromised';
    qualityImpact: 'better' | 'same' | 'worse';
    sustainabilityScore: number; // 0-100%
  };
  bomRecalculation: {
    originalCost: number;
    newCost: number;
    savings: number;
  };
}

// Sample Similar Items Database (ML-based clustering simulation)
export const similarItemsDatabase: Record<string, SimilarItem[]> = {
  // For "Premium Oak Hardwood Flooring"
  'flooring-oak-001': [
    {
      id: 'flooring-maple-001',
      name: 'Premium Maple Hardwood Flooring',
      category: 'Flooring',
      type: 'similar',
      originalPrice: 8.99,
      suggestedPrice: 8.49,
      savings: 0.50,
      savingsPercent: 5.6,
      vendor: 'Lowe\'s',
      availability: 95,
      availabilityStatus: 'high',
      leadTime: 3,
      complianceStatus: 'pass',
      complianceNotes: 'Meets all IBC 2021 flooring requirements',
      specifications: {
        'Material': 'Maple',
        'Thickness': '3/4"',
        'Width': '3.25"',
        'Finish': 'Polyurethane',
        'Warranty': '25 years'
      },
      substituteFor: 'flooring-oak-001',
      similarityScore: 92,
      bulkDiscount: 10,
      priceVolatility: 'stable',
      priceChange7Day: 0.5,
      priceChange30Day: 1.2
    },
    {
      id: 'flooring-engineered-oak-001',
      name: 'Engineered Oak Flooring',
      category: 'Flooring',
      type: 'cheaper',
      originalPrice: 8.99,
      suggestedPrice: 5.99,
      savings: 3.00,
      savingsPercent: 33.4,
      vendor: 'Home Depot',
      availability: 88,
      availabilityStatus: 'high',
      leadTime: 2,
      complianceStatus: 'pass',
      complianceNotes: 'IBC 2021 compliant, suitable for all residential applications',
      specifications: {
        'Material': 'Engineered Oak',
        'Thickness': '1/2"',
        'Width': '5"',
        'Finish': 'UV-cured',
        'Warranty': '20 years'
      },
      substituteFor: 'flooring-oak-001',
      similarityScore: 85,
      bulkDiscount: 15,
      priceVolatility: 'falling',
      priceChange7Day: -2.1,
      priceChange30Day: -5.3
    },
    {
      id: 'flooring-walnut-luxury-001',
      name: 'Luxury Walnut Hardwood Flooring',
      category: 'Flooring',
      type: 'luxury',
      originalPrice: 8.99,
      suggestedPrice: 14.99,
      savings: -6.00,
      savingsPercent: -66.7,
      vendor: 'Ferguson',
      availability: 72,
      availabilityStatus: 'medium',
      leadTime: 7,
      complianceStatus: 'pass',
      complianceNotes: 'Premium grade, exceeds IBC 2021 standards',
      specifications: {
        'Material': 'American Walnut',
        'Thickness': '3/4"',
        'Width': '5"',
        'Finish': 'Hand-scraped oil',
        'Warranty': '50 years'
      },
      substituteFor: 'flooring-oak-001',
      similarityScore: 88,
      bulkDiscount: 8,
      priceVolatility: 'rising',
      priceChange7Day: 3.2,
      priceChange30Day: 8.7
    }
  ],
  
  // For "Carrara Marble Tile"
  'tile-carrara-001': [
    {
      id: 'tile-calacatta-001',
      name: 'Calacatta Marble Tile 12x24',
      category: 'Tile',
      type: 'luxury',
      originalPrice: 15.99,
      suggestedPrice: 22.99,
      savings: -7.00,
      savingsPercent: -43.8,
      vendor: 'Ferguson',
      availability: 65,
      availabilityStatus: 'medium',
      leadTime: 10,
      complianceStatus: 'pass',
      complianceNotes: 'Premium natural stone, IBC 2021 compliant',
      specifications: {
        'Material': 'Calacatta Marble',
        'Size': '12x24"',
        'Finish': 'Polished',
        'Origin': 'Italy',
        'Absorption': '<0.5%'
      },
      substituteFor: 'tile-carrara-001',
      similarityScore: 94,
      bulkDiscount: 5,
      priceVolatility: 'rising',
      priceChange7Day: 2.8,
      priceChange30Day: 7.5
    },
    {
      id: 'tile-porcelain-marble-look-001',
      name: 'Porcelain Marble-Look Tile 12x24',
      category: 'Tile',
      type: 'cheaper',
      originalPrice: 15.99,
      suggestedPrice: 6.99,
      savings: 9.00,
      savingsPercent: 56.3,
      vendor: 'Lowe\'s',
      availability: 98,
      availabilityStatus: 'high',
      leadTime: 1,
      complianceStatus: 'pass',
      complianceNotes: 'Engineered porcelain, exceeds IBC 2021 durability standards',
      specifications: {
        'Material': 'Porcelain',
        'Size': '12x24"',
        'Finish': 'Polished',
        'Origin': 'USA',
        'Absorption': '<0.1%'
      },
      substituteFor: 'tile-carrara-001',
      similarityScore: 87,
      bulkDiscount: 18,
      priceVolatility: 'stable',
      priceChange7Day: 0.2,
      priceChange30Day: -0.5
    },
    {
      id: 'tile-travertine-001',
      name: 'Travertine Tile 12x24',
      category: 'Tile',
      type: 'similar',
      originalPrice: 15.99,
      suggestedPrice: 12.99,
      savings: 3.00,
      savingsPercent: 18.8,
      vendor: 'Home Depot',
      availability: 85,
      availabilityStatus: 'high',
      leadTime: 4,
      complianceStatus: 'pass',
      complianceNotes: 'Natural stone, IBC 2021 compliant for all applications',
      specifications: {
        'Material': 'Travertine',
        'Size': '12x24"',
        'Finish': 'Honed',
        'Origin': 'Turkey',
        'Absorption': '2-5%'
      },
      substituteFor: 'tile-carrara-001',
      similarityScore: 82,
      bulkDiscount: 12,
      priceVolatility: 'stable',
      priceChange7Day: 0.8,
      priceChange30Day: 1.5
    }
  ],

  // For "Quartz Countertop - Calacatta"
  'countertop-quartz-001': [
    {
      id: 'countertop-quartzite-001',
      name: 'Quartzite Countertop - White Fantasy',
      category: 'Countertop',
      type: 'luxury',
      originalPrice: 89.99,
      suggestedPrice: 125.00,
      savings: -35.01,
      savingsPercent: -38.9,
      vendor: 'Ferguson',
      availability: 58,
      availabilityStatus: 'medium',
      leadTime: 14,
      complianceStatus: 'pass',
      complianceNotes: 'Natural quartzite, premium grade, IBC 2021 compliant',
      specifications: {
        'Material': 'Natural Quartzite',
        'Thickness': '3cm',
        'Finish': 'Polished',
        'Origin': 'Brazil',
        'Hardness': 'Mohs 7'
      },
      substituteFor: 'countertop-quartz-001',
      similarityScore: 89,
      bulkDiscount: 6,
      priceVolatility: 'rising',
      priceChange7Day: 4.2,
      priceChange30Day: 11.3
    },
    {
      id: 'countertop-solid-surface-001',
      name: 'Solid Surface Countertop - Glacier White',
      category: 'Countertop',
      type: 'cheaper',
      originalPrice: 89.99,
      suggestedPrice: 55.00,
      savings: 34.99,
      savingsPercent: 38.9,
      vendor: 'Home Depot',
      availability: 92,
      availabilityStatus: 'high',
      leadTime: 5,
      complianceStatus: 'pass',
      complianceNotes: 'Engineered solid surface, IBC 2021 compliant',
      specifications: {
        'Material': 'Acrylic Polymer',
        'Thickness': '1/2"',
        'Finish': 'Matte',
        'Origin': 'USA',
        'Warranty': '10 years'
      },
      substituteFor: 'countertop-quartz-001',
      similarityScore: 78,
      bulkDiscount: 20,
      priceVolatility: 'falling',
      priceChange7Day: -1.5,
      priceChange30Day: -4.2
    },
    {
      id: 'countertop-granite-001',
      name: 'Granite Countertop - Kashmir White',
      category: 'Countertop',
      type: 'similar',
      originalPrice: 89.99,
      suggestedPrice: 75.00,
      savings: 14.99,
      savingsPercent: 16.7,
      vendor: 'Lowe\'s',
      availability: 88,
      availabilityStatus: 'high',
      leadTime: 7,
      complianceStatus: 'pass',
      complianceNotes: 'Natural granite, IBC 2021 compliant',
      specifications: {
        'Material': 'Natural Granite',
        'Thickness': '3cm',
        'Finish': 'Polished',
        'Origin': 'India',
        'Hardness': 'Mohs 6-7'
      },
      substituteFor: 'countertop-quartz-001',
      similarityScore: 85,
      bulkDiscount: 12,
      priceVolatility: 'stable',
      priceChange7Day: 0.5,
      priceChange30Day: 1.8
    }
  ]
};

// Availability Salve Database
export const availabilitySalveData: AvailabilitySalve[] = [
  {
    productId: 'flooring-oak-001',
    productName: 'Premium Oak Hardwood Flooring',
    availabilityScore: 78,
    suppliers: [
      { name: 'Home Depot', stock: 2500, leadTime: 3, reliability: 95 },
      { name: 'Lowe\'s', stock: 1800, leadTime: 4, reliability: 92 },
      { name: 'Ferguson', stock: 450, leadTime: 7, reliability: 98 },
      { name: 'Lumber Liquidators', stock: 3200, leadTime: 2, reliability: 88 }
    ],
    riskLevel: 'low',
    recommendation: 'Adequate supply across multiple vendors. Consider Home Depot or Lumber Liquidators for fastest delivery.'
  },
  {
    productId: 'tile-carrara-001',
    productName: 'Carrara Marble Tile 12x24',
    availabilityScore: 62,
    suppliers: [
      { name: 'Ferguson', stock: 850, leadTime: 10, reliability: 98 },
      { name: 'The Tile Shop', stock: 420, leadTime: 14, reliability: 90 },
      { name: 'Floor & Decor', stock: 1200, leadTime: 7, reliability: 85 }
    ],
    riskLevel: 'medium',
    recommendation: 'Limited availability. Consider ordering early or exploring porcelain marble-look alternatives for better availability.'
  },
  {
    productId: 'countertop-quartz-001',
    productName: 'Quartz Countertop - Calacatta',
    availabilityScore: 85,
    suppliers: [
      { name: 'Ferguson', stock: 180, leadTime: 5, reliability: 98 },
      { name: 'Home Depot', stock: 220, leadTime: 6, reliability: 92 },
      { name: 'Lowe\'s', stock: 195, leadTime: 5, reliability: 93 },
      { name: 'Cambria', stock: 320, leadTime: 4, reliability: 99 }
    ],
    riskLevel: 'low',
    recommendation: 'Excellent availability. Cambria offers best lead time with highest reliability.'
  }
];

// Price Volatility Database
export const priceVolatilityData: PriceVolatilityData[] = [
  {
    productId: 'flooring-oak-001',
    productName: 'Premium Oak Hardwood Flooring',
    currentPrice: 8.99,
    forecast7Day: {
      price: 9.15,
      trend: 'up',
      confidence: 78
    },
    forecast30Day: {
      price: 9.45,
      trend: 'up',
      confidence: 65
    },
    recommendation: 'buy_now',
    reasoning: 'Lumber prices trending upward due to seasonal demand. Lock in current price to save 5-8% over next month.'
  },
  {
    productId: 'tile-carrara-001',
    productName: 'Carrara Marble Tile 12x24',
    currentPrice: 15.99,
    forecast7Day: {
      price: 15.85,
      trend: 'down',
      confidence: 72
    },
    forecast30Day: {
      price: 15.50,
      trend: 'down',
      confidence: 58
    },
    recommendation: 'wait',
    reasoning: 'Import costs decreasing. Waiting 2-3 weeks could save 3-4% on total tile cost.'
  },
  {
    productId: 'countertop-quartz-001',
    productName: 'Quartz Countertop - Calacatta',
    currentPrice: 89.99,
    forecast7Day: {
      price: 90.25,
      trend: 'stable',
      confidence: 85
    },
    forecast30Day: {
      price: 91.50,
      trend: 'stable',
      confidence: 72
    },
    recommendation: 'monitor',
    reasoning: 'Stable pricing expected. Minor fluctuations (+/- 2%) likely. Safe to purchase when ready.'
  }
];

// What-If Scenario Templates
export const whatIfScenarioTemplates: WhatIfScenario[] = [
  {
    id: 'scenario-001',
    name: 'Oak to Engineered Oak Substitution',
    originalProduct: 'Premium Oak Hardwood Flooring',
    substituteProduct: 'Engineered Oak Flooring',
    impactAnalysis: {
      costChange: -3000,
      costChangePercent: -33.4,
      timelineChange: -1,
      complianceStatus: 'maintained',
      qualityImpact: 'same',
      sustainabilityScore: 78
    },
    bomRecalculation: {
      originalCost: 8990,
      newCost: 5990,
      savings: 3000
    }
  },
  {
    id: 'scenario-002',
    name: 'Carrara Marble to Porcelain Marble-Look',
    originalProduct: 'Carrara Marble Tile 12x24',
    substituteProduct: 'Porcelain Marble-Look Tile 12x24',
    impactAnalysis: {
      costChange: -4500,
      costChangePercent: -56.3,
      timelineChange: -9,
      complianceStatus: 'improved',
      qualityImpact: 'better',
      sustainabilityScore: 85
    },
    bomRecalculation: {
      originalCost: 7995,
      newCost: 3495,
      savings: 4500
    }
  },
  {
    id: 'scenario-003',
    name: 'Quartz to Solid Surface Substitution',
    originalProduct: 'Quartz Countertop - Calacatta',
    substituteProduct: 'Solid Surface Countertop - Glacier White',
    impactAnalysis: {
      costChange: -2100,
      costChangePercent: -38.9,
      timelineChange: -2,
      complianceStatus: 'maintained',
      qualityImpact: 'worse',
      sustainabilityScore: 72
    },
    bomRecalculation: {
      originalCost: 5399,
      newCost: 3299,
      savings: 2100
    }
  }
];

