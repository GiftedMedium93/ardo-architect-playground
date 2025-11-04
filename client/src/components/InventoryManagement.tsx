import { Package, AlertCircle, TrendingDown, TrendingUp, Search, Plus, X, Edit, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
  supplier: string;
  unitCost: number;
  totalValue: number;
  lastOrdered: Date;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
}

interface InventoryManagementProps {
  onClose: () => void;
}

export default function InventoryManagement({ onClose }: InventoryManagementProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 'i1',
      name: '2x4 Lumber (8ft)',
      category: 'Lumber',
      quantity: 450,
      unit: 'pieces',
      reorderPoint: 200,
      supplier: 'BuildMart Supply',
      unitCost: 6.50,
      totalValue: 2925,
      lastOrdered: new Date(2025, 9, 15),
      status: 'in-stock',
    },
    {
      id: 'i2',
      name: 'Portland Cement (94lb)',
      category: 'Concrete',
      quantity: 85,
      unit: 'bags',
      reorderPoint: 100,
      supplier: 'Concrete Direct',
      unitCost: 12.99,
      totalValue: 1104.15,
      lastOrdered: new Date(2025, 9, 20),
      status: 'low-stock',
    },
    {
      id: 'i3',
      name: 'Drywall Sheets (4x8)',
      category: 'Drywall',
      quantity: 0,
      unit: 'sheets',
      reorderPoint: 50,
      supplier: 'Gypsum Wholesale',
      unitCost: 15.75,
      totalValue: 0,
      lastOrdered: new Date(2025, 8, 10),
      status: 'out-of-stock',
    },
    {
      id: 'i4',
      name: 'PEX Tubing (1/2" x 100ft)',
      category: 'Plumbing',
      quantity: 25,
      unit: 'rolls',
      reorderPoint: 15,
      supplier: 'Plumbing Plus',
      unitCost: 45.00,
      totalValue: 1125,
      lastOrdered: new Date(2025, 10, 1),
      status: 'in-stock',
    },
    {
      id: 'i5',
      name: 'Romex Wire 12/2 (250ft)',
      category: 'Electrical',
      quantity: 12,
      unit: 'rolls',
      reorderPoint: 20,
      supplier: 'Electric Supply Co',
      unitCost: 89.99,
      totalValue: 1079.88,
      lastOrdered: new Date(2025, 9, 25),
      status: 'low-stock',
    },
    {
      id: 'i6',
      name: 'Asphalt Shingles (Bundle)',
      category: 'Roofing',
      quantity: 120,
      unit: 'bundles',
      reorderPoint: 50,
      supplier: 'Roofing Depot',
      unitCost: 32.50,
      totalValue: 3900,
      lastOrdered: new Date(2025, 10, 2),
      status: 'in-stock',
    },
    {
      id: 'i7',
      name: 'Concrete Rebar #4 (20ft)',
      category: 'Concrete',
      quantity: 200,
      unit: 'pieces',
      reorderPoint: 100,
      supplier: 'Steel & Rebar Inc',
      unitCost: 8.75,
      totalValue: 1750,
      lastOrdered: new Date(2025, 9, 18),
      status: 'in-stock',
    },
    {
      id: 'i8',
      name: 'Interior Paint (5gal)',
      category: 'Paint',
      quantity: 35,
      unit: 'buckets',
      reorderPoint: 25,
      supplier: 'Paint Warehouse',
      unitCost: 125.00,
      totalValue: 4375,
      lastOrdered: new Date(2025, 10, 3),
      status: 'in-stock',
    },
  ]);

  const categories = Array.from(new Set(inventory.map(item => item.category))).sort();

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = search === "" || 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-500/20 text-green-400';
      case 'low-stock': return 'bg-yellow-500/20 text-yellow-400';
      case 'out-of-stock': return 'bg-red-500/20 text-red-400';
      case 'on-order': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockCount = inventory.filter(item => item.status === 'low-stock').length;
  const outOfStockCount = inventory.filter(item => item.status === 'out-of-stock').length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                📦 Inventory Management
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {inventory.length} items • ${totalValue.toLocaleString()} total value
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-gray-400 text-sm mb-1">Total Items</div>
              <div className="text-2xl font-bold text-white">{inventory.length}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-gray-400 text-sm mb-1">Total Value</div>
              <div className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
              <div className="text-yellow-400 text-sm mb-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Low Stock
              </div>
              <div className="text-2xl font-bold text-yellow-400">{lowStockCount}</div>
            </div>
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="text-red-400 text-sm mb-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Out of Stock
              </div>
              <div className="text-2xl font-bold text-red-400">{outOfStockCount}</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or supplier..."
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
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Item</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Category</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-400">Quantity</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-400">Reorder Point</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Supplier</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-400">Unit Cost</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-400">Total Value</th>
                  <th className="text-center p-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-center p-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="text-white font-medium">{item.name}</div>
                      <div className="text-gray-500 text-xs">Last ordered: {item.lastOrdered.toLocaleDateString()}</div>
                    </td>
                    <td className="p-4 text-gray-300">{item.category}</td>
                    <td className="p-4 text-right">
                      <div className="text-white font-medium">{item.quantity}</div>
                      <div className="text-gray-500 text-xs">{item.unit}</div>
                    </td>
                    <td className="p-4 text-right text-gray-400">{item.reorderPoint}</td>
                    <td className="p-4 text-gray-300">{item.supplier}</td>
                    <td className="p-4 text-right text-gray-300">${item.unitCost.toFixed(2)}</td>
                    <td className="p-4 text-right text-white font-medium">${item.totalValue.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
                          <Truck className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Low Stock Alerts */}
          {(lowStockCount > 0 || outOfStockCount > 0) && (
            <div className="mt-6 p-6 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
              <h3 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Reorder Alerts
              </h3>
              <div className="space-y-2">
                {inventory
                  .filter(item => item.status === 'low-stock' || item.status === 'out-of-stock')
                  .map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-gray-400 text-sm">
                          Current: {item.quantity} {item.unit} • Reorder at: {item.reorderPoint}
                        </div>
                      </div>
                      <Button className="bg-teal-500 hover:bg-teal-600 text-white text-sm">
                        <Truck className="w-4 h-4 mr-2" />
                        Reorder from {item.supplier}
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

