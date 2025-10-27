import { Bot, X, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const aiPersonalities = [
  { name: "The Modernist", specialty: "Clean lines, minimalism", color: "bg-blue-500" },
  { name: "The Structuralist", specialty: "Engineering excellence", color: "bg-green-500" },
  { name: "The Sustainabilist", specialty: "Eco-friendly design", color: "bg-emerald-500" },
  { name: "The Urbanist", specialty: "City planning", color: "bg-purple-500" },
  { name: "The Traditionalist", specialty: "Classical architecture", color: "bg-amber-500" },
  { name: "The Futurist", specialty: "Cutting-edge concepts", color: "bg-cyan-500" },
  { name: "The Biophilic", specialty: "Nature integration", color: "bg-lime-500" },
  { name: "The Minimalist", specialty: "Less is more", color: "bg-slate-500" },
  { name: "The Maximalist", specialty: "Bold, ornate designs", color: "bg-rose-500" },
  { name: "The Parametricist", specialty: "Algorithmic design", color: "bg-indigo-500" },
  { name: "The Regionalist", specialty: "Local context", color: "bg-orange-500" },
  { name: "The Experimentalist", specialty: "Innovative forms", color: "bg-pink-500" },
  { name: "The Pragmatist", specialty: "Functional solutions", color: "bg-teal-500" },
  { name: "The Visionary", specialty: "Conceptual thinking", color: "bg-violet-500" },
];

interface AIDesignPartnersPanelProps {
  onClose: () => void;
}

export default function AIDesignPartnersPanel({ onClose }: AIDesignPartnersPanelProps) {
  return (
    <div className="h-full flex flex-col bg-[#0f1419]">
      {/* Header */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold">AI Design Partners</h3>
        </div>
        <button onClick={onClose} className="hover:text-teal-400 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-sm text-gray-400 mb-4">
          Choose an AI personality to collaborate with on your design. Each partner brings unique expertise and perspective.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {aiPersonalities.map((ai, index) => (
            <button
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 transition-all group text-left"
            >
              <div className={`w-10 h-10 rounded-full ${ai.color} flex items-center justify-center flex-shrink-0`}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{ai.name}</div>
                <div className="text-xs text-gray-400 truncate">{ai.specialty}</div>
              </div>
              <MessageSquare className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors flex-shrink-0" />
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-teal-500/10 border border-teal-400/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm mb-1">Multi-AI Collaboration</h4>
              <p className="text-xs text-gray-400">
                Select multiple AI partners to get diverse perspectives on your design challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

