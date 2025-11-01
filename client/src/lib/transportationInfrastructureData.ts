// Comprehensive Transportation Infrastructure Database for Community Design

export interface RailSystem {
  id: string;
  name: string;
  type: "freight" | "passenger" | "high_speed" | "commuter";
  trackGauge: number; // mm
  maxSpeed: number; // km/h
  capacity: number; // passengers or tons per hour
  powerSystem: "diesel" | "electric" | "hybrid" | "maglev";
  rightOfWayWidth: number; // meters
  minimumCurveRadius: number; // meters
  maximumGrade: number; // percentage
  stationSpacing: { min: number; max: number }; // km
  costPerKm: number; // USD millions
  advantages: string[];
  disadvantages: string[];
  bestUseCase: string;
}

export interface LightRailSystem {
  id: string;
  name: string;
  type: "light_rail" | "streetcar" | "tram" | "monorail";
  trackGauge: number; // mm
  maxSpeed: number; // km/h
  capacity: number; // passengers per hour per direction
  powerSystem: "overhead_catenary" | "third_rail" | "battery" | "ground_level";
  rightOfWayType: "exclusive" | "semi_exclusive" | "mixed_traffic";
  platformHeight: number; // cm
  vehicleLength: number; // meters
  stationSpacing: number; // meters
  costPerKm: number; // USD millions
  advantages: string[];
  disadvantages: string[];
}

export interface RoadType {
  id: string;
  name: string;
  classification: "freeway" | "arterial" | "collector" | "local" | "alley";
  lanes: number;
  width: number; // meters
  designSpeed: number; // km/h
  capacity: number; // vehicles per hour
  rightOfWayWidth: number; // meters
  minimumCurveRadius: number; // meters
  maximumGrade: number; // percentage
  parkingAllowed: boolean;
  bikeLanes: boolean;
  sidewalks: boolean;
  costPerKm: number; // USD millions
  maintenanceCost: number; // USD per km per year
  typicalUse: string;
}

export interface BridgeType {
  id: string;
  name: string;
  type: "suspension" | "cable_stayed" | "arch" | "truss" | "beam" | "cantilever";
  maxSpan: number; // meters
  minSpan: number; // meters
  heightClearance: number; // meters
  loadCapacity: number; // tons
  constructionTime: number; // months
  lifespan: number; // years
  costPerMeter: number; // USD thousands
  advantages: string[];
  disadvantages: string[];
  bestUseCase: string;
  aestheticRating: "utilitarian" | "moderate" | "iconic";
}

export interface TunnelType {
  id: string;
  name: string;
  method: "bored" | "cut_and_cover" | "immersed_tube" | "drill_and_blast";
  diameter: number; // meters
  maxDepth: number; // meters
  soilTypes: string[];
  ventilationRequired: boolean;
  waterproofingLevel: "basic" | "moderate" | "advanced";
  constructionSpeed: number; // meters per day
  costPerMeter: number; // USD thousands
  advantages: string[];
  disadvantages: string[];
  bestUseCase: string;
}

export interface IntersectionType {
  id: string;
  name: string;
  type: "signalized" | "roundabout" | "stop_controlled" | "interchange";
  capacity: number; // vehicles per hour
  footprint: number; // square meters
  safetyRating: "low" | "moderate" | "high" | "very_high";
  pedestrianFriendly: boolean;
  bikeFriendly: boolean;
  cost: number; // USD thousands
  maintenanceCost: number; // USD per year
  advantages: string[];
  disadvantages: string[];
}

export interface PedestrianInfrastructure {
  id: string;
  name: string;
  type: "sidewalk" | "shared_path" | "pedestrian_bridge" | "underpass" | "plaza";
  width: number; // meters
  surfaceMaterial: string;
  accessibility: "ADA_compliant" | "partial" | "not_compliant";
  lighting: boolean;
  landscaping: boolean;
  costPerMeter: number; // USD
  maintenanceCost: number; // USD per meter per year
  features: string[];
}

export interface BicycleInfrastructure {
  id: string;
  name: string;
  type: "protected_lane" | "buffered_lane" | "shared_lane" | "separated_path";
  width: number; // meters
  protection: "physical_barrier" | "painted_buffer" | "none";
  bidirectional: boolean;
  surfaceMaterial: string;
  costPerKm: number; // USD thousands
  safetyRating: "low" | "moderate" | "high" | "very_high";
  userComfort: "low" | "moderate" | "high" | "very_high";
  advantages: string[];
}

// Rail Systems Database
export const railSystems: RailSystem[] = [
  {
    id: "freight_heavy",
    name: "Heavy Freight Railroad",
    type: "freight",
    trackGauge: 1435,
    maxSpeed: 120,
    capacity: 10000,
    powerSystem: "diesel",
    rightOfWayWidth: 30,
    minimumCurveRadius: 800,
    maximumGrade: 2.5,
    stationSpacing: { min: 50, max: 200 },
    costPerKm: 8,
    advantages: [
      "Extremely high cargo capacity",
      "Energy efficient for bulk goods",
      "Lower emissions per ton-mile than trucks",
      "Can handle heavy industrial loads"
    ],
    disadvantages: [
      "Requires extensive right-of-way",
      "High initial infrastructure cost",
      "Inflexible routing",
      "Noise and vibration impacts"
    ],
    bestUseCase: "Long-distance bulk cargo transport, industrial corridors"
  },
  {
    id: "high_speed_rail",
    name: "High-Speed Rail",
    type: "high_speed",
    trackGauge: 1435,
    maxSpeed: 350,
    capacity: 15000,
    powerSystem: "electric",
    rightOfWayWidth: 25,
    minimumCurveRadius: 4000,
    maximumGrade: 3.5,
    stationSpacing: { min: 50, max: 150 },
    costPerKm: 50,
    advantages: [
      "Very fast intercity travel",
      "High passenger capacity",
      "Low environmental impact",
      "Reduces air travel demand"
    ],
    disadvantages: [
      "Extremely expensive infrastructure",
      "Requires dedicated right-of-way",
      "Large curve radii needed",
      "Long construction time"
    ],
    bestUseCase: "Intercity corridors 200-800km, high-density routes"
  },
  {
    id: "commuter_rail",
    name: "Commuter Rail",
    type: "commuter",
    trackGauge: 1435,
    maxSpeed: 160,
    capacity: 8000,
    powerSystem: "electric",
    rightOfWayWidth: 20,
    minimumCurveRadius: 600,
    maximumGrade: 3.0,
    stationSpacing: { min: 2, max: 10 },
    costPerKm: 15,
    advantages: [
      "Connects suburbs to city centers",
      "Uses existing rail corridors",
      "High capacity during peak hours",
      "Faster than road traffic"
    ],
    disadvantages: [
      "Limited frequency off-peak",
      "Requires electrification",
      "Station access challenges",
      "Moderate operating costs"
    ],
    bestUseCase: "Suburban-to-urban commuting, regional connectivity"
  }
];

// Light Rail Systems Database
export const lightRailSystems: LightRailSystem[] = [
  {
    id: "modern_light_rail",
    name: "Modern Light Rail Transit (LRT)",
    type: "light_rail",
    trackGauge: 1435,
    maxSpeed: 80,
    capacity: 12000,
    powerSystem: "overhead_catenary",
    rightOfWayType: "exclusive",
    platformHeight: 35,
    vehicleLength: 45,
    stationSpacing: 800,
    costPerKm: 100,
    advantages: [
      "High capacity for urban corridors",
      "Exclusive right-of-way ensures reliability",
      "Modern, attractive vehicles",
      "Supports transit-oriented development"
    ],
    disadvantages: [
      "Expensive infrastructure",
      "Disrupts streets during construction",
      "Requires overhead wires",
      "Less flexible than buses"
    ]
  },
  {
    id: "streetcar",
    name: "Modern Streetcar",
    type: "streetcar",
    trackGauge: 1435,
    maxSpeed: 50,
    capacity: 6000,
    powerSystem: "overhead_catenary",
    rightOfWayType: "mixed_traffic",
    platformHeight: 20,
    vehicleLength: 25,
    stationSpacing: 400,
    costPerKm: 40,
    advantages: [
      "Lower cost than light rail",
      "Enhances street character",
      "Supports local economic development",
      "Flexible routing in mixed traffic"
    ],
    disadvantages: [
      "Slower than exclusive right-of-way transit",
      "Subject to traffic congestion",
      "Lower capacity",
      "Overhead wires impact aesthetics"
    ]
  },
  {
    id: "monorail",
    name: "Elevated Monorail",
    type: "monorail",
    trackGauge: 0,
    maxSpeed: 80,
    capacity: 8000,
    powerSystem: "third_rail",
    rightOfWayType: "exclusive",
    platformHeight: 600,
    vehicleLength: 30,
    stationSpacing: 1000,
    costPerKm: 120,
    advantages: [
      "Minimal ground-level footprint",
      "Iconic visual appeal",
      "No interference with street traffic",
      "Quiet operation"
    ],
    disadvantages: [
      "Very expensive",
      "Proprietary technology",
      "Limited network expansion",
      "Visual impact on streetscape"
    ]
  }
];

// Road Types Database
export const roadTypes: RoadType[] = [
  {
    id: "freeway",
    name: "Limited-Access Freeway",
    classification: "freeway",
    lanes: 6,
    width: 36,
    designSpeed: 120,
    capacity: 12000,
    rightOfWayWidth: 80,
    minimumCurveRadius: 600,
    maximumGrade: 5,
    parkingAllowed: false,
    bikeLanes: false,
    sidewalks: false,
    costPerKm: 25,
    maintenanceCost: 50000,
    typicalUse: "High-speed intercity and regional travel"
  },
  {
    id: "arterial",
    name: "Urban Arterial",
    classification: "arterial",
    lanes: 4,
    width: 24,
    designSpeed: 60,
    capacity: 6000,
    rightOfWayWidth: 40,
    minimumCurveRadius: 200,
    maximumGrade: 8,
    parkingAllowed: false,
    bikeLanes: true,
    sidewalks: true,
    costPerKm: 8,
    maintenanceCost: 30000,
    typicalUse: "Major through routes in urban areas"
  },
  {
    id: "collector",
    name: "Collector Street",
    classification: "collector",
    lanes: 2,
    width: 12,
    designSpeed: 50,
    capacity: 2000,
    rightOfWayWidth: 25,
    minimumCurveRadius: 100,
    maximumGrade: 10,
    parkingAllowed: true,
    bikeLanes: true,
    sidewalks: true,
    costPerKm: 3,
    maintenanceCost: 15000,
    typicalUse: "Connecting local streets to arterials"
  },
  {
    id: "local_street",
    name: "Local Residential Street",
    classification: "local",
    lanes: 2,
    width: 8,
    designSpeed: 30,
    capacity: 500,
    rightOfWayWidth: 18,
    minimumCurveRadius: 50,
    maximumGrade: 12,
    parkingAllowed: true,
    bikeLanes: false,
    sidewalks: true,
    costPerKm: 1.5,
    maintenanceCost: 8000,
    typicalUse: "Access to individual properties"
  }
];

// Bridge Types Database
export const bridgeTypes: BridgeType[] = [
  {
    id: "suspension",
    name: "Suspension Bridge",
    type: "suspension",
    maxSpan: 2000,
    minSpan: 300,
    heightClearance: 65,
    loadCapacity: 50000,
    constructionTime: 48,
    lifespan: 120,
    costPerMeter: 50,
    advantages: [
      "Can span very long distances",
      "Iconic architectural statement",
      "Minimal piers in water",
      "Flexible under wind loads"
    ],
    disadvantages: [
      "Extremely expensive",
      "Long construction time",
      "Requires tall towers",
      "Sensitive to wind"
    ],
    bestUseCase: "Major river crossings, long spans over water",
    aestheticRating: "iconic"
  },
  {
    id: "cable_stayed",
    name: "Cable-Stayed Bridge",
    type: "cable_stayed",
    maxSpan: 1000,
    minSpan: 200,
    heightClearance: 50,
    loadCapacity: 40000,
    constructionTime: 36,
    lifespan: 100,
    costPerMeter: 35,
    advantages: [
      "Modern, elegant appearance",
      "Faster construction than suspension",
      "Good for medium-long spans",
      "Efficient use of materials"
    ],
    disadvantages: [
      "Expensive",
      "Complex cable system",
      "Requires tall pylons",
      "Cable maintenance needed"
    ],
    bestUseCase: "Medium to long river crossings, urban landmarks",
    aestheticRating: "iconic"
  },
  {
    id: "arch",
    name: "Arch Bridge",
    type: "arch",
    maxSpan: 550,
    minSpan: 50,
    heightClearance: 40,
    loadCapacity: 60000,
    constructionTime: 30,
    lifespan: 150,
    costPerMeter: 25,
    advantages: [
      "Very strong and durable",
      "Timeless aesthetic appeal",
      "No tensile stress in arch",
      "Long lifespan"
    ],
    disadvantages: [
      "Requires solid foundations",
      "Difficult construction",
      "Limited by geology",
      "Expensive formwork"
    ],
    bestUseCase: "Gorges, valleys, areas with solid rock",
    aestheticRating: "iconic"
  },
  {
    id: "beam",
    name: "Beam/Girder Bridge",
    type: "beam",
    maxSpan: 80,
    minSpan: 10,
    heightClearance: 5,
    loadCapacity: 30000,
    constructionTime: 12,
    lifespan: 75,
    costPerMeter: 5,
    advantages: [
      "Simple, economical design",
      "Fast construction",
      "Well-understood engineering",
      "Low maintenance"
    ],
    disadvantages: [
      "Limited span length",
      "Utilitarian appearance",
      "Requires frequent piers",
      "Less efficient for long spans"
    ],
    bestUseCase: "Short spans, highway overpasses, simple crossings",
    aestheticRating: "utilitarian"
  }
];

// Tunnel Types Database
export const tunnelTypes: TunnelType[] = [
  {
    id: "tbm_bored",
    name: "Tunnel Boring Machine (TBM)",
    method: "bored",
    diameter: 12,
    maxDepth: 100,
    soilTypes: ["clay", "sand", "soft rock", "hard rock"],
    ventilationRequired: true,
    waterproofingLevel: "advanced",
    constructionSpeed: 15,
    costPerMeter: 80,
    advantages: [
      "Minimal surface disruption",
      "Consistent quality",
      "Safe for workers",
      "Works in various soil types"
    ],
    disadvantages: [
      "Very expensive equipment",
      "Slow mobilization",
      "Requires large diameter",
      "Difficult in mixed geology"
    ],
    bestUseCase: "Urban subway tunnels, long utility tunnels"
  },
  {
    id: "cut_and_cover",
    name: "Cut-and-Cover Tunnel",
    method: "cut_and_cover",
    diameter: 15,
    maxDepth: 30,
    soilTypes: ["any"],
    ventilationRequired: true,
    waterproofingLevel: "moderate",
    constructionSpeed: 5,
    costPerMeter: 30,
    advantages: [
      "Lower cost than bored",
      "Faster construction",
      "Flexible dimensions",
      "Easier station construction"
    ],
    disadvantages: [
      "Major surface disruption",
      "Impacts traffic and businesses",
      "Limited to shallow depths",
      "Requires street closure"
    ],
    bestUseCase: "Shallow urban tunnels, station boxes"
  },
  {
    id: "immersed_tube",
    name: "Immersed Tube Tunnel",
    method: "immersed_tube",
    diameter: 20,
    maxDepth: 50,
    soilTypes: ["marine sediments"],
    ventilationRequired: true,
    waterproofingLevel: "advanced",
    constructionSpeed: 10,
    costPerMeter: 60,
    advantages: [
      "Ideal for water crossings",
      "No impact on shipping",
      "Large cross-section possible",
      "Good seismic performance"
    ],
    disadvantages: [
      "Complex construction",
      "Requires dredging",
      "Foundation settlement risk",
      "Expensive"
    ],
    bestUseCase: "Underwater road/rail crossings, harbors"
  }
];

// Intersection Types Database
export const intersectionTypes: IntersectionType[] = [
  {
    id: "modern_roundabout",
    name: "Modern Roundabout",
    type: "roundabout",
    capacity: 3000,
    footprint: 2500,
    safetyRating: "very_high",
    pedestrianFriendly: true,
    bikeFriendly: true,
    cost: 500,
    maintenanceCost: 5000,
    advantages: [
      "85% reduction in fatal crashes",
      "Continuous traffic flow",
      "Lower speeds",
      "No signal maintenance",
      "Aesthetic landscaping opportunity"
    ],
    disadvantages: [
      "Requires more space",
      "Driver unfamiliarity",
      "Difficult for large trucks",
      "Higher construction cost"
    ]
  },
  {
    id: "signalized",
    name: "Signalized Intersection",
    type: "signalized",
    capacity: 4000,
    footprint: 1600,
    safetyRating: "moderate",
    pedestrianFriendly: true,
    bikeFriendly: false,
    cost: 300,
    maintenanceCost: 15000,
    advantages: [
      "Familiar to drivers",
      "Compact footprint",
      "Can prioritize transit",
      "Handles high volumes"
    ],
    disadvantages: [
      "Delay during red phases",
      "Higher crash severity",
      "Ongoing maintenance",
      "Energy consumption"
    ]
  },
  {
    id: "diamond_interchange",
    name: "Diamond Interchange",
    type: "interchange",
    capacity: 8000,
    footprint: 40000,
    safetyRating: "high",
    pedestrianFriendly: false,
    bikeFriendly: false,
    cost: 15000,
    maintenanceCost: 50000,
    advantages: [
      "Grade-separated movements",
      "High capacity",
      "Standard design",
      "Relatively compact"
    ],
    disadvantages: [
      "Expensive",
      "Large footprint",
      "Not pedestrian-friendly",
      "Complex construction"
    ]
  }
];

// Pedestrian Infrastructure Database
export const pedestrianInfrastructure: PedestrianInfrastructure[] = [
  {
    id: "standard_sidewalk",
    name: "Standard Sidewalk",
    type: "sidewalk",
    width: 1.8,
    surfaceMaterial: "Concrete",
    accessibility: "ADA_compliant",
    lighting: true,
    landscaping: false,
    costPerMeter: 200,
    maintenanceCost: 10,
    features: ["Curb ramps", "Tactile paving", "Street furniture"]
  },
  {
    id: "shared_path",
    name: "Shared-Use Path",
    type: "shared_path",
    width: 3.5,
    surfaceMaterial: "Asphalt",
    accessibility: "ADA_compliant",
    lighting: true,
    landscaping: true,
    costPerMeter: 400,
    maintenanceCost: 20,
    features: ["Centerline striping", "Wayfinding", "Benches", "Landscaping"]
  },
  {
    id: "pedestrian_bridge",
    name: "Pedestrian Bridge",
    type: "pedestrian_bridge",
    width: 4.0,
    surfaceMaterial: "Steel deck",
    accessibility: "ADA_compliant",
    lighting: true,
    landscaping: false,
    costPerMeter: 5000,
    maintenanceCost: 100,
    features: ["Ramps/elevators", "Weather protection", "Architectural lighting"]
  }
];

// Bicycle Infrastructure Database
export const bicycleInfrastructure: BicycleInfrastructure[] = [
  {
    id: "protected_lane",
    name: "Protected Bike Lane",
    type: "protected_lane",
    width: 2.0,
    protection: "physical_barrier",
    bidirectional: false,
    surfaceMaterial: "Asphalt (colored)",
    costPerKm: 300,
    safetyRating: "very_high",
    userComfort: "very_high",
    advantages: [
      "Maximum safety",
      "Attracts all ages and abilities",
      "Clear separation from traffic",
      "Increases cycling mode share"
    ]
  },
  {
    id: "buffered_lane",
    name: "Buffered Bike Lane",
    type: "buffered_lane",
    width: 1.8,
    protection: "painted_buffer",
    bidirectional: false,
    surfaceMaterial: "Asphalt (marked)",
    costPerKm: 100,
    safetyRating: "moderate",
    userComfort: "moderate",
    advantages: [
      "Lower cost",
      "Easy implementation",
      "Some separation from traffic",
      "Flexible design"
    ]
  },
  {
    id: "separated_path",
    name: "Separated Bike Path",
    type: "separated_path",
    width: 3.0,
    protection: "physical_barrier",
    bidirectional: true,
    surfaceMaterial: "Asphalt",
    costPerKm: 500,
    safetyRating: "very_high",
    userComfort: "very_high",
    advantages: [
      "Complete separation from vehicles",
      "Scenic routing possible",
      "Recreational and commuting use",
      "Very comfortable"
    ]
  }
];

// Traffic Flow Calculator
export function calculateTrafficFlow(
  roadType: string,
  lanes: number,
  signalTiming?: number
): {
  capacity: number;
  levelOfService: string;
  averageSpeed: number;
} {
  const road = roadTypes.find(r => r.id === roadType);
  if (!road) {
    return { capacity: 0, levelOfService: "F", averageSpeed: 0 };
  }

  let capacity = road.capacity * (lanes / road.lanes);
  let averageSpeed = road.designSpeed * 0.7;

  if (signalTiming) {
    capacity *= (signalTiming / 100);
    averageSpeed *= (signalTiming / 100);
  }

  const levelOfService = 
    capacity > 10000 ? "A" :
    capacity > 8000 ? "B" :
    capacity > 6000 ? "C" :
    capacity > 4000 ? "D" :
    capacity > 2000 ? "E" : "F";

  return { capacity, levelOfService, averageSpeed };
}

// Cost Estimation Calculator
export function estimateInfrastructureCost(
  type: "rail" | "road" | "bridge" | "tunnel",
  length: number,
  systemId: string
): {
  constructionCost: number;
  annualMaintenance: number;
  totalLifecycleCost: number;
} {
  let costPerUnit = 0;
  let maintenanceCost = 0;
  let lifespan = 50;

  if (type === "rail") {
    const system = railSystems.find(s => s.id === systemId);
    if (system) {
      costPerUnit = system.costPerKm * 1000000;
      maintenanceCost = costPerUnit * 0.02;
      lifespan = 50;
    }
  } else if (type === "road") {
    const road = roadTypes.find(r => r.id === systemId);
    if (road) {
      costPerUnit = road.costPerKm * 1000000;
      maintenanceCost = road.maintenanceCost;
      lifespan = 30;
    }
  } else if (type === "bridge") {
    const bridge = bridgeTypes.find(b => b.id === systemId);
    if (bridge) {
      costPerUnit = bridge.costPerMeter * 1000;
      maintenanceCost = costPerUnit * 0.015;
      lifespan = bridge.lifespan;
    }
  } else if (type === "tunnel") {
    const tunnel = tunnelTypes.find(t => t.id === systemId);
    if (tunnel) {
      costPerUnit = tunnel.costPerMeter * 1000;
      maintenanceCost = costPerUnit * 0.025;
      lifespan = 100;
    }
  }

  const constructionCost = costPerUnit * length;
  const annualMaintenance = maintenanceCost * length;
  const totalLifecycleCost = constructionCost + (annualMaintenance * lifespan);

  return { constructionCost, annualMaintenance, totalLifecycleCost };
}

