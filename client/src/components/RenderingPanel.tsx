import { Sparkles, X, Sun, Moon, Cloud, Zap, Image, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const renderStyles = [
  { name: "Photorealistic", icon: Image, quality: "Ultra", time: "5-10 min", color: "text-blue-400" },
  { name: "Artistic", icon: Sparkles, quality: "High", time: "2-3 min", color: "text-purple-400" },
  { name: "Technical", icon: Zap, quality: "Medium", time: "30 sec", color: "text-yellow-400" },
  { name: "Sketch", icon: Image, quality: "Fast", time: "10 sec", color: "text-gray-400" },
];

const lightingPresets = [
  { name: "Golden Hour", icon: Sun, time: "6:00 PM", color: "bg-orange-400" },
  { name: "Midday Sun", icon: Sun, time: "12:00 PM", color: "bg-yellow-300" },
  { name: "Overcast", icon: Cloud, time: "Any", color: "bg-gray-400" },
  { name: "Night", icon: Moon, time: "10:00 PM", color: "bg-indigo-900" },
];

const renderQueue = [
  { name: "Living Room - Photorealistic", progress: 85, status: "rendering" },
  { name: "Kitchen - Artistic", progress: 100, status: "complete" },
  { name: "Bedroom - Technical", progress: 45, status: "rendering" },
];

interface RenderingPanelProps {
  onClose: () => void;
}

export default function RenderingPanel({ onClose }: RenderingPanelProps) {
  return (
    <div className="h-full flex flex-col bg-[#0f1419]">
      {/* Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold">Real-time Rendering</h3>
        </div>
        <button onClick={onClose} className="hover:text-teal-400 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Render Styles */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Render Style</h4>
          <div className="grid grid-cols-2 gap-2">
            {renderStyles.map((style, index) => (
              <button
                key={index}
                className="flex flex-col items-start gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all group text-left"
              >
                <style.icon className={`w-5 h-5 ${style.color}`} />
                <div className="w-full">
                  <div className="text-sm font-medium mb-1">{style.name}</div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{style.quality}</span>
                    <span>{style.time}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Lighting Presets */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Lighting Preset</h4>
          <div className="grid grid-cols-2 gap-2">
            {lightingPresets.map((preset, index) => (
              <button
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all group"
              >
                <div className={`w-10 h-10 rounded-full ${preset.color} flex items-center justify-center flex-shrink-0`}>
                  <preset.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{preset.name}</div>
                  <div className="text-xs text-gray-400">{preset.time}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Render Queue */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Render Queue</h4>
          <div className="space-y-3">
            {renderQueue.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.status === "complete" ? (
                    <button className="text-xs text-teal-400 hover:underline flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  ) : (
                    <span className="text-xs text-purple-400">{item.progress}%</span>
                  )}
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      item.status === "complete"
                        ? "bg-gradient-to-r from-green-400 to-teal-400"
                        : "bg-gradient-to-r from-purple-400 to-pink-400"
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Render Settings */}
        <div className="p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg mb-4">
          <h4 className="text-sm font-medium mb-3">Advanced Settings</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Resolution</span>
              <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs">
                <option>4K (3840×2160)</option>
                <option>2K (2560×1440)</option>
                <option>1080p (1920×1080)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Ray Tracing</span>
              <div className="w-10 h-5 bg-teal-500 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Denoising</span>
              <div className="w-10 h-5 bg-teal-500 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
          <Sparkles className="w-4 h-4 mr-2" />
          Start Rendering
        </Button>
      </div>
    </div>
  );
}

