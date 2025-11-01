import { ArrowLeft, Rocket, Shield, Droplet, Leaf, Zap, Thermometer, Activity } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  spaceEnvironments,
  spaceMaterials,
  habitatDesigns,
  lifeSupportSystems,
  powerSystems,
  calculateRadiationShielding,
  type SpaceEnvironment,
  type SpaceMaterial,
  type HabitatDesign,
} from "@/lib/spaceArchitectureData";

interface SpaceArchitecturePanelProps {
  onClose: () => void;
}

export default function SpaceArchitecturePanel({ onClose }: SpaceArchitecturePanelProps) {
  const [activeTab, setActiveTab] = useState<"environments" | "materials" | "habitats" | "life_support" | "power" | "calculator">("environments");
  const [selectedEnvironment, setSelectedEnvironment] = useState<SpaceEnvironment | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<SpaceMaterial | null>(null);
  const [selectedHabitat, setSelectedHabitat] = useState<HabitatDesign | null>(null);
  
  // Calculator state
  const [calcEnvironment, setCalcEnvironment] = useState("moon");
  const [calcMaterial, setCalcMaterial] = useState("lunar_regolith_concrete");
  const [calcThickness, setCalcThickness] = useState(200); // cm

  const shieldingResult = calculateRadiationShielding(calcEnvironment, calcMaterial, calcThickness);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6">
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
                  <Rocket className="h-7 w-7 text-indigo-400" />
                  Space Architecture Design
                </h2>
                <p className="text-sm text-white/60 mt-1">
                  Comprehensive database for extraterrestrial habitat design
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {[
              { id: "environments", label: "Space Environments", icon: Rocket },
              { id: "materials", label: "Space Materials", icon: Shield },
              { id: "habitats", label: "Habitat Designs", icon: Activity },
              { id: "life_support", label: "Life Support", icon: Droplet },
              { id: "power", label: "Power Systems", icon: Zap },
              { id: "calculator", label: "Shielding Calculator", icon: Thermometer },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-indigo-500 text-white"
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
          {activeTab === "environments" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {spaceEnvironments.map((env) => (
                  <div
                    key={env.id}
                    onClick={() => setSelectedEnvironment(selectedEnvironment?.id === env.id ? null : env)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedEnvironment?.id === env.id
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <h3 className="text-lg font-medium text-white mb-2">{env.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/70">
                        <span>Gravity:</span>
                        <span className="text-white">{env.gravity}g</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Radiation:</span>
                        <span className={`font-medium ${
                          env.radiationLevel === "extreme" ? "text-red-400" :
                          env.radiationLevel === "high" ? "text-orange-400" :
                          env.radiationLevel === "moderate" ? "text-yellow-400" :
                          "text-green-400"
                        }`}>
                          {env.radiationLevel}
                        </span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Temp Range:</span>
                        <span className="text-white">{env.averageTemp.min}°C to {env.averageTemp.max}°C</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedEnvironment && (
                <div className="mt-6 p-6 rounded-xl border border-indigo-500/30 bg-indigo-500/5">
                  <h3 className="text-xl font-medium text-white mb-4">{selectedEnvironment.name} - Detailed Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Physical Parameters</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Gravity:</span>
                          <span className="text-white">{selectedEnvironment.gravity}g ({(selectedEnvironment.gravity * 9.81).toFixed(2)} m/s²)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Atmospheric Pressure:</span>
                          <span className="text-white">{selectedEnvironment.atmosphericPressure} kPa</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Day Length:</span>
                          <span className="text-white">{selectedEnvironment.dayLength} hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Year Length:</span>
                          <span className="text-white">{selectedEnvironment.yearLength} Earth days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Radiation Dose:</span>
                          <span className="text-white">{selectedEnvironment.radiationDose} mSv/year</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">In-Situ Resources</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEnvironment.inSituResources.map((resource, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs">
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Challenges</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedEnvironment.challenges.map((challenge, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Opportunities</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedEnvironment.opportunities.map((opportunity, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "materials" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {spaceMaterials.map((material) => (
                  <div
                    key={material.id}
                    onClick={() => setSelectedMaterial(selectedMaterial?.id === material.id ? null : material)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedMaterial?.id === material.id
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">{material.name}</h3>
                      <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/70">
                        {material.category.replace("_", " ")}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/70">
                        <span>Density:</span>
                        <span className="text-white">{material.density} kg/m³</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Tensile Strength:</span>
                        <span className="text-white">{material.tensileStrength} MPa</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Radiation Shielding:</span>
                        <span className={`font-medium ${
                          material.radiationShielding === "excellent" ? "text-green-400" :
                          material.radiationShielding === "good" ? "text-blue-400" :
                          material.radiationShielding === "fair" ? "text-yellow-400" :
                          "text-red-400"
                        }`}>
                          {material.radiationShielding}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedMaterial && (
                <div className="mt-6 p-6 rounded-xl border border-cyan-500/30 bg-cyan-500/5">
                  <h3 className="text-xl font-medium text-white mb-4">{selectedMaterial.name} - Detailed Specifications</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Physical Properties</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Composition:</span>
                          <span className="text-white text-right">{selectedMaterial.composition}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Density:</span>
                          <span className="text-white">{selectedMaterial.density} kg/m³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Tensile Strength:</span>
                          <span className="text-white">{selectedMaterial.tensileStrength} MPa</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Thermal Conductivity:</span>
                          <span className="text-white">{selectedMaterial.thermalConductivity} W/(m·K)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Availability</h4>
                      <div className="space-y-2 text-sm">
                        {Object.entries(selectedMaterial.availability).map(([env, avail]) => (
                          <div key={env} className="flex justify-between">
                            <span className="text-white/60 capitalize">{env}:</span>
                            <span className={`font-medium ${
                              avail === "abundant" ? "text-green-400" :
                              avail === "high" ? "text-lime-400" :
                              avail === "moderate" ? "text-yellow-400" :
                              avail === "low" ? "text-orange-400" :
                              "text-red-400"
                            }`}>
                              {avail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Manufacturing</h4>
                      <p className="text-sm text-white/80">{selectedMaterial.manufacturingMethod}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Advantages</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedMaterial.advantages.map((adv, idx) => (
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
                        {selectedMaterial.disadvantages.map((dis, idx) => (
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

          {activeTab === "habitats" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {habitatDesigns.map((habitat) => (
                  <div
                    key={habitat.id}
                    onClick={() => setSelectedHabitat(selectedHabitat?.id === habitat.id ? null : habitat)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedHabitat?.id === habitat.id
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <h3 className="text-lg font-medium text-white mb-2">{habitat.name}</h3>
                    <p className="text-sm text-white/60 mb-3">{habitat.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/70">
                        <span>Capacity:</span>
                        <span className="text-white">{habitat.capacity} people</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Volume:</span>
                        <span className="text-white">{habitat.volume} m³</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Radiation Protection:</span>
                        <span className={`font-medium ${
                          habitat.radiationProtection === "excellent" ? "text-green-400" :
                          habitat.radiationProtection === "moderate" ? "text-yellow-400" :
                          "text-red-400"
                        }`}>
                          {habitat.radiationProtection}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedHabitat && (
                <div className="mt-6 p-6 rounded-xl border border-purple-500/30 bg-purple-500/5">
                  <h3 className="text-xl font-medium text-white mb-4">{selectedHabitat.name} - Design Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Capacity:</span>
                          <span className="text-white">{selectedHabitat.capacity} people</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Volume:</span>
                          <span className="text-white">{selectedHabitat.volume} m³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Mass:</span>
                          <span className="text-white">{selectedHabitat.mass.toLocaleString()} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Power Required:</span>
                          <span className="text-white">{selectedHabitat.powerRequirement} kW</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Suitable Environments</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedHabitat.suitableEnvironments.map((env, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs capitalize">
                            {env.replace("_", " ")}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Critical Systems</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedHabitat.criticalSystems.slice(0, 3).map((system, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>{system}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-white/70 mb-2">Advantages</h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {selectedHabitat.advantages.map((adv, idx) => (
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
                        {selectedHabitat.disadvantages.map((dis, idx) => (
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

          {activeTab === "life_support" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lifeSupportSystems.map((system) => (
                <div
                  key={system.id}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium text-white">{system.name}</h3>
                    <span className="px-2 py-1 rounded text-xs bg-white/10 text-white/70">
                      TRL {system.trl}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mb-4">{system.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <span className="text-white/60">Efficiency:</span>
                      <div className="mt-1">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                            style={{ width: `${system.efficiency}%` }}
                          />
                        </div>
                        <span className="text-white text-xs mt-1">{system.efficiency}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-white/60">Power:</span>
                      <p className="text-white mt-1">{system.powerRequirement} kW/person</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <details className="text-sm">
                      <summary className="text-white/70 cursor-pointer hover:text-white">Advantages</summary>
                      <ul className="mt-2 space-y-1 text-white/60 pl-4">
                        {system.advantages.map((adv, idx) => (
                          <li key={idx}>• {adv}</li>
                        ))}
                      </ul>
                    </details>
                    <details className="text-sm">
                      <summary className="text-white/70 cursor-pointer hover:text-white">Disadvantages</summary>
                      <ul className="mt-2 space-y-1 text-white/60 pl-4">
                        {system.disadvantages.map((dis, idx) => (
                          <li key={idx}>• {dis}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "power" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {powerSystems.map((power) => (
                <div
                  key={power.id}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all"
                >
                  <h3 className="text-lg font-medium text-white mb-2">{power.name}</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-white/70">
                      <span>Power Output:</span>
                      <span className="text-white font-medium">{power.powerOutput} kW</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Efficiency:</span>
                      <span className="text-white">{power.efficiency}%</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Lifespan:</span>
                      <span className="text-white">{power.lifespan} years</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Mass:</span>
                      <span className="text-white">{power.mass.toLocaleString()} kg</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <details className="text-sm">
                      <summary className="text-white/70 cursor-pointer hover:text-white">Advantages</summary>
                      <ul className="mt-2 space-y-1 text-white/60 pl-4">
                        {power.advantages.map((adv, idx) => (
                          <li key={idx}>• {adv}</li>
                        ))}
                      </ul>
                    </details>
                    <details className="text-sm">
                      <summary className="text-white/70 cursor-pointer hover:text-white">Disadvantages</summary>
                      <ul className="mt-2 space-y-1 text-white/60 pl-4">
                        {power.disadvantages.map((dis, idx) => (
                          <li key={idx}>• {dis}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "calculator" && (
            <div className="max-w-4xl mx-auto">
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <h3 className="text-xl font-medium text-white mb-6">Radiation Shielding Calculator</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Environment
                    </label>
                    <select
                      value={calcEnvironment}
                      onChange={(e) => setCalcEnvironment(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-indigo-500"
                    >
                      {spaceEnvironments.map((env) => (
                        <option key={env.id} value={env.id} className="bg-gray-900">
                          {env.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Shielding Material
                    </label>
                    <select
                      value={calcMaterial}
                      onChange={(e) => setCalcMaterial(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-indigo-500"
                    >
                      {spaceMaterials.map((mat) => (
                        <option key={mat.id} value={mat.id} className="bg-gray-900">
                          {mat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Thickness (cm)
                    </label>
                    <input
                      type="number"
                      value={calcThickness}
                      onChange={(e) => setCalcThickness(Number(e.target.value))}
                      min="1"
                      max="1000"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                  <h4 className="text-lg font-medium text-white mb-4">Shielding Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-white/60 mb-1">Radiation Reduction</p>
                      <p className="text-3xl font-light text-white">{shieldingResult.shieldingEffectiveness.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">Mass per m²</p>
                      <p className="text-3xl font-light text-white">{shieldingResult.mass.toFixed(1)} kg/m²</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg bg-black/20">
                    <p className="text-sm text-white/80">
                      <strong>Note:</strong> This is a simplified calculation. Actual radiation shielding depends on many factors including particle energy, 
                      material composition, secondary radiation, and geometry. Consult with radiation protection specialists for mission-critical designs.
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

