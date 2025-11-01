import { ChevronLeft, Ruler, Move, RotateCcw, Maximize2, Grid3x3, Triangle, Circle, Box } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface MeasurementToolsPanelProps {
  onClose: () => void;
}

export default function MeasurementToolsPanel({ onClose }: MeasurementToolsPanelProps) {
  const [activeTool, setActiveTool] = useState<"distance" | "area" | "volume" | "angle" | "grid" | null>("distance");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [measurements, setMeasurements] = useState<Array<{ id: string; type: string; value: number; unit: string }>>([
    { id: "1", type: "Distance", value: 12.5, unit: "m" },
    { id: "2", type: "Area", value: 156.25, unit: "m²" },
    { id: "3", type: "Volume", value: 468.75, unit: "m³" },
  ]);

  const tools = [
    { id: "distance", icon: Ruler, label: "Distance", desc: "Measure linear distance" },
    { id: "area", icon: Maximize2, label: "Area", desc: "Calculate surface area" },
    { id: "volume", icon: Box, label: "Volume", desc: "Calculate volume" },
    { id: "angle", icon: RotateCcw, label: "Angle", desc: "Measure angles" },
    { id: "grid", icon: Grid3x3, label: "Grid Snap", desc: "Snap to grid" },
  ];

  return (
    <>
      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/5"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </Button>
          <div>
            <h3 className="text-lg font-light tracking-wide text-white">Measurement Tools</h3>
            <p className="text-xs text-gray-500">Precision measurement instruments</p>
          </div>
        </div>
        
        {/* Unit Toggle */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setUnit("metric")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              unit === "metric"
                ? "bg-teal-500/20 text-teal-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Metric
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              unit === "imperial"
                ? "bg-teal-500/20 text-teal-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Imperial
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Measurement Tools */}
        <div>
          <h4 className="text-sm font-medium text-white mb-4">Measurement Tools</h4>
          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                className={`group flex flex-col items-center gap-3 p-4 rounded-xl border transition-all ${
                  activeTool === tool.id
                    ? "bg-teal-500/10 border-teal-400/30 shadow-lg shadow-teal-500/10"
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-teal-400/20"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                  activeTool === tool.id
                    ? "bg-teal-500/20 text-teal-400"
                    : "bg-white/5 text-gray-400 group-hover:text-white"
                }`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-white mb-0.5">{tool.label}</div>
                  <div className="text-xs text-gray-500">{tool.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Measurements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-white">Active Measurements</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMeasurements([])}
              className="text-xs text-gray-400 hover:text-white"
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-2">
            {measurements.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No measurements yet. Select a tool to start measuring.
              </div>
            ) : (
              measurements.map((measurement) => (
                <div
                  key={measurement.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <Ruler className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{measurement.type}</div>
                      <div className="text-xs text-gray-500">ID: {measurement.id}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-teal-400">
                      {measurement.value}
                    </div>
                    <div className="text-xs text-gray-500">{measurement.unit}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Precision Settings */}
        <div>
          <h4 className="text-sm font-medium text-white mb-4">Precision Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <span className="text-sm text-gray-400">Decimal Places</span>
              <select className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-teal-400/50">
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <span className="text-sm text-gray-400">Grid Snap</span>
              <select className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-teal-400/50">
                <option>1 mm</option>
                <option>5 mm</option>
                <option>10 mm</option>
                <option>100 mm</option>
                <option>1000 mm</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <span className="text-sm text-gray-400">Angle Units</span>
              <select className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-teal-400/50">
                <option>Degrees</option>
                <option>Radians</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Shapes */}
        <div>
          <h4 className="text-sm font-medium text-white mb-4">Quick Shapes</h4>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Triangle, label: "Triangle" },
              { icon: Circle, label: "Circle" },
              { icon: Box, label: "Rectangle" },
            ].map((shape) => (
              <button
                key={shape.label}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-teal-400/30 transition-all group"
              >
                <shape.icon className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors" />
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                  {shape.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-400/20">
          <h4 className="text-sm font-medium text-blue-400 mb-2">How to Use</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Select a measurement tool from above</li>
            <li>• Click points in the 3D viewport to measure</li>
            <li>• Measurements appear in Active Measurements list</li>
            <li>• Toggle between Metric and Imperial units</li>
            <li>• Adjust precision settings as needed</li>
          </ul>
        </div>
      </div>
    </>
  );
}

