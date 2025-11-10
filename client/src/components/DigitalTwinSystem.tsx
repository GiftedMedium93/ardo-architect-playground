import { useState, useEffect } from "react";
import { X, Activity, Zap, Droplets, Wind, Thermometer, Users, TrendingUp, AlertTriangle, CheckCircle, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Sensor {
  id: string;
  name: string;
  type: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  location: string;
}

interface Simulation {
  id: string;
  name: string;
  type: string;
  status: "running" | "paused" | "completed";
  progress: number;
  results?: any;
}

interface DigitalTwinSystemProps {
  onClose: () => void;
}

export default function DigitalTwinSystem({ onClose }: DigitalTwinSystemProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "sensors" | "simulations" | "analytics">("overview");
  const [isSimulating, setIsSimulating] = useState(true);
  const [sensors, setSensors] = useState<Sensor[]>([
    { id: "s1", name: "Temperature Sensor 1", type: "temperature", value: 72, unit: "°F", status: "normal", location: "Living Room" },
    { id: "s2", name: "Humidity Sensor 1", type: "humidity", value: 45, unit: "%", status: "normal", location: "Bathroom" },
    { id: "s3", name: "Energy Meter 1", type: "energy", value: 3.2, unit: "kW", status: "normal", location: "Main Panel" },
    { id: "s4", name: "Occupancy Sensor 1", type: "occupancy", value: 4, unit: "people", status: "normal", location: "Office" },
    { id: "s5", name: "Air Quality Sensor", type: "air-quality", value: 85, unit: "AQI", status: "normal", location: "Kitchen" },
    { id: "s6", name: "Structural Stress", type: "stress", value: 120, unit: "PSI", status: "warning", location: "Foundation" },
  ]);

  const [simulations, setSimulations] = useState<Simulation[]>([
    { id: "sim1", name: "Energy Consumption", type: "energy", status: "running", progress: 67 },
    { id: "sim2", name: "Structural Integrity", type: "structural", status: "running", progress: 82 },
    { id: "sim3", name: "Traffic Flow", type: "traffic", status: "paused", progress: 45 },
    { id: "sim4", name: "HVAC Optimization", type: "hvac", status: "running", progress: 91 },
  ]);

  // Simulate real-time sensor updates
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.value + (Math.random() - 0.5) * 2,
        status: sensor.value > 150 ? "critical" : sensor.value > 100 ? "warning" : "normal"
      })));

      setSimulations(prev => prev.map(sim => ({
        ...sim,
        progress: sim.status === "running" ? Math.min(100, sim.progress + Math.random() * 3) : sim.progress
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const getSensorIcon = (type: string) => {
    switch (type) {
      case "temperature": return <Thermometer className="w-5 h-5" />;
      case "humidity": return <Droplets className="w-5 h-5" />;
      case "energy": return <Zap className="w-5 h-5" />;
      case "occupancy": return <Users className="w-5 h-5" />;
      case "air-quality": return <Wind className="w-5 h-5" />;
      case "stress": return <Activity className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-green-400 bg-green-500/20 border-green-500/30";
      case "warning": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "critical": return "text-red-400 bg-red-500/20 border-red-500/30";
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-light text-white mb-1 flex items-center gap-2">
                <Activity className="w-6 h-6 text-cyan-400" />
                Digital Twin System
              </h2>
              <p className="text-gray-400 text-sm">Real-time simulation • Predictive analytics • IoT integration</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsSimulating(!isSimulating)}
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/10"
              >
                {isSimulating ? (
                  <><Pause className="w-4 h-4 mr-1" /> Pause</>
                ) : (
                  <><Play className="w-4 h-4 mr-1" /> Resume</>
                )}
              </Button>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "sensors", label: "Sensors" },
              { id: "simulations", label: "Simulations" },
              { id: "analytics", label: "Analytics" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Status Cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4">
                  <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                  <div className="text-2xl font-semibold text-white mb-1">98.5%</div>
                  <div className="text-sm text-gray-400">System Health</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-4">
                  <Zap className="w-8 h-8 text-blue-400 mb-2" />
                  <div className="text-2xl font-semibold text-white mb-1">3.2 kW</div>
                  <div className="text-sm text-gray-400">Energy Usage</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-4">
                  <Users className="w-8 h-8 text-purple-400 mb-2" />
                  <div className="text-2xl font-semibold text-white mb-1">12</div>
                  <div className="text-sm text-gray-400">Occupants</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-400 mb-2" />
                  <div className="text-2xl font-semibold text-white mb-1">1</div>
                  <div className="text-sm text-gray-400">Warnings</div>
                </div>
              </div>

              {/* Live Sensors */}
              <div>
                <h3 className="text-white font-semibold mb-3">Live Sensor Data</h3>
                <div className="grid grid-cols-3 gap-3">
                  {sensors.slice(0, 6).map(sensor => (
                    <div key={sensor.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-gray-400">
                          {getSensorIcon(sensor.type)}
                          <span className="text-sm">{sensor.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(sensor.status)}`}>
                          {sensor.status}
                        </span>
                      </div>
                      <div className="text-2xl font-semibold text-white">{sensor.value.toFixed(1)} {sensor.unit}</div>
                      <div className="text-xs text-gray-500 mt-1">{sensor.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Simulations */}
              <div>
                <h3 className="text-white font-semibold mb-3">Active Simulations</h3>
                <div className="space-y-2">
                  {simulations.map(sim => (
                    <div key={sim.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-medium">{sim.name}</div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          sim.status === "running" ? "bg-green-500/20 text-green-400" :
                          sim.status === "paused" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-blue-500/20 text-blue-400"
                        }`}>
                          {sim.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <div
                            className="bg-cyan-500 h-2 rounded-full transition-all"
                            style={{ width: `${sim.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{sim.progress.toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "sensors" && (
            <div className="space-y-3">
              {sensors.map(sensor => (
                <div key={sensor.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(sensor.status)}`}>
                        {getSensorIcon(sensor.type)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{sensor.name}</div>
                        <div className="text-sm text-gray-400">{sensor.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-white">{sensor.value.toFixed(1)} {sensor.unit}</div>
                      <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(sensor.status)}`}>
                        {sensor.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "simulations" && (
            <div className="space-y-4">
              {simulations.map(sim => (
                <div key={sim.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">{sim.name}</h3>
                      <p className="text-gray-400 text-sm">Type: {sim.type}</p>
                    </div>
                    <Button
                      onClick={() => {
                        setSimulations(prev => prev.map(s =>
                          s.id === sim.id ? { ...s, status: s.status === "running" ? "paused" : "running" } : s
                        ));
                      }}
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/10"
                    >
                      {sim.status === "running" ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                      {sim.status === "running" ? "Pause" : "Resume"}
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/10 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all"
                        style={{ width: `${sim.progress}%` }}
                      />
                    </div>
                    <span className="text-white font-semibold">{sim.progress.toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Predictive Analytics
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Energy cost next month</span>
                    <span className="text-white font-semibold">$342 (-8%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Maintenance required in</span>
                    <span className="text-yellow-400 font-semibold">14 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Structural integrity</span>
                    <span className="text-green-400 font-semibold">98.5% (Excellent)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Occupancy trend</span>
                    <span className="text-blue-400 font-semibold">+12% this week</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Performance Benchmarks</h3>
                <div className="space-y-4">
                  {[
                    { name: "Energy Efficiency", value: 87, target: 90 },
                    { name: "Air Quality", value: 92, target: 85 },
                    { name: "Comfort Level", value: 78, target: 80 },
                    { name: "System Uptime", value: 99.2, target: 99 }
                  ].map(metric => (
                    <div key={metric.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">{metric.name}</span>
                        <span className="text-white font-semibold">{metric.value}% / {metric.target}%</span>
                      </div>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${metric.value >= metric.target ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${(metric.value / metric.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

