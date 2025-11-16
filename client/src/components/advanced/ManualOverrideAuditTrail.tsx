import { ChevronLeft, Download, Filter, Search, AlertTriangle, CheckCircle2, XCircle, User, Clock, FileText } from "lucide-react";
import { useState } from "react";

interface AuditEntry {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  decisionType: 'arbitration' | 'cvcs' | 'compliance' | 'supplier';
  originalRecommendation: string;
  userOverride: string;
  reason: string;
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  metadata: Record<string, any>;
}

interface ManualOverrideAuditTrailProps {
  onClose: () => void;
}

export default function ManualOverrideAuditTrail({ onClose }: ManualOverrideAuditTrailProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterImpact, setFilterImpact] = useState<string>('all');

  // Sample audit trail data
  const auditEntries: AuditEntry[] = [
    {
      id: 'audit-001',
      timestamp: new Date('2025-01-15T14:30:00'),
      userId: 'user-123',
      userName: 'John Smith',
      decisionType: 'arbitration',
      originalRecommendation: 'Use Supplier A: Home Depot ($8.99/sq ft)',
      userOverride: 'Use Supplier B: Local Lumber Yard ($9.50/sq ft)',
      reason: 'Prefer local supplier for faster delivery and established relationship. Willing to pay 5.7% premium for reliability.',
      impactLevel: 'medium',
      category: 'Material Procurement',
      metadata: {
        productId: 'flooring-oak-001',
        productName: 'Premium Oak Hardwood Flooring',
        costDifference: 510,
        quantityOrdered: 1000
      }
    },
    {
      id: 'audit-002',
      timestamp: new Date('2025-01-14T10:15:00'),
      userId: 'user-123',
      userName: 'John Smith',
      decisionType: 'cvcs',
      originalRecommendation: 'PASS - Installation meets code requirements',
      userOverride: 'FAIL - Request re-inspection',
      reason: 'Visual inspection revealed minor inconsistencies in tile alignment that may affect long-term durability. Requesting contractor to redo section C-4.',
      impactLevel: 'high',
      category: 'Quality Control',
      metadata: {
        inspectionId: 'cvcs-2025-014',
        location: 'Section C-4, Master Bathroom',
        contractor: 'Elite Tile & Stone'
      }
    },
    {
      id: 'audit-003',
      timestamp: new Date('2025-01-13T16:45:00'),
      userId: 'user-123',
      userName: 'John Smith',
      decisionType: 'compliance',
      originalRecommendation: 'Use 2x6 studs per IBC 2021',
      userOverride: 'Use 2x8 studs',
      reason: 'Client requested enhanced structural integrity for future solar panel installation on roof. Upgrading to 2x8 studs provides better load distribution.',
      impactLevel: 'medium',
      category: 'Structural Design',
      metadata: {
        buildingCode: 'IBC 2021',
        section: 'R602.3',
        costIncrease: 1250,
        futureProofing: true
      }
    },
    {
      id: 'audit-004',
      timestamp: new Date('2025-01-12T09:20:00'),
      userId: 'user-123',
      userName: 'John Smith',
      decisionType: 'supplier',
      originalRecommendation: 'Include Vendor X in arbitration funnel',
      userOverride: 'Exclude Vendor X (Mandatory Exclusion)',
      reason: 'Vendor X failed to deliver on previous project (Project #2024-089). Multiple delays and quality issues. Flagged as unreliable supplier.',
      impactLevel: 'critical',
      category: 'Supplier Management',
      metadata: {
        vendorId: 'vendor-x-001',
        vendorName: 'Budget Building Supplies',
        previousIssues: ['Late delivery (14 days)', 'Damaged materials (15%)', 'Poor communication'],
        blacklistDuration: 'Permanent'
      }
    },
    {
      id: 'audit-005',
      timestamp: new Date('2025-01-11T13:00:00'),
      userId: 'user-123',
      userName: 'John Smith',
      decisionType: 'supplier',
      originalRecommendation: 'Use lowest-cost supplier',
      userOverride: 'Use Local Family Hardware (Mandatory Inclusion)',
      reason: 'Long-standing relationship with Local Family Hardware. They provide exceptional service, same-day delivery, and have never failed us. Worth the 8% premium.',
      impactLevel: 'low',
      category: 'Supplier Management',
      metadata: {
        vendorId: 'vendor-local-001',
        vendorName: 'Local Family Hardware',
        relationshipYears: 12,
        reliabilityScore: 99,
        premiumPercent: 8
      }
    },
    {
      id: 'audit-006',
      timestamp: new Date('2025-01-10T11:30:00'),
      userId: 'user-123',
      userName: 'John Smith',
      decisionType: 'arbitration',
      originalRecommendation: 'Delay purchase - prices expected to drop 3% in 2 weeks',
      userOverride: 'Purchase immediately',
      reason: 'Project timeline is critical. Client has hard deadline for move-in date. Cannot risk 2-week delay even with potential 3% savings.',
      impactLevel: 'high',
      category: 'Material Procurement',
      metadata: {
        productId: 'tile-carrara-001',
        estimatedSavings: 450,
        timelinePriority: 'critical',
        clientDeadline: '2025-02-15'
      }
    }
  ];

  const categories = ['all', 'Material Procurement', 'Quality Control', 'Structural Design', 'Supplier Management'];
  const impactLevels = ['all', 'low', 'medium', 'high', 'critical'];

  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = searchQuery === '' || 
      entry.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.userOverride.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;
    const matchesImpact = filterImpact === 'all' || entry.impactLevel === filterImpact;
    
    return matchesSearch && matchesCategory && matchesImpact;
  });

  const getImpactColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getDecisionTypeIcon = (type: string) => {
    switch (type) {
      case 'arbitration': return '💰';
      case 'cvcs': return '✓';
      case 'compliance': return '🛡️';
      case 'supplier': return '🏪';
      default: return '📋';
    }
  };

  const exportAuditTrail = () => {
    const csv = [
      ['Timestamp', 'User', 'Decision Type', 'Original Recommendation', 'User Override', 'Reason', 'Impact Level', 'Category'].join(','),
      ...filteredEntries.map(entry => [
        entry.timestamp.toISOString(),
        entry.userName,
        entry.decisionType,
        `"${entry.originalRecommendation}"`,
        `"${entry.userOverride}"`,
        `"${entry.reason}"`,
        entry.impactLevel,
        entry.category
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
              <h3 className="text-lg font-light tracking-wide">Manual Override Audit Trail</h3>
              <p className="text-xs text-gray-500">Legal Defense Mechanism - All human interventions logged</p>
            </div>
          </div>
          <button
            onClick={exportAuditTrail}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-lg text-sm font-medium transition-all"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-white/5 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by reason, override, or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-teal-400/50 transition-all placeholder:text-gray-500"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1.5">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400/50 transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1.5">Impact Level</label>
              <select
                value={filterImpact}
                onChange={(e) => setFilterImpact(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400/50 transition-all"
              >
                {impactLevels.map(level => (
                  <option key={level} value={level}>{level === 'all' ? 'All Impact Levels' : level.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Showing {filteredEntries.length} of {auditEntries.length} entries</span>
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3" />
              All overrides are timestamped and immutable for legal compliance
            </span>
          </div>
        </div>

        {/* Audit Entries */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredEntries.map(entry => (
            <div key={entry.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-xl">
                    {getDecisionTypeIcon(entry.decisionType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-white">{entry.category}</h4>
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-medium border ${getImpactColor(entry.impactLevel)}`}>
                        {entry.impactLevel.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {entry.userName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {entry.timestamp.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {entry.decisionType.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <XCircle className="w-3 h-3 text-red-400" />
                    Original AI Recommendation
                  </div>
                  <div className="text-sm text-white">{entry.originalRecommendation}</div>
                </div>

                <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-3">
                  <div className="text-xs text-teal-400 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    User Override
                  </div>
                  <div className="text-sm text-white font-medium">{entry.userOverride}</div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="text-xs text-blue-400 mb-1">Reason for Override</div>
                  <div className="text-sm text-white">{entry.reason}</div>
                </div>

                {Object.keys(entry.metadata).length > 0 && (
                  <details className="bg-black/20 rounded-lg">
                    <summary className="px-3 py-2 text-xs text-gray-400 cursor-pointer hover:text-white transition-colors">
                      View Metadata ({Object.keys(entry.metadata).length} fields)
                    </summary>
                    <div className="px-3 pb-3 pt-1 grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(entry.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-500">{key}:</span>
                          <span className="text-white font-mono">{JSON.stringify(value)}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </div>
          ))}

          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No audit entries match your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

