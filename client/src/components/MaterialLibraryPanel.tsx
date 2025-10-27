import { Library, X, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    name: "Carrara Marble",
    category: "Stone",
    price: "$45/sq ft",
    color: "bg-gray-100",
    properties: ["Durable", "Elegant", "Natural"],
  },
  {
    name: "White Oak",
    category: "Wood",
    price: "$12/bd ft",
    color: "bg-amber-200",
    properties: ["Hardwood", "Sustainable", "Classic"],
  },
  {
    name: "Brushed Steel",
    category: "Metal",
    price: "$28/sq ft",
    color: "bg-slate-300",
    properties: ["Modern", "Corrosion-resistant", "Industrial"],
  },
  {
    name: "Low-E Glass",
    category: "Glass",
    price: "$35/sq ft",
    color: "bg-cyan-100",
    properties: ["Energy-efficient", "UV-blocking", "Clear"],
  },
];

interface MaterialLibraryPanelProps {
  onClose: () => void;
}

export default function MaterialLibraryPanel({ onClose }: MaterialLibraryPanelProps) {
  return (
    <div className="h-full flex flex-col bg-[#0f1419]">
      {/* Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Library className="w-5 h-5 text-orange-400" />
          <h3 className="font-semibold">Material Library</h3>
        </div>
        <button onClick={onClose} className="hover:text-teal-400 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search 6,000+ materials..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>
        </div>

        {/* Filter Button */}
        <Button className="w-full mb-6 bg-white/5 hover:bg-white/10 border border-white/10 justify-start">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>

        {/* Material Categories */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Categories</h4>
          <div className="grid grid-cols-2 gap-2">
            {materialCategories.map((category, index) => (
              <button
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 transition-all group text-left"
              >
                <div className={`w-8 h-8 rounded ${category.color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs">{category.name}</div>
                  <div className="text-[10px] text-gray-400">{category.count} items</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Materials */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Featured Materials</h4>
          <div className="space-y-3">
            {featuredMaterials.map((material, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-teal-400/50 transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-12 h-12 rounded ${material.color} flex-shrink-0 border border-white/20`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm mb-0.5">{material.name}</div>
                    <div className="text-xs text-gray-400 mb-1">{material.category}</div>
                    <div className="text-xs font-semibold text-teal-400">{material.price}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {material.properties.map((prop, propIndex) => (
                    <span
                      key={propIndex}
                      className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-gray-300"
                    >
                      {prop}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

