import { Button } from "@/components/ui/button";
import { APP_TITLE } from "@/const";
import {
  Ruler,
  Pencil,
  Box,
  Lightbulb,
  Palette,
  Menu,
  Search,
  ChevronRight,
  Bot,
  Sparkles,
  ShieldCheck,
  DollarSign,
  Library,
  Waves,
  Glasses,
} from "lucide-react";
import { useState } from "react";
import AIDesignPartnersPanel from "@/components/AIDesignPartnersPanel";
import ComplianceCheckPanel from "@/components/ComplianceCheckPanel";
import CostOptimizerPanel from "@/components/CostOptimizerPanel";
import MaterialLibraryPanel from "@/components/MaterialLibraryPanel";
import AcousticAnalysisPanel from "@/components/AcousticAnalysisPanel";
import VRARPreviewPanel from "@/components/VRARPreviewPanel";
import RenderingPanel from "@/components/RenderingPanel";

type PanelType = "menu" | "ai-partners" | "rendering" | "compliance" | "cost" | "materials" | "acoustic" | "vr-ar" | null;

export default function Home() {
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [activePanel, setActivePanel] = useState<PanelType>("menu");

  const leftToolbarItems = [
    { icon: Pencil, label: "Select", active: true },
    { icon: Pencil, label: "Draw", active: false },
    { icon: Box, label: "3D View", active: false },
    { icon: Palette, label: "Materials", active: false },
    { icon: Lightbulb, label: "Lighting", active: false },
    { icon: Ruler, label: "Measurements", active: false },
  ];

  const designTools = [
    { icon: Bot, label: "AI Design Partners", color: "text-blue-400" },
    { icon: Sparkles, label: "Real-time Rendering", color: "text-purple-400" },
    { icon: ShieldCheck, label: "Compliance Check", color: "text-green-400" },
    { icon: DollarSign, label: "Cost Optimizer", color: "text-yellow-400" },
    { icon: Library, label: "Material Library", color: "text-orange-400" },
    { icon: Waves, label: "Acoustic Analysis", color: "text-cyan-400" },
    { icon: Glasses, label: "VR/AR Preview", color: "text-pink-400" },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#1a2332] text-white overflow-hidden">
      {/* Top Toolbar */}
      <div className="h-14 bg-[#0f1419] border-b border-white/10 flex items-center px-4 gap-6 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-teal-400">ARDO</div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button className="hover:text-teal-400 transition-colors">File</button>
          <button className="hover:text-teal-400 transition-colors">Edit</button>
          <button className="hover:text-teal-400 transition-colors">View</button>
          <button className="hover:text-teal-400 transition-colors">Project Settings</button>
        </div>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools and features..."
              className="w-full bg-[#1a2332] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>
        </div>
        <button className="ml-auto">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-20 bg-[#0f1419] border-r border-white/10 flex flex-col items-center py-6 gap-4 flex-shrink-0">
          {leftToolbarItems.map((item, index) => (
            <button
              key={index}
              className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                item.active
                  ? "bg-teal-500/20 text-teal-400 border border-teal-400/50"
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
          <div className="flex-1" />
          <button className="w-14 h-14 rounded-lg flex flex-col items-center justify-center gap-1 hover:bg-white/5 text-gray-400 hover:text-white transition-all">
            <Menu className="w-5 h-5" />
            <span className="text-[10px]">More</span>
          </button>
        </div>

        {/* 3D Canvas Area */}
        <div className="flex-1 relative bg-gradient-to-br from-[#1a2332] to-[#0f1419] overflow-hidden">
          {/* Canvas Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-8 relative">
                {/* 3D Grid Visualization */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 opacity-20">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-teal-400/30 rounded-sm" />
                  ))}
                </div>
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Box className="w-24 h-24 text-teal-400/40" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-300">
                Architect Playground
              </h2>
              <p className="text-gray-500 mb-6">
                Start designing with AI-powered tools and real-time 3D rendering
              </p>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>

          {/* Canvas Controls */}
          <div className="absolute top-4 left-4 flex gap-2">
            <button className="px-3 py-1.5 bg-[#0f1419]/80 backdrop-blur-sm border border-white/10 rounded-lg text-sm hover:border-teal-400/50 transition-colors">
              2D
            </button>
            <button className="px-3 py-1.5 bg-teal-500/20 backdrop-blur-sm border border-teal-400/50 rounded-lg text-sm text-teal-400">
              3D
            </button>
          </div>
        </div>

        {/* Right Design Tools Panel */}
        <div
          className={`bg-[#0f1419] border-l border-white/10 transition-all duration-300 flex-shrink-0 ${
            rightPanelOpen ? "w-80" : "w-0 overflow-hidden"
          }`}
        >
            <div className="w-80 h-full flex flex-col">
            {activePanel === "menu" ? (
              <>
                {/* Panel Header */}
                <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
                  <h3 className="font-semibold">Design Tools</h3>
                  <button
                    onClick={() => setRightPanelOpen(false)}
                    className="hover:text-teal-400 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Tools List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  <button
                    onClick={() => setActivePanel("ai-partners")}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-blue-400" />
                      <span className="text-sm">AI Design Partners</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors" />
                  </button>
                  <button
                    onClick={() => setActivePanel("rendering")}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <span className="text-sm">Real-time Rendering</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors" />
                  </button>
                  <button
                    onClick={() => setActivePanel("compliance")}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-green-400" />
                      <span className="text-sm">Compliance Check</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors" />
                  </button>
                  <button
                    onClick={() => setActivePanel("cost")}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm">Cost Optimizer</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors" />
                  </button>
                  <button
                    onClick={() => setActivePanel("materials")}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Library className="w-5 h-5 text-orange-400" />
                      <span className="text-sm">Material Library</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors" />
                  </button>
                  <button
                    onClick={() => setActivePanel("acoustic")}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Waves className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm">Acoustic Analysis</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors" />
                  </button>
                  <button
                    onClick={() => setActivePanel("vr-ar")}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Glasses className="w-5 h-5 text-pink-400" />
                      <span className="text-sm">VR/AR Preview</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors" />
                  </button>
                </div>
              </>
            ) : activePanel === "ai-partners" ? (
              <AIDesignPartnersPanel onClose={() => setActivePanel("menu")} />
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
            ) : (
              <div className="h-full flex items-center justify-center p-4 text-center text-gray-400">
                <div>
                  <p className="text-sm mb-2">Feature panel coming soon</p>
                  <button
                    onClick={() => setActivePanel("menu")}
                    className="text-xs text-teal-400 hover:underline"
                  >
                    Back to menu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Panel Button (when closed) */}
        {!rightPanelOpen && (
          <button
            onClick={() => setRightPanelOpen(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0f1419] border border-white/10 rounded-l-lg p-2 hover:bg-white/5 transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="h-8 bg-[#0f1419] border-t border-white/10 flex items-center px-4 text-xs text-gray-400 gap-6 flex-shrink-0">
        <span>Tool: Select</span>
        <span className="border-l border-white/10 pl-6">Grid: 1000mm</span>
        <span className="border-l border-white/10 pl-6">Units: Metric</span>
        <span className="ml-auto">Ready</span>
      </div>
    </div>
  );
}

