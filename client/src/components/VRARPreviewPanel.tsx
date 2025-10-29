import { Glasses, X, Play, Maximize2, Move3d, RotateCw, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const vrDevices = [
  { name: "Meta Quest 3", status: "connected", battery: "85%", color: "text-green-400" },
  { name: "HTC Vive Pro", status: "available", battery: "N/A", color: "text-blue-400" },
  { name: "Microsoft HoloLens", status: "offline", battery: "N/A", color: "text-gray-500" },
];

const previewModes = [
  { icon: Eye, name: "First Person", description: "Walk through your design" },
  { icon: Move3d, name: "Orbit View", description: "360° exterior view" },
  { icon: Maximize2, name: "Room Scale", description: "1:1 scale immersion" },
  { icon: RotateCw, name: "Fly Mode", description: "Free camera movement" },
];

interface VRARPreviewPanelProps {
  onClose: () => void;
}

export default function VRARPreviewPanel({ onClose }: VRARPreviewPanelProps) {
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
          <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
            <Glasses className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide">VR/AR Preview</h3>
            <p className="text-xs text-gray-500">Immersive view</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* VR Preview Window */}
        <div className="mb-8 aspect-video bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-400/20 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Glasses className="w-20 h-20 text-pink-400/30 mx-auto mb-6" />
              <p className="text-sm text-gray-400 mb-6 font-light">VR Preview Ready</p>
              <Button className="h-12 px-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white border-0">
                <Play className="w-4 h-4 mr-2" />
                Launch VR Mode
              </Button>
            </div>
          </div>
          {/* Recording Indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-white font-medium">Ready</span>
          </div>
        </div>

        {/* Connected Devices */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Connected Devices</h4>
          <div className="space-y-3">
            {vrDevices.map((device, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <Glasses className={`w-5 h-5 ${device.color}`} />
                  <div>
                    <div className="text-sm font-medium text-white">{device.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{device.status}</div>
                  </div>
                </div>
                {device.battery !== "N/A" && (
                  <span className="text-sm text-green-400 font-semibold">{device.battery}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview Modes */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Preview Modes</h4>
          <div className="grid grid-cols-2 gap-3">
            {previewModes.map((mode, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/30 transition-all"
              >
                <mode.icon className="w-7 h-7 text-pink-400" />
                <div className="text-center">
                  <div className="text-sm font-medium text-white mb-1">{mode.name}</div>
                  <div className="text-xs text-gray-500">{mode.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* VR Settings */}
        <div className="p-6 bg-purple-500/10 border border-purple-400/20 rounded-2xl">
          <h4 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">VR Settings</h4>
          <div className="space-y-4">
            {[
              { label: "Comfort Mode", enabled: true },
              { label: "Teleport Movement", enabled: false },
              { label: "Hand Tracking", enabled: true },
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
      </div>
    </div>
  );
}

