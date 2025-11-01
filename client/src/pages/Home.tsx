import {
  Search,
  Menu,
  ChevronRight,
  Pencil,
  Box,
  Palette,
  Lightbulb,
  Ruler,
  MoreHorizontal,
  Bot,
  Sparkles,
  ShieldCheck,
  DollarSign,
  Library,
  Waves,
  Glasses,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import ThreeViewport from "@/components/ThreeViewport";
import ProjectManager from "@/components/ProjectManager";
import InteractiveTutorial from "@/components/InteractiveTutorial";
import ModelLoader from "@/components/ModelLoader";
import KeyboardShortcutsPanel from "@/components/KeyboardShortcutsPanel";
import ExportPanel from "@/components/ExportPanel";
import AIDesignPartnersPanel from "@/components/AIDesignPartnersPanel";
import AIChatPanel from "@/components/AIChatPanel";
import ComplianceCheckPanel from "@/components/ComplianceCheckPanel";
import CostOptimizerPanel from "@/components/CostOptimizerPanel";
import MaterialLibraryPanel from "@/components/MaterialLibraryPanel";
import AcousticAnalysisPanel from "@/components/AcousticAnalysisPanel";
import VRARPreviewPanel from "@/components/VRARPreviewPanel";
import RenderingPanel from "@/components/RenderingPanel";

type PanelType = "menu" | "ai-partners" | "rendering" | "compliance" | "cost" | "materials" | "acoustic" | "vr-ar" | null;

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [activePanel, setActivePanel] = useState<PanelType>("menu");
  const [activeTool, setActiveTool] = useState("select");
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedAI, setSelectedAI] = useState<{ id: string; name: string; icon: string } | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [loadedModel, setLoadedModel] = useState<{ url: string; name: string; type: string } | null>(null);
  const [showModelLoader, setShowModelLoader] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Show shortcuts with '?'
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setShowShortcuts(true);
      }
      // Close panels with Escape
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setShowProjectManager(false);
        setShowModelLoader(false);
        setShowAIChat(false);
        setShowTutorial(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const leftToolbarItems = [
    { id: "select", icon: Pencil, label: "Select", shortcut: "V" },
    { id: "draw", icon: Pencil, label: "Draw", shortcut: "P" },
    { id: "3d", icon: Box, label: "3D View", shortcut: "3" },
    { id: "materials", icon: Palette, label: "Materials", shortcut: "M" },
    { id: "lighting", icon: Lightbulb, label: "Lighting", shortcut: "L" },
    { id: "measure", icon: Ruler, label: "Measure", shortcut: "R" },
  ];

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0a0e14] text-white overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0 bg-[#0f1419]/80 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="text-xl font-light tracking-wide">ARDO</span>
          </div>
          
          <nav className="flex items-center gap-1">
            <div className="relative group">
              <button className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                File
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-[#0f1419] border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button
                  onClick={() => setShowProjectManager(true)}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all first:rounded-t-lg"
                >
                  Projects
                </button>
                <button
                  onClick={() => setShowModelLoader(true)}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Load 3D Model
                </button>
                <button
                  onClick={() => setShowExport(true)}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all last:rounded-b-lg"
                >
                  Export
                </button>
              </div>
            </div>
            {["Edit", "View", "Project"].map((item) => (
              <button
                key={item}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setShowTutorial(true)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              Help
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search tools, materials, and features..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-teal-400/50 focus:bg-white/10 transition-all placeholder:text-gray-500"
            />
          </div>
          
          <button className="p-2.5 hover:bg-white/5 rounded-lg transition-all">
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-20 border-r border-white/5 flex flex-col items-center py-6 gap-2 bg-[#0f1419]/50 backdrop-blur-sm">
          {leftToolbarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTool(item.id)}
              className={`group relative w-14 h-14 flex flex-col items-center justify-center rounded-xl transition-all ${
                activeTool === item.id
                  ? "bg-teal-500/20 text-teal-400 shadow-lg shadow-teal-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title={`${item.label} (${item.shortcut})`}
            >
              <item.icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-medium opacity-70">{item.shortcut}</span>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                {item.label}
              </div>
            </button>
          ))}

          <div className="flex-1" />

          <button className="w-14 h-14 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-[#0a0e14] via-[#0f1419] to-[#0a0e14] relative overflow-hidden">
          {/* Canvas Toolbar */}
          <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0f1419]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl">
              <button className="px-3 py-1.5 bg-teal-500/20 text-teal-400 rounded-lg text-sm font-medium">
                3D
              </button>
              <button className="px-3 py-1.5 text-gray-400 hover:text-white rounded-lg text-sm font-medium transition-colors">
                2D
              </button>
            </div>
          </div>

          {/* 3D Viewport */}
          <ThreeViewport 
          className="flex-1" 
          loadedModel={loadedModel}
          onModelLoaded={() => console.log("Model loaded successfully")}
        />

          {/* Bottom Status Bar */}
          <div className="h-12 border-t border-white/5 flex items-center justify-between px-6 bg-[#0f1419]/50 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-2">
                <span className="text-gray-500">Tool:</span>
                <span className="text-white font-medium capitalize">{activeTool}</span>
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-2">
                <span className="text-gray-500">Grid:</span>
                <span className="text-white font-medium">1000mm</span>
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-2">
                <span className="text-gray-500">Units:</span>
                <span className="text-white font-medium">Metric</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Ready</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div
          className={`bg-[#0f1419]/80 backdrop-blur-xl border-l border-white/5 transition-all duration-300 flex-shrink-0 ${
            rightPanelOpen ? "w-96" : "w-0 overflow-hidden"
          }`}
        >
          <div className="w-96 h-full flex flex-col">
            {activePanel === "menu" ? (
              <>
                {/* Panel Header */}
                <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
                  <h3 className="text-lg font-light tracking-wide">Design Tools</h3>
                  <button
                    onClick={() => setRightPanelOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Tools List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                  {[
                    { id: "ai-partners", icon: Bot, label: "AI Design Partners", color: "text-blue-400", desc: "14 AI personalities" },
                    { id: "rendering", icon: Sparkles, label: "Real-time Rendering", color: "text-purple-400", desc: "Multiple styles" },
                    { id: "compliance", icon: ShieldCheck, label: "Compliance Check", color: "text-green-400", desc: "Code scanning" },
                    { id: "cost", icon: DollarSign, label: "Cost Optimizer", color: "text-yellow-400", desc: "4 optimization modes" },
                    { id: "materials", icon: Library, label: "Material Library", color: "text-orange-400", desc: "6,000+ materials" },
                    { id: "acoustic", icon: Waves, label: "Acoustic Analysis", color: "text-cyan-400", desc: "Sound simulation" },
                    { id: "vr-ar", icon: Glasses, label: "VR/AR Preview", color: "text-pink-400", desc: "Immersive view" },
                  ].map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => setActivePanel(tool.id as PanelType)}
                      className="w-full group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-teal-400/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${tool.color}`}>
                          <tool.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium text-white mb-0.5">{tool.label}</div>
                          <div className="text-xs text-gray-500">{tool.desc}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </>
            ) : activePanel === "ai-partners" && !showAIChat ? (
              <AIDesignPartnersPanel 
                onClose={() => setActivePanel("menu")} 
                onOpenChat={(partnerId, partnerName, partnerIcon) => {
                  setSelectedAI({ id: partnerId, name: partnerName, icon: partnerIcon });
                  setShowAIChat(true);
                }}
              />
            ) : activePanel === "ai-partners" && showAIChat && selectedAI ? (
              <AIChatPanel
                selectedPartner={selectedAI.id}
                partnerName={selectedAI.name}
                partnerIcon={selectedAI.icon}
                onBack={() => setShowAIChat(false)}
              />
            ) : activePanel === "compliance" ? (
              <ComplianceCheckPanel onClose={() => setActivePanel("menu")} />
            ) : activePanel === "cost" ? (
              <CostOptimizerPanel onClose={() => setActivePanel("menu")} />
            ) : activePanel === "materials" ? (
              <MaterialLibraryPanel onClose={() => setActivePanel("menu")} />
            ) : activePanel === "acoustic" ? (
              <AcousticAnalysisPanel onClose={() => setActivePanel("menu")} />
            ) : activePanel === "vr-ar" ? (
              <VRARPreviewPanel onClose={() => setActivePanel("menu")} />
            ) : activePanel === "rendering" ? (
              <RenderingPanel onClose={() => setActivePanel("menu")} />
            ) : null}
          </div>
        </div>

        {/* Panel Toggle Button (when closed) */}
        {!rightPanelOpen && (
          <button
            onClick={() => setRightPanelOpen(true)}
            className="absolute top-6 right-6 p-3 bg-[#0f1419]/90 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 transition-all shadow-2xl z-10"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Project Manager Modal */}
      <ProjectManager
        open={showProjectManager}
        onClose={() => setShowProjectManager(false)}
        onSelectProject={(projectId) => setCurrentProjectId(projectId)}
      />

      {/* Interactive Tutorial */}
      {showTutorial && (
        <InteractiveTutorial
          onComplete={() => setShowTutorial(false)}
          onSkip={() => setShowTutorial(false)}
        />
      )}

      {/* Keyboard Shortcuts Panel */}
      {showShortcuts && (
        <KeyboardShortcutsPanel onClose={() => setShowShortcuts(false)} />
      )}

      {/* Export Panel */}
      {showExport && (
        <ExportPanel onClose={() => setShowExport(false)} projectName="My Project" />
      )}

      {/* Model Loader Modal */}
      {showModelLoader && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowModelLoader(false)}>
          <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-[500px] max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-light">Load 3D Model</h3>
              <button onClick={() => setShowModelLoader(false)} className="p-2 hover:bg-white/5 rounded-lg transition-all">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <ModelLoader 
              onModelLoad={(modelData) => {
                setLoadedModel(modelData);
                setShowModelLoader(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

