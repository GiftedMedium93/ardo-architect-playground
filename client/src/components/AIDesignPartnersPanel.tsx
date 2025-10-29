import { Bot, X, MessageSquare, Sparkles, ArrowLeft } from "lucide-react";

const aiPersonalities = [
  { name: "The Modernist", specialty: "Clean lines, minimalism", color: "from-blue-500 to-blue-600" },
  { name: "The Structuralist", specialty: "Engineering excellence", color: "from-green-500 to-green-600" },
  { name: "The Sustainabilist", specialty: "Eco-friendly design", color: "from-emerald-500 to-emerald-600" },
  { name: "The Urbanist", specialty: "City planning", color: "from-purple-500 to-purple-600" },
  { name: "The Traditionalist", specialty: "Classical architecture", color: "from-amber-500 to-amber-600" },
  { name: "The Futurist", specialty: "Cutting-edge concepts", color: "from-cyan-500 to-cyan-600" },
  { name: "The Biophilic", specialty: "Nature integration", color: "from-lime-500 to-lime-600" },
  { name: "The Minimalist", specialty: "Less is more", color: "from-slate-500 to-slate-600" },
  { name: "The Maximalist", specialty: "Bold, ornate designs", color: "from-rose-500 to-rose-600" },
  { name: "The Parametricist", specialty: "Algorithmic design", color: "from-indigo-500 to-indigo-600" },
  { name: "The Regionalist", specialty: "Local context", color: "from-orange-500 to-orange-600" },
  { name: "The Experimentalist", specialty: "Innovative forms", color: "from-pink-500 to-pink-600" },
  { name: "The Pragmatist", specialty: "Functional solutions", color: "from-teal-500 to-teal-600" },
  { name: "The Visionary", specialty: "Conceptual thinking", color: "from-violet-500 to-violet-600" },
];

interface AIDesignPartnersPanelProps {
  onClose: () => void;
}

export default function AIDesignPartnersPanel({ onClose }: AIDesignPartnersPanelProps) {
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
              <MessageSquare className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
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

