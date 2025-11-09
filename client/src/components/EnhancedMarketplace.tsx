import { Search, ShoppingCart, Package, DollarSign, Truck, Star, X, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MarketplaceItem {
  id: string;
  name: string;
  category: string;
  vendor: string;
  price: number;
  unit: string;
  stock: number;
  rating: number;
  reviewCount: number;
  image?: string;
  dimensions?: { width: number; height: number; depth: number };
  coverage?: number; // sq ft per unit
  deliveryDays: number;
  bulkPricing?: { quantity: number; price: number }[];
}

const marketplaceItems: MarketplaceItem[] = [
  {
    id: 'mp-001',
    name: 'Premium Oak Hardwood Flooring',
    category: 'Flooring',
    vendor: 'FloorMaster Pro',
    price: 8.99,
    unit: 'sq ft',
    stock: 5000,
    rating: 4.8,
    reviewCount: 342,
    coverage: 1,
    deliveryDays: 3,
    bulkPricing: [
      { quantity: 500, price: 8.49 },
      { quantity: 1000, price: 7.99 }
    ]
  },
  {
    id: 'mp-002',
    name: 'Carrara Marble Tile 12x24"',
    category: 'Tile',
    vendor: 'Luxury Stone Supply',
    price: 15.99,
    unit: 'sq ft',
    stock: 3000,
    rating: 4.9,
    reviewCount: 567,
    coverage: 2,
    deliveryDays: 5,
    bulkPricing: [
      { quantity: 300, price: 14.99 },
      { quantity: 600, price: 13.99 }
    ]
  },
  {
    id: 'mp-003',
    name: 'Quartz Countertop Slab',
    category: 'Countertop',
    vendor: 'Premium Surfaces',
    price: 89.99,
    unit: 'sq ft',
    stock: 150,
    rating: 4.9,
    reviewCount: 234,
    coverage: 1,
    deliveryDays: 7,
    bulkPricing: [
      { quantity: 50, price: 84.99 },
      { quantity: 100, price: 79.99 }
    ]
  },
  {
    id: 'mp-004',
    name: 'LED Recessed Lighting 6"',
    category: 'Lighting',
    vendor: 'BrightTech Solutions',
    price: 24.99,
    unit: 'each',
    stock: 800,
    rating: 4.7,
    reviewCount: 891,
    deliveryDays: 2,
    bulkPricing: [
      { quantity: 10, price: 22.99 },
      { quantity: 25, price: 19.99 }
    ]
  },
  {
    id: 'mp-005',
    name: 'Modern Pendant Light Fixture',
    category: 'Lighting',
    vendor: 'Designer Lighting Co',
    price: 189.99,
    unit: 'each',
    stock: 45,
    rating: 4.8,
    reviewCount: 156,
    deliveryDays: 4,
    bulkPricing: [
      { quantity: 5, price: 179.99 },
      { quantity: 10, price: 169.99 }
    ]
  },
  {
    id: 'mp-006',
    name: 'Porcelain Subway Tile 3x6"',
    category: 'Tile',
    vendor: 'Classic Tile Works',
    price: 4.99,
    unit: 'sq ft',
    stock: 8000,
    rating: 4.6,
    reviewCount: 1234,
    coverage: 2,
    deliveryDays: 3,
    bulkPricing: [
      { quantity: 500, price: 4.49 },
      { quantity: 1000, price: 3.99 }
    ]
  },
  {
    id: 'mp-007',
    name: 'Luxury Vinyl Plank Flooring',
    category: 'Flooring',
    vendor: 'FlexFloor Systems',
    price: 3.99,
    unit: 'sq ft',
    stock: 10000,
    rating: 4.7,
    reviewCount: 789,
    coverage: 1,
    deliveryDays: 2,
    bulkPricing: [
      { quantity: 1000, price: 3.49 },
      { quantity: 2000, price: 2.99 }
    ]
  },
  {
    id: 'mp-008',
    name: 'Granite Countertop Slab',
    category: 'Countertop',
    vendor: 'Natural Stone Depot',
    price: 69.99,
    unit: 'sq ft',
    stock: 200,
    rating: 4.8,
    reviewCount: 445,
    coverage: 1,
    deliveryDays: 7,
    bulkPricing: [
      { quantity: 50, price: 64.99 },
      { quantity: 100, price: 59.99 }
    ]
  }
];

interface CartItem extends MarketplaceItem {
  quantity: number;
  finalPrice: number;
}

interface EnhancedMarketplaceProps {
  onClose: () => void;
  onAddTo3D?: (item: MarketplaceItem, quantity: number) => void;
}

export default function EnhancedMarketplace({ onClose, onAddTo3D }: EnhancedMarketplaceProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const categories = Array.from(new Set(marketplaceItems.map(item => item.category)));

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.vendor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculatePrice = (item: MarketplaceItem, quantity: number): number => {
    if (!item.bulkPricing) return item.price * quantity;
    
    const applicableTier = item.bulkPricing
      .filter(tier => quantity >= tier.quantity)
      .sort((a, b) => b.quantity - a.quantity)[0];
    
    return (applicableTier?.price || item.price) * quantity;
  };

  const addToCart = (item: MarketplaceItem, quantity: number = 1) => {
    const existingItem = cart.find(c => c.id === item.id);
    const finalPrice = calculatePrice(item, quantity);
    
    if (existingItem) {
      setCart(cart.map(c => 
        c.id === item.id 
          ? { ...c, quantity: c.quantity + quantity, finalPrice: calculatePrice(item, c.quantity + quantity) }
          : c
      ));
    } else {
      setCart([...cart, { ...item, quantity, finalPrice }]);
    }
    
    toast.success(`Added ${quantity} ${item.unit} of ${item.name} to cart`);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity, finalPrice: calculatePrice(item, newQuantity) }
        : item
    ));
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
    toast.info("Item removed from cart");
  };

  const handleDragStart = (e: React.DragEvent, item: MarketplaceItem) => {
    e.dataTransfer.setData('marketplace-item', JSON.stringify(item));
    toast.info(`Drag ${item.name} to 3D viewport to place it`);
  };

  const totalCost = cart.reduce((sum, item) => sum + item.finalPrice, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-light text-white mb-1 flex items-center gap-2">
                <Package className="w-6 h-6" />
                Enhanced Marketplace
              </h2>
              <p className="text-gray-400 text-sm">Drag items to 3D viewport • Real-time pricing • Instant delivery estimates</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors border border-purple-500/30"
              >
                <ShoppingCart className="w-5 h-5 text-purple-400" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Search and Category Filter */}
          <div className="flex gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-move group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.vendor}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-sm">{item.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-400">${item.price}</span>
                      <span className="text-gray-400 text-sm">per {item.unit}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>{item.stock} in stock</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        <span>{item.deliveryDays} days</span>
                      </div>
                    </div>
                  </div>

                  {item.bulkPricing && (
                    <div className="mb-4 p-2 bg-purple-500/10 rounded border border-purple-500/20">
                      <p className="text-xs text-purple-400 font-medium mb-1">Bulk Pricing:</p>
                      <div className="space-y-1">
                        {item.bulkPricing.map((tier, idx) => (
                          <div key={idx} className="text-xs text-gray-400">
                            {tier.quantity}+ {item.unit}: ${tier.price} each
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      onClick={() => addToCart(item, 1)}
                      className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                    {onAddTo3D && (
                      <Button
                        onClick={() => {
                          onAddTo3D(item, 1);
                          toast.success(`Added ${item.name} to 3D scene`);
                        }}
                        className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30"
                        size="sm"
                      >
                        3D
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shopping Cart */}
          {showCart && (
            <div className="w-96 border-l border-white/10 overflow-y-auto p-6 bg-black/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Shopping Cart ({totalItems} items)
              </h3>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-white text-sm font-medium">{item.name}</h4>
                            <p className="text-gray-500 text-xs">{item.vendor}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-red-500/20 rounded"
                          >
                            <X className="w-4 h-4 text-red-400" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 bg-white/10 hover:bg-white/20 rounded"
                            >
                              <Minus className="w-3 h-3 text-white" />
                            </button>
                            <span className="text-white text-sm w-12 text-center">
                              {item.quantity} {item.unit}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 bg-white/10 hover:bg-white/20 rounded"
                            >
                              <Plus className="w-3 h-3 text-white" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-purple-400 font-semibold">${item.finalPrice.toFixed(2)}</div>
                            {item.finalPrice < item.price * item.quantity && (
                              <div className="text-xs text-green-400">Bulk discount applied</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Subtotal:</span>
                      <span className="text-white font-medium">${totalCost.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Estimated Tax (8%):</span>
                      <span className="text-white font-medium">${(totalCost * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold border-t border-white/10 pt-3">
                      <span className="text-white">Total:</span>
                      <span className="text-purple-400">${(totalCost * 1.08).toFixed(2)}</span>
                    </div>

                    <Button
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                      onClick={() => toast.success("Checkout coming soon!")}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

