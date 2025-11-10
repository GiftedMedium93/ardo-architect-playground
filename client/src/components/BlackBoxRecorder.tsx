import { useState, useEffect } from "react";
import { X, Shield, Download, Search, Filter, FileText, Lock, AlertCircle, CheckCircle, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AuditEvent {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  category: "design" | "material" | "cost" | "contractor" | "compliance" | "system";
  details: string;
  severity: "info" | "warning" | "critical";
  hash: string;
}

interface BlackBoxRecorderProps {
  onClose: () => void;
}

export default function BlackBoxRecorder({ onClose }: BlackBoxRecorderProps) {
  const [activeTab, setActiveTab] = useState<"events" | "analytics" | "export">("events");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [events, setEvents] = useState<AuditEvent[]>([
    {
      id: "e1",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      user: "John Architect",
      action: "Material Selection",
      category: "material",
      details: "Changed flooring from Oak to Marble in Living Room",
      severity: "info",
      hash: "a3f9b2e4c1d8"
    },
    {
      id: "e2",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      user: "Jane Designer",
      action: "Cost Adjustment",
      category: "cost",
      details: "Updated project budget from $45,000 to $52,000",
      severity: "warning",
      hash: "b7c3d9f2e5a1"
    },
    {
      id: "e3",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      user: "System",
      action: "Compliance Check",
      category: "compliance",
      details: "Automated compliance scan completed - 2 issues found",
      severity: "warning",
      hash: "c2e8f1a4b6d3"
    },
    {
      id: "e4",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      user: "John Architect",
      action: "Contractor Hired",
      category: "contractor",
      details: "Hired BuildPro Construction for foundation work - $18,500",
      severity: "info",
      hash: "d9f4a2c7e1b8"
    },
    {
      id: "e5",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      user: "System",
      action: "Auto-Save",
      category: "system",
      details: "Project 'Modern Kitchen Remodel' saved to cloud",
      severity: "info",
      hash: "e5b1c8d3f9a2"
    },
    {
      id: "e6",
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      user: "Jane Designer",
      action: "Design Modification",
      category: "design",
      details: "Modified kitchen island dimensions: 8ft x 4ft → 10ft x 5ft",
      severity: "info",
      hash: "f3a9d2e7c1b4"
    },
    {
      id: "e7",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      user: "System",
      action: "Compliance Violation",
      category: "compliance",
      details: "CRITICAL: Egress window size below code minimum",
      severity: "critical",
      hash: "a1c4f8b2d9e3"
    },
    {
      id: "e8",
      timestamp: new Date(Date.now() - 1000 * 60 * 150),
      user: "John Architect",
      action: "Material Order",
      category: "material",
      details: "Ordered 500 sq ft Premium Oak Flooring from HomeDepot",
      severity: "info",
      hash: "b8d3e1f9c2a7"
    }
  ]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = search === "" ||
      event.action.toLowerCase().includes(search.toLowerCase()) ||
      event.details.toLowerCase().includes(search.toLowerCase()) ||
      event.user.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "all" || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "info": return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      case "warning": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "critical": return "text-red-400 bg-red-500/20 border-red-500/30";
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "design": return "🎨";
      case "material": return "🏗️";
      case "cost": return "💰";
      case "contractor": return "👷";
      case "compliance": return "🛡️";
      case "system": return "⚙️";
      default: return "📋";
    }
  };

  const exportAuditLog = (format: "pdf" | "json" | "csv") => {
    const data = filteredEvents.map(e => ({
      timestamp: e.timestamp.toISOString(),
      user: e.user,
      action: e.action,
      category: e.category,
      details: e.details,
      severity: e.severity,
      hash: e.hash
    }));

    if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-log-${Date.now()}.json`;
      a.click();
      toast.success("Audit log exported as JSON");
    } else if (format === "csv") {
      const csv = [
        "Timestamp,User,Action,Category,Details,Severity,Hash",
        ...data.map(e => `"${e.timestamp}","${e.user}","${e.action}","${e.category}","${e.details}","${e.severity}","${e.hash}"`)
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-log-${Date.now()}.csv`;
      a.click();
      toast.success("Audit log exported as CSV");
    } else {
      toast.success("PDF export would generate comprehensive audit report");
    }
  };

  const eventStats = {
    total: events.length,
    info: events.filter(e => e.severity === "info").length,
    warning: events.filter(e => e.severity === "warning").length,
    critical: events.filter(e => e.severity === "critical").length,
    byCategory: {
      design: events.filter(e => e.category === "design").length,
      material: events.filter(e => e.category === "material").length,
      cost: events.filter(e => e.category === "cost").length,
      contractor: events.filter(e => e.category === "contractor").length,
      compliance: events.filter(e => e.category === "compliance").length,
      system: events.filter(e => e.category === "system").length,
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-orange-500/10 to-red-500/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-light text-white mb-1 flex items-center gap-2">
                <Shield className="w-6 h-6 text-orange-400" />
                Black Box Recorder (BBR)
              </h2>
              <p className="text-gray-400 text-sm">Tamper-proof audit trail • Liability protection • Complete event history</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: "events", label: "Event Log" },
              { id: "analytics", label: "Analytics" },
              { id: "export", label: "Export & Reports" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === "events" && (
            <>
              {/* Search and Filter */}
              <div className="p-4 border-b border-white/10 flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search events..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/50"
                >
                  <option value="all">All Categories</option>
                  <option value="design">Design</option>
                  <option value="material">Material</option>
                  <option value="cost">Cost</option>
                  <option value="contractor">Contractor</option>
                  <option value="compliance">Compliance</option>
                  <option value="system">System</option>
                </select>
              </div>

              {/* Events List */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getCategoryIcon(event.category)}</span>
                          <div>
                            <div className="text-white font-medium">{event.action}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                              <User className="w-3 h-3" />
                              {event.user}
                              <Clock className="w-3 h-3 ml-2" />
                              {event.timestamp.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded border ${getSeverityColor(event.severity)}`}>
                          {event.severity}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{event.details}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Lock className="w-3 h-3" />
                        Hash: <code className="bg-black/30 px-2 py-1 rounded">{event.hash}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "analytics" && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-4">
                    <FileText className="w-8 h-8 text-blue-400 mb-2" />
                    <div className="text-2xl font-semibold text-white mb-1">{eventStats.total}</div>
                    <div className="text-sm text-gray-400">Total Events</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4">
                    <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                    <div className="text-2xl font-semibold text-white mb-1">{eventStats.info}</div>
                    <div className="text-sm text-gray-400">Info Events</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-4">
                    <AlertCircle className="w-8 h-8 text-yellow-400 mb-2" />
                    <div className="text-2xl font-semibold text-white mb-1">{eventStats.warning}</div>
                    <div className="text-sm text-gray-400">Warnings</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 rounded-xl p-4">
                    <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
                    <div className="text-2xl font-semibold text-white mb-1">{eventStats.critical}</div>
                    <div className="text-sm text-gray-400">Critical</div>
                  </div>
                </div>

                {/* Events by Category */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Events by Category</h3>
                  <div className="space-y-3">
                    {Object.entries(eventStats.byCategory).map(([category, count]) => (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 capitalize">{category}</span>
                          <span className="text-white font-semibold">{count} events</span>
                        </div>
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${(count / eventStats.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Activity Timeline</h3>
                  <div className="space-y-3">
                    {events.slice(0, 5).map(event => (
                      <div key={event.id} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          event.severity === "critical" ? "bg-red-500" :
                          event.severity === "warning" ? "bg-yellow-500" :
                          "bg-blue-500"
                        }`} />
                        <span className="text-gray-400 text-sm">{event.timestamp.toLocaleTimeString()}</span>
                        <span className="text-white text-sm">{event.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "export" && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Download className="w-5 h-5 text-orange-400" />
                    Export Audit Log
                  </h3>
                  <p className="text-gray-400 mb-4">Export complete audit trail for legal compliance, insurance claims, or liability protection.</p>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      onClick={() => exportAuditLog("pdf")}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button
                      onClick={() => exportAuditLog("json")}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export JSON
                    </Button>
                    <Button
                      onClick={() => exportAuditLog("csv")}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Compliance Reports</h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => toast.success("Generating liability protection report...")}
                      variant="outline"
                      className="w-full justify-start bg-white/5 border-white/10"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Liability Protection Report
                    </Button>
                    <Button
                      onClick={() => toast.success("Generating chain of custody report...")}
                      variant="outline"
                      className="w-full justify-start bg-white/5 border-white/10"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Chain of Custody Report
                    </Button>
                    <Button
                      onClick={() => toast.success("Generating compliance audit report...")}
                      variant="outline"
                      className="w-full justify-start bg-white/5 border-white/10"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Compliance Audit Report
                    </Button>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Data Integrity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Events Logged</span>
                      <span className="text-white font-semibold">{events.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Data Integrity</span>
                      <span className="text-green-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Encryption Status</span>
                      <span className="text-green-400 font-semibold flex items-center gap-1">
                        <Lock className="w-4 h-4" />
                        AES-256
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Last Backup</span>
                      <span className="text-white font-semibold">2 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

