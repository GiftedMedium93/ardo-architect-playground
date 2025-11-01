import { X, Command } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KeyboardShortcutsPanelProps {
  onClose: () => void;
}

export default function KeyboardShortcutsPanel({ onClose }: KeyboardShortcutsPanelProps) {
  const shortcuts = [
    {
      category: "General",
      items: [
        { keys: ["?"], description: "Show keyboard shortcuts" },
        { keys: ["Esc"], description: "Close panels/dialogs" },
        { keys: ["Ctrl", "S"], description: "Save project" },
        { keys: ["Ctrl", "N"], description: "New project" },
        { keys: ["Ctrl", "O"], description: "Open project" },
      ],
    },
    {
      category: "Tools",
      items: [
        { keys: ["V"], description: "Select tool" },
        { keys: ["P"], description: "Pen/Draw tool" },
        { keys: ["3"], description: "3D view" },
        { keys: ["M"], description: "Materials" },
        { keys: ["L"], description: "Lighting" },
        { keys: ["R"], description: "Ruler/Measure" },
      ],
    },
    {
      category: "View",
      items: [
        { keys: ["Space"], description: "Pan view (hold)" },
        { keys: ["Scroll"], description: "Zoom in/out" },
        { keys: ["Alt", "Drag"], description: "Orbit camera" },
        { keys: ["Shift", "Drag"], description: "Pan camera" },
        { keys: ["F"], description: "Frame selection" },
        { keys: ["G"], description: "Toggle grid" },
      ],
    },
    {
      category: "Edit",
      items: [
        { keys: ["Ctrl", "Z"], description: "Undo" },
        { keys: ["Ctrl", "Shift", "Z"], description: "Redo" },
        { keys: ["Ctrl", "C"], description: "Copy" },
        { keys: ["Ctrl", "V"], description: "Paste" },
        { keys: ["Ctrl", "D"], description: "Duplicate" },
        { keys: ["Delete"], description: "Delete selection" },
      ],
    },
    {
      category: "AI & Features",
      items: [
        { keys: ["Ctrl", "K"], description: "Open AI chat" },
        { keys: ["Ctrl", "M"], description: "Material library" },
        { keys: ["Ctrl", "R"], description: "Render preview" },
        { keys: ["Ctrl", "E"], description: "Export" },
        { keys: ["Ctrl", "/"], description: "Search" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Command className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-light text-white">Keyboard Shortcuts</h3>
              <p className="text-sm text-gray-500">Master ARDO like a pro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-all"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Shortcuts Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shortcuts.map((section, index) => (
              <div key={index}>
                <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
                  {section.category}
                </h4>
                <div className="space-y-3">
                  {section.items.map((shortcut, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <span className="text-sm text-gray-300">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIdx) => (
                          <div key={keyIdx} className="flex items-center gap-1">
                            <kbd className="px-2.5 py-1.5 text-xs font-medium bg-white/10 border border-white/20 rounded-lg text-white shadow-sm">
                              {key}
                            </kbd>
                            {keyIdx < shortcut.keys.length - 1 && (
                              <span className="text-gray-500 text-xs">+</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex items-center justify-between flex-shrink-0 bg-white/5">
          <p className="text-sm text-gray-500">
            Press <kbd className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded">?</kbd> anytime to view shortcuts
          </p>
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400"
          >
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}

