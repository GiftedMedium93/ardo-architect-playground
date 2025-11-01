import { ArrowLeft, Train, Car, Building2, Mountain, Users, Bike, DollarSign, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  railSystems,
  lightRailSystems,
  roadTypes,
  bridgeTypes,
  tunnelTypes,
  intersectionTypes,
  pedestrianInfrastructure,
  bicycleInfrastructure,
  calculateTrafficFlow,
  estimateInfrastructureCost,
  type RailSystem,
  type LightRailSystem,
  type RoadType,
  type BridgeType,
  type TunnelType,
} from "@/lib/transportationInfrastructureData";

interface TransportationInfrastructurePanelProps {
  onClose: () => void;
}

export default function TransportationInfrastructurePanel({ onClose }: TransportationInfrastructurePanelProps) {
  const [activeTab, setActiveTab] = useState<"rail" | "light_rail" | "roads" | "bridges" | "tunnels" | "intersections" | "pedestrian" | "bicycle" | "calculator">("rail");
  const [selectedRail, setSelectedRail] = useState<RailSystem | null>(null);
  const [selectedLightRail, setSelectedLightRail] = useState<LightRailSystem | null>(null);
  const [selectedRoad, setSelectedRoad] = useState<RoadType | null>(null);
  const [selectedBridge, setSelectedBridge] = useState<BridgeType | null>(null);
  const [selectedTunnel, setSelectedTunnel] = useState<TunnelType | null>(null);
  
  // Calculator state
  const [calcType, setCalcType] = useState<"rail" | "road" | "bridge" | "tunnel">("road");
  const [calcSystemId, setCalcSystemId] = useState("arterial");
  const [calcLength, setCalcLength] = useState(5); // km or meters

  const costEstimate = estimateInfrastructureCost(calcType, calcLength, calcSystemId);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-2xl font-light text-white flex items-center gap-3">
                  <Train className="h-7 w-7 text-cyan-400" />
                  Transportation Infrastructure Design
                </h2>
                <p className="text-sm text-white/60 mt-1">
                  Comprehensive database for community transportation planning
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {[
              { id: "rail", label: "Rail Systems", icon: Train },
              { id: "light_rail", label: "Light Rail & Trams", icon: Train },
              { id: "roads", label: "Roads & Highways", icon: Car },
              { id: "bridges", label: "Bridges", icon: Building2 },
              { id: "tunnels", label: "Tunnels", icon: Mountain },
              { id: "intersections", label: "Intersections", icon: BarChart3 },
              { id: "pedestrian", label: "Pedestrian", icon: Users },
              { id: "bicycle", label: "Bicycle", icon: Bike },
              { id: "calculator", label: "Cost Calculator", icon: DollarSign },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-cyan-500 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "rail" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {railSystems.map((rail) => (
                  <div
                    key={rail.id}
                    onClick={() => setSelectedRail(selectedRail?.id === rail.id ? null : rail)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedRail?.id === rail.id
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">{rail.name}</h3>
                      <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/70 capitalize">
                        {rail.type.replace("_", " ")}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/70">
                        <span>Max Speed:</span>
                        <span className="text-white">{rail.maxSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Capacity:</span>
                        <span className="text-white">{rail.capacity.toLocaleString()}/hr</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Cost:</span>
                        <span className="text-white">${rail.costPerKm}M/km</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedRail && (
                <div className="mt-6 p-6 rounded-xl border border-cyan-500/30 bg-cyan-500/5">
                  <h3 className="text-xl font-medium text-white mb-4">{selectedRail.name} - Detailed Specifications</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Technical Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Track Gauge:</span>
                          <span className="text-white">{selectedRail.trackGauge} mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Power System:</span>
                          <span className="text-white capitalize">{selectedRail.powerSystem.replace("_", " ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Right-of-Way:</span>
                          <span className="text-white">{selectedRail.rightOfWayWidth} m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Min Curve Radius:</span>
                          <span className="text-white">{selectedRail.minimumCurveRadius} m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Max Grade:</span>
                          <span className="text-white">{selectedRail.maximumGrade}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Station Spacing</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Minimum:</span>
                          <span className="text-white">{selectedRail.stationSpacing.min} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Maximum:</span>
                          <span className="text-white">{selectedRail.stationSpacing.max} km</span>
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-white/70 mb-2 mt-4">Best Use Case</h4>
                      <p className="text-sm text-white/80">{selectedRail.bestUseCase}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Economics</h4>
                      <div className="p-4 rounded-lg bg-white/5">
                        <div className="text-2xl font-light text-white mb-1">
                          ${selectedRail.costPerKm}M
                        </div>
                        <div className="text-xs text-white/60">per kilometer</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Advantages</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedRail.advantages.map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Disadvantages</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedRail.disadvantages.map((dis, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">✗</span>
                            <span>{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "light_rail" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lightRailSystems.map((lrt) => (
                  <div
                    key={lrt.id}
                    onClick={() => setSelectedLightRail(selectedLightRail?.id === lrt.id ? null : lrt)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedLightRail?.id === lrt.id
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">{lrt.name}</h3>
                      <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/70 capitalize">
                        {lrt.type.replace("_", " ")}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/70">
                        <span>Max Speed:</span>
                        <span className="text-white">{lrt.maxSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Capacity:</span>
                        <span className="text-white">{lrt.capacity.toLocaleString()}/hr</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Cost:</span>
                        <span className="text-white">${lrt.costPerKm}M/km</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedLightRail && (
                <div className="mt-6 p-6 rounded-xl border border-blue-500/30 bg-blue-500/5">
                  <h3 className="text-xl font-medium text-white mb-4">{selectedLightRail.name} - Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Advantages</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedLightRail.advantages.map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Disadvantages</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedLightRail.disadvantages.map((dis, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">✗</span>
                            <span>{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "roads" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadTypes.map((road) => (
                  <div
                    key={road.id}
                    onClick={() => setSelectedRoad(selectedRoad?.id === road.id ? null : road)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedRoad?.id === road.id
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">{road.name}</h3>
                      <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/70 capitalize">
                        {road.classification}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-white/60">Lanes:</span>
                        <p className="text-white">{road.lanes}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Width:</span>
                        <p className="text-white">{road.width} m</p>
                      </div>
                      <div>
                        <span className="text-white/60">Speed:</span>
                        <p className="text-white">{road.designSpeed} km/h</p>
                      </div>
                      <div>
                        <span className="text-white/60">Capacity:</span>
                        <p className="text-white">{road.capacity.toLocaleString()}/hr</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      {road.bikeLanes && <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-300">Bike Lanes</span>}
                      {road.sidewalks && <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300">Sidewalks</span>}
                      {road.parkingAllowed && <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300">Parking</span>}
                    </div>
                  </div>
                ))}
              </div>

              {selectedRoad && (
                <div className="mt-6 p-6 rounded-xl border border-orange-500/30 bg-orange-500/5">
                  <h3 className="text-xl font-medium text-white mb-4">{selectedRoad.name} - Specifications</h3>
                  <p className="text-sm text-white/70 mb-4"><strong>Typical Use:</strong> {selectedRoad.typicalUse}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Right-of-Way:</span>
                      <p className="text-white">{selectedRoad.rightOfWayWidth} m</p>
                    </div>
                    <div>
                      <span className="text-white/60">Min Curve Radius:</span>
                      <p className="text-white">{selectedRoad.minimumCurveRadius} m</p>
                    </div>
                    <div>
                      <span className="text-white/60">Max Grade:</span>
                      <p className="text-white">{selectedRoad.maximumGrade}%</p>
                    </div>
                    <div>
                      <span className="text-white/60">Cost:</span>
                      <p className="text-white">${selectedRoad.costPerKm}M/km</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "bridges" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bridgeTypes.map((bridge) => (
                  <div
                    key={bridge.id}
                    onClick={() => setSelectedBridge(selectedBridge?.id === bridge.id ? null : bridge)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedBridge?.id === bridge.id
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">{bridge.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        bridge.aestheticRating === "iconic" ? "bg-yellow-500/20 text-yellow-300" :
                        bridge.aestheticRating === "moderate" ? "bg-blue-500/20 text-blue-300" :
                        "bg-gray-500/20 text-gray-300"
                      }`}>
                        {bridge.aestheticRating}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/70">
                        <span>Max Span:</span>
                        <span className="text-white">{bridge.maxSpan} m</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Load Capacity:</span>
                        <span className="text-white">{bridge.loadCapacity.toLocaleString()} tons</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Lifespan:</span>
                        <span className="text-white">{bridge.lifespan} years</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedBridge && (
                <div className="mt-6 p-6 rounded-xl border border-purple-500/30 bg-purple-500/5">
                  <h3 className="text-xl font-medium text-white mb-4">{selectedBridge.name} - Details</h3>
                  <p className="text-sm text-white/70 mb-4"><strong>Best Use Case:</strong> {selectedBridge.bestUseCase}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Advantages</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedBridge.advantages.map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Disadvantages</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedBridge.disadvantages.map((dis, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">✗</span>
                            <span>{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "tunnels" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tunnelTypes.map((tunnel) => (
                  <div
                    key={tunnel.id}
                    onClick={() => setSelectedTunnel(selectedTunnel?.id === tunnel.id ? null : tunnel)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedTunnel?.id === tunnel.id
                        ? "border-gray-500 bg-gray-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">{tunnel.name}</h3>
                      <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/70 capitalize">
                        {tunnel.method.replace("_", " ")}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/70">
                        <span>Diameter:</span>
                        <span className="text-white">{tunnel.diameter} m</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Construction Speed:</span>
                        <span className="text-white">{tunnel.constructionSpeed} m/day</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Cost:</span>
                        <span className="text-white">${tunnel.costPerMeter}k/m</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedTunnel && (
                <div className="mt-6 p-6 rounded-xl border border-gray-500/30 bg-gray-500/5">
                  <h3 className="text-xl font-medium text-white mb-4">{selectedTunnel.name} - Details</h3>
                  <p className="text-sm text-white/70 mb-4"><strong>Best Use Case:</strong> {selectedTunnel.bestUseCase}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Advantages</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedTunnel.advantages.map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Disadvantages</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedTunnel.disadvantages.map((dis, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">✗</span>
                            <span>{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "intersections" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {intersectionTypes.map((intersection) => (
                <div
                  key={intersection.id}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all"
                >
                  <h3 className="text-lg font-medium text-white mb-2">{intersection.name}</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-white/70">
                      <span>Capacity:</span>
                      <span className="text-white">{intersection.capacity.toLocaleString()} veh/hr</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Safety Rating:</span>
                      <span className={`font-medium ${
                        intersection.safetyRating === "very_high" ? "text-green-400" :
                        intersection.safetyRating === "high" ? "text-lime-400" :
                        intersection.safetyRating === "moderate" ? "text-yellow-400" :
                        "text-red-400"
                      }`}>
                        {intersection.safetyRating.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Cost:</span>
                      <span className="text-white">${intersection.cost.toLocaleString()}k</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {intersection.pedestrianFriendly && <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-300">Pedestrian</span>}
                    {intersection.bikeFriendly && <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-300">Bike</span>}
                  </div>
                  <details className="mt-3 text-sm">
                    <summary className="text-white/70 cursor-pointer hover:text-white">View Details</summary>
                    <div className="mt-2 space-y-2">
                      <div>
                        <span className="text-white/60">Advantages:</span>
                        <ul className="mt-1 space-y-1 text-white/60 pl-4">
                          {intersection.advantages.map((adv, idx) => (
                            <li key={idx}>• {adv}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-white/60">Disadvantages:</span>
                        <ul className="mt-1 space-y-1 text-white/60 pl-4">
                          {intersection.disadvantages.map((dis, idx) => (
                            <li key={idx}>• {dis}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}

          {activeTab === "pedestrian" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pedestrianInfrastructure.map((ped) => (
                <div
                  key={ped.id}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all"
                >
                  <h3 className="text-lg font-medium text-white mb-2">{ped.name}</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-white/70">
                      <span>Width:</span>
                      <span className="text-white">{ped.width} m</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Surface:</span>
                      <span className="text-white">{ped.surfaceMaterial}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Accessibility:</span>
                      <span className={`font-medium ${
                        ped.accessibility === "ADA_compliant" ? "text-green-400" :
                        ped.accessibility === "partial" ? "text-yellow-400" :
                        "text-red-400"
                      }`}>
                        {ped.accessibility.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Cost:</span>
                      <span className="text-white">${ped.costPerMeter}/m</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ped.lighting && <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-300">Lighting</span>}
                    {ped.landscaping && <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-300">Landscaping</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "bicycle" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bicycleInfrastructure.map((bike) => (
                <div
                  key={bike.id}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all"
                >
                  <h3 className="text-lg font-medium text-white mb-2">{bike.name}</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <span className="text-white/60">Width:</span>
                      <p className="text-white">{bike.width} m</p>
                    </div>
                    <div>
                      <span className="text-white/60">Protection:</span>
                      <p className="text-white capitalize">{bike.protection.replace("_", " ")}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Safety:</span>
                      <p className={`font-medium ${
                        bike.safetyRating === "very_high" ? "text-green-400" :
                        bike.safetyRating === "high" ? "text-lime-400" :
                        bike.safetyRating === "moderate" ? "text-yellow-400" :
                        "text-red-400"
                      }`}>
                        {bike.safetyRating.replace("_", " ")}
                      </p>
                    </div>
                    <div>
                      <span className="text-white/60">Comfort:</span>
                      <p className={`font-medium ${
                        bike.userComfort === "very_high" ? "text-green-400" :
                        bike.userComfort === "high" ? "text-lime-400" :
                        bike.userComfort === "moderate" ? "text-yellow-400" :
                        "text-red-400"
                      }`}>
                        {bike.userComfort.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="text-white/60 text-sm">Cost:</span>
                    <p className="text-white">${bike.costPerKm}k/km</p>
                  </div>
                  <details className="text-sm">
                    <summary className="text-white/70 cursor-pointer hover:text-white">Advantages</summary>
                    <ul className="mt-2 space-y-1 text-white/60 pl-4">
                      {bike.advantages.map((adv, idx) => (
                        <li key={idx}>• {adv}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              ))}
            </div>
          )}

          {activeTab === "calculator" && (
            <div className="max-w-4xl mx-auto">
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="text-xl font-medium text-white mb-6">Infrastructure Cost Calculator</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Infrastructure Type
                    </label>
                    <select
                      value={calcType}
                      onChange={(e) => {
                        setCalcType(e.target.value as any);
                        setCalcSystemId(
                          e.target.value === "rail" ? "freight_heavy" :
                          e.target.value === "road" ? "arterial" :
                          e.target.value === "bridge" ? "beam" :
                          "cut_and_cover"
                        );
                      }}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="rail" className="bg-gray-900">Rail System</option>
                      <option value="road" className="bg-gray-900">Road</option>
                      <option value="bridge" className="bg-gray-900">Bridge</option>
                      <option value="tunnel" className="bg-gray-900">Tunnel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      System/Type
                    </label>
                    <select
                      value={calcSystemId}
                      onChange={(e) => setCalcSystemId(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-500"
                    >
                      {calcType === "rail" && railSystems.map((s) => (
                        <option key={s.id} value={s.id} className="bg-gray-900">{s.name}</option>
                      ))}
                      {calcType === "road" && roadTypes.map((r) => (
                        <option key={r.id} value={r.id} className="bg-gray-900">{r.name}</option>
                      ))}
                      {calcType === "bridge" && bridgeTypes.map((b) => (
                        <option key={b.id} value={b.id} className="bg-gray-900">{b.name}</option>
                      ))}
                      {calcType === "tunnel" && tunnelTypes.map((t) => (
                        <option key={t.id} value={t.id} className="bg-gray-900">{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Length ({calcType === "bridge" || calcType === "tunnel" ? "meters" : "kilometers"})
                    </label>
                    <input
                      type="number"
                      value={calcLength}
                      onChange={(e) => setCalcLength(Number(e.target.value))}
                      min="0.1"
                      max="1000"
                      step="0.1"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                  <h4 className="text-lg font-medium text-white mb-4">Cost Estimate</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-white/60 mb-1">Construction Cost</p>
                      <p className="text-3xl font-light text-white">
                        ${(costEstimate.constructionCost / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">Annual Maintenance</p>
                      <p className="text-3xl font-light text-white">
                        ${(costEstimate.annualMaintenance / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">Total Lifecycle Cost</p>
                      <p className="text-3xl font-light text-white">
                        ${(costEstimate.totalLifecycleCost / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg bg-black/20">
                    <p className="text-sm text-white/80">
                      <strong>Note:</strong> These are preliminary estimates based on typical costs. Actual costs vary significantly based on 
                      location, terrain, soil conditions, environmental factors, labor costs, and project-specific requirements. 
                      Consult with civil engineers and cost estimators for detailed project budgets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

