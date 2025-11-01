/**
 * Comprehensive Space Architecture Database
 * Accurate data for extraterrestrial habitat design
 */

export interface SpaceEnvironment {
  id: string;
  name: string;
  type: "planetary" | "orbital" | "deep_space" | "asteroid";
  gravity: number; // in Earth g's
  atmosphericPressure: number; // in kPa (Earth = 101.325)
  averageTemp: { min: number; max: number }; // in Celsius
  dayLength: number; // in Earth hours
  yearLength: number; // in Earth days
  radiationLevel: "low" | "moderate" | "high" | "extreme";
  radiationDose: number; // mSv per year
  surfaceComposition: string[];
  waterAvailability: "none" | "trace" | "moderate" | "abundant";
  inSituResources: string[];
  challenges: string[];
  opportunities: string[];
}

export const spaceEnvironments: SpaceEnvironment[] = [
  {
    id: "moon",
    name: "Lunar Surface",
    type: "planetary",
    gravity: 0.166,
    atmosphericPressure: 0.0000000003,
    averageTemp: { min: -173, max: 127 },
    dayLength: 708,
    yearLength: 27.3,
    radiationLevel: "high",
    radiationDose: 380,
    surfaceComposition: ["regolith", "basalt", "anorthosite", "ilmenite", "olivine"],
    waterAvailability: "moderate",
    inSituResources: ["oxygen (from regolith)", "metals (iron, aluminum, titanium)", "silicon", "water ice (polar regions)", "helium-3"],
    challenges: [
      "Extreme temperature swings (-173°C to +127°C)",
      "14-day day/night cycle",
      "Micrometeorite bombardment",
      "Abrasive lunar dust",
      "High radiation exposure (no magnetic field)",
      "Low gravity (1/6 Earth)",
      "No atmosphere for aerobraking"
    ],
    opportunities: [
      "Abundant solar energy (polar peaks of eternal light)",
      "Water ice in permanently shadowed craters",
      "Stable seismic environment",
      "Low escape velocity for launches",
      "Proximity to Earth (3-day transit)",
      "Lava tubes for natural radiation shielding"
    ]
  },
  {
    id: "mars",
    name: "Martian Surface",
    type: "planetary",
    gravity: 0.38,
    atmosphericPressure: 0.636,
    averageTemp: { min: -125, max: 20 },
    dayLength: 24.6,
    yearLength: 687,
    radiationLevel: "high",
    radiationDose: 233,
    surfaceComposition: ["iron oxide", "basalt", "andesite", "clay minerals", "perchlorates", "sulfates"],
    waterAvailability: "moderate",
    inSituResources: ["water ice", "CO2 atmosphere", "iron oxide", "silicon", "sulfur", "nitrogen", "argon"],
    challenges: [
      "Thin CO2 atmosphere (0.6% Earth pressure)",
      "Perchlorates in soil (toxic)",
      "Dust storms (planet-wide, lasting months)",
      "High radiation (no global magnetic field)",
      "Low gravity (38% Earth)",
      "Communication delay (4-24 minutes)",
      "Cold temperatures (average -63°C)"
    ],
    opportunities: [
      "24.6-hour day/night cycle (similar to Earth)",
      "Abundant water ice at poles and subsurface",
      "CO2 atmosphere for fuel production (Sabatier reaction)",
      "Moderate gravity (better than Moon)",
      "Lava tubes and caves for shelter",
      "Evidence of past water (potential for life)",
      "Diverse terrain for exploration"
    ]
  },
  {
    id: "leo",
    name: "Low Earth Orbit (LEO)",
    type: "orbital",
    gravity: 0.89,
    atmosphericPressure: 0,
    averageTemp: { min: -157, max: 121 },
    dayLength: 1.5,
    yearLength: 365,
    radiationLevel: "moderate",
    radiationDose: 144,
    surfaceComposition: [],
    waterAvailability: "none",
    inSituResources: ["solar energy", "Earth resources via resupply"],
    challenges: [
      "Microgravity environment",
      "Rapid day/night cycles (16 per day)",
      "Orbital decay requires periodic reboost",
      "Space debris collision risk",
      "Atomic oxygen erosion",
      "Thermal cycling stress",
      "Radiation from Van Allen belts"
    ],
    opportunities: [
      "Partial protection from Earth's magnetosphere",
      "Easy resupply from Earth",
      "Continuous solar power (with proper orientation)",
      "Microgravity research opportunities",
      "Earth observation capabilities",
      "Rapid communication with Earth",
      "Tourism potential"
    ]
  },
  {
    id: "lagrange_l5",
    name: "Earth-Moon L5 Point",
    type: "orbital",
    gravity: 0,
    atmosphericPressure: 0,
    averageTemp: { min: -270, max: 120 },
    dayLength: 0,
    yearLength: 27.3,
    radiationLevel: "high",
    radiationDose: 400,
    surfaceComposition: [],
    waterAvailability: "none",
    inSituResources: ["solar energy", "asteroid resources (via capture)"],
    challenges: [
      "Zero gravity environment",
      "High radiation (outside magnetosphere)",
      "No natural resources",
      "Requires active station-keeping",
      "Extreme temperature variations",
      "Communication delay to Earth (1.3 seconds)",
      "Psychological isolation"
    ],
    opportunities: [
      "Gravitationally stable location",
      "Continuous solar power",
      "Ideal for large-scale construction (O'Neill cylinders)",
      "Gateway between Earth and Moon",
      "No orbital decay",
      "Potential for massive rotating habitats",
      "Strategic location for space industry"
    ]
  },
  {
    id: "asteroid",
    name: "Near-Earth Asteroid",
    type: "asteroid",
    gravity: 0.0001,
    atmosphericPressure: 0,
    averageTemp: { min: -73, max: -23 },
    dayLength: 4.3,
    yearLength: 450,
    radiationLevel: "extreme",
    radiationDose: 600,
    surfaceComposition: ["carbonaceous chondrite", "metals (iron, nickel)", "silicates", "water ice", "organic compounds"],
    waterAvailability: "trace",
    inSituResources: ["metals (platinum group)", "water", "carbon", "nitrogen", "rare earth elements"],
    challenges: [
      "Microgravity (difficult to anchor)",
      "Irregular shape and rotation",
      "Extreme radiation exposure",
      "No atmosphere or magnetic field",
      "Dust and regolith adhesion",
      "Thermal extremes",
      "Long communication delays"
    ],
    opportunities: [
      "Rich in valuable metals and minerals",
      "Potential water resources",
      "Low delta-v for mining operations",
      "Organic compounds for life support",
      "Strategic resource depot",
      "Scientific research opportunities",
      "Stepping stone for deep space missions"
    ]
  },
  {
    id: "europa",
    name: "Europa (Jovian Moon)",
    type: "planetary",
    gravity: 0.134,
    atmosphericPressure: 0.0000001,
    averageTemp: { min: -223, max: -148 },
    dayLength: 85.2,
    yearLength: 3.55,
    radiationLevel: "extreme",
    radiationDose: 5400,
    surfaceComposition: ["water ice", "salts", "sulfur compounds", "silicates"],
    waterAvailability: "abundant",
    inSituResources: ["water ice", "oxygen (from ice)", "salts", "potential geothermal energy"],
    challenges: [
      "Extreme radiation from Jupiter (5.4 Sv/day)",
      "Extremely cold surface temperatures",
      "Thick ice shell (10-30 km)",
      "Tidal flexing and cryovolcanism",
      "Low gravity",
      "Long communication delay to Earth (35-52 minutes)",
      "Harsh Jovian magnetosphere"
    ],
    opportunities: [
      "Subsurface ocean (potential for life)",
      "Abundant water resources",
      "Geothermal energy from tidal heating",
      "Scientific research (astrobiology)",
      "Natural radiation shielding under ice",
      "Unique chemistry and geology",
      "Gateway to outer solar system"
    ]
  },
  {
    id: "titan",
    name: "Titan (Saturnian Moon)",
    type: "planetary",
    gravity: 0.138,
    atmosphericPressure: 146.7,
    averageTemp: { min: -179, max: -179 },
    dayLength: 382.7,
    yearLength: 15.95,
    radiationLevel: "low",
    radiationDose: 12,
    surfaceComposition: ["water ice", "hydrocarbons", "tholins", "liquid methane/ethane"],
    waterAvailability: "abundant",
    inSituResources: ["hydrocarbons (methane, ethane)", "nitrogen", "water ice", "organic compounds"],
    challenges: [
      "Extremely cold (-179°C)",
      "Thick atmosphere (low visibility)",
      "Liquid methane/ethane lakes",
      "Low solar energy (1% of Earth)",
      "Long day/night cycle",
      "Distance from Earth (1.2 billion km)",
      "Communication delay (68-90 minutes)"
    ],
    opportunities: [
      "Dense atmosphere (radiation protection, aerobraking)",
      "Low radiation environment",
      "Abundant hydrocarbons for fuel and materials",
      "Nitrogen atmosphere (useful for life support)",
      "Liquid methane/ethane as coolant",
      "Potential for aviation (thick atmosphere, low gravity)",
      "Astrobiology research opportunities"
    ]
  }
];

export interface SpaceMaterial {
  id: string;
  name: string;
  category: "structural" | "shielding" | "insulation" | "transparent" | "regolith_based" | "advanced_composite";
  composition: string;
  density: number; // kg/m³
  tensileStrength: number; // MPa
  thermalConductivity: number; // W/(m·K)
  radiationShielding: "poor" | "fair" | "good" | "excellent";
  temperatureRange: { min: number; max: number }; // °C
  availability: { [key: string]: "none" | "trace" | "low" | "moderate" | "high" | "abundant" };
  manufacturingMethod: string;
  advantages: string[];
  disadvantages: string[];
}

export const spaceMaterials: SpaceMaterial[] = [
  {
    id: "lunar_regolith_concrete",
    name: "Lunar Regolith Concrete",
    category: "structural",
    composition: "Lunar regolith + sulfur binder or sintered regolith",
    density: 1800,
    tensileStrength: 25,
    thermalConductivity: 0.8,
    radiationShielding: "excellent",
    temperatureRange: { min: -200, max: 200 },
    availability: { moon: "abundant", mars: "none", leo: "none", asteroid: "none" },
    manufacturingMethod: "In-situ sintering or sulfur-based binding",
    advantages: [
      "Abundant on lunar surface",
      "Excellent radiation shielding (2m provides Earth-equivalent protection)",
      "No need to import materials from Earth",
      "Can be 3D printed",
      "Good thermal mass for temperature regulation"
    ],
    disadvantages: [
      "Brittle (low tensile strength)",
      "Requires processing equipment",
      "Abrasive lunar dust is difficult to work with",
      "Outgassing in vacuum",
      "Quality varies with regolith composition"
    ]
  },
  {
    id: "martian_brick",
    name: "Martian Compressed Brick",
    category: "structural",
    composition: "Compressed Martian regolith",
    density: 2100,
    tensileStrength: 30,
    thermalConductivity: 1.0,
    radiationShielding: "excellent",
    temperatureRange: { min: -150, max: 150 },
    availability: { moon: "none", mars: "abundant", leo: "none", asteroid: "none" },
    manufacturingMethod: "Compression molding (no baking required)",
    advantages: [
      "No baking or binding required (Martian regolith self-binds under pressure)",
      "Abundant raw material",
      "Simple manufacturing process",
      "Good radiation shielding",
      "Thermal insulation properties"
    ],
    disadvantages: [
      "Perchlorates in Martian soil (toxic)",
      "Requires high compression force",
      "Brittle material",
      "Moisture sensitivity",
      "Variable quality depending on soil composition"
    ]
  },
  {
    id: "kevlar_mlI",
    name: "Kevlar Multi-Layer Insulation (MLI)",
    category: "insulation",
    composition: "Kevlar fabric + aluminized Mylar layers",
    density: 120,
    tensileStrength: 3600,
    thermalConductivity: 0.001,
    radiationShielding: "fair",
    temperatureRange: { min: -270, max: 400 },
    availability: { moon: "none", mars: "none", leo: "low", asteroid: "none" },
    manufacturingMethod: "Earth manufacturing, orbital assembly",
    advantages: [
      "Excellent thermal insulation",
      "Lightweight",
      "Flexible and easy to deploy",
      "Micrometeorite protection",
      "Proven space heritage (used on ISS)"
    ],
    disadvantages: [
      "Must be imported from Earth",
      "Degrades under UV exposure",
      "Limited radiation shielding",
      "Requires careful handling (tears easily)",
      "Expensive"
    ]
  },
  {
    id: "water_ice_shield",
    name: "Water Ice Radiation Shield",
    category: "shielding",
    composition: "Frozen water (H₂O)",
    density: 920,
    tensileStrength: 1,
    thermalConductivity: 2.2,
    radiationShielding: "excellent",
    temperatureRange: { min: -273, max: 0 },
    availability: { moon: "moderate", mars: "moderate", leo: "none", asteroid: "trace" },
    manufacturingMethod: "In-situ extraction and freezing",
    advantages: [
      "Excellent hydrogen-rich radiation shielding",
      "Dual-purpose (shielding + water storage)",
      "Available in-situ on Moon and Mars",
      "Can be regenerated from waste water",
      "Effective against galactic cosmic rays and solar particle events"
    ],
    disadvantages: [
      "Requires constant cold temperatures",
      "Heavy (high mass)",
      "Sublimation in vacuum",
      "Structural weakness",
      "Requires containment system"
    ]
  },
  {
    id: "aluminum_alloy_6061",
    name: "Aluminum Alloy 6061-T6",
    category: "structural",
    composition: "Al-Mg-Si alloy",
    density: 2700,
    tensileStrength: 310,
    thermalConductivity: 167,
    radiationShielding: "poor",
    temperatureRange: { min: -270, max: 200 },
    availability: { moon: "low", mars: "low", leo: "none", asteroid: "moderate" },
    manufacturingMethod: "Earth manufacturing or in-situ smelting from regolith",
    advantages: [
      "High strength-to-weight ratio",
      "Good machinability",
      "Corrosion resistant",
      "Proven space heritage",
      "Can be welded"
    ],
    disadvantages: [
      "Poor radiation shielding (secondary radiation from aluminum)",
      "High thermal conductivity (thermal bridging)",
      "Expensive to launch from Earth",
      "Requires complex in-situ processing",
      "Susceptible to micrometeorite damage"
    ]
  },
  {
    id: "polyethylene_hdpe",
    name: "High-Density Polyethylene (HDPE)",
    category: "shielding",
    composition: "Polyethylene polymer",
    density: 970,
    tensileStrength: 30,
    thermalConductivity: 0.5,
    radiationShielding: "excellent",
    temperatureRange: { min: -50, max: 80 },
    availability: { moon: "none", mars: "none", leo: "none", asteroid: "none" },
    manufacturingMethod: "Earth manufacturing",
    advantages: [
      "Excellent radiation shielding (hydrogen-rich)",
      "Lightweight",
      "Flexible",
      "Low cost (on Earth)",
      "Better than aluminum for radiation protection"
    ],
    disadvantages: [
      "Must be imported from Earth",
      "Degrades under UV and radiation over time",
      "Low melting point",
      "Outgassing in vacuum",
      "Not structurally strong"
    ]
  },
  {
    id: "boron_carbide",
    name: "Boron Carbide (B₄C)",
    category: "shielding",
    composition: "Boron carbide ceramic",
    density: 2520,
    tensileStrength: 350,
    thermalConductivity: 30,
    radiationShielding: "excellent",
    temperatureRange: { min: -270, max: 2450 },
    availability: { moon: "none", mars: "none", leo: "none", asteroid: "none" },
    manufacturingMethod: "Earth manufacturing",
    advantages: [
      "Excellent neutron absorption",
      "Very hard (used in armor)",
      "High melting point",
      "Good for nuclear reactor shielding",
      "Lightweight for a ceramic"
    ],
    disadvantages: [
      "Expensive",
      "Brittle",
      "Must be imported from Earth",
      "Difficult to manufacture",
      "Limited availability"
    ]
  },
  {
    id: "transparent_aluminum",
    name: "Transparent Aluminum (ALON)",
    category: "transparent",
    composition: "Aluminum oxynitride (AlON)",
    density: 3690,
    tensileStrength: 300,
    thermalConductivity: 12,
    radiationShielding: "fair",
    temperatureRange: { min: -270, max: 1200 },
    availability: { moon: "none", mars: "none", leo: "none", asteroid: "none" },
    manufacturingMethod: "Earth manufacturing (advanced ceramics)",
    advantages: [
      "Transparent (windows and viewports)",
      "Extremely hard and scratch-resistant",
      "High temperature resistance",
      "Better than glass for space applications",
      "Impact resistant"
    ],
    disadvantages: [
      "Very expensive",
      "Must be imported from Earth",
      "Heavy",
      "Complex manufacturing",
      "Limited size constraints"
    ]
  },
  {
    id: "carbon_fiber_composite",
    name: "Carbon Fiber Reinforced Polymer (CFRP)",
    category: "advanced_composite",
    composition: "Carbon fiber + epoxy resin",
    density: 1600,
    tensileStrength: 600,
    thermalConductivity: 1.0,
    radiationShielding: "fair",
    temperatureRange: { min: -150, max: 150 },
    availability: { moon: "none", mars: "none", leo: "none", asteroid: "none" },
    manufacturingMethod: "Earth manufacturing",
    advantages: [
      "Exceptional strength-to-weight ratio",
      "Low thermal expansion",
      "Fatigue resistant",
      "Proven in aerospace applications",
      "Can be molded into complex shapes"
    ],
    disadvantages: [
      "Expensive",
      "Must be imported from Earth",
      "Degrades under UV",
      "Difficult to repair",
      "Outgassing concerns"
    ]
  },
  {
    id: "regolith_bag",
    name: "Regolith-Filled Bags",
    category: "shielding",
    composition: "Fabric bags filled with local regolith",
    density: 1500,
    tensileStrength: 5,
    thermalConductivity: 0.3,
    radiationShielding: "excellent",
    temperatureRange: { min: -200, max: 150 },
    availability: { moon: "abundant", mars: "abundant", leo: "none", asteroid: "moderate" },
    manufacturingMethod: "Simple bag filling with local material",
    advantages: [
      "Extremely simple and low-tech",
      "Uses abundant local resources",
      "Excellent radiation shielding (2m+ thickness)",
      "Good thermal mass",
      "Can be deployed rapidly"
    ],
    disadvantages: [
      "Very heavy and bulky",
      "Requires large quantities of regolith",
      "Bags must be imported or manufactured",
      "Not structurally strong",
      "Dust contamination issues"
    ]
  }
];

export interface HabitatDesign {
  id: string;
  name: string;
  type: "pressurized_module" | "inflatable" | "underground" | "lava_tube" | "rotating_habitat" | "surface_dome";
  capacity: number; // number of occupants
  volume: number; // m³
  mass: number; // kg (without shielding)
  powerRequirement: number; // kW
  suitableEnvironments: string[];
  radiationProtection: "minimal" | "moderate" | "excellent";
  description: string;
  advantages: string[];
  disadvantages: string[];
  criticalSystems: string[];
}

export const habitatDesigns: HabitatDesign[] = [
  {
    id: "rigid_module",
    name: "Rigid Pressurized Module",
    type: "pressurized_module",
    capacity: 6,
    volume: 200,
    mass: 15000,
    powerRequirement: 12,
    suitableEnvironments: ["moon", "mars", "leo", "lagrange_l5"],
    radiationProtection: "minimal",
    description: "Traditional cylindrical or spherical pressure vessel made from aluminum or composite materials. Similar to ISS modules.",
    advantages: [
      "Proven technology (ISS heritage)",
      "Strong structural integrity",
      "Can be pre-outfitted on Earth",
      "Reliable and well-understood",
      "Good micrometeorite protection"
    ],
    disadvantages: [
      "Limited by launch vehicle fairing size",
      "Heavy (high launch cost)",
      "Minimal radiation shielding",
      "Fixed volume (not expandable)",
      "Expensive to manufacture"
    ],
    criticalSystems: [
      "Pressure hull integrity monitoring",
      "ECLSS (Environmental Control and Life Support System)",
      "Thermal control system",
      "Power distribution",
      "Fire suppression"
    ]
  },
  {
    id: "inflatable_habitat",
    name: "Inflatable Expandable Habitat",
    type: "inflatable",
    capacity: 8,
    volume: 330,
    mass: 3000,
    powerRequirement: 15,
    suitableEnvironments: ["moon", "mars", "leo", "lagrange_l5"],
    radiationProtection: "moderate",
    description: "Soft-goods habitat that launches compact and expands on-site. Multi-layer fabric with integrated shielding (e.g., BEAM on ISS).",
    advantages: [
      "High volume-to-mass ratio",
      "Compact for launch",
      "Can be very large when deployed",
      "Multi-layer fabric provides some radiation protection",
      "Lower launch costs"
    ],
    disadvantages: [
      "Unproven for long-duration use",
      "Vulnerable to punctures",
      "Complex deployment",
      "Limited internal structure",
      "Requires external shielding for radiation"
    ],
    criticalSystems: [
      "Inflation and pressure management",
      "Multi-layer fabric integrity",
      "Micrometeorite protection layers",
      "ECLSS",
      "Thermal regulation"
    ]
  },
  {
    id: "underground_habitat",
    name: "Subsurface Buried Habitat",
    type: "underground",
    capacity: 12,
    volume: 500,
    mass: 8000,
    powerRequirement: 20,
    suitableEnvironments: ["moon", "mars"],
    radiationProtection: "excellent",
    description: "Habitat buried under 2-5 meters of regolith for maximum radiation protection and thermal stability.",
    advantages: [
      "Excellent radiation shielding (2m regolith = Earth-equivalent)",
      "Stable temperatures (insulated by regolith)",
      "Protected from micrometeorites",
      "Lower structural loads (regolith support)",
      "Can be very large"
    ],
    disadvantages: [
      "Requires excavation equipment",
      "No natural light",
      "Psychological challenges (underground living)",
      "Difficult emergency egress",
      "Dust contamination during construction"
    ],
    criticalSystems: [
      "Excavation and construction robots",
      "Artificial lighting (full-spectrum)",
      "ECLSS with enhanced air filtration",
      "Emergency escape tunnels",
      "Structural monitoring (regolith settlement)"
    ]
  },
  {
    id: "lava_tube_habitat",
    name: "Lava Tube Settlement",
    type: "lava_tube",
    capacity: 100,
    volume: 10000,
    mass: 50000,
    powerRequirement: 150,
    suitableEnvironments: ["moon", "mars"],
    radiationProtection: "excellent",
    description: "Large-scale settlement inside natural lava tube. Provides natural radiation shielding and vast interior volume.",
    advantages: [
      "Massive interior volume (some tubes are km-scale)",
      "Natural radiation shielding (rock overburden)",
      "Stable temperatures",
      "Protected from surface hazards",
      "Can support large populations",
      "Minimal excavation required"
    ],
    disadvantages: [
      "Requires exploration and mapping",
      "Uncertain structural stability",
      "Potential for collapse",
      "No natural light",
      "Difficult access and logistics",
      "Unknown hazards (voids, unstable rock)"
    ],
    criticalSystems: [
      "Structural monitoring and reinforcement",
      "Large-scale ECLSS",
      "Artificial lighting infrastructure",
      "Transportation system (surface to tube)",
      "Emergency shelters (in case of collapse)"
    ]
  },
  {
    id: "rotating_habitat",
    name: "Rotating Artificial Gravity Station",
    type: "rotating_habitat",
    capacity: 50,
    volume: 5000,
    mass: 200000,
    powerRequirement: 100,
    suitableEnvironments: ["leo", "lagrange_l5"],
    radiationProtection: "moderate",
    description: "Large rotating structure (torus or cylinder) that generates artificial gravity through centripetal force. Requires significant mass and engineering.",
    advantages: [
      "Artificial gravity (mitigates health effects of microgravity)",
      "Can be very large (O'Neill cylinder scale)",
      "Supports long-term habitation",
      "Psychological benefits (Earth-like environment)",
      "Can incorporate agriculture and recreation"
    ],
    disadvantages: [
      "Extremely expensive and complex",
      "Requires massive construction in space",
      "Coriolis effects (if rotation is too fast)",
      "Requires active balancing and control",
      "Vulnerable to structural failure"
    ],
    criticalSystems: [
      "Rotation control and balancing",
      "Massive structural integrity monitoring",
      "Radiation shielding (water walls or regolith)",
      "Large-scale ECLSS",
      "Docking and transfer systems (rotating to non-rotating)"
    ]
  },
  {
    id: "surface_dome",
    name: "Transparent Surface Dome",
    type: "surface_dome",
    capacity: 20,
    volume: 2000,
    mass: 30000,
    powerRequirement: 40,
    suitableEnvironments: ["moon", "mars"],
    radiationProtection: "minimal",
    description: "Large transparent or translucent dome on the surface, providing natural light and views. Requires additional radiation shielding.",
    advantages: [
      "Natural light (psychological benefits)",
      "Views of the landscape",
      "Can support agriculture (greenhouses)",
      "Iconic and inspiring architecture",
      "Large open interior space"
    ],
    disadvantages: [
      "Minimal radiation shielding (requires additional layers)",
      "Thermal stress from temperature swings",
      "Vulnerable to micrometeorites",
      "Complex structural engineering (pressure loads)",
      "Expensive transparent materials"
    ],
    criticalSystems: [
      "Transparent material integrity (ALON or multi-layer glass)",
      "Radiation shielding layers (retractable or permanent)",
      "Thermal control (heating/cooling)",
      "Pressure equalization and leak detection",
      "Emergency depressurization protection"
    ]
  }
];

export interface LifeSupportSystem {
  id: string;
  name: string;
  category: "oxygen" | "water" | "food" | "waste" | "atmosphere";
  description: string;
  efficiency: number; // % recovery/recycling
  powerRequirement: number; // kW per person
  massPerPerson: number; // kg
  trl: number; // Technology Readiness Level (1-9)
  advantages: string[];
  disadvantages: string[];
}

export const lifeSupportSystems: LifeSupportSystem[] = [
  {
    id: "electrolysis_oxygen",
    name: "Water Electrolysis (O₂ Generation)",
    category: "oxygen",
    description: "Splits water (H₂O) into oxygen (O₂) and hydrogen (H₂) using electricity. Proven on ISS.",
    efficiency: 100,
    powerRequirement: 0.5,
    massPerPerson: 50,
    trl: 9,
    advantages: [
      "Proven technology (ISS heritage)",
      "100% oxygen recovery from water",
      "Hydrogen byproduct can be used for fuel or water reclamation",
      "Reliable and well-understood",
      "Scalable"
    ],
    disadvantages: [
      "Requires water input",
      "High power consumption",
      "Requires maintenance",
      "Produces hydrogen (must be managed)",
      "Heavy equipment"
    ]
  },
  {
    id: "sabatier_reactor",
    name: "Sabatier Reactor (CO₂ + H₂ → CH₄ + H₂O)",
    category: "atmosphere",
    description: "Reacts CO₂ with H₂ to produce methane and water. Recovers water and reduces CO₂ buildup.",
    efficiency: 94,
    powerRequirement: 0.3,
    massPerPerson: 40,
    trl: 9,
    advantages: [
      "Proven on ISS",
      "Recovers water from CO₂",
      "Reduces CO₂ levels",
      "Methane can be vented or used as fuel",
      "Closed-loop with electrolysis"
    ],
    disadvantages: [
      "Requires hydrogen input",
      "Produces methane (must be vented or stored)",
      "Moderate power consumption",
      "Requires maintenance",
      "Not 100% efficient (some loss)"
    ]
  },
  {
    id: "water_recycling_urine",
    name: "Urine Processor Assembly (UPA)",
    category: "water",
    description: "Recovers water from urine through distillation and filtration. Used on ISS.",
    efficiency: 85,
    powerRequirement: 0.4,
    massPerPerson: 60,
    trl: 9,
    advantages: [
      "Proven on ISS",
      "Recovers significant water (85%)",
      "Reduces water resupply needs",
      "Well-understood technology",
      "Reliable"
    ],
    disadvantages: [
      "15% water loss",
      "Requires frequent maintenance",
      "Produces brine waste",
      "High power consumption",
      "Psychological barrier (drinking recycled urine)"
    ]
  },
  {
    id: "water_recycling_humidity",
    name: "Humidity Condensate Recovery",
    category: "water",
    description: "Captures water vapor from air (breathing, sweating) and condenses it for reuse.",
    efficiency: 95,
    powerRequirement: 0.2,
    massPerPerson: 30,
    trl: 9,
    advantages: [
      "Proven on ISS",
      "High efficiency (95%)",
      "Low power consumption",
      "Simple and reliable",
      "No psychological barrier"
    ],
    disadvantages: [
      "Requires air circulation",
      "Filters need replacement",
      "Limited water recovery (only from humidity)",
      "Cannot recover all water needs alone",
      "Requires maintenance"
    ]
  },
  {
    id: "hydroponics",
    name: "Hydroponic Food Production",
    category: "food",
    description: "Grows plants in nutrient-rich water without soil. Provides fresh food and oxygen.",
    efficiency: 50,
    powerRequirement: 2.0,
    massPerPerson: 200,
    trl: 7,
    advantages: [
      "Fresh food (psychological benefit)",
      "Produces oxygen",
      "Recycles CO₂",
      "Reduces food resupply",
      "Can grow variety of crops"
    ],
    disadvantages: [
      "High power consumption (lighting)",
      "Requires significant space",
      "Labor-intensive",
      "Only 50% self-sufficiency (still need resupply)",
      "Pest and disease management challenges"
    ]
  },
  {
    id: "aeroponic_farming",
    name: "Aeroponic Food Production",
    category: "food",
    description: "Grows plants in air/mist environment with nutrient spray. More efficient than hydroponics.",
    efficiency: 70,
    powerRequirement: 1.5,
    massPerPerson: 150,
    trl: 6,
    advantages: [
      "Higher efficiency than hydroponics",
      "Uses less water",
      "Faster plant growth",
      "Produces oxygen",
      "Recycles CO₂"
    ],
    disadvantages: [
      "Less proven than hydroponics",
      "Requires precise control",
      "High power consumption",
      "Complex system",
      "Requires significant space"
    ]
  },
  {
    id: "waste_incineration",
    name: "Waste Incineration and Gasification",
    category: "waste",
    description: "Burns solid waste at high temperature, producing ash and gases. Reduces waste volume by 95%.",
    efficiency: 95,
    powerRequirement: 1.0,
    massPerPerson: 100,
    trl: 8,
    advantages: [
      "Reduces waste volume by 95%",
      "Sterilizes waste",
      "Can recover some water vapor",
      "Produces heat (can be used for power)",
      "Handles variety of waste types"
    ],
    disadvantages: [
      "High power consumption",
      "Produces toxic gases (must be scrubbed)",
      "Requires oxygen",
      "Heavy equipment",
      "Maintenance intensive"
    ]
  },
  {
    id: "composting_bioreactor",
    name: "Biological Composting Bioreactor",
    category: "waste",
    description: "Uses microorganisms to break down organic waste into compost for agriculture.",
    efficiency: 80,
    powerRequirement: 0.5,
    massPerPerson: 80,
    trl: 7,
    advantages: [
      "Produces useful compost for agriculture",
      "Low power consumption",
      "Natural process",
      "Recycles nutrients",
      "Reduces waste volume"
    ],
    disadvantages: [
      "Slow process (weeks)",
      "Requires careful management",
      "Odor control challenges",
      "Not suitable for all waste types",
      "Requires space"
    ]
  }
];

export interface RadiationShieldingCalculator {
  material: string;
  thickness: number; // cm
  shieldingEffectiveness: number; // % reduction
  mass: number; // kg/m²
}

export function calculateRadiationShielding(
  environment: string,
  material: string,
  thickness: number
): RadiationShieldingCalculator {
  const env = spaceEnvironments.find(e => e.id === environment);
  const mat = spaceMaterials.find(m => m.id === material);
  
  if (!env || !mat) {
    return {
      material,
      thickness,
      shieldingEffectiveness: 0,
      mass: 0
    };
  }

  // Simplified shielding calculation (real calculation is much more complex)
  let shieldingFactor = 0;
  
  if (mat.radiationShielding === "excellent") {
    shieldingFactor = 0.15; // 15% reduction per cm
  } else if (mat.radiationShielding === "good") {
    shieldingFactor = 0.10;
  } else if (mat.radiationShielding === "fair") {
    shieldingFactor = 0.05;
  } else {
    shieldingFactor = 0.02;
  }

  const effectiveness = Math.min(95, thickness * shieldingFactor * 100);
  const mass = (mat.density * thickness) / 100; // kg/m²

  return {
    material,
    thickness,
    shieldingEffectiveness: effectiveness,
    mass
  };
}

export interface PowerSystem {
  id: string;
  name: string;
  type: "solar" | "nuclear_fission" | "nuclear_fusion" | "rtg" | "fuel_cell";
  powerOutput: number; // kW
  mass: number; // kg
  efficiency: number; // %
  lifespan: number; // years
  suitableEnvironments: string[];
  advantages: string[];
  disadvantages: string[];
}

export const powerSystems: PowerSystem[] = [
  {
    id: "solar_panels",
    name: "Photovoltaic Solar Arrays",
    type: "solar",
    powerOutput: 100,
    mass: 500,
    efficiency: 30,
    lifespan: 15,
    suitableEnvironments: ["moon", "mars", "leo", "lagrange_l5"],
    advantages: [
      "Proven technology",
      "No fuel required",
      "Scalable",
      "Low maintenance",
      "Safe"
    ],
    disadvantages: [
      "Requires sunlight (not suitable for deep space or polar regions)",
      "Degrades over time",
      "Dust accumulation (Moon/Mars)",
      "Large surface area required",
      "No power during night (requires batteries)"
    ]
  },
  {
    id: "kilopower_reactor",
    name: "Kilopower Nuclear Fission Reactor",
    type: "nuclear_fission",
    powerOutput: 10,
    mass: 1500,
    efficiency: 30,
    lifespan: 10,
    suitableEnvironments: ["moon", "mars", "asteroid", "europa", "titan"],
    advantages: [
      "Continuous power (day and night)",
      "Compact and high power density",
      "Works in any environment",
      "Proven technology (NASA Kilopower)",
      "Long operational life"
    ],
    disadvantages: [
      "Radioactive (safety concerns)",
      "Heavy",
      "Requires shielding",
      "Complex deployment",
      "Public perception challenges"
    ]
  },
  {
    id: "fusion_reactor",
    name: "Compact Fusion Reactor",
    type: "nuclear_fusion",
    powerOutput: 1000,
    mass: 10000,
    efficiency: 40,
    lifespan: 30,
    suitableEnvironments: ["lagrange_l5", "deep_space"],
    advantages: [
      "Extremely high power output",
      "Minimal radioactive waste",
      "Fuel is abundant (deuterium, helium-3)",
      "Long operational life",
      "Suitable for large-scale settlements"
    ],
    disadvantages: [
      "Not yet proven (TRL 4-5)",
      "Extremely complex",
      "Very heavy",
      "Expensive",
      "Requires advanced technology"
    ]
  },
  {
    id: "rtg",
    name: "Radioisotope Thermoelectric Generator (RTG)",
    type: "rtg",
    powerOutput: 0.5,
    mass: 50,
    efficiency: 7,
    lifespan: 50,
    suitableEnvironments: ["asteroid", "europa", "titan", "deep_space"],
    advantages: [
      "Extremely long life (50+ years)",
      "Works in any environment",
      "No moving parts",
      "Proven (Voyager, Curiosity)",
      "Compact"
    ],
    disadvantages: [
      "Very low power output",
      "Radioactive (plutonium-238)",
      "Expensive (limited plutonium supply)",
      "Requires shielding",
      "Not scalable for large habitats"
    ]
  }
];

