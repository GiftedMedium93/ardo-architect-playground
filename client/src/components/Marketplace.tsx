import { ShoppingCart, Search, Filter, Star, Truck, Clock, DollarSign, X, Package, Wrench, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MarketplaceItem {
  id: string;
  name: string;
  type: 'material' | 'equipment' | 'service';
  category: string;
  vendor: string;
  price: number;
  unit: string;
  rating: number;
  reviewCount: number;
  availability: 'in-stock' | 'limited' | 'out-of-stock' | 'on-demand';
  deliveryTime: string;
  minOrder?: number;
  description: string;
  image: string;
}

interface MarketplaceProps {
  onClose: () => void;
}

export default function Marketplace({ onClose }: MarketplaceProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<'all' | 'material' | 'equipment' | 'service'>('all');
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating' | 'popular'>('popular');
  const [cart, setCart] = useState<string[]>([]);

  const items: MarketplaceItem[] = [
    // Materials
    {
      id: 'm1',
      name: 'Premium Oak Hardwood Flooring',
      type: 'material',
      category: 'Flooring',
      vendor: 'Timber Direct',
      price: 8.50,
      unit: 'sq ft',
      rating: 4.8,
      reviewCount: 234,
      availability: 'in-stock',
      deliveryTime: '2-3 days',
      minOrder: 100,
      description: 'Solid oak hardwood, 3/4" thick, prefinished',
      image: '🪵',
    },
    {
      id: 'm2',
      name: 'Porcelain Tile 12x24',
      type: 'material',
      category: 'Tile',
      vendor: 'Tile Warehouse',
      price: 4.25,
      unit: 'sq ft',
      rating: 4.6,
      reviewCount: 189,
      availability: 'in-stock',
      deliveryTime: '1-2 days',
      minOrder: 50,
      description: 'Large format porcelain, matte finish',
      image: '⬜',
    },
    {
      id: 'm3',
      name: 'Quartz Countertop Slab',
      type: 'material',
      category: 'Countertops',
      vendor: 'Stone Masters',
      price: 65.00,
      unit: 'sq ft',
      rating: 4.9,
      reviewCount: 156,
      availability: 'limited',
      deliveryTime: '5-7 days',
      description: 'Engineered quartz, 3cm thick, polished',
      image: '💎',
    },
    {
      id: 'm4',
      name: 'LED Recessed Lighting Kit',
      type: 'material',
      category: 'Lighting',
      vendor: 'Lighting Pro',
      price: 45.00,
      unit: 'each',
      rating: 4.7,
      reviewCount: 312,
      availability: 'in-stock',
      deliveryTime: '1-2 days',
      description: '6" dimmable LED, 15W, 3000K warm white',
      image: '💡',
    },
    // Equipment
    {
      id: 'e1',
      name: 'Skid Steer Loader',
      type: 'equipment',
      category: 'Heavy Equipment',
      vendor: 'Equipment Rentals Inc',
      price: 350.00,
      unit: 'day',
      rating: 4.8,
      reviewCount: 89,
      availability: 'on-demand',
      deliveryTime: 'Same day',
      description: 'Bobcat S570, 74 HP, 2,000 lb capacity',
      image: '🚜',
    },
    {
      id: 'e2',
      name: 'Scaffolding System',
      type: 'equipment',
      category: 'Safety Equipment',
      vendor: 'Safe-T Rentals',
      price: 125.00,
      unit: 'week',
      rating: 4.6,
      reviewCount: 67,
      availability: 'in-stock',
      deliveryTime: 'Next day',
      description: 'Complete scaffolding set, up to 20ft height',
      image: '🏗️',
    },
    {
      id: 'e3',
      name: 'Concrete Mixer (Electric)',
      type: 'equipment',
      category: 'Tools',
      vendor: 'Tool Time Rentals',
      price: 75.00,
      unit: 'day',
      rating: 4.5,
      reviewCount: 123,
      availability: 'in-stock',
      deliveryTime: 'Same day',
      description: '9 cu ft capacity, 1.5 HP motor',
      image: '🔄',
    },
    // Services
    {
      id: 's1',
      name: 'Architectural Design Services',
      type: 'service',
      category: 'Design',
      vendor: 'Design Studio Pro',
      price: 150.00,
      unit: 'hour',
      rating: 4.9,
      reviewCount: 45,
      availability: 'on-demand',
      deliveryTime: 'By appointment',
      description: 'Licensed architect, residential & commercial',
      image: '📐',
    },
    {
      id: 's2',
      name: 'Structural Engineering Review',
      type: 'service',
      category: 'Engineering',
      vendor: 'Structural Solutions',
      price: 200.00,
      unit: 'hour',
      rating: 5.0,
      reviewCount: 28,
      availability: 'on-demand',
      deliveryTime: 'By appointment',
      description: 'PE certified, stamped drawings available',
      image: '🏛️',
    },
    {
      id: 's3',
      name: 'Site Survey & Grading',
      type: 'service',
      category: 'Site Work',
      vendor: 'Land Survey Co',
      price: 1200.00,
      unit: 'project',
      rating: 4.7,
      reviewCount: 56,
      availability: 'on-demand',
      deliveryTime: '3-5 days',
      description: 'Complete topographic survey and grading plan',
      image: '🗺️',
    },
  ];

  const categories = Array.from(new Set(items.map(item => item.category))).sort();

  const filteredItems = items.filter(item => {
    const matchesSearch = search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.vendor.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return b.reviewCount - a.reviewCount;
    }
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'text-green-400';
      case 'limited': return 'text-yellow-400';
      case 'out-of-stock': return 'text-red-400';
      case 'on-demand': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'material': return <Package className="w-4 h-4" />;
      case 'equipment': return <Wrench className="w-4 h-4" />;
      case 'service': return <Users className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                🛒 Construction Marketplace
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {sortedItems.length} items available • {cart.length} in cart
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Type Tabs */}
          <div className="flex gap-2 mb-4">
            {[
              { value: 'all', label: 'All Items', icon: '🏪' },
              { value: 'material', label: 'Materials', icon: '📦' },
              { value: 'equipment', label: 'Equipment', icon: '🔧' },
              { value: 'service', label: 'Services', icon: '👥' },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setSelectedType(tab.value as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedType === tab.value
                    ? 'bg-teal-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search materials, equipment, or services..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/50"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/50"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedItems.map(item => (
              <div
                key={item.id}
                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(item.type)}
                    <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                  </div>
                </div>

                <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{item.vendor}</p>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-medium">{item.rating}</span>
                    <span className="text-gray-500 text-xs">({item.reviewCount})</span>
                  </div>
                  <span className="text-gray-600">•</span>
                  <span className={`text-xs font-medium ${getAvailabilityColor(item.availability)}`}>
                    {item.availability}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                  <Truck className="w-3 h-3" />
                  <span>{item.deliveryTime}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">per {item.unit}</div>
                    {item.minOrder && (
                      <div className="text-xs text-gray-500">Min: {item.minOrder} {item.unit}</div>
                    )}
                  </div>
                  <Button
                    onClick={() => {
                      if (cart.includes(item.id)) {
                        setCart(cart.filter(id => id !== item.id));
                      } else {
                        setCart([...cart, item.id]);
                      }
                    }}
                    className={cart.includes(item.id)
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-teal-500 hover:bg-teal-600 text-white"
                    }
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {cart.includes(item.id) ? 'Added' : 'Add'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <span className="font-semibold">{cart.length}</span> items in cart
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCart([])}
                >
                  Clear Cart
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

