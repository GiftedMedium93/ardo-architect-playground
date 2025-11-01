import { Bot, X, MessageSquare, Sparkles, ArrowLeft, MessageCircle } from "lucide-react";

const aiPersonalities = [
  { id: "zaha", name: "Zaha (Parametricist)", icon: "🏗️", specialty: "Fluid, parametric forms", color: "from-indigo-500 to-indigo-600" },
  { id: "norman", name: "Norman (High-Tech)", icon: "🏢", specialty: "Sustainable technology", color: "from-green-500 to-green-600" },
  { id: "frank", name: "Frank (Organic)", icon: "🌿", specialty: "Nature-inspired design", color: "from-lime-500 to-lime-600" },
  { id: "modernist", name: "The Modernist", icon: "📐", specialty: "Clean lines, minimalism", color: "from-blue-500 to-blue-600" },
  { id: "structuralist", name: "The Structuralist", icon: "⚙️", specialty: "Engineering excellence", color: "from-gray-500 to-gray-600" },
  { id: "urbanist", name: "The Urbanist", icon: "🏙️", specialty: "City planning", color: "from-purple-500 to-purple-600" },
  { id: "traditionalist", name: "The Traditionalist", icon: "🏛️", specialty: "Classical architecture", color: "from-amber-500 to-amber-600" },
  { id: "futurist", name: "The Futurist", icon: "🚀", specialty: "Cutting-edge concepts", color: "from-cyan-500 to-cyan-600" },
  { id: "minimalist", name: "The Minimalist", icon: "⬜", specialty: "Less is more", color: "from-slate-500 to-slate-600" },
  { id: "maximalist", name: "The Maximalist", icon: "✨", specialty: "Bold, ornate designs", color: "from-rose-500 to-rose-600" },
  { id: "regionalist", name: "The Regionalist", icon: "🗺️", specialty: "Local context", color: "from-orange-500 to-orange-600" },
  { id: "experimentalist", name: "The Experimentalist", icon: "🔬", specialty: "Innovative forms", color: "from-pink-500 to-pink-600" },
  { id: "pragmatist", name: "The Pragmatist", icon: "🔧", specialty: "Functional solutions", color: "from-teal-500 to-teal-600" },
  { id: "visionary", name: "The Visionary", icon: "👁️", specialty: "Conceptual thinking", color: "from-violet-500 to-violet-600" },
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

