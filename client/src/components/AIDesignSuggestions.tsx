import { Sparkles, X, Lightbulb, TrendingUp, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Suggestion {
  id: string;
  type: 'optimization' | 'trend' | 'improvement' | 'warning';
  title: string;
  description: string;
  action?: string;
  priority: 'low' | 'medium' | 'high';
}

interface AIDesignSuggestionsProps {
  onApplySuggestion: (suggestionId: string) => void;
}

export default function AIDesignSuggestions({ onApplySuggestion }: AIDesignSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Simulate AI generating suggestions
    const initialSuggestions: Suggestion[] = [
      {
        id: 's1',
        type: 'optimization',
        title: 'Optimize Material Selection',
        description: 'Consider using engineered lumber for framing - 15% cost savings while maintaining structural integrity.',
        action: 'View Materials',
        priority: 'high',
      },
      {
        id: 's2',
        type: 'trend',
        title: 'Trending Design Element',
        description: 'Large format tiles (12x24") are trending in 2025. Current design uses standard 6x6" tiles.',
        action: 'Update Design',
        priority: 'medium',
      },
      {
        id: 's3',
        type: 'improvement',
        title: 'Energy Efficiency Boost',
        description: 'Adding R-30 insulation in attic could reduce HVAC costs by 25% annually.',
        action: 'Add to Plan',
        priority: 'high',
      },
      {
        id: 's4',
        type: 'warning',
        title: 'Code Compliance Alert',
        description: 'Egress window size in bedroom #2 may not meet IRC 2021 requirements (5.7 sq ft minimum).',
        action: 'Check Compliance',
        priority: 'high',
      },
      {
        id: 's5',
        type: 'optimization',
        title: 'Schedule Optimization',
        description: 'Parallel electrical and plumbing rough-in could save 3 days on project timeline.',
        action: 'Adjust Schedule',
        priority: 'medium',
      },
    ];

    setSuggestions(initialSuggestions);
  }, []);

  const dismissSuggestion = (id: string) => {
    setSuggestions(suggestions.filter(s => s.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Zap className="w-4 h-4" />;
      case 'trend': return <TrendingUp className="w-4 h-4" />;
      case 'improvement': return <Lightbulb className="w-4 h-4" />;
      case 'warning': return <Sparkles className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'trend': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'improvement': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-6 top-24 z-40 w-96">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-teal-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <h3 className="text-white font-semibold">AI Suggestions</h3>
              <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 text-xs rounded-full border border-teal-500/30">
                {suggestions.length}
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              {isExpanded ? (
                <X className="w-4 h-4 text-gray-400" />
              ) : (
                <Sparkles className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Suggestions List */}
        {isExpanded && (
          <div className="max-h-[600px] overflow-y-auto">
            <div className="p-3 space-y-3">
              {suggestions.map(suggestion => (
                <div
                  key={suggestion.id}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`p-2 rounded-lg border ${getTypeColor(suggestion.type)}`}>
                      {getTypeIcon(suggestion.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-white font-medium text-sm">{suggestion.title}</h4>
                        <span className={`px-2 py-0.5 text-xs rounded border ${getPriorityBadge(suggestion.priority)}`}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {suggestion.action && (
                      <Button
                        onClick={() => onApplySuggestion(suggestion.id)}
                        className="flex-1 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 border border-teal-500/30 h-8 text-xs"
                      >
                        {suggestion.action}
                      </Button>
                    )}
                    <Button
                      onClick={() => dismissSuggestion(suggestion.id)}
                      variant="outline"
                      className="h-8 px-3 text-xs"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        {isExpanded && (
          <div className="p-3 border-t border-white/10 bg-white/5">
            <p className="text-xs text-gray-500 text-center">
              AI suggestions update in real-time based on your design
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

