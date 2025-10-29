import { ShieldCheck, X, AlertTriangle, CheckCircle2, XCircle, Video, FileText, ArrowLeft } from "lucide-react";
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
    <div className="h-full flex flex-col bg-[#0f1419]/80 backdrop-blur-xl">
      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-all -ml-2"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide">Compliance Check</h3>
            <p className="text-xs text-gray-500">Code scanning</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Compliance Score */}
        <div className="mb-8 p-6 bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-400/20 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">Overall Compliance Score</span>
            <span className="text-4xl font-light text-green-400">{complianceScore}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-teal-400 transition-all duration-500 rounded-full"
              style={{ width: `${complianceScore}%` }}
            />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-xl text-center">
            <div className="text-3xl font-light text-green-400 mb-1">{passCount}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Passed</div>
          </div>
          <div className="p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-xl text-center">
            <div className="text-3xl font-light text-yellow-400 mb-1">{warnCount}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Warnings</div>
          </div>
          <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-xl text-center">
            <div className="text-3xl font-light text-red-400 mb-1">{failCount}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Failed</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Button className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-green-400 h-12">
            <Video className="w-4 h-4 mr-2" />
            Video Scan
          </Button>
          <Button className="bg-white/5 hover:bg-white/10 border border-white/10 h-12">
            <FileText className="w-4 h-4 mr-2" />
            Full Report
          </Button>
        </div>

        {/* Compliance Items */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Code Compliance Items</h4>
          {complianceItems.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all ${
                item.status === "pass"
                  ? "bg-green-500/5 border-green-400/20"
                  : item.status === "warn"
                  ? "bg-yellow-500/5 border-yellow-400/20"
                  : "bg-red-500/5 border-red-400/20"
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
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm font-semibold text-white">{item.code}</span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-500">{item.location}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

