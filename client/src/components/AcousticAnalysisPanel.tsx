import { Waves, X, Volume2, VolumeX, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const acousticMetrics = [
  { label: "Reverberation Time (RT60)", value: "1.2s", status: "optimal", range: "0.8-1.5s" },
  { label: "Sound Transmission Class (STC)", value: "52", status: "good", range: "45-60" },
  { label: "Noise Reduction Coefficient (NRC)", value: "0.85", status: "excellent", range: "0.7-1.0" },
  { label: "Impact Insulation Class (IIC)", value: "58", status: "good", range: "50-65" },
];

const materialAcoustics = [
  { name: "Acoustic Ceiling Panels", absorption: "0.95", transmission: "High", cost: "$8/sq ft" },
  { name: "Sound Dampening Drywall", absorption: "0.65", transmission: "Medium", cost: "$12/sq ft" },
  { name: "Carpet with Pad", absorption: "0.70", transmission: "Low", cost: "$6/sq ft" },
  { name: "Acoustic Foam Panels", absorption: "0.90", transmission: "High", cost: "$4/sq ft" },
];

interface AcousticAnalysisPanelProps {
  onClose: () => void;
}

export default function AcousticAnalysisPanel({ onClose }: AcousticAnalysisPanelProps) {
  return (
    <div className="h-full flex flex-col bg-[#0f1419]">
      {/* Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Waves className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold">Acoustic Analysis</h3>
        </div>
        <button onClick={onClose} className="hover:text-teal-400 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Sound Simulation Visualization */}
        <div className="mb-6 p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-300">Sound Propagation</span>
            <Volume2 className="w-5 h-5 text-cyan-400" />
          </div>
          {/* Waveform Visualization */}
          <div className="h-24 bg-black/30 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="flex items-center gap-1 h-full">
              {Array.from({ length: 40 }).map((_, i) => {
                const height = Math.sin(i * 0.3) * 30 + 40;
                return (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full transition-all duration-300"
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Acoustic Metrics */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Acoustic Performance</h4>
          <div className="space-y-3">
            {acousticMetrics.map((metric, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  metric.status === "excellent"
                    ? "bg-green-500/10 border-green-400/30"
                    : metric.status === "optimal" || metric.status === "good"
                    ? "bg-cyan-500/10 border-cyan-400/30"
                    : "bg-yellow-500/10 border-yellow-400/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span
                    className={`text-lg font-bold ${
                      metric.status === "excellent"
                        ? "text-green-400"
                        : metric.status === "optimal" || metric.status === "good"
                        ? "text-cyan-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {metric.value}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Activity className="w-3 h-3" />
                  <span>Target range: {metric.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acoustic Materials */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Recommended Acoustic Materials</h4>
          <div className="space-y-2">
            {materialAcoustics.map((material, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{material.name}</span>
                  <span className="text-xs text-cyan-400">{material.cost}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Absorption: </span>
                    <span className="font-semibold text-green-400">{material.absorption}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Transmission: </span>
                    <span className="font-semibold">{material.transmission}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-400">
            <Zap className="w-4 h-4 mr-2" />
            Run Simulation
          </Button>
          <Button className="bg-white/5 hover:bg-white/10 border border-white/10">
            <VolumeX className="w-4 h-4 mr-2" />
            Noise Map
          </Button>
        </div>
      </div>
    </div>
  );
}

