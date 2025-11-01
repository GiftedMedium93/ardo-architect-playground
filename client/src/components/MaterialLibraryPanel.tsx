import { Library, X, Search, Filter, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaterialCard from "./MaterialCard";
import { useState } from "react";

const materialCategories = [
  { name: "Stone", count: 342, color: "bg-gray-500" },
  { name: "Wood", count: 456, color: "bg-amber-700" },
  { name: "Metal", count: 289, color: "bg-slate-400" },
  { name: "Glass", count: 178, color: "bg-cyan-300" },
  { name: "Concrete", count: 234, color: "bg-stone-500" },
  { name: "Fabric", count: 567, color: "bg-rose-400" },
  { name: "Ceramic", count: 312, color: "bg-orange-400" },
  { name: "Composite", count: 198, color: "bg-teal-500" },
];

const featuredMaterials = [
  {
    id: "carrara-marble",
    name: "Carrara Marble",
    category: "Stone",
    color: "#F5F5F5",
    properties: { roughness: 0.2, metalness: 0, reflectivity: 0.5 },
  },
  {
    id: "white-oak",
    name: "White Oak",
    category: "Wood",
    color: "#D4A574",
    properties: { roughness: 0.7, metalness: 0, reflectivity: 0.2 },
  },
  {
    id: "brushed-steel",
    name: "Brushed Steel",
    category: "Metal",
    color: "#C0C0C0",
    properties: { roughness: 0.4, metalness: 0.9, reflectivity: 0.6 },
  },
  {
    id: "low-e-glass",
    name: "Low-E Glass",
    category: "Glass",
    color: "#E8F4F8",
    properties: { roughness: 0.05, metalness: 0, reflectivity: 0.9 },
  },
  {
    id: "concrete-polished",
    name: "Polished Concrete",
    category: "Concrete",
    color: "#8B8D8E",
    properties: { roughness: 0.3, metalness: 0.1, reflectivity: 0.4 },
  },
  {
    id: "brick-red",
    name: "Red Brick",
    category: "Masonry",
    color: "#B7410E",
    properties: { roughness: 0.9, metalness: 0, reflectivity: 0.1 },
  },
];

interface MaterialLibraryPanelProps {
  onClose: () => void;
}

export default function MaterialLibraryPanel({ onClose }: MaterialLibraryPanelProps) {
  const [draggedMaterial, setDraggedMaterial] = useState<any>(null);

  const handleMaterialDragStart = (material: any) => {
    setDraggedMaterial(material);
    console.log("Dragging material:", material);
  };

  const handleMaterialApply = (material: any) => {
    console.log("Applying material:", material);
    // TODO: Apply material to selected 3D object
  };
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
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Library className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide">Material Library</h3>
            <p className="text-xs text-gray-500">6,000+ materials</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search 6,000+ materials..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-orange-400/50 focus:bg-white/10 transition-all placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Filter Button */}
        <Button className="w-full mb-8 h-12 bg-white/5 hover:bg-white/10 border border-white/10 justify-start">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>

        {/* Material Categories */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Categories</h4>
          <div className="grid grid-cols-2 gap-3">
            {materialCategories.map((category, index) => (
              <button
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-400/30 transition-all text-left"
              >
                <div className={`w-10 h-10 rounded-lg ${category.color} flex-shrink-0 shadow-lg`} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.count} items</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Materials */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Featured Materials</h4>
          <p className="text-xs text-gray-500 mb-4">Drag materials onto the 3D canvas to apply them</p>
          <div className="grid grid-cols-2 gap-4">
            {featuredMaterials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onDragStart={handleMaterialDragStart}
                onApply={handleMaterialApply}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

