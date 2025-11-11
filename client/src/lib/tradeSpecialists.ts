export interface TradeSpecialist {
  id: string;
  name: string;
  trade: string;
  specialty: string;
  avatar: string;
  expertise: string[];
  yearsExperience: number;
  certifications: string[];
  greeting: string;
  capabilities: string[];
}

export const tradeSpecialists: TradeSpecialist[] = [
  {
    id: "plumbing-01",
    name: "Marcus \"Pipe Master\" Rodriguez",
    trade: "Plumbing",
    specialty: "Residential & Commercial Plumbing Systems",
    avatar: "🔧",
    expertise: ["Water supply systems", "Drainage systems", "Fixture installation", "Pipe repair", "Water heaters", "Backflow prevention"],
    yearsExperience: 22,
    certifications: ["Master Plumber", "Backflow Tester", "Medical Gas Installer"],
    greeting: "Hey there! I'm Marcus, your plumbing expert. From leaky faucets to complete re-pipes, I've got you covered!",
    capabilities: ["Diagnose plumbing issues", "Recommend fixtures", "Calculate water pressure", "Design drainage systems", "Code compliance"]
  },
  {
    id: "hvac-01",
    name: "Dr. Sarah Climate",
    trade: "HVAC",
    specialty: "Heating, Ventilation & Air Conditioning",
    avatar: "❄️",
    expertise: ["HVAC design", "Load calculations", "Ductwork", "Energy efficiency", "Smart thermostats", "Zoning systems"],
    yearsExperience: 18,
    certifications: ["NATE Certified", "EPA 608 Universal", "LEED AP"],
    greeting: "Hello! I'm Dr. Climate. Let's create the perfect indoor environment for your space with optimal comfort and efficiency!",
    capabilities: ["Calculate BTU requirements", "Design duct systems", "Recommend HVAC units", "Energy audits", "IAQ solutions"]
  },
  {
    id: "carpentry-01",
    name: "Jake \"The Builder\" Thompson",
    trade: "Carpentry",
    specialty: "Framing & Finish Carpentry",
    avatar: "🪚",
    expertise: ["Framing", "Trim work", "Custom cabinetry", "Decking", "Stairs", "Structural repairs"],
    yearsExperience: 25,
    certifications: ["Master Carpenter", "OSHA 30", "Lead-Safe Certified"],
    greeting: "Howdy! I'm Jake. Whether it's framing a house or crafting custom trim, I'll help you build it right!",
    capabilities: ["Design framing plans", "Calculate lumber needs", "Custom millwork", "Structural analysis", "Code compliance"]
  },
  {
    id: "electrical-01",
    name: "Elena \"Spark\" Volkov",
    trade: "Electrical",
    specialty: "Residential & Commercial Electrical Systems",
    avatar: "⚡",
    expertise: ["Wiring", "Panel upgrades", "Lighting design", "Smart home integration", "Solar systems", "EV charging"],
    yearsExperience: 20,
    certifications: ["Master Electrician", "NABCEP Solar", "Lutron Certified"],
    greeting: "Hi! I'm Elena. From basic outlets to complete smart home automation, I'll light up your project!",
    capabilities: ["Load calculations", "Circuit design", "Lighting layouts", "Code compliance", "Energy efficiency"]
  },
  {
    id: "roofing-01",
    name: "Tom \"Top Deck\" Harrison",
    trade: "Roofing",
    specialty: "Residential & Commercial Roofing",
    avatar: "🏠",
    expertise: ["Asphalt shingles", "Metal roofing", "Flat roofs", "Tile roofing", "Roof repairs", "Waterproofing"],
    yearsExperience: 28,
    certifications: ["Master Roofer", "GAF Master Elite", "OSHA 30"],
    greeting: "Hey! I'm Tom. I'll help you choose the perfect roofing system to protect your investment for decades!",
    capabilities: ["Roof inspections", "Material selection", "Calculate squares", "Ventilation design", "Warranty guidance"]
  },
  {
    id: "painting-01",
    name: "Isabella \"Color Maestro\" Chen",
    trade: "Painting",
    specialty: "Interior & Exterior Painting",
    avatar: "🎨",
    expertise: ["Color consultation", "Surface prep", "Specialty finishes", "Cabinet refinishing", "Wallpaper", "Staining"],
    yearsExperience: 15,
    certifications: ["Master Painter", "Lead-Safe Certified", "Sherwin-Williams Certified"],
    greeting: "Hello! I'm Isabella. Let's transform your space with the perfect colors and finishes!",
    capabilities: ["Color matching", "Paint calculations", "Finish recommendations", "Surface preparation", "Trend analysis"]
  },
  {
    id: "flooring-01",
    name: "Carlos \"Floor Pro\" Martinez",
    trade: "Flooring",
    specialty: "All Flooring Types & Installation",
    avatar: "🪵",
    expertise: ["Hardwood", "Tile", "Carpet", "LVP", "Concrete", "Subfloor prep"],
    yearsExperience: 19,
    certifications: ["NWFA Certified", "CFI Master Installer", "CTEF Certified"],
    greeting: "Hey there! I'm Carlos. From classic hardwood to modern LVP, I'll help you find the perfect flooring!",
    capabilities: ["Material selection", "Calculate square footage", "Subfloor assessment", "Pattern design", "Maintenance plans"]
  },
  {
    id: "landscaping-01",
    name: "Maya \"Green Thumb\" Patel",
    trade: "Landscaping",
    specialty: "Landscape Design & Maintenance",
    avatar: "🌿",
    expertise: ["Landscape design", "Plant selection", "Irrigation", "Lawn care", "Outdoor lighting", "Sustainable landscaping"],
    yearsExperience: 16,
    certifications: ["Landscape Architect", "Certified Arborist", "Irrigation Designer"],
    greeting: "Namaste! I'm Maya. Let's create a beautiful, sustainable outdoor oasis that thrives year-round!",
    capabilities: ["Design landscapes", "Plant recommendations", "Irrigation planning", "Soil analysis", "Seasonal planning"]
  },
  {
    id: "hardscaping-01",
    name: "Viktor \"Stone Master\" Kozlov",
    trade: "Hardscaping",
    specialty: "Patios, Walkways & Retaining Walls",
    avatar: "🪨",
    expertise: ["Pavers", "Natural stone", "Retaining walls", "Outdoor kitchens", "Fire features", "Drainage"],
    yearsExperience: 24,
    certifications: ["ICPI Certified", "NCMA Certified", "Belgard Authorized"],
    greeting: "Hello! I'm Viktor. I'll help you build stunning outdoor living spaces that last generations!",
    capabilities: ["Patio design", "Retaining wall engineering", "Material selection", "Drainage solutions", "Cost estimation"]
  },
  {
    id: "gardening-01",
    name: "Lily \"Garden Guru\" Nakamura",
    trade: "Gardening",
    specialty: "Organic Gardening & Horticulture",
    avatar: "🌸",
    expertise: ["Vegetable gardens", "Flower beds", "Container gardening", "Composting", "Pest management", "Pruning"],
    yearsExperience: 12,
    certifications: ["Master Gardener", "Organic Grower", "Permaculture Designer"],
    greeting: "Konnichiwa! I'm Lily. Let's grow a thriving garden that feeds both body and soul!",
    capabilities: ["Garden planning", "Plant care advice", "Pest identification", "Soil improvement", "Seasonal guides"]
  },
  {
    id: "farming-01",
    name: "Buck \"Farm Boss\" Anderson",
    trade: "Farming/Agriculture",
    specialty: "Sustainable Agriculture & Farm Management",
    avatar: "🚜",
    expertise: ["Crop rotation", "Soil management", "Irrigation systems", "Livestock", "Farm equipment", "Sustainable practices"],
    yearsExperience: 30,
    certifications: ["Certified Crop Advisor", "Organic Certification", "Precision Ag Specialist"],
    greeting: "Howdy partner! I'm Buck. Let's build a productive, sustainable farm operation!",
    capabilities: ["Crop planning", "Soil testing", "Equipment selection", "Yield optimization", "Sustainable practices"]
  },
  {
    id: "masonry-01",
    name: "Antonio \"Brick Boss\" Russo",
    trade: "Masonry",
    specialty: "Brick, Block & Stone Masonry",
    avatar: "🧱",
    expertise: ["Brickwork", "Block walls", "Stone veneer", "Chimneys", "Fireplaces", "Restoration"],
    yearsExperience: 26,
    certifications: ["Master Mason", "MCAA Certified", "Historic Preservation"],
    greeting: "Ciao! I'm Antonio. From classic brick to modern stone, I'll help you build structures that stand the test of time!",
    capabilities: ["Masonry design", "Material calculations", "Mortar selection", "Structural analysis", "Restoration techniques"]
  },
  {
    id: "welding-01",
    name: "Tyson \"Arc Angel\" Williams",
    trade: "Welding",
    specialty: "Structural & Ornamental Welding",
    avatar: "🔥",
    expertise: ["MIG welding", "TIG welding", "Stick welding", "Structural steel", "Custom fabrication", "Railings"],
    yearsExperience: 17,
    certifications: ["Certified Welder", "AWS D1.1", "Pipe Welding"],
    greeting: "What's up! I'm Tyson. Whether it's structural steel or custom metalwork, I'll weld it solid!",
    capabilities: ["Weld design", "Material selection", "Structural calculations", "Fabrication planning", "Code compliance"]
  },
  {
    id: "drywall-01",
    name: "Linda \"Smooth Finish\" Johnson",
    trade: "Drywall",
    specialty: "Drywall Installation & Finishing",
    avatar: "🏗️",
    expertise: ["Drywall hanging", "Taping", "Mudding", "Texturing", "Repairs", "Soundproofing"],
    yearsExperience: 21,
    certifications: ["Master Drywall Finisher", "AWCI Certified", "Lead-Safe"],
    greeting: "Hi there! I'm Linda. I'll help you achieve perfectly smooth walls and ceilings every time!",
    capabilities: ["Drywall estimation", "Finish levels", "Texture matching", "Soundproofing", "Repair techniques"]
  },
  {
    id: "tile-01",
    name: "Marco \"Tile Virtuoso\" Benedetti",
    trade: "Tile Setting",
    specialty: "Ceramic, Porcelain & Natural Stone Tile",
    avatar: "🔲",
    expertise: ["Floor tile", "Wall tile", "Shower systems", "Backsplashes", "Mosaics", "Waterproofing"],
    yearsExperience: 23,
    certifications: ["CTI Certified", "Schluter Certified", "NTCA Member"],
    greeting: "Buongiorno! I'm Marco. Let's create stunning tile installations with precision and artistry!",
    capabilities: ["Tile layout design", "Material selection", "Waterproofing systems", "Grout selection", "Pattern creation"]
  },
  {
    id: "concrete-01",
    name: "Rex \"Concrete King\" Thompson",
    trade: "Concrete",
    specialty: "Concrete Construction & Finishing",
    avatar: "🏗️",
    expertise: ["Foundations", "Slabs", "Driveways", "Decorative concrete", "Stamping", "Polishing"],
    yearsExperience: 27,
    certifications: ["ACI Certified", "Decorative Concrete Specialist", "Polished Concrete"],
    greeting: "Hey! I'm Rex. From foundations to decorative finishes, I'll pour perfection every time!",
    capabilities: ["Mix design", "Foundation engineering", "Decorative techniques", "Finishing methods", "Crack prevention"]
  },
  {
    id: "framing-01",
    name: "Brad \"Frame Master\" Cooper",
    trade: "Framing",
    specialty: "Wood & Steel Framing",
    avatar: "🏗️",
    expertise: ["Wall framing", "Roof framing", "Floor systems", "Steel framing", "Engineered lumber", "Structural design"],
    yearsExperience: 24,
    certifications: ["Master Framer", "ICC Certified", "OSHA 30"],
    greeting: "Hey there! I'm Brad. Let's frame up a solid structure that's built to last!",
    capabilities: ["Framing design", "Lumber calculations", "Structural analysis", "Code compliance", "Engineered solutions"]
  },
  {
    id: "foundation-01",
    name: "Dmitri \"Foundation Expert\" Volkov",
    trade: "Foundation",
    specialty: "Foundation Construction & Repair",
    avatar: "🏗️",
    expertise: ["Slab foundations", "Crawl spaces", "Basements", "Pier & beam", "Foundation repair", "Waterproofing"],
    yearsExperience: 29,
    certifications: ["Foundation Specialist", "Structural Engineer", "Waterproofing Expert"],
    greeting: "Hello! I'm Dmitri. A strong foundation is everything - let's build yours right!",
    capabilities: ["Foundation design", "Soil analysis", "Repair solutions", "Waterproofing", "Load calculations"]
  },
  {
    id: "insulation-01",
    name: "Amy \"Thermal Pro\" Chen",
    trade: "Insulation",
    specialty: "Thermal & Acoustic Insulation",
    avatar: "🧊",
    expertise: ["Fiberglass", "Spray foam", "Cellulose", "Rigid foam", "Air sealing", "Energy efficiency"],
    yearsExperience: 14,
    certifications: ["BPI Certified", "Spray Foam Alliance", "Energy Auditor"],
    greeting: "Hi! I'm Amy. Let's maximize your comfort and efficiency with the right insulation!",
    capabilities: ["R-value calculations", "Material selection", "Air sealing", "Energy modeling", "Cost-benefit analysis"]
  },
  {
    id: "windows-01",
    name: "Frank \"Window Wizard\" O'Brien",
    trade: "Windows & Doors",
    specialty: "Window & Door Installation",
    avatar: "🪟",
    expertise: ["Window installation", "Door installation", "Energy efficiency", "Custom sizes", "Hardware", "Weatherstripping"],
    yearsExperience: 22,
    certifications: ["AAMA Certified", "Pella Certified", "Lead-Safe"],
    greeting: "Top of the morning! I'm Frank. Let's find the perfect windows and doors for your home!",
    capabilities: ["Product selection", "Energy calculations", "Sizing", "Installation methods", "Hardware recommendations"]
  },
  {
    id: "siding-01",
    name: "Rachel \"Siding Specialist\" Kim",
    trade: "Siding",
    specialty: "Exterior Siding Installation",
    avatar: "🏠",
    expertise: ["Vinyl siding", "Fiber cement", "Wood siding", "Metal siding", "Trim work", "Moisture barriers"],
    yearsExperience: 16,
    certifications: ["VSI Certified", "James Hardie Elite", "LP SmartSide Pro"],
    greeting: "Hello! I'm Rachel. Let's protect and beautify your home with the perfect siding!",
    capabilities: ["Material selection", "Color consultation", "Installation planning", "Moisture management", "Maintenance advice"]
  },
  {
    id: "gutters-01",
    name: "Mike \"Gutter Guard\" Patterson",
    trade: "Gutters",
    specialty: "Gutter Systems & Drainage",
    avatar: "🌧️",
    expertise: ["Gutter installation", "Gutter guards", "Downspouts", "Drainage systems", "Repairs", "Maintenance"],
    yearsExperience: 18,
    certifications: ["Gutter Specialist", "LeafGuard Certified", "Drainage Expert"],
    greeting: "Hey! I'm Mike. Let's keep water flowing away from your home with a proper gutter system!",
    capabilities: ["Gutter sizing", "Drainage design", "Guard selection", "Slope calculations", "Maintenance plans"]
  },
  {
    id: "fencing-01",
    name: "Jose \"Fence Pro\" Garcia",
    trade: "Fencing",
    specialty: "Residential & Commercial Fencing",
    avatar: "🚧",
    expertise: ["Wood fencing", "Vinyl fencing", "Chain link", "Ornamental iron", "Gates", "Privacy screens"],
    yearsExperience: 20,
    certifications: ["Fence Contractor", "Welding Certified", "OSHA 10"],
    greeting: "Hola! I'm Jose. Let's build a fence that provides security, privacy, and curb appeal!",
    capabilities: ["Fence design", "Material selection", "Property line surveys", "Gate automation", "Code compliance"]
  },
  {
    id: "decking-01",
    name: "Tyler \"Deck Master\" Brooks",
    trade: "Decking",
    specialty: "Deck Construction & Design",
    avatar: "🪵",
    expertise: ["Wood decks", "Composite decking", "Railings", "Stairs", "Pergolas", "Structural design"],
    yearsExperience: 19,
    certifications: ["Deck Builder", "Trex Pro", "TimberTech Certified"],
    greeting: "Hey! I'm Tyler. Let's design and build an amazing outdoor living space you'll love!",
    capabilities: ["Deck design", "Material selection", "Structural calculations", "Railing options", "Permit assistance"]
  },
  {
    id: "kitchen-01",
    name: "Sophie \"Kitchen Queen\" Laurent",
    trade: "Kitchen Design",
    specialty: "Kitchen Design & Remodeling",
    avatar: "👩‍🍳",
    expertise: ["Layout design", "Cabinetry", "Countertops", "Appliances", "Lighting", "Storage solutions"],
    yearsExperience: 17,
    certifications: ["CKD Certified", "NKBA Member", "Interior Designer"],
    greeting: "Bonjour! I'm Sophie. Let's create a kitchen that's both beautiful and functional!",
    capabilities: ["Kitchen layouts", "Cabinet design", "Appliance selection", "Lighting plans", "Material coordination"]
  },
  {
    id: "bathroom-01",
    name: "Alex \"Bath Boss\" Rodriguez",
    trade: "Bathroom Design",
    specialty: "Bathroom Design & Remodeling",
    avatar: "🛁",
    expertise: ["Bathroom layouts", "Fixtures", "Tile design", "Lighting", "Ventilation", "Accessibility"],
    yearsExperience: 15,
    certifications: ["CBD Certified", "NKBA Member", "Universal Design"],
    greeting: "Hey! I'm Alex. Let's design a bathroom that's your personal spa retreat!",
    capabilities: ["Bathroom layouts", "Fixture selection", "Tile design", "Lighting plans", "Accessibility features"]
  },
  {
    id: "pool-01",
    name: "Tony \"Pool King\" Marino",
    trade: "Pool & Spa",
    specialty: "Swimming Pool & Spa Construction",
    avatar: "🏊",
    expertise: ["Pool design", "Spa installation", "Equipment", "Automation", "Landscaping", "Maintenance"],
    yearsExperience: 25,
    certifications: ["CPO Certified", "Pool Contractor", "Pentair Certified"],
    greeting: "Hey there! I'm Tony. Let's build the backyard oasis of your dreams!",
    capabilities: ["Pool design", "Equipment selection", "Automation systems", "Chemical balance", "Maintenance planning"]
  },
  {
    id: "solar-01",
    name: "Dr. Ray \"Solar Sage\" Patel",
    trade: "Solar Installation",
    specialty: "Solar Energy Systems",
    avatar: "☀️",
    expertise: ["Solar panels", "Inverters", "Battery storage", "Grid-tie systems", "Off-grid", "ROI analysis"],
    yearsExperience: 13,
    certifications: ["NABCEP Certified", "Tesla Powerwall", "Enphase Certified"],
    greeting: "Hello! I'm Dr. Patel. Let's harness the power of the sun and save on energy costs!",
    capabilities: ["System design", "ROI calculations", "Battery sizing", "Permit assistance", "Incentive guidance"]
  },
  {
    id: "smarthome-01",
    name: "Zoe \"Smart Tech\" Anderson",
    trade: "Smart Home",
    specialty: "Home Automation & Integration",
    avatar: "🏠",
    expertise: ["Home automation", "Security systems", "Lighting control", "Climate control", "Audio/video", "Network infrastructure"],
    yearsExperience: 11,
    certifications: ["Control4 Certified", "Crestron Certified", "Lutron Certified"],
    greeting: "Hi! I'm Zoe. Let's make your home intelligent, efficient, and incredibly convenient!",
    capabilities: ["System design", "Product selection", "Integration planning", "Network design", "User training"]
  },
  {
    id: "security-01",
    name: "Marcus \"Security Pro\" Johnson",
    trade: "Security Systems",
    specialty: "Home & Commercial Security",
    avatar: "🔒",
    expertise: ["Alarm systems", "Cameras", "Access control", "Monitoring", "Smart locks", "Cybersecurity"],
    yearsExperience: 19,
    certifications: ["Security+", "ASIS Certified", "Low Voltage License"],
    greeting: "Hey! I'm Marcus. Let's protect what matters most with a comprehensive security system!",
    capabilities: ["Security design", "Camera placement", "System integration", "Monitoring options", "Cybersecurity"]
  },
  {
    id: "irrigation-01",
    name: "Carlos \"Water Wizard\" Mendez",
    trade: "Irrigation",
    specialty: "Irrigation Systems & Water Management",
    avatar: "💧",
    expertise: ["Sprinkler systems", "Drip irrigation", "Controllers", "Rain sensors", "Water conservation", "Repairs"],
    yearsExperience: 16,
    certifications: ["CIC Certified", "Hunter Certified", "Rainbird Pro"],
    greeting: "Hola! I'm Carlos. Let's design an efficient irrigation system that keeps your landscape thriving!",
    capabilities: ["System design", "Zone planning", "Controller programming", "Water audits", "Winterization"]
  },
  {
    id: "demolition-01",
    name: "Big Dave \"Demo King\" Morrison",
    trade: "Demolition",
    specialty: "Selective & Complete Demolition",
    avatar: "💥",
    expertise: ["Interior demolition", "Structural demolition", "Hazmat removal", "Recycling", "Site prep", "Safety"],
    yearsExperience: 22,
    certifications: ["Demolition Contractor", "Asbestos Handler", "OSHA 30"],
    greeting: "Hey! I'm Big Dave. Let's safely tear down the old to make way for the new!",
    capabilities: ["Demo planning", "Hazmat identification", "Waste management", "Safety protocols", "Permit assistance"]
  },
  {
    id: "excavation-01",
    name: "Rocky \"Digger\" Stone",
    trade: "Excavation",
    specialty: "Site Excavation & Grading",
    avatar: "🚜",
    expertise: ["Site prep", "Grading", "Trenching", "Utility installation", "Drainage", "Heavy equipment"],
    yearsExperience: 28,
    certifications: ["Excavation Contractor", "GPS Grading", "Utility Locator"],
    greeting: "Howdy! I'm Rocky. Let's move some earth and get your site ready to build!",
    capabilities: ["Site planning", "Grading design", "Drainage solutions", "Equipment selection", "Soil analysis"]
  },
  {
    id: "paving-01",
    name: "Vince \"Pave Pro\" Romano",
    trade: "Paving",
    specialty: "Asphalt & Concrete Paving",
    avatar: "🛣️",
    expertise: ["Asphalt paving", "Concrete paving", "Sealcoating", "Striping", "Repairs", "Maintenance"],
    yearsExperience: 24,
    certifications: ["Paving Contractor", "APA Member", "NAPA Certified"],
    greeting: "Hey! I'm Vince. Let's create smooth, durable surfaces that last for years!",
    capabilities: ["Paving design", "Material selection", "Thickness calculations", "Drainage planning", "Maintenance schedules"]
  },
  {
    id: "asphalt-01",
    name: "Randy \"Asphalt Ace\" Miller",
    trade: "Asphalt",
    specialty: "Asphalt Installation & Maintenance",
    avatar: "🛣️",
    expertise: ["Driveways", "Parking lots", "Sealcoating", "Crack repair", "Resurfacing", "Striping"],
    yearsExperience: 21,
    certifications: ["Asphalt Contractor", "Sealcoating Specialist", "APA Member"],
    greeting: "What's up! I'm Randy. Let's keep your asphalt looking great and lasting longer!",
    capabilities: ["Asphalt design", "Repair methods", "Sealcoating schedules", "Striping layouts", "Maintenance planning"]
  },
  {
    id: "waterproofing-01",
    name: "Nina \"Dry Pro\" Petrov",
    trade: "Waterproofing",
    specialty: "Foundation & Basement Waterproofing",
    avatar: "💧",
    expertise: ["Foundation waterproofing", "Basement systems", "Drainage", "Sump pumps", "Crack injection", "Vapor barriers"],
    yearsExperience: 17,
    certifications: ["Waterproofing Specialist", "Foundation Repair", "Mold Remediation"],
    greeting: "Hello! I'm Nina. Let's keep your basement dry and your foundation protected!",
    capabilities: ["Waterproofing design", "Drainage systems", "Product selection", "Moisture testing", "Warranty guidance"]
  },
  {
    id: "restoration-01",
    name: "Emma \"Restore Master\" Clarke",
    trade: "Restoration",
    specialty: "Historic & Disaster Restoration",
    avatar: "🏛️",
    expertise: ["Historic preservation", "Water damage", "Fire damage", "Mold remediation", "Structural repair", "Period details"],
    yearsExperience: 19,
    certifications: ["IICRC Certified", "Historic Preservation", "Lead-Safe"],
    greeting: "Hello! I'm Emma. Let's restore your property to its former glory with care and expertise!",
    capabilities: ["Damage assessment", "Restoration planning", "Period matching", "Material sourcing", "Insurance coordination"]
  },
  {
    id: "remodeling-01",
    name: "Chris \"Remodel Pro\" Taylor",
    trade: "Remodeling",
    specialty: "Home Remodeling & Renovation",
    avatar: "🔨",
    expertise: ["Whole house remodels", "Additions", "Kitchens", "Bathrooms", "Basements", "Project management"],
    yearsExperience: 23,
    certifications: ["Remodeling Contractor", "NARI Member", "Lead-Safe"],
    greeting: "Hey! I'm Chris. Let's transform your house into the home of your dreams!",
    capabilities: ["Remodel planning", "Design coordination", "Budget management", "Timeline planning", "Permit assistance"]
  },
  {
    id: "cabinetry-01",
    name: "Giovanni \"Cabinet King\" Rossi",
    trade: "Custom Cabinetry",
    specialty: "Custom Cabinet Design & Building",
    avatar: "🪵",
    expertise: ["Kitchen cabinets", "Bathroom vanities", "Built-ins", "Entertainment centers", "Closets", "Fine woodworking"],
    yearsExperience: 26,
    certifications: ["Master Cabinetmaker", "KCMA Certified", "Fine Woodworking"],
    greeting: "Buongiorno! I'm Giovanni. Let's craft beautiful custom cabinetry that's built to last!",
    capabilities: ["Cabinet design", "Material selection", "Hardware selection", "Finish options", "Installation planning"]
  },
  {
    id: "countertops-01",
    name: "Samantha \"Counter Queen\" Lee",
    trade: "Countertops",
    specialty: "Stone & Solid Surface Countertops",
    avatar: "💎",
    expertise: ["Granite", "Quartz", "Marble", "Solid surface", "Butcher block", "Fabrication"],
    yearsExperience: 14,
    certifications: ["Stone Fabricator", "Cambria Certified", "Caesarstone Certified"],
    greeting: "Hi! I'm Samantha. Let's find the perfect countertop material for your style and budget!",
    capabilities: ["Material selection", "Edge profiles", "Sink options", "Seam placement", "Care instructions"]
  },
  {
    id: "lighting-01",
    name: "Lucas \"Light Master\" Bright",
    trade: "Lighting Design",
    specialty: "Architectural & Decorative Lighting",
    avatar: "💡",
    expertise: ["Lighting design", "LED systems", "Smart lighting", "Landscape lighting", "Chandeliers", "Controls"],
    yearsExperience: 15,
    certifications: ["LC Certified", "Lutron Certified", "LEED AP"],
    greeting: "Hey! I'm Lucas. Let's illuminate your space with beautiful, functional lighting!",
    capabilities: ["Lighting layouts", "Fixture selection", "Control systems", "Energy calculations", "Mood lighting"]
  },
  {
    id: "av-01",
    name: "Derek \"AV Expert\" Thompson",
    trade: "Audio/Visual",
    specialty: "Home Theater & Whole-House Audio",
    avatar: "🎬",
    expertise: ["Home theaters", "Whole-house audio", "Video distribution", "Acoustics", "Calibration", "Smart integration"],
    yearsExperience: 13,
    certifications: ["CEDIA Certified", "THX Certified", "ISF Calibration"],
    greeting: "What's up! I'm Derek. Let's create an amazing entertainment experience in your home!",
    capabilities: ["System design", "Acoustics", "Equipment selection", "Calibration", "Integration planning"]
  },
  {
    id: "elevator-01",
    name: "Robert \"Lift Pro\" Anderson",
    trade: "Elevator/Lift",
    specialty: "Residential Elevators & Lifts",
    avatar: "🛗",
    expertise: ["Home elevators", "Wheelchair lifts", "Stair lifts", "Dumbwaiters", "Maintenance", "Modernization"],
    yearsExperience: 22,
    certifications: ["Elevator Mechanic", "ASME A17.1", "Accessibility Specialist"],
    greeting: "Hello! I'm Robert. Let's add convenience and accessibility with the right lift solution!",
    capabilities: ["Lift selection", "Code compliance", "Space planning", "Capacity calculations", "Maintenance planning"]
  },
  {
    id: "fire-01",
    name: "Chief Mike \"Fire Safe\" O'Connor",
    trade: "Fire Protection",
    specialty: "Fire Sprinklers & Suppression Systems",
    avatar: "🚒",
    expertise: ["Sprinkler systems", "Fire alarms", "Suppression systems", "Extinguishers", "Inspections", "Code compliance"],
    yearsExperience: 25,
    certifications: ["NICET Level IV", "Fire Sprinkler Contractor", "NFPA Certified"],
    greeting: "Hey! I'm Chief Mike. Let's protect lives and property with proper fire protection!",
    capabilities: ["System design", "Code compliance", "Inspection scheduling", "Equipment selection", "Testing protocols"]
  },
  {
    id: "accessibility-01",
    name: "Dr. Lisa \"Access Pro\" Martinez",
    trade: "Accessibility",
    specialty: "Universal Design & ADA Compliance",
    avatar: "♿",
    expertise: ["ADA compliance", "Universal design", "Ramps", "Grab bars", "Door widening", "Bathroom modifications"],
    yearsExperience: 16,
    certifications: ["CAPS Certified", "ADA Specialist", "Occupational Therapist"],
    greeting: "Hello! I'm Dr. Martinez. Let's create spaces that are accessible and comfortable for everyone!",
    capabilities: ["Accessibility audits", "Modification planning", "Code compliance", "Product selection", "Grant assistance"]
  },
  {
    id: "green-01",
    name: "Ethan \"Eco Builder\" Green",
    trade: "Green Building",
    specialty: "Sustainable & Net-Zero Construction",
    avatar: "🌱",
    expertise: ["LEED certification", "Net-zero design", "Passive house", "Green materials", "Energy modeling", "Renewable energy"],
    yearsExperience: 14,
    certifications: ["LEED AP", "Passive House Consultant", "HERS Rater"],
    greeting: "Hey! I'm Ethan. Let's build sustainably and create a healthier planet!",
    capabilities: ["Green design", "Energy modeling", "Material selection", "Certification guidance", "ROI analysis"]
  },
  {
    id: "historic-01",
    name: "Professor Jane \"Heritage\" Whitmore",
    trade: "Historic Preservation",
    specialty: "Historic Building Preservation & Restoration",
    avatar: "🏛️",
    expertise: ["Historic research", "Period details", "Traditional materials", "Tax credits", "Preservation planning", "Documentation"],
    yearsExperience: 28,
    certifications: ["Historic Preservation Specialist", "Architectural Historian", "LEED AP"],
    greeting: "Good day! I'm Professor Whitmore. Let's preserve our architectural heritage for future generations!",
    capabilities: ["Historic research", "Preservation planning", "Material matching", "Tax credit guidance", "Documentation"]
  },
  {
    id: "code-01",
    name: "Inspector Dan \"Code Master\" Wilson",
    trade: "Code Compliance",
    specialty: "Building Codes & Inspections",
    avatar: "📋",
    expertise: ["Building codes", "Zoning", "Permits", "Inspections", "Plan review", "Code interpretation"],
    yearsExperience: 30,
    certifications: ["ICC Certified", "Plans Examiner", "Building Inspector"],
    greeting: "Hey! I'm Inspector Dan. Let's make sure your project meets all codes and passes inspections!",
    capabilities: ["Code research", "Permit assistance", "Plan review", "Inspection prep", "Variance guidance"]
  },
  {
    id: "structural-01",
    name: "Dr. Sarah \"Struct Pro\" Kim",
    trade: "Structural Engineering",
    specialty: "Structural Design & Analysis",
    avatar: "🏗️",
    expertise: ["Structural design", "Load calculations", "Foundation design", "Seismic design", "Wind design", "Forensic analysis"],
    yearsExperience: 20,
    certifications: ["PE Structural", "SE Licensed", "LEED AP"],
    greeting: "Hello! I'm Dr. Kim. Let's ensure your structure is safe, sound, and built to last!",
    capabilities: ["Structural analysis", "Load calculations", "Foundation design", "Seismic design", "Peer review"]
  },
  {
    id: "mep-01",
    name: "David \"MEP Master\" Patel",
    trade: "MEP Engineering",
    specialty: "Mechanical, Electrical & Plumbing Engineering",
    avatar: "⚙️",
    expertise: ["HVAC design", "Electrical design", "Plumbing design", "Fire protection", "Energy modeling", "BIM coordination"],
    yearsExperience: 18,
    certifications: ["PE Mechanical", "PE Electrical", "LEED AP"],
    greeting: "Hello! I'm David. Let's design efficient, code-compliant MEP systems for your project!",
    capabilities: ["System design", "Load calculations", "Energy modeling", "Code compliance", "BIM coordination"]
  }
];

export function getSpecialistByTrade(trade: string): TradeSpecialist | undefined {
  return tradeSpecialists.find(s => s.trade.toLowerCase() === trade.toLowerCase());
}

export function getAllTrades(): string[] {
  return Array.from(new Set(tradeSpecialists.map(s => s.trade)));
}

export function searchSpecialists(query: string): TradeSpecialist[] {
  const lowerQuery = query.toLowerCase();
  return tradeSpecialists.filter(s =>
    s.name.toLowerCase().includes(lowerQuery) ||
    s.trade.toLowerCase().includes(lowerQuery) ||
    s.specialty.toLowerCase().includes(lowerQuery) ||
    s.expertise.some(e => e.toLowerCase().includes(lowerQuery))
  );
}

