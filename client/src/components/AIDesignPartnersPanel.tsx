import { Bot, X, MessageSquare, Sparkles, ArrowLeft, MessageCircle } from "lucide-react";

const aiPersonalities = [
  { id: "thoth-hermes", name: "Thoth-Hermes", icon: "📐", specialty: "Sacred Geometrist - Golden ratio, harmonic proportions", color: "from-amber-500 to-amber-600" },
  { id: "aester-sophia", name: "Aester-Sophia", icon: "✨", specialty: "Ethereal Visionary - Dreamlike spaces, light manipulation", color: "from-purple-500 to-purple-600" },
  { id: "verdania-gaia", name: "Verdania-Gaia", icon: "🌿", specialty: "Earth Whisperer - Biomimicry, ecological integration", color: "from-green-500 to-green-600" },
  { id: "luxor-aurelius", name: "Luxor-Aurelius", icon: "👑", specialty: "Golden Architect - Luxury design, classical grandeur", color: "from-yellow-500 to-yellow-600" },
  { id: "mechanicus-forge", name: "Mechanicus-Forge", icon: "⚙️", specialty: "Industrial Alchemist - Raw materials, exposed structures", color: "from-gray-500 to-gray-600" },
  { id: "zen-siddh", name: "Zen-Siddh", icon: "⚫", specialty: "Minimalist Sage - Simplicity, negative space", color: "from-slate-500 to-slate-600" },
  { id: "chronos-memoria", name: "Chronos-Memoria", icon: "⏳", specialty: "Time Keeper - Historical preservation, adaptive reuse", color: "from-orange-500 to-orange-600" },
  { id: "metamorphos-flow", name: "Metamorphos-Flow", icon: "🌊", specialty: "Shape Shifter - Dynamic forms, parametric design", color: "from-blue-500 to-blue-600" },
  { id: "crystallinus-prism", name: "Crystallinus-Prism", icon: "💎", specialty: "Light Weaver - Transparency, luminous environments", color: "from-cyan-500 to-cyan-600" },
  { id: "scorpius-aquarian", name: "Scorpius-Aquarian", icon: "💧", specialty: "Water Architect - Aquatic integration, fluid dynamics", color: "from-teal-500 to-teal-600" },
  { id: "urbanus-nexus", name: "Urbanus-Nexus", icon: "🏙️", specialty: "City Harmonizer - Urban planning, public spaces", color: "from-indigo-500 to-indigo-600" },
  { id: "ignis-phoenix", name: "Ignis-Phoenix", icon: "🔥", specialty: "Fire Forger - Warm materials, transformative spaces", color: "from-red-500 to-red-600" },
  { id: "aether-cosmo", name: "Aether-Cosmo", icon: "🌌", specialty: "Space Architect - Cosmic inspiration, futuristic visions", color: "from-violet-500 to-violet-600" },
  { id: "alister-engineer", name: "Alister-Engineer", icon: "🔧", specialty: "Practical Innovator - Structural efficiency, buildability", color: "from-emerald-500 to-emerald-600" },
];

interface AIDesignPartnersPanelProps {
  onClose: () => void;
  onOpenChat: (partnerId: string, partnerName: string, partnerIcon: string) => void;
}

export default function AIDesignPartnersPanel({ onClose, onOpenChat }: AIDesignPartnersPanelProps) {
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
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-light tracking-wide">AI Design Partners</h3>
            <p className="text-xs text-gray-500">14 AI personalities</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          Choose an AI personality to collaborate with on your design. Each partner brings unique expertise and perspective to your creative process.
        </p>

        <div className="space-y-3">
          {aiPersonalities.map((ai, index) => (
            <button
              key={index}
              className="w-full group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-400/30 transition-all text-left"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ai.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white mb-1">{ai.name}</div>
                <div className="text-sm text-gray-500">{ai.specialty}</div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenChat(ai.id, ai.name, ai.icon);
                }}
                className="p-2.5 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors flex-shrink-0"
                title="Chat with this partner"
              >
                <MessageCircle className="w-4 h-4 text-teal-400" />
              </button>
            </button>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Multi-AI Collaboration</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Select multiple AI partners to get diverse perspectives on your design challenges and create more innovative solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

