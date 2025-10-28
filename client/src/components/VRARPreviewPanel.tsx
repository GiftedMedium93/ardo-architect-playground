import { Glasses, X, Play, Maximize2, Move3d, RotateCw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const vrDevices = [
  { name: "Meta Quest 3", status: "connected", battery: "85%", color: "text-green-400" },
  { name: "HTC Vive Pro", status: "available", battery: "N/A", color: "text-blue-400" },
  { name: "Microsoft HoloLens", status: "offline", battery: "N/A", color: "text-gray-400" },
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
    <div className="h-full flex flex-col bg-[#0f1419]">
      {/* Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Glasses className="w-5 h-5 text-pink-400" />
          <h3 className="font-semibold">VR/AR Preview</h3>
        </div>
        <button onClick={onClose} className="hover:text-teal-400 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* VR Preview Window */}
        <div className="mb-6 aspect-video bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Glasses className="w-16 h-16 text-pink-400/40 mx-auto mb-4" />
              <p className="text-sm text-gray-400 mb-4">VR Preview Ready</p>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                <Play className="w-4 h-4 mr-2" />
                Launch VR Mode
              </Button>
            </div>
          </div>
          {/* Recording Indicator */}
          <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-white">Ready</span>
          </div>
        </div>

        {/* Connected Devices */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Connected Devices</h4>
          <div className="space-y-2">
            {vrDevices.map((device, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <Glasses className={`w-5 h-5 ${device.color}`} />
                  <div>
                    <div className="text-sm font-medium">{device.name}</div>
                    <div className="text-xs text-gray-400">{device.status}</div>
                  </div>
                </div>
                {device.battery !== "N/A" && (
                  <span className="text-xs text-green-400">{device.battery}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview Modes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Preview Modes</h4>
          <div className="grid grid-cols-2 gap-2">
            {previewModes.map((mode, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-400/50 transition-all group"
              >
                <mode.icon className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
                <div className="text-center">
                  <div className="text-xs font-medium">{mode.name}</div>
                  <div className="text-[10px] text-gray-400">{mode.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* VR Settings */}
        <div className="p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
          <h4 className="text-sm font-medium mb-3">VR Settings</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Comfort Mode</span>
              <div className="w-10 h-5 bg-teal-500 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Teleport Movement</span>
              <div className="w-10 h-5 bg-white/20 rounded-full relative">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Hand Tracking</span>
              <div className="w-10 h-5 bg-teal-500 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

