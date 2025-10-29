import { Library, X, Search, Filter, ArrowLeft } from "lucide-react";
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
          <div className="space-y-4">
            {featuredMaterials.map((material, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-400/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className={`w-16 h-16 rounded-xl ${material.color} flex-shrink-0 border border-white/20 shadow-lg`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white mb-1">{material.name}</div>
                    <div className="text-sm text-gray-500 mb-2">{material.category}</div>
                    <div className="text-sm font-semibold text-orange-400">{material.price}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {material.properties.map((prop, propIndex) => (
                    <span
                      key={propIndex}
                      className="px-3 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
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

