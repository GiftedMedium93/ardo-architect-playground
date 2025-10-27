import { DollarSign, X, TrendingDown, Eye, Target, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const optimizationModes = [
  {
    icon: DollarSign,
    name: "Cheaper Mode",
    description: "Find lower-cost alternatives with similar functionality",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-400/30",
  },
  {
    icon: Target,
    name: "Common Mode",
    description: "Discover the most commonly used materials in similar projects",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-400/30",
  },
  {
    icon: Eye,
    name: "Visual Match Mode",
    description: "Locate visually similar materials at lower prices",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-400/30",
  },
  {
    icon: Tag,
    name: "Price Saver Mode",
    description: "Identify bulk discounts, sales, and promotional pricing",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-400/30",
  },
];

const savingsData = [
  { category: "Flooring", current: "$12,450", optimized: "$8,920", savings: "28%", match: "95%" },
  { category: "Fixtures", current: "$5,200", optimized: "$3,640", savings: "30%", match: "92%" },
  { category: "Windows", current: "$18,900", optimized: "$14,175", savings: "25%", match: "98%" },
  { category: "Roofing", current: "$22,100", optimized: "$13,260", savings: "40%", match: "88%" },
];

interface CostOptimizerPanelProps {
  onClose: () => void;
}

export default function CostOptimizerPanel({ onClose }: CostOptimizerPanelProps) {
  const totalCurrent = savingsData.reduce((sum, item) => sum + parseFloat(item.current.replace(/[$,]/g, "")), 0);
  const totalOptimized = savingsData.reduce((sum, item) => sum + parseFloat(item.optimized.replace(/[$,]/g, "")), 0);
  const totalSavings = totalCurrent - totalOptimized;
  const savingsPercent = Math.round((totalSavings / totalCurrent) * 100);

  return (
    <div className="h-full flex flex-col bg-[#0f1419]">
      {/* Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold">Cost Optimizer</h3>
        </div>
        <button onClick={onClose} className="hover:text-teal-400 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Total Savings Summary */}
        <div className="mb-6 p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-gray-300 mb-1">Potential Savings</div>
              <div className="text-3xl font-bold text-yellow-400">
                ${totalSavings.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300 mb-1">Savings Rate</div>
              <div className="text-3xl font-bold text-orange-400">{savingsPercent}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <TrendingDown className="w-4 h-4" />
            <span>Based on 6,000+ alternative materials</span>
          </div>
        </div>

        {/* Optimization Modes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Optimization Modes</h4>
          <div className="grid grid-cols-1 gap-3">
            {optimizationModes.map((mode, index) => (
              <button
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg border ${mode.bgColor} ${mode.borderColor} hover:bg-opacity-20 transition-all group text-left`}
              >
                <mode.icon className={`w-5 h-5 ${mode.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm mb-1">{mode.name}</div>
                  <div className="text-xs text-gray-400">{mode.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Savings Breakdown */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Savings Breakdown</h4>
          <div className="space-y-3">
            {savingsData.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-teal-400/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{item.category}</span>
                  <span className="text-xs text-gray-400">Match: {item.match}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-gray-400 mb-1">Current</div>
                    <div className="font-semibold">{item.current}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Optimized</div>
                    <div className="font-semibold text-green-400">{item.optimized}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Savings</div>
                    <div className="font-semibold text-yellow-400">{item.savings}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white">
          Apply Optimizations
        </Button>
      </div>
    </div>
  );
}

