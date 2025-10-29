import { Sparkles, X, Sun, Moon, Cloud, Zap, Image, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const renderStyles = [
  { name: "Photorealistic", icon: Image, quality: "Ultra", time: "5-10 min", color: "text-blue-400", gradient: "from-blue-500/10 to-blue-600/10" },
  { name: "Artistic", icon: Sparkles, quality: "High", time: "2-3 min", color: "text-purple-400", gradient: "from-purple-500/10 to-purple-600/10" },
  { name: "Technical", icon: Zap, quality: "Medium", time: "30 sec", color: "text-yellow-400", gradient: "from-yellow-500/10 to-yellow-600/10" },
  { name: "Sketch", icon: Image, quality: "Fast", time: "10 sec", color: "text-gray-400", gradient: "from-gray-500/10 to-gray-600/10" },
];

const lightingPresets = [
  { name: "Golden Hour", icon: Sun, time: "6:00 PM", color: "bg-gradient-to-br from-orange-400 to-amber-500" },
  { name: "Midday Sun", icon: Sun, time: "12:00 PM", color: "bg-gradient-to-br from-yellow-300 to-yellow-400" },
  { name: "Overcast", icon: Cloud, time: "Any", color: "bg-gradient-to-br from-gray-400 to-gray-500" },
  { name: "Night", icon: Moon, time: "10:00 PM", color: "bg-gradient-to-br from-indigo-900 to-purple-900" },
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
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide">Real-time Rendering</h3>
            <p className="text-xs text-gray-500">Multiple styles</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Render Styles */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Render Style</h4>
          <div className="grid grid-cols-2 gap-3">
            {renderStyles.map((style, index) => (
              <button
                key={index}
                className={`flex flex-col items-start gap-3 p-4 rounded-xl border border-white/10 bg-gradient-to-br ${style.gradient} hover:scale-[1.02] transition-all text-left`}
              >
                <style.icon className={`w-6 h-6 ${style.color}`} />
                <div className="w-full">
                  <div className="text-sm font-medium text-white mb-2">{style.name}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{style.quality}</span>
                    <span className="text-gray-500">{style.time}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Lighting Presets */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Lighting Preset</h4>
          <div className="grid grid-cols-2 gap-3">
            {lightingPresets.map((preset, index) => (
              <button
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/30 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${preset.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <preset.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-white mb-1">{preset.name}</div>
                  <div className="text-xs text-gray-500">{preset.time}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Render Queue */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Render Queue</h4>
          <div className="space-y-3">
            {renderQueue.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white">{item.name}</span>
                  {item.status === "complete" ? (
                    <button className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 font-medium">
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                  ) : (
                    <span className="text-sm text-purple-400 font-semibold">{item.progress}%</span>
                  )}
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
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
        <div className="p-6 bg-purple-500/10 border border-purple-400/20 rounded-2xl mb-6">
          <h4 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">Advanced Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Resolution</span>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400/50">
                <option>4K (3840×2160)</option>
                <option>2K (2560×1440)</option>
                <option>1080p (1920×1080)</option>
              </select>
            </div>
            {[
              { label: "Ray Tracing", enabled: true },
              { label: "Denoising", enabled: true },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{setting.label}</span>
                <div
                  className={`w-11 h-6 rounded-full relative transition-colors ${
                    setting.enabled ? "bg-teal-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      setting.enabled ? "right-1" : "left-1"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white border-0">
          <Sparkles className="w-4 h-4 mr-2" />
          Start Rendering
        </Button>
      </div>
    </div>
  );
}

