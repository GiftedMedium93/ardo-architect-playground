import { Waves, X, Volume2, VolumeX, Activity, Zap, ArrowLeft } from "lucide-react";
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
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Waves className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide">Acoustic Analysis</h3>
            <p className="text-xs text-gray-500">Sound simulation</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Sound Simulation Visualization */}
        <div className="mb-8 p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">Sound Propagation</span>
            <Volume2 className="w-5 h-5 text-cyan-400" />
          </div>
          {/* Waveform Visualization */}
          <div className="h-32 bg-black/30 rounded-xl flex items-center justify-center overflow-hidden p-4">
            <div className="flex items-center gap-1 h-full w-full">
              {Array.from({ length: 50 }).map((_, i) => {
                const height = Math.sin(i * 0.25) * 35 + 45;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full transition-all duration-300"
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Acoustic Metrics */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Acoustic Performance</h4>
          <div className="space-y-3">
            {acousticMetrics.map((metric, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${
                  metric.status === "excellent"
                    ? "bg-green-500/10 border-green-400/20"
                    : metric.status === "optimal" || metric.status === "good"
                    ? "bg-cyan-500/10 border-cyan-400/20"
                    : "bg-yellow-500/10 border-yellow-400/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{metric.label}</span>
                  <span
                    className={`text-2xl font-light ${
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
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Activity className="w-3 h-3" />
                  <span>Target range: {metric.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acoustic Materials */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Recommended Materials</h4>
          <div className="space-y-3">
            {materialAcoustics.map((material, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white">{material.name}</span>
                  <span className="text-sm text-cyan-400 font-semibold">{material.cost}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500 text-xs">Absorption: </span>
                    <span className="font-semibold text-green-400">{material.absorption}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">Transmission: </span>
                    <span className="font-semibold text-white">{material.transmission}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-12 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-400">
            <Zap className="w-4 h-4 mr-2" />
            Run Simulation
          </Button>
          <Button className="h-12 bg-white/5 hover:bg-white/10 border border-white/10">
            <VolumeX className="w-4 h-4 mr-2" />
            Noise Map
          </Button>
        </div>
      </div>
    </div>
  );
}

