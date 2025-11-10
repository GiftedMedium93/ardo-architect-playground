import { useState } from "react";
import { X, Search, DollarSign, Clock, TrendingUp, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectTemplates, categories, type ProjectTemplate } from "@/lib/projectTemplates";
import { toast } from "sonner";

interface ProjectTemplatesLibraryProps {
  onClose: () => void;
  onLoadTemplate?: (template: ProjectTemplate) => void;
}

export default function ProjectTemplatesLibrary({ onClose, onLoadTemplate }: ProjectTemplatesLibraryProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);

  const filteredTemplates = projectTemplates.filter(template => {
    const matchesSearch = search === "" ||
      template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLoadTemplate = (template: ProjectTemplate) => {
    if (onLoadTemplate) {
      onLoadTemplate(template);
    }
    toast.success(`Loaded "${template.name}" template with ${template.products.length} products`);
    onClose();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400 bg-green-500/20 border-green-500/30";
      case "Intermediate": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "Advanced": return "text-red-400 bg-red-500/20 border-red-500/30";
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-light text-white mb-1 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Project Templates Library
              </h2>
              <p className="text-gray-400 text-sm">10 professional templates • One-click loading • Pre-configured designs</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Templates Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`bg-white/5 border rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer group ${
                    selectedTemplate?.id === template.id ? 'border-purple-500 bg-purple-500/10' : 'border-white/10'
                  }`}
                >
                  {/* Template Header */}
                  <div className="mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-semibold text-lg">{template.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(template.difficulty)}`}>
                        {template.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{template.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-black/20 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-green-400 mb-1">
                        <DollarSign className="w-3 h-3" />
                        <span className="text-xs font-medium">Cost</span>
                      </div>
                      <div className="text-white text-sm font-semibold">
                        ${(template.estimatedCost / 1000).toFixed(0)}k
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-blue-400 mb-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-medium">Time</span>
                      </div>
                      <div className="text-white text-sm font-semibold">{template.timeline.split('-')[0]}</div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-purple-400 mb-1">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-medium">Sq Ft</span>
                      </div>
                      <div className="text-white text-sm font-semibold">{template.squareFootage}</div>
                    </div>
                  </div>

                  {/* Features Preview */}
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Features ({template.features.length})</div>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 3 && (
                        <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">
                          +{template.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* AI Partner */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>AI Partner: <span className="text-purple-400">{template.aiPartner}</span></span>
                    <span>{template.products.length} products</span>
                  </div>

                  {/* Load Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoadTemplate(template);
                    }}
                    className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30"
                    size="sm"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Load Template
                  </Button>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">No templates found</p>
              </div>
            )}
          </div>

          {/* Template Details */}
          {selectedTemplate && (
            <div className="w-96 border-l border-white/10 overflow-y-auto p-6 bg-black/20">
              <h3 className="text-white font-semibold text-lg mb-4">{selectedTemplate.name}</h3>

              <div className="space-y-4">
                {/* Description */}
                <div>
                  <div className="text-sm text-gray-500 mb-1">Description</div>
                  <p className="text-gray-300 text-sm">{selectedTemplate.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Estimated Cost</div>
                    <div className="text-green-400 font-semibold">${selectedTemplate.estimatedCost.toLocaleString()}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Timeline</div>
                    <div className="text-blue-400 font-semibold">{selectedTemplate.timeline}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Square Footage</div>
                    <div className="text-purple-400 font-semibold">{selectedTemplate.squareFootage} sq ft</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Difficulty</div>
                    <div className={`font-semibold ${
                      selectedTemplate.difficulty === "Beginner" ? "text-green-400" :
                      selectedTemplate.difficulty === "Intermediate" ? "text-yellow-400" :
                      "text-red-400"
                    }`}>{selectedTemplate.difficulty}</div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="text-sm text-gray-500 mb-2">Features ({selectedTemplate.features.length})</div>
                  <div className="space-y-1">
                    {selectedTemplate.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <div className="text-sm text-gray-500 mb-2">Materials ({selectedTemplate.materials.length})</div>
                  <div className="space-y-1">
                    {selectedTemplate.materials.map((material, idx) => (
                      <div key={idx} className="text-sm text-gray-400 bg-white/5 rounded px-2 py-1">
                        {material}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Partner */}
                <div>
                  <div className="text-sm text-gray-500 mb-1">Recommended AI Partner</div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                    <div className="text-purple-400 font-semibold">{selectedTemplate.aiPartner}</div>
                  </div>
                </div>

                {/* Load Button */}
                <Button
                  onClick={() => handleLoadTemplate(selectedTemplate)}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Load This Template
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

