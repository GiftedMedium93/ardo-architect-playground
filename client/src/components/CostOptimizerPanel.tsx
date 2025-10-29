import { DollarSign, X, TrendingDown, Eye, Target, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const optimizationModes = [
  {
    icon: DollarSign,
    name: "Cheaper Mode",
    description: "Find lower-cost alternatives with similar functionality",
    color: "text-green-400",
    bgColor: "from-green-500/10 to-green-600/10",
    borderColor: "border-green-400/20",
  },
  {
    icon: Target,
    name: "Common Mode",
    description: "Discover the most commonly used materials in similar projects",
    color: "text-blue-400",
    bgColor: "from-blue-500/10 to-blue-600/10",
    borderColor: "border-blue-400/20",
  },
  {
    icon: Eye,
    name: "Visual Match Mode",
    description: "Locate visually similar materials at lower prices",
    color: "text-purple-400",
    bgColor: "from-purple-500/10 to-purple-600/10",
    borderColor: "border-purple-400/20",
  },
  {
    icon: Tag,
    name: "Price Saver Mode",
    description: "Identify bulk discounts, sales, and promotional pricing",
    color: "text-orange-400",
    bgColor: "from-orange-500/10 to-orange-600/10",
    borderColor: "border-orange-400/20",
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
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide">Cost Optimizer</h3>
            <p className="text-xs text-gray-500">4 optimization modes</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Total Savings Summary */}
        <div className="mb-8 p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-400 mb-2">Potential Savings</div>
              <div className="text-4xl font-light text-yellow-400">
                ${totalSavings.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-2">Savings Rate</div>
              <div className="text-4xl font-light text-orange-400">{savingsPercent}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <TrendingDown className="w-4 h-4" />
            <span>Based on 6,000+ alternative materials</span>
          </div>
        </div>

        {/* Optimization Modes */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Optimization Modes</h4>
          <div className="space-y-3">
            {optimizationModes.map((mode, index) => (
              <button
                key={index}
                className={`w-full flex items-start gap-4 p-4 rounded-xl border bg-gradient-to-br ${mode.bgColor} ${mode.borderColor} hover:scale-[1.02] transition-all text-left`}
              >
                <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 ${mode.color}`}>
                  <mode.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white mb-1">{mode.name}</div>
                  <div className="text-sm text-gray-400 leading-relaxed">{mode.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Savings Breakdown */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Savings Breakdown</h4>
          <div className="space-y-3">
            {savingsData.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-400/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-white">{item.category}</span>
                  <span className="text-xs text-gray-500">Match: {item.match}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Current</div>
                    <div className="font-semibold text-white">{item.current}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Optimized</div>
                    <div className="font-semibold text-green-400">{item.optimized}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Savings</div>
                    <div className="font-semibold text-yellow-400">{item.savings}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full mt-8 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white border-0">
          Apply Optimizations
        </Button>
      </div>
    </div>
  );
}

