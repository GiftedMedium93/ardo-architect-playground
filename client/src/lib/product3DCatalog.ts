// 3D Product Catalog with Real-World Dimensions and Materials
// Each product corresponds to actual marketplace items with photorealistic rendering properties

export interface Product3D {
  id: string;
  name: string;
  category: 'flooring' | 'tile' | 'countertop' | 'lighting' | 'furniture' | 'fixture';
  vendor: string;
  price: number;
  
  // Real-world dimensions (in meters for Three.js)
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  
  // PBR Material Properties (Physically Based Rendering)
  material: {
    baseColor: string;          // Hex color
    roughness: number;          // 0-1 (0=mirror, 1=matte)
    metalness: number;          // 0-1 (0=dielectric, 1=metal)
    normalMap?: string;         // URL to normal map texture
    roughnessMap?: string;      // URL to roughness map
    metalnessMap?: string;      // URL to metalness map
    aoMap?: string;             // Ambient occlusion map
  };
  
  // 3D Model (if available)
  model?: {
    type: 'gltf' | 'obj' | 'fbx' | 'primitive';
    url?: string;
    primitive?: 'box' | 'sphere' | 'cylinder' | 'plane';
  };
  
  // Product specifications
  specs: {
    weight?: string;
    finish?: string;
    installation?: string;
    warranty?: string;
  };
  
  // Marketplace reference
  marketplaceId: string;
}

export const product3DCatalog: Product3D[] = [
  // FLOORING
  {
    id: 'p3d-001',
    name: 'Luxury Vinyl Plank - Oak',
    category: 'flooring',
    vendor: 'FloorMaster Pro',
    price: 3.99,
    dimensions: { width: 0.228, height: 0.003, depth: 1.219 }, // 9" x 48" x 3mm
    material: {
      baseColor: '#8B6F47',
      roughness: 0.7,
      metalness: 0.0,
    },
    model: {
      type: 'primitive',
      primitive: 'box',
    },
    specs: {
      weight: '2.5 lbs/sq ft',
      finish: 'Textured Oak',
      installation: 'Click-lock',
      warranty: '25 years residential',
    },
    marketplaceId: 'mp-001',
  },
  {
    id: 'p3d-002',
    name: 'Engineered Hardwood - Walnut',
    category: 'flooring',
    vendor: 'Premium Woods Inc',
    price: 7.50,
    dimensions: { width: 0.127, height: 0.012, depth: 1.219 }, // 5" x 48" x 1/2"
    material: {
      baseColor: '#4A3728',
      roughness: 0.4,
      metalness: 0.1,
    },
    model: {
      type: 'primitive',
      primitive: 'box',
    },
    specs: {
      weight: '3.2 lbs/sq ft',
      finish: 'Satin Walnut',
      installation: 'Nail-down or glue',
      warranty: '50 years residential',
    },
    marketplaceId: 'mp-001',
  },
  
  // TILE
  {
    id: 'p3d-003',
    name: 'Porcelain Tile 12x24 - Marble Look',
    category: 'tile',
    vendor: 'TileWorld',
    price: 4.25,
    dimensions: { width: 0.305, height: 0.008, depth: 0.610 }, // 12" x 24" x 8mm
    material: {
      baseColor: '#F5F5F0',
      roughness: 0.2,
      metalness: 0.0,
    },
    model: {
      type: 'primitive',
      primitive: 'box',
    },
    specs: {
      weight: '4.5 lbs/sq ft',
      finish: 'Polished Marble',
      installation: 'Thin-set mortar',
      warranty: 'Lifetime',
    },
    marketplaceId: 'mp-002',
  },
  {
    id: 'p3d-004',
    name: 'Glass Mosaic Tile - Ocean Blue',
    category: 'tile',
    vendor: 'TileWorld',
    price: 12.99,
    dimensions: { width: 0.305, height: 0.006, depth: 0.305 }, // 12" x 12" sheet
    material: {
      baseColor: '#4A90A4',
      roughness: 0.1,
      metalness: 0.0,
    },
    model: {
      type: 'primitive',
      primitive: 'box',
    },
    specs: {
      weight: '2.8 lbs/sq ft',
      finish: 'Glossy Glass',
      installation: 'Thin-set with mesh backing',
      warranty: '10 years',
    },
    marketplaceId: 'mp-002',
  },
  
  // COUNTERTOPS
  {
    id: 'p3d-005',
    name: 'Quartz Countertop - Calacatta',
    category: 'countertop',
    vendor: 'CounterCraft',
    price: 85.00,
    dimensions: { width: 0.610, height: 0.030, depth: 0.762 }, // 24" x 30" x 3cm slab
    material: {
      baseColor: '#FFFFFF',
      roughness: 0.15,
      metalness: 0.0,
    },
    model: {
      type: 'primitive',
      primitive: 'box',
    },
    specs: {
      weight: '18 lbs/sq ft',
      finish: 'Polished Quartz',
      installation: 'Professional installation required',
      warranty: '15 years',
    },
    marketplaceId: 'mp-003',
  },
  {
    id: 'p3d-006',
    name: 'Granite Countertop - Black Galaxy',
    category: 'countertop',
    vendor: 'CounterCraft',
    price: 65.00,
    dimensions: { width: 0.610, height: 0.030, depth: 0.762 },
    material: {
      baseColor: '#1A1A1A',
      roughness: 0.2,
      metalness: 0.3,
    },
    model: {
      type: 'primitive',
      primitive: 'box',
    },
    specs: {
      weight: '20 lbs/sq ft',
      finish: 'Polished Granite',
      installation: 'Professional installation required',
      warranty: 'Lifetime',
    },
    marketplaceId: 'mp-003',
  },
  
  // LIGHTING
  {
    id: 'p3d-007',
    name: 'LED Pendant Light - Modern',
    category: 'lighting',
    vendor: 'LightCo',
    price: 149.99,
    dimensions: { width: 0.305, height: 0.457, depth: 0.305 }, // 12" diameter x 18" height
    material: {
      baseColor: '#2C2C2C',
      roughness: 0.3,
      metalness: 0.8,
    },
    model: {
      type: 'primitive',
      primitive: 'cylinder',
    },
    specs: {
      weight: '3.5 lbs',
      finish: 'Brushed Nickel',
      installation: 'Hardwired',
      warranty: '5 years',
    },
    marketplaceId: 'mp-004',
  },
  {
    id: 'p3d-008',
    name: 'Recessed LED Downlight',
    category: 'lighting',
    vendor: 'LightCo',
    price: 24.99,
    dimensions: { width: 0.152, height: 0.102, depth: 0.152 }, // 6" diameter x 4" depth
    material: {
      baseColor: '#FFFFFF',
      roughness: 0.4,
      metalness: 0.0,
    },
    model: {
      type: 'primitive',
      primitive: 'cylinder',
    },
    specs: {
      weight: '1.2 lbs',
      finish: 'White Trim',
      installation: 'Recessed ceiling mount',
      warranty: '5 years',
    },
    marketplaceId: 'mp-004',
  },
  
  // FURNITURE (Sample items)
  {
    id: 'p3d-009',
    name: 'Kitchen Island - Shaker Style',
    category: 'furniture',
    vendor: 'Cabinet Masters',
    price: 1299.00,
    dimensions: { width: 1.524, height: 0.914, depth: 0.914 }, // 60" x 36" x 36"
    material: {
      baseColor: '#F5F5DC',
      roughness: 0.6,
      metalness: 0.0,
    },
    model: {
      type: 'primitive',
      primitive: 'box',
    },
    specs: {
      weight: '250 lbs',
      finish: 'Painted White',
      installation: 'Assembly required',
      warranty: '2 years',
    },
    marketplaceId: 'mp-005',
  },
  {
    id: 'p3d-010',
    name: 'Bathroom Vanity - Modern',
    category: 'furniture',
    vendor: 'Bath Essentials',
    price: 899.00,
    dimensions: { width: 1.219, height: 0.864, depth: 0.559 }, // 48" x 34" x 22"
    material: {
      baseColor: '#4A4A4A',
      roughness: 0.5,
      metalness: 0.0,
    },
    model: {
      type: 'primitive',
      primitive: 'box',
    },
    specs: {
      weight: '180 lbs',
      finish: 'Espresso Wood',
      installation: 'Wall-mounted',
      warranty: '3 years',
    },
    marketplaceId: 'mp-006',
  },
  
  // FIXTURES
  {
    id: 'p3d-011',
    name: 'Kitchen Faucet - Pull-Down',
    category: 'fixture',
    vendor: 'Plumbing Pro',
    price: 189.99,
    dimensions: { width: 0.254, height: 0.406, depth: 0.203 }, // 10" x 16" x 8"
    material: {
      baseColor: '#C0C0C0',
      roughness: 0.2,
      metalness: 0.9,
    },
    model: {
      type: 'primitive',
      primitive: 'cylinder',
    },
    specs: {
      weight: '4.5 lbs',
      finish: 'Chrome',
      installation: 'Single-hole mount',
      warranty: 'Lifetime',
    },
    marketplaceId: 'mp-007',
  },
  {
    id: 'p3d-012',
    name: 'Shower Head - Rain Style',
    category: 'fixture',
    vendor: 'Plumbing Pro',
    price: 129.99,
    dimensions: { width: 0.305, height: 0.076, depth: 0.305 }, // 12" diameter x 3" depth
    material: {
      baseColor: '#B8860B',
      roughness: 0.3,
      metalness: 0.8,
    },
    model: {
      type: 'primitive',
      primitive: 'cylinder',
    },
    specs: {
      weight: '2.8 lbs',
      finish: 'Brushed Gold',
      installation: 'Ceiling mount',
      warranty: '10 years',
    },
    marketplaceId: 'mp-007',
  },
];

// Helper functions
export function getProductsByCategory(category: Product3D['category']): Product3D[] {
  return product3DCatalog.filter(p => p.category === category);
}

export function getProductById(id: string): Product3D | undefined {
  return product3DCatalog.find(p => p.id === id);
}

export function getProductsByVendor(vendor: string): Product3D[] {
  return product3DCatalog.filter(p => p.vendor === vendor);
}

export function searchProducts(query: string): Product3D[] {
  const lowerQuery = query.toLowerCase();
  return product3DCatalog.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.vendor.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

