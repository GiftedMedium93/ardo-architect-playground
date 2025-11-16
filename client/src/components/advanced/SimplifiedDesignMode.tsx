import { ChevronLeft, Home, Square, Circle, Maximize2, Move, Palette, Info, Lightbulb } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SimplifiedDesignModeProps {
  onClose: () => void;
}

export default function SimplifiedDesignMode({ onClose }: SimplifiedDesignModeProps) {
  const [selectedTool, setSelectedTool] = useState<string>('room');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const simplifiedTools = [
    { id: 'room', name: 'Add Room', icon: Square, description: 'Create a new room or space' },
    { id: 'wall', name: 'Add Wall', icon: Maximize2, description: 'Add walls to divide spaces' },
    { id: 'move', name: 'Move', icon: Move, description: 'Move rooms and walls' },
    { id: 'paint', name: 'Paint', icon: Palette, description: 'Change colors and materials' }
  ];

  const roomTemplates = [
    { id: 'bedroom', name: 'Bedroom', size: '12ft × 14ft', icon: '🛏️' },
    { id: 'bathroom', name: 'Bathroom', size: '8ft × 10ft', icon: '🚿' },
    { id: 'kitchen', name: 'Kitchen', size: '10ft × 12ft', icon: '🍳' },
    { id: 'living-room', name: 'Living Room', size: '16ft × 18ft', icon: '🛋️' },
    { id: 'dining-room', name: 'Dining Room', size: '12ft × 14ft', icon: '🍽️' },
    { id: 'office', name: 'Home Office', size: '10ft × 12ft', icon: '💼' }
  ];

  const wallMaterials = [
    { id: 'white-paint', name: 'White Paint', color: '#FFFFFF', icon: '🎨' },
    { id: 'beige-paint', name: 'Beige Paint', color: '#F5F5DC', icon: '🎨' },
    { id: 'gray-paint', name: 'Gray Paint', color: '#808080', icon: '🎨' },
    { id: 'blue-paint', name: 'Blue Paint', color: '#87CEEB', icon: '🎨' },
    { id: 'brick', name: 'Brick', color: '#B22222', icon: '🧱' },
    { id: 'wood', name: 'Wood Paneling', color: '#8B4513', icon: '🪵' }
  ];

  const handleAddRoom = (template: typeof roomTemplates[0]) => {
    toast.success(`${template.name} added to your design!`);
    setSelectedRoom(template.id);
  };

  const handleApplyMaterial = (material: typeof wallMaterials[0]) => {
    if (!selectedRoom) {
      toast.error('Please select a room first');
      return;
    }
    toast.success(`${material.name} applied to ${selectedRoom}`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#0f1419]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-all"
              aria-label="Exit simplified mode"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h3 className="text-lg font-light tracking-wide">Simplified Design Mode</h3>
              <p className="text-xs text-gray-500">Beginner-Friendly Interface - No Complex Tools</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <Lightbulb className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-300">Tip: Click on rooms to select them, then apply materials</span>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Toolbar - Simplified Tools */}
          <div className="w-64 border-r border-white/5 p-4 space-y-3 overflow-y-auto">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Simple Tools</h4>
              <div className="space-y-2">
                {simplifiedTools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSelectedTool(tool.id);
                      toast.info(`${tool.name} tool selected`);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      selectedTool === tool.id
                        ? 'bg-teal-500/20 border border-teal-500/30 text-teal-400'
                        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    <tool.icon className="w-5 h-5" />
                    <div className="text-left flex-1">
                      <div className="text-sm font-medium">{tool.name}</div>
                      <div className="text-xs text-gray-400">{tool.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedTool === 'room' && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Room Templates</h4>
                <div className="space-y-2">
                  {roomTemplates.map(room => (
                    <button
                      key={room.id}
                      onClick={() => handleAddRoom(room)}
                      className="w-full flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left"
                    >
                      <span className="text-2xl">{room.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{room.name}</div>
                        <div className="text-xs text-gray-400">{room.size}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedTool === 'paint' && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Wall Materials</h4>
                <div className="space-y-2">
                  {wallMaterials.map(material => (
                    <button
                      key={material.id}
                      onClick={() => handleApplyMaterial(material)}
                      className="w-full flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-left"
                    >
                      <div
                        className="w-8 h-8 rounded border border-white/20"
                        style={{ backgroundColor: material.color }}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{material.name}</div>
                      </div>
                      <span className="text-lg">{material.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Center Canvas - Simplified 2D View */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Canvas Content */}
              <div className="relative z-10 p-12">
                <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                  <Home className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-light text-white mb-2">Start Your Design</h3>
                  <p className="text-sm text-gray-400 mb-6">
                    Click "Add Room" on the left to add rooms to your floor plan
                  </p>
                  
                  {selectedRoom && (
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4 mt-6">
                      <div className="text-sm text-teal-400 mb-2">Selected: {selectedRoom}</div>
                      <div className="text-xs text-gray-400">
                        Use the "Paint" tool to change wall colors and materials
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Help Overlay */}
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4 max-w-xs">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div className="text-xs text-gray-300">
                    <p className="font-medium text-white mb-1">Simplified Mode Active</p>
                    <p>Complex structural tools are hidden. Only basic room and wall manipulation is available.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="h-16 border-t border-white/5 flex items-center justify-between px-6 bg-black/20">
              <div className="text-sm text-gray-400">
                {selectedRoom ? `Selected: ${selectedRoom}` : 'No room selected'}
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-all">
                  Undo
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-all">
                  Redo
                </button>
                <button className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-lg text-sm font-medium transition-all">
                  Save Design
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Properties */}
          <div className="w-80 border-l border-white/5 p-4 space-y-4 overflow-y-auto">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Quick Tips</h4>
              <div className="space-y-3">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💡</span>
                    <div className="text-xs text-blue-300">
                      <p className="font-medium mb-1">Start with Rooms</p>
                      <p>Add rooms first, then use walls to divide or connect them.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎨</span>
                    <div className="text-xs text-green-300">
                      <p className="font-medium mb-1">Customize Colors</p>
                      <p>Select a room, then use the Paint tool to change wall colors.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">📏</span>
                    <div className="text-xs text-purple-300">
                      <p className="font-medium mb-1">Pre-sized Rooms</p>
                      <p>All room templates come with standard sizes. No manual measuring needed!</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🚀</span>
                    <div className="text-xs text-yellow-300">
                      <p className="font-medium mb-1">Ready for More?</p>
                      <p>Exit Simplified Mode to access advanced 3D tools and AI features.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <button
                onClick={onClose}
                className="w-full px-4 py-3 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 text-teal-400 rounded-lg text-sm font-medium transition-all border border-teal-500/30"
              >
                Exit Simplified Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

