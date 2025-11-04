import { Search, Command, Zap, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface CommandAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  keywords: string[];
  action: () => void;
}

interface CommandPaletteProps {
  onClose: () => void;
  actions: CommandAction[];
}

export default function CommandPalette({ onClose, actions }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fuzzy search implementation
  const fuzzyMatch = (text: string, search: string): boolean => {
    const searchLower = search.toLowerCase();
    const textLower = text.toLowerCase();
    
    let searchIndex = 0;
    for (let i = 0; i < textLower.length && searchIndex < searchLower.length; i++) {
      if (textLower[i] === searchLower[searchIndex]) {
        searchIndex++;
      }
    }
    return searchIndex === searchLower.length;
  };

  const filteredActions = search
    ? actions.filter((action) => {
        const searchableText = [
          action.title,
          action.description,
          action.category,
          ...action.keywords,
        ].join(" ");
        return fuzzyMatch(searchableText, search);
      })
    : actions;

  const groupedActions = filteredActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, CommandAction[]>);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredActions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
        onClose();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  let currentIndex = 0;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[600px] flex flex-col animate-in slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Command className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or search..."
              className="w-full bg-transparent border-none pl-12 pr-12 py-3 text-white placeholder:text-gray-500 focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredActions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Zap className="w-12 h-12 text-gray-700 mb-3" />
              <p className="text-gray-500">No commands found</p>
              <p className="text-gray-600 text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            Object.entries(groupedActions).map(([category, categoryActions]) => (
              <div key={category} className="mb-4 last:mb-0">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {category}
                </div>
                <div className="space-y-1">
                  {categoryActions.map((action) => {
                    const index = currentIndex++;
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={action.id}
                        onClick={() => {
                          action.action();
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                          isSelected
                            ? "bg-teal-500/20 border border-teal-500/30"
                            : "hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <div className="text-2xl flex-shrink-0">{action.icon}</div>
                        <div className="flex-1 text-left min-w-0">
                          <div
                            className={`text-sm font-medium ${
                              isSelected ? "text-white" : "text-gray-300"
                            }`}
                          >
                            {action.title}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {action.description}
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 flex-shrink-0 ${
                            isSelected ? "text-teal-400" : "text-gray-600"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-white/5">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/10 rounded">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/10 rounded">Enter</kbd> Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd> Close
              </span>
            </div>
            <span>{filteredActions.length} results</span>
          </div>
        </div>
      </div>
    </div>
  );
}

