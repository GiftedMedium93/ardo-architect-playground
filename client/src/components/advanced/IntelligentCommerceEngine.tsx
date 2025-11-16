import { ChevronLeft, TrendingDown, TrendingUp, Minus, AlertTriangle, CheckCircle2, XCircle, Info, Sparkles, ShoppingCart, BarChart3, RefreshCw } from "lucide-react";
import { useState } from "react";
import { 
  similarItemsDatabase, 
  availabilitySalveData, 
  priceVolatilityData,
  whatIfScenarioTemplates,
  type SimilarItem,
  type AvailabilitySalve,
  type PriceVolatilityData,
  type WhatIfScenario
} from "@/data/intelligentCommerceData";

interface IntelligentCommerceEngineProps {
  onClose: () => void;
}

type TabType = 'similar-items' | 'availability' | 'price-volatility' | 'what-if';

export default function IntelligentCommerceEngine({ onClose }: IntelligentCommerceEngineProps) {
  const [activeTab, setActiveTab] = useState<TabType>('similar-items');
  const [selectedProduct, setSelectedProduct] = useState<string>('flooring-oak-001');
  const [selectedScenario, setSelectedScenario] = useState<WhatIfScenario | null>(null);

  const tabs = [
    { id: 'similar-items' as TabType, label: 'Similar Items', icon: Sparkles },
    { id: 'availability' as TabType, label: 'Availability Salve', icon: ShoppingCart },
    { id: 'price-volatility' as TabType, label: 'Price Volatility', icon: BarChart3 },
    { id: 'what-if' as TabType, label: 'What-If Scenarios', icon: RefreshCw }
  ];

  const productOptions = [
    { id: 'flooring-oak-001', name: 'Premium Oak Hardwood Flooring' },
    { id: 'tile-carrara-001', name: 'Carrara Marble Tile 12x24' },
    { id: 'countertop-quartz-001', name: 'Quartz Countertop - Calacatta' }
  ];

  const similarItems = similarItemsDatabase[selectedProduct] || [];
  const availabilityData = availabilitySalveData.find(d => d.productId === selectedProduct);
  const volatilityData = priceVolatilityData.find(d => d.productId === selectedProduct);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cheaper': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'similar': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'luxury': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'fail': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'high': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'buy_now': return 'text-green-400 bg-green-500/10';
      case 'wait': return 'text-yellow-400 bg-yellow-500/10';
      case 'monitor': return 'text-blue-400 bg-blue-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0f1419]/80 backdrop-blur-xl">
      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <h3 className="text-lg font-light tracking-wide">Intelligent Commerce Engine</h3>
            <p className="text-xs text-gray-500">AI-Powered Material Procurement Optimization</p>
          </div>
        </div>
      </div>

      {/* Product Selector */}
      <div className="px-6 py-4 border-b border-white/5">
        <label className="block text-xs text-gray-400 mb-2">Select Product</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400/50 transition-all"
        >
          {productOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="px-6 py-3 border-b border-white/5 flex gap-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'similar-items' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Info className="w-4 h-4" />
              <span>ML-based clustering finds similar items that maintain compliance while optimizing cost</span>
            </div>

            {similarItems.map(item => (
              <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-base font-medium text-white">{item.name}</h4>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getTypeColor(item.type)}`}>
                        {item.type === 'cheaper' ? 'Cost Savings' : item.type === 'luxury' ? 'Premium Upsell' : 'Similar Quality'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Vendor: {item.vendor} • Similarity: {item.similarityScore}%</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-teal-400">${item.suggestedPrice.toFixed(2)}</div>
                    <div className={`text-xs ${item.savings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.savings >= 0 ? 'Save' : 'Premium'} ${Math.abs(item.savings).toFixed(2)} ({Math.abs(item.savingsPercent).toFixed(1)}%)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Availability</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            item.availability >= 80 ? 'bg-green-400' : 
                            item.availability >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${item.availability}%` }}
                        />
                      </div>
                      <span className="text-xs text-white font-medium">{item.availability}%</span>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Lead Time</div>
                    <div className="text-sm text-white font-medium">{item.leadTime} days</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {getComplianceIcon(item.complianceStatus)}
                  <span className="text-xs text-gray-400">{item.complianceNotes}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(item.specifications).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-500">{key}:</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-lg text-sm font-medium transition-all">
                  Select Alternative
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'availability' && availabilityData && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-medium text-white">{availabilityData.productName}</h4>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getRiskColor(availabilityData.riskLevel)}`}>
                    {availabilityData.riskLevel.toUpperCase()} RISK
                  </span>
                  <div className="text-2xl font-bold text-teal-400">{availabilityData.availabilityScore}%</div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                  <p className="text-sm text-blue-300">{availabilityData.recommendation}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-sm font-medium text-gray-400">Supplier Breakdown</h5>
                {availabilityData.suppliers.map((supplier, idx) => (
                  <div key={idx} className="bg-black/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-white">{supplier.name}</span>
                      <span className="text-xs text-gray-400">Reliability: {supplier.reliability}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Stock Level</div>
                        <div className="text-sm text-white font-medium">{supplier.stock.toLocaleString()} units</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Lead Time</div>
                        <div className="text-sm text-white font-medium">{supplier.leadTime} days</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'price-volatility' && volatilityData && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-medium text-white">{volatilityData.productName}</h4>
                <div className="text-2xl font-bold text-white">${volatilityData.currentPrice.toFixed(2)}</div>
              </div>

              <div className={`rounded-lg p-4 mb-4 ${getRecommendationColor(volatilityData.recommendation)}`}>
                <div className="flex items-start gap-2 mb-2">
                  <Info className="w-4 h-4 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium mb-1">
                      {volatilityData.recommendation === 'buy_now' ? 'BUY NOW' : 
                       volatilityData.recommendation === 'wait' ? 'WAIT' : 'MONITOR'}
                    </div>
                    <p className="text-xs opacity-90">{volatilityData.reasoning}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-400">7-Day Forecast</span>
                    {getTrendIcon(volatilityData.forecast7Day.trend)}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">${volatilityData.forecast7Day.price.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">Confidence: {volatilityData.forecast7Day.confidence}%</div>
                </div>

                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-400">30-Day Forecast</span>
                    {getTrendIcon(volatilityData.forecast30Day.trend)}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">${volatilityData.forecast30Day.price.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">Confidence: {volatilityData.forecast30Day.confidence}%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'what-if' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Info className="w-4 h-4" />
              <span>Test material substitutions and instantly see impact on cost, timeline, and compliance</span>
            </div>

            {whatIfScenarioTemplates.map(scenario => (
              <div 
                key={scenario.id} 
                className={`bg-white/5 border rounded-xl p-5 cursor-pointer transition-all ${
                  selectedScenario?.id === scenario.id 
                    ? 'border-teal-500/50 bg-teal-500/10' 
                    : 'border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setSelectedScenario(scenario)}
              >
                <h4 className="text-base font-medium text-white mb-3">{scenario.name}</h4>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Original</div>
                    <div className="text-sm text-white">{scenario.originalProduct}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Substitute</div>
                    <div className="text-sm text-teal-400">{scenario.substituteProduct}</div>
                  </div>
                </div>

                <div className="bg-black/20 rounded-lg p-4 mb-3">
                  <div className="text-xs text-gray-400 mb-3">Impact Analysis</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Cost Change</div>
                      <div className={`text-lg font-bold ${scenario.impactAnalysis.costChange < 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {scenario.impactAnalysis.costChange < 0 ? '-' : '+'}${Math.abs(scenario.impactAnalysis.costChange).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">({scenario.impactAnalysis.costChangePercent.toFixed(1)}%)</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Timeline Change</div>
                      <div className={`text-lg font-bold ${scenario.impactAnalysis.timelineChange < 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {scenario.impactAnalysis.timelineChange < 0 ? '' : '+'}{scenario.impactAnalysis.timelineChange} days
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Compliance</div>
                      <div className={`text-sm font-medium ${
                        scenario.impactAnalysis.complianceStatus === 'maintained' ? 'text-blue-400' :
                        scenario.impactAnalysis.complianceStatus === 'improved' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {scenario.impactAnalysis.complianceStatus.toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Quality Impact</div>
                      <div className={`text-sm font-medium ${
                        scenario.impactAnalysis.qualityImpact === 'better' ? 'text-green-400' :
                        scenario.impactAnalysis.qualityImpact === 'same' ? 'text-blue-400' : 'text-yellow-400'
                      }`}>
                        {scenario.impactAnalysis.qualityImpact.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-2">BOM Recalculation</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Original Cost</div>
                      <div className="text-sm text-white">${scenario.bomRecalculation.originalCost.toLocaleString()}</div>
                    </div>
                    <div className="text-gray-500">→</div>
                    <div>
                      <div className="text-xs text-gray-500">New Cost</div>
                      <div className="text-sm text-teal-400 font-bold">${scenario.bomRecalculation.newCost.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Savings</div>
                      <div className="text-lg text-green-400 font-bold">${scenario.bomRecalculation.savings.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-lg text-sm font-medium transition-all">
                  Apply Substitution
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

