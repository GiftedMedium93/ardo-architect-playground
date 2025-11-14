import { useState, useEffect } from "react";
import { X, TrendingDown, TrendingUp, DollarSign, Package, AlertTriangle, CheckCircle, BarChart3, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Supplier {
  id: string;
  name: string;
  price: number;
  stock: number;
  leadTime: number; // days
  reliability: number; // 0-100
  shippingCost: number;
  bulkDiscount: { quantity: number; discount: number }[];
}

interface ArbitrageOpportunity {
  productId: string;
  productName: string;
  category: string;
  suppliers: Supplier[];
  bestPrice: number;
  worstPrice: number;
  savingsPercent: number;
  savingsAmount: number;
  recommendedSupplier: Supplier;
  profitPotential: number;
}

interface Props {
  onClose: () => void;
}

export default function ArbitrageEngine({ onClose }: Props) {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<ArbitrageOpportunity | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sortBy, setSortBy] = useState<'savings' | 'profit' | 'reliability'>('savings');

  useEffect(() => {
    // Generate arbitrage opportunities
    const products = [
      { id: 'oak-flooring', name: 'Oak Hardwood Flooring', category: 'Flooring' },
      { id: 'granite-counter', name: 'Granite Countertop', category: 'Countertops' },
      { id: 'led-fixture', name: 'LED Light Fixture', category: 'Lighting' },
      { id: 'ceramic-tile', name: 'Ceramic Floor Tile', category: 'Tile' },
      { id: 'paint-gallon', name: 'Premium Interior Paint', category: 'Paint' },
      { id: 'copper-pipe', name: 'Copper Piping (10ft)', category: 'Plumbing' },
      { id: 'insulation', name: 'Fiberglass Insulation', category: 'Insulation' },
      { id: 'drywall', name: 'Drywall Sheet 4x8', category: 'Drywall' },
    ];

    const supplierNames = ['Home Depot', 'Lowe\'s', 'Ferguson', 'Grainger', 'Menards', 'Ace Hardware'];

    const ops: ArbitrageOpportunity[] = products.map(product => {
      const basePrice = Math.random() * 200 + 50;
      const suppliers: Supplier[] = supplierNames.map((name, idx) => {
        const priceVariation = 1 + (Math.random() * 0.4 - 0.2); // ±20%
        const price = basePrice * priceVariation;
        return {
          id: `${name.toLowerCase().replace(/[^a-z]/g, '')}-${idx}`,
          name,
          price: Math.round(price * 100) / 100,
          stock: Math.floor(Math.random() * 500) + 50,
          leadTime: Math.floor(Math.random() * 14) + 1,
          reliability: Math.floor(Math.random() * 20) + 80,
          shippingCost: Math.round((Math.random() * 30 + 10) * 100) / 100,
          bulkDiscount: [
            { quantity: 10, discount: 0.05 },
            { quantity: 50, discount: 0.10 },
            { quantity: 100, discount: 0.15 },
          ],
        };
      });

      suppliers.sort((a, b) => a.price - b.price);
      const bestPrice = suppliers[0].price;
      const worstPrice = suppliers[suppliers.length - 1].price;
      const savingsAmount = worstPrice - bestPrice;
      const savingsPercent = (savingsAmount / worstPrice) * 100;

      // Calculate recommended supplier (best value considering price, reliability, lead time)
      const scoredSuppliers = suppliers.map(s => ({
        ...s,
        score: (100 - ((s.price / bestPrice - 1) * 100)) * 0.5 + s.reliability * 0.3 + (15 - s.leadTime) * 2,
      }));
      scoredSuppliers.sort((a, b) => b.score - a.score);
      const recommendedSupplier = scoredSuppliers[0];

      return {
        productId: product.id,
        productName: product.name,
        category: product.category,
        suppliers,
        bestPrice,
        worstPrice,
        savingsPercent,
        savingsAmount,
        recommendedSupplier,
        profitPotential: savingsAmount * 10, // Estimated profit for bulk purchase
      };
    });

    ops.sort((a, b) => b.savingsPercent - a.savingsPercent);
    setOpportunities(ops);
  }, []);

  const calculateBulkPrice = (supplier: Supplier, qty: number) => {
    let discount = 0;
    for (const tier of supplier.bulkDiscount) {
      if (qty >= tier.quantity) {
        discount = tier.discount;
      }
    }
    return supplier.price * (1 - discount) * qty + supplier.shippingCost;
  };

  const sortedOpportunities = [...opportunities].sort((a, b) => {
    if (sortBy === 'savings') return b.savingsPercent - a.savingsPercent;
    if (sortBy === 'profit') return b.profitPotential - a.profitPotential;
    return b.recommendedSupplier.reliability - a.recommendedSupplier.reliability;
  });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col border border-teal-500/30">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Arbitrage Engine</h2>
              <p className="text-sm text-gray-400">Automated price optimization & profit maximization</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden flex gap-4 p-6">
          {/* Opportunities List */}
          <div className="w-2/3 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Arbitrage Opportunities</h3>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'savings' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('savings')}
                  className="text-xs"
                >
                  💰 Savings
                </Button>
                <Button
                  variant={sortBy === 'profit' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('profit')}
                  className="text-xs"
                >
                  📈 Profit
                </Button>
                <Button
                  variant={sortBy === 'reliability' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('reliability')}
                  className="text-xs"
                >
                  ⭐ Reliability
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {sortedOpportunities.map(opp => (
                <div
                  key={opp.productId}
                  onClick={() => setSelectedOpportunity(opp)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedOpportunity?.productId === opp.productId
                      ? 'bg-teal-500/20 border-teal-500'
                      : 'bg-gray-800/50 border-gray-700 hover:border-teal-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{opp.productName}</h4>
                      <p className="text-sm text-gray-400">{opp.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-emerald-400 font-bold">
                        <TrendingDown className="w-4 h-4" />
                        {opp.savingsPercent.toFixed(1)}%
                      </div>
                      <p className="text-xs text-gray-400">Save ${opp.savingsAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">
                        Best: <span className="text-emerald-400 font-semibold">${opp.bestPrice.toFixed(2)}</span>
                      </span>
                      <span className="text-gray-400">
                        Worst: <span className="text-red-400 font-semibold">${opp.worstPrice.toFixed(2)}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-teal-400 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      {opp.recommendedSupplier.name}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-700 flex items-center justify-between text-xs">
                    <span className="text-gray-400">Profit Potential: <span className="text-yellow-400 font-semibold">${opp.profitPotential.toFixed(2)}</span></span>
                    <span className="text-gray-400">{opp.suppliers.length} suppliers compared</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-1/3 bg-gray-800/50 rounded-xl border border-gray-700 p-4 flex flex-col">
            {selectedOpportunity ? (
              <>
                <h3 className="text-lg font-semibold text-white mb-4">{selectedOpportunity.productName}</h3>

                <div className="mb-4">
                  <label className="text-sm text-gray-400 mb-2 block">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                  />
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                  <h4 className="text-sm font-semibold text-white mb-2">Supplier Comparison</h4>
                  {selectedOpportunity.suppliers.map((supplier, idx) => {
                    const totalCost = calculateBulkPrice(supplier, quantity);
                    const isRecommended = supplier.id === selectedOpportunity.recommendedSupplier.id;
                    const isCheapest = idx === 0;

                    return (
                      <div
                        key={supplier.id}
                        className={`p-3 rounded-lg border ${
                          isRecommended
                            ? 'bg-teal-500/10 border-teal-500'
                            : isCheapest
                            ? 'bg-emerald-500/10 border-emerald-500'
                            : 'bg-gray-900/50 border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white text-sm">{supplier.name}</span>
                          {isRecommended && <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded">Recommended</span>}
                          {isCheapest && !isRecommended && <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded">Cheapest</span>}
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Unit Price:</span>
                            <span className="text-white font-semibold">${supplier.price.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total ({quantity} units):</span>
                            <span className="text-white font-semibold">${totalCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Lead Time:</span>
                            <span className="text-white">{supplier.leadTime} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Reliability:</span>
                            <span className="text-white">{supplier.reliability}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Stock:</span>
                            <span className={supplier.stock >= quantity ? 'text-emerald-400' : 'text-red-400'}>
                              {supplier.stock} units
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Purchase from {selectedOpportunity.recommendedSupplier.name}
                </Button>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Select an opportunity to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

