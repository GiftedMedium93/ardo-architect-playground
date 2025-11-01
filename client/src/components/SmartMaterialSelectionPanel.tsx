import { ChevronLeft, Sparkles, TrendingUp, DollarSign, Leaf, Shield, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface SmartMaterialSelectionPanelProps {
  onClose: () => void;
}

export default function SmartMaterialSelectionPanel({ onClose }: SmartMaterialSelectionPanelProps) {
  const [criteria, setCriteria] = useState({
    budget: "medium",
    sustainability: true,
    durability: true,
    aesthetics: true,
    climate: "temperate",
  });

  const recommendations = [
    {
      id: "1",
      name: "Cross-Laminated Timber (CLT)",
      category: "Structural",
      score: 95,
      price: "$$",
      sustainability: 98,
      durability: 85,
      aesthetics: 92,
      reasons: [
        "Excellent carbon sequestration",
        "High strength-to-weight ratio",
        "Natural aesthetic appeal",
        "Suitable for temperate climates",
      ],
      applications: ["Floors", "Walls", "Roof structures"],
    },
    {
      id: "2",
      name: "Low-E Glass",
      category: "Glazing",
      score: 92,
      price: "$$$",
      sustainability: 88,
      durability: 95,
      aesthetics: 90,
      reasons: [
        "Superior thermal performance",
        "Reduces energy costs",
        "UV protection",
        "Clear visibility",
      ],
      applications: ["Windows", "Curtain walls", "Skylights"],
    },
    {
      id: "3",
      name: "Recycled Steel",
      category: "Structural",
      score: 89,
      price: "$$",
      sustainability: 95,
      durability: 98,
      aesthetics: 75,
      reasons: [
        "100% recyclable",
        "High structural integrity",
        "Cost-effective",
        "Long lifespan",
      ],
      applications: ["Beams", "Columns", "Reinforcement"],
    },
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
            <h3 className="text-lg font-light tracking-wide text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Smart Material Selection
            </h3>
            <p className="text-xs text-gray-500">AI-powered material recommendations</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Selection Criteria */}
        <div>
          <h4 className="text-sm font-medium text-white mb-4">Selection Criteria</h4>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
              <label className="text-sm text-gray-400 mb-2 block">Budget Range</label>
              <div className="flex gap-2">
                {["low", "medium", "high", "unlimited"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCriteria({ ...criteria, budget: level })}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                      criteria.budget === level
                        ? "bg-purple-500/20 text-purple-400 border border-purple-400/30"
                        : "bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
              <label className="text-sm text-gray-400 mb-2 block">Climate Zone</label>
              <select
                value={criteria.climate}
                onChange={(e) => setCriteria({ ...criteria, climate: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400/50"
              >
                <option value="tropical">Tropical</option>
                <option value="arid">Arid</option>
                <option value="temperate">Temperate</option>
                <option value="continental">Continental</option>
                <option value="polar">Polar</option>
              </select>
            </div>

            <div className="space-y-2">
              {[
                { key: "sustainability", icon: Leaf, label: "Prioritize Sustainability" },
                { key: "durability", icon: Shield, label: "Prioritize Durability" },
                { key: "aesthetics", icon: Star, label: "Prioritize Aesthetics" },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setCriteria({ ...criteria, [option.key]: !criteria[option.key as keyof typeof criteria] })}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                    criteria[option.key as keyof typeof criteria]
                      ? "bg-purple-500/10 border-purple-400/30"
                      : "bg-white/5 border-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <option.icon className={`w-4 h-4 ${
                      criteria[option.key as keyof typeof criteria] ? "text-purple-400" : "text-gray-400"
                    }`} />
                    <span className="text-sm text-white">{option.label}</span>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    criteria[option.key as keyof typeof criteria]
                      ? "bg-purple-500 border-purple-500"
                      : "border-gray-600"
                  }`}>
                    {criteria[option.key as keyof typeof criteria] && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              AI Recommendations
            </h4>
            <span className="text-xs text-gray-500">{recommendations.length} matches</span>
          </div>

          <div className="space-y-4">
            {recommendations.map((material, index) => (
              <div
                key={material.id}
                className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-purple-400/30 transition-all group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">{material.name}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-400">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{material.category}</span>
                      <span>•</span>
                      <span>{material.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-lg font-bold text-green-400">{material.score}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: "Sustainability", value: material.sustainability, icon: Leaf, color: "text-green-400" },
                    { label: "Durability", value: material.durability, icon: Shield, color: "text-blue-400" },
                    { label: "Aesthetics", value: material.aesthetics, icon: Star, color: "text-yellow-400" },
                  ].map((metric) => (
                    <div key={metric.label} className="flex flex-col items-center p-2 rounded-lg bg-black/20">
                      <metric.icon className={`w-3 h-3 mb-1 ${metric.color}`} />
                      <span className="text-xs text-gray-500 mb-0.5">{metric.label}</span>
                      <span className={`text-sm font-semibold ${metric.color}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>

                {/* Reasons */}
                <div className="mb-3">
                  <div className="text-xs font-medium text-gray-400 mb-2">Why this material?</div>
                  <ul className="space-y-1">
                    {material.reasons.map((reason, i) => (
                      <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Applications */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-500">Best for:</span>
                  {material.applications.map((app) => (
                    <span
                      key={app}
                      className="px-2 py-1 rounded-md text-xs bg-white/5 text-gray-400 border border-white/5"
                    >
                      {app}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  className="w-full mt-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-400/30"
                  size="sm"
                >
                  Apply to Selection
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-400/20">
          <h4 className="text-sm font-medium text-purple-400 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            How It Works
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Our AI analyzes your project requirements, climate conditions, budget constraints, and design preferences to recommend the most suitable materials. Each recommendation is scored based on multiple factors including sustainability, durability, cost-effectiveness, and aesthetic compatibility.
          </p>
        </div>
      </div>
    </>
  );
}

