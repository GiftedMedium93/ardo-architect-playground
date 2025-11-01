import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatPanelProps {
  selectedPartner: string;
  partnerName: string;
  partnerIcon: string;
  onBack?: () => void;
}

export default function AIChatPanel({ selectedPartner, partnerName, partnerIcon, onBack }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! I'm ${partnerName}, your AI design partner. I'm here to help you with architectural design, answer questions, and provide expert guidance. How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageMutation = trpc.aiChat.sendMessage.useMutation();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      // Get conversation history for context
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const result = await sendMessageMutation.mutateAsync({
        partnerId: selectedPartner,
        message: currentInput,
        conversationHistory,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, I'm having trouble connecting right now. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };;

  const generateContextualResponse = (userInput: string, partner: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Context-aware responses based on partner specialty
    if (partner === "zaha") {
      if (lowerInput.includes("curve") || lowerInput.includes("fluid")) {
        return "Ah, curves! The essence of parametric design. I recommend exploring NURBS surfaces with varying curvature radii. Consider how light will interact with these flowing forms - perhaps integrate our Acoustic Analysis tool to ensure the curves don't create unwanted sound reflections.";
      }
      return "From a parametric perspective, I suggest exploring non-linear geometries. Have you considered using our Generative Design tool to create multiple iterations? The key is balancing aesthetic fluidity with structural integrity.";
    }
    
    if (partner === "norman") {
      if (lowerInput.includes("sustainable") || lowerInput.includes("energy")) {
        return "Excellent focus on sustainability! I recommend maximizing natural ventilation and daylighting. Use our Material Library to select high-performance glazing with optimal U-values. Consider integrating photovoltaic panels into the facade design.";
      }
      return "For this project, prioritize transparency and structural honesty. High-tech materials like steel and glass can create stunning, efficient spaces. Check the Compliance panel to ensure your design meets current energy codes.";
    }
    
    if (partner === "frank") {
      if (lowerInput.includes("organic") || lowerInput.includes("nature")) {
        return "Nature is the ultimate architect! I suggest using our Material Library to explore natural materials - stone, wood, water features. The design should emerge from the site itself. Have you analyzed the topography and natural light patterns?";
      }
      return "Remember: form follows function, but both should harmonize with nature. Consider how your design responds to the landscape. Use our VR/AR Preview to experience the space in context before building.";
    }
    
    // Default contextual responses
    if (lowerInput.includes("material")) {
      return `Great question about materials! I recommend exploring our Material Library with 6,000+ options. For your design style, consider ${partner === "zaha" ? "composite materials and advanced polymers" : partner === "norman" ? "high-performance glass and steel" : "natural stone and sustainably sourced timber"}.`;
    }
    
    if (lowerInput.includes("cost") || lowerInput.includes("budget")) {
      return "Budget optimization is crucial. Use our Cost Optimizer tool - it has four modes including Value Engineering and Lifecycle Cost Analysis. I can help you identify areas where you can reduce costs without compromising design integrity.";
    }
    
    if (lowerInput.includes("compliance") || lowerInput.includes("code")) {
      return "Building codes are essential. Our Compliance Check tool scans your design against local regulations in real-time. Would you like me to run a compliance analysis on your current project?";
    }
    
    return `That's an interesting consideration. As ${partnerName}, I'd approach this by ${partner === "zaha" ? "pushing the boundaries of parametric design" : partner === "norman" ? "integrating sustainable technology" : "harmonizing with the natural environment"}. What specific aspect would you like to explore further?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0e14]">
      {/* Chat Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg transition-all -ml-2"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
        )}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
          {partnerIcon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">{partnerName}</h3>
          <p className="text-sm text-gray-400">AI Design Partner</p>
        </div>
        <div className="ml-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">Active</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                message.role === "user"
                  ? "bg-teal-500/20"
                  : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
              }`}
            >
              {message.role === "user" ? (
                <User className="w-5 h-5 text-teal-400" />
              ) : (
                <Bot className="w-5 h-5 text-blue-400" />
              )}
            </div>
            <div
              className={`flex-1 max-w-[80%] ${
                message.role === "user" ? "text-right" : ""
              }`}
            >
              <div
                className={`inline-block p-4 rounded-2xl ${
                  message.role === "user"
                    ? "bg-teal-500/20 text-white"
                    : "bg-white/5 text-gray-100"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 px-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="inline-block p-4 rounded-2xl bg-white/5">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/5 bg-[#0f1419]/50 backdrop-blur-sm">
        <div className="flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask ${partnerName} anything...`}
            className="flex-1 bg-white/5 border-white/10 resize-none min-h-[60px] max-h-[120px]"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 px-6"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          <Sparkles className="w-3 h-3 inline mr-1" />
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

