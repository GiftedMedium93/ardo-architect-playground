import { ShieldCheck, X, AlertTriangle, CheckCircle2, XCircle, Video, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const complianceItems = [
  { code: "IBC 1005.1", status: "pass", description: "Egress width requirements", location: "Main entrance" },
  { code: "NEC 210.52", status: "pass", description: "Receptacle outlet spacing", location: "Living room" },
  { code: "IRC R311.7", status: "warn", description: "Stairway width minimum", location: "Second floor stairs" },
  { code: "ADA 4.13.6", status: "fail", description: "Door opening force", location: "Bathroom door" },
  { code: "IBC 1208.3", status: "pass", description: "Natural ventilation", location: "Bedroom 1" },
];

interface ComplianceCheckPanelProps {
  onClose: () => void;
}

export default function ComplianceCheckPanel({ onClose }: ComplianceCheckPanelProps) {
  const passCount = complianceItems.filter(item => item.status === "pass").length;
  const warnCount = complianceItems.filter(item => item.status === "warn").length;
  const failCount = complianceItems.filter(item => item.status === "fail").length;
  const totalCount = complianceItems.length;
  const complianceScore = Math.round((passCount / totalCount) * 100);

  return (
    <div className="h-full flex flex-col bg-[#0f1419]">
      {/* Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-400" />
          <h3 className="font-semibold">Compliance Check</h3>
        </div>
        <button onClick={onClose} className="hover:text-teal-400 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Compliance Score */}
        <div className="mb-6 p-4 bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-400/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Overall Compliance Score</span>
            <span className="text-2xl font-bold text-green-400">{complianceScore}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-teal-400 transition-all duration-500"
              style={{ width: `${complianceScore}%` }}
            />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 bg-green-500/10 border border-green-400/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-400">{passCount}</div>
            <div className="text-xs text-gray-400">Passed</div>
          </div>
          <div className="p-3 bg-yellow-500/10 border border-yellow-400/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-400">{warnCount}</div>
            <div className="text-xs text-gray-400">Warnings</div>
          </div>
          <div className="p-3 bg-red-500/10 border border-red-400/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-400">{failCount}</div>
            <div className="text-xs text-gray-400">Failed</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button className="bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/50 text-teal-400">
            <Video className="w-4 h-4 mr-2" />
            Video Scan
          </Button>
          <Button className="bg-white/5 hover:bg-white/10 border border-white/10">
            <FileText className="w-4 h-4 mr-2" />
            Full Report
          </Button>
        </div>

        {/* Compliance Items */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Code Compliance Items</h4>
          {complianceItems.map((item, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border transition-all ${
                item.status === "pass"
                  ? "bg-green-500/5 border-green-400/30"
                  : item.status === "warn"
                  ? "bg-yellow-500/5 border-yellow-400/30"
                  : "bg-red-500/5 border-red-400/30"
              }`}
            >
              <div className="flex items-start gap-3">
                {item.status === "pass" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                ) : item.status === "warn" ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold">{item.code}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{item.location}</span>
                  </div>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

