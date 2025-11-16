import { ChevronLeft, Plus, Trash2, Star, AlertTriangle, CheckCircle2, Shield, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Supplier {
  id: string;
  name: string;
  status: 'included' | 'excluded' | 'neutral';
  reliabilityScore: number;
  totalOrders: number;
  onTimeDelivery: number;
  qualityRating: number;
  priceCompetitiveness: number;
  category: string;
  notes: string;
  addedDate: Date;
  lastOrderDate?: Date;
  issues: string[];
}

interface SupplierManagementProps {
  onClose: () => void;
}

export default function SupplierManagement({ onClose }: SupplierManagementProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 'sup-001',
      name: 'Local Family Hardware',
      status: 'included',
      reliabilityScore: 99,
      totalOrders: 247,
      onTimeDelivery: 98,
      qualityRating: 4.9,
      priceCompetitiveness: 85,
      category: 'General Supplies',
      notes: 'Long-standing relationship (12 years). Exceptional service, same-day delivery. Worth the premium.',
      addedDate: new Date('2013-03-15'),
      lastOrderDate: new Date('2025-01-14'),
      issues: []
    },
    {
      id: 'sup-002',
      name: 'Budget Building Supplies',
      status: 'excluded',
      reliabilityScore: 42,
      totalOrders: 8,
      onTimeDelivery: 50,
      qualityRating: 2.3,
      priceCompetitiveness: 95,
      category: 'Lumber & Framing',
      notes: 'BLACKLISTED: Multiple delivery failures, damaged materials (15% defect rate), poor communication.',
      addedDate: new Date('2024-06-10'),
      lastOrderDate: new Date('2024-09-22'),
      issues: ['Late delivery (14 days avg)', 'Damaged materials (15%)', 'Poor communication', 'Incorrect orders (3 times)']
    },
    {
      id: 'sup-003',
      name: 'Premium Stone & Tile Co.',
      status: 'included',
      reliabilityScore: 96,
      totalOrders: 89,
      onTimeDelivery: 94,
      qualityRating: 4.8,
      priceCompetitiveness: 72,
      category: 'Tile & Stone',
      notes: 'Specialized in high-end marble and granite. Excellent quality control. Preferred for luxury projects.',
      addedDate: new Date('2018-07-20'),
      lastOrderDate: new Date('2025-01-10'),
      issues: []
    },
    {
      id: 'sup-004',
      name: 'Home Depot',
      status: 'neutral',
      reliabilityScore: 88,
      totalOrders: 156,
      onTimeDelivery: 87,
      qualityRating: 4.2,
      priceCompetitiveness: 90,
      category: 'General Supplies',
      notes: 'Large chain retailer. Consistent pricing, good availability. Use for standard materials.',
      addedDate: new Date('2015-01-05'),
      lastOrderDate: new Date('2025-01-12'),
      issues: ['Occasional stock-outs', 'Variable quality on lumber']
    },
    {
      id: 'sup-005',
      name: 'Ferguson Plumbing',
      status: 'neutral',
      reliabilityScore: 91,
      totalOrders: 134,
      onTimeDelivery: 90,
      qualityRating: 4.6,
      priceCompetitiveness: 78,
      category: 'Plumbing & HVAC',
      notes: 'Industry leader for plumbing fixtures. Higher prices but excellent selection and expertise.',
      addedDate: new Date('2016-04-12'),
      lastOrderDate: new Date('2025-01-08'),
      issues: []
    },
    {
      id: 'sup-006',
      name: 'Discount Drywall Direct',
      status: 'excluded',
      reliabilityScore: 55,
      totalOrders: 12,
      onTimeDelivery: 67,
      qualityRating: 3.1,
      priceCompetitiveness: 98,
      category: 'Drywall & Insulation',
      notes: 'EXCLUDED: Cheapest prices but unreliable. Missed 4 out of 12 delivery windows. Not worth the savings.',
      addedDate: new Date('2024-02-18'),
      lastOrderDate: new Date('2024-11-05'),
      issues: ['Missed delivery windows (4/12)', 'Damaged shipments (2 times)', 'Unresponsive customer service']
    }
  ]);

  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredSuppliers = suppliers.filter(sup => 
    filterStatus === 'all' || sup.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'included': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'excluded': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'neutral': return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'included': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'excluded': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'neutral': return <Shield className="w-4 h-4 text-gray-400" />;
      default: return null;
    }
  };

  const toggleSupplierStatus = (supplierId: string, newStatus: 'included' | 'excluded' | 'neutral') => {
    setSuppliers(prev => prev.map(sup => 
      sup.id === supplierId ? { ...sup, status: newStatus } : sup
    ));
    
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
      if (newStatus === 'included') {
        toast.success(`${supplier.name} added to Mandatory Inclusion list`);
      } else if (newStatus === 'excluded') {
        toast.error(`${supplier.name} added to Mandatory Exclusion list`);
      } else {
        toast.info(`${supplier.name} returned to neutral status`);
      }
    }
  };

  const deleteSupplier = (supplierId: string) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier && confirm(`Are you sure you want to delete ${supplier.name}?`)) {
      setSuppliers(prev => prev.filter(s => s.id !== supplierId));
      toast.success(`${supplier.name} removed from supplier database`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#0f1419]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h3 className="text-lg font-light tracking-wide">Supplier Management</h3>
              <p className="text-xs text-gray-500">Mandatory Inclusion/Exclusion Controls</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddSupplier(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-lg text-sm font-medium transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Supplier
          </button>
        </div>

        {/* Stats Bar */}
        <div className="px-6 py-4 border-b border-white/5 grid grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Total Suppliers</div>
            <div className="text-2xl font-bold text-white">{suppliers.length}</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="text-xs text-green-400 mb-1">Mandatory Inclusion</div>
            <div className="text-2xl font-bold text-green-400">{suppliers.filter(s => s.status === 'included').length}</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="text-xs text-red-400 mb-1">Mandatory Exclusion</div>
            <div className="text-2xl font-bold text-red-400">{suppliers.filter(s => s.status === 'excluded').length}</div>
          </div>
          <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Neutral</div>
            <div className="text-2xl font-bold text-gray-400">{suppliers.filter(s => s.status === 'neutral').length}</div>
          </div>
        </div>

        {/* Filter */}
        <div className="px-6 py-3 border-b border-white/5 flex gap-2">
          {['all', 'included', 'excluded', 'neutral'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Supplier List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredSuppliers.map(supplier => (
            <div key={supplier.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-base font-medium text-white">{supplier.name}</h4>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 ${getStatusColor(supplier.status)}`}>
                      {getStatusIcon(supplier.status)}
                      {supplier.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{supplier.category}</p>
                  <p className="text-sm text-gray-400">{supplier.notes}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteSupplier(supplier.id)}
                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                    title="Delete supplier"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Reliability Score</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          supplier.reliabilityScore >= 90 ? 'bg-green-400' :
                          supplier.reliabilityScore >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${supplier.reliabilityScore}%` }}
                      />
                    </div>
                    <span className="text-sm text-white font-medium">{supplier.reliabilityScore}%</span>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Total Orders</div>
                  <div className="text-sm text-white font-medium">{supplier.totalOrders}</div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">On-Time Delivery</div>
                  <div className="text-sm text-white font-medium">{supplier.onTimeDelivery}%</div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Quality Rating</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-white font-medium">{supplier.qualityRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {supplier.issues.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                  <div className="text-xs text-red-400 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Known Issues ({supplier.issues.length})
                  </div>
                  <ul className="text-xs text-red-300 space-y-1">
                    {supplier.issues.map((issue, idx) => (
                      <li key={idx}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => toggleSupplierStatus(supplier.id, 'included')}
                  disabled={supplier.status === 'included'}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    supplier.status === 'included'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-not-allowed'
                      : 'bg-white/5 text-white hover:bg-green-500/20 hover:text-green-400 border border-white/10'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 inline mr-2" />
                  Mandatory Inclusion
                </button>
                <button
                  onClick={() => toggleSupplierStatus(supplier.id, 'neutral')}
                  disabled={supplier.status === 'neutral'}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    supplier.status === 'neutral'
                      ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30 cursor-not-allowed'
                      : 'bg-white/5 text-white hover:bg-gray-500/20 hover:text-gray-400 border border-white/10'
                  }`}
                >
                  <Shield className="w-4 h-4 inline mr-2" />
                  Neutral
                </button>
                <button
                  onClick={() => toggleSupplierStatus(supplier.id, 'excluded')}
                  disabled={supplier.status === 'excluded'}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    supplier.status === 'excluded'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30 cursor-not-allowed'
                      : 'bg-white/5 text-white hover:bg-red-500/20 hover:text-red-400 border border-white/10'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Mandatory Exclusion
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

