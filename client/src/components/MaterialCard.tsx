import { useState } from "react";
import { GripVertical, Info } from "lucide-react";

interface MaterialCardProps {
  material: {
    id: string;
    name: string;
    category: string;
    color: string;
    properties: {
      roughness: number;
      metalness: number;
      reflectivity: number;
    };
  };
  onDragStart: (material: any) => void;
  onApply: (material: any) => void;
}

export default function MaterialCard({ material, onDragStart, onApply }: MaterialCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("application/json", JSON.stringify(material));
    onDragStart(material);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onApply(material)}
      className={`group relative cursor-move transition-all ${
        isDragging ? "opacity-50 scale-95" : "hover:scale-105"
      }`}
    >
      <div className="relative rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/50 transition-all shadow-lg hover:shadow-teal-500/20">
        {/* Material Preview */}
        <div
          className="h-32 relative"
          style={{
            background: `linear-gradient(135deg, ${material.color} 0%, ${adjustBrightness(material.color, -20)} 100%)`,
          }}
        >
          {/* Drag Indicator */}
          <div className="absolute top-2 right-2 p-1.5 bg-black/30 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-4 h-4 text-white" />
          </div>

          {/* Material Properties Overlay */}
          {showInfo && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm p-3 flex flex-col justify-center text-xs text-white">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Roughness:</span>
                  <span>{(material.properties.roughness * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Metalness:</span>
                  <span>{(material.properties.metalness * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reflectivity:</span>
                  <span>{(material.properties.reflectivity * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Material Info */}
        <div className="p-3 bg-[#0f1419]/90 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate">{material.name}</h4>
              <p className="text-xs text-gray-500 truncate">{material.category}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(!showInfo);
              }}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Info className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Drag Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="px-4 py-2 bg-teal-500/90 backdrop-blur-sm rounded-lg text-white text-sm font-medium shadow-lg">
            Drag to apply
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to adjust color brightness
function adjustBrightness(color: string, amount: number): string {
  const hex = color.replace("#", "");
  const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

