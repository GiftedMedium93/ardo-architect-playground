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
  Rocket,
  Train,
  Camera,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Undo2, Redo2, Bell } from "lucide-react";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import { toast } from "sonner";
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
import SpaceArchitecturePanel from "@/components/SpaceArchitecturePanel";
import TransportationInfrastructurePanel from "@/components/TransportationInfrastructurePanel";
import MeasurementToolsPanel from "@/components/MeasurementToolsPanel";
import SmartMaterialSelectionPanel from "@/components/SmartMaterialSelectionPanel";
import MaterialIdentificationPanel from "@/components/MaterialIdentificationPanel";
import NotificationCenter from "@/components/NotificationCenter";
import AnalyticsDashboard, { trackSession, trackToolUsage, trackPanelOpen } from "@/components/AnalyticsDashboard";
import CloudSyncIndicator from "@/components/CloudSyncIndicator";
import ARPreview from "@/components/ARPreview";
import { useCloudSync } from "@/hooks/useCloudSync";
import { trpc } from "@/lib/trpc";
import CollaborationPresence from "@/components/CollaborationPresence";
import CommandPalette from "@/components/CommandPalette";
import ContractorDirectory from "@/components/ContractorDirectory";
import SchedulingSystem from "@/components/SchedulingSystem";
import InventoryManagement from "@/components/InventoryManagement";
import Marketplace from "@/components/Marketplace";
import InvoicingSystem from "@/components/InvoicingSystem";
import ProjectTimeline from "@/components/ProjectTimeline";
import VoiceCommands from "@/components/VoiceCommands";
import OnboardingTour from "@/components/OnboardingTour";
import AIDesignSuggestions from "@/components/AIDesignSuggestions";
import Product3DViewer from "@/components/Product3DViewer";
import QuickActionsToolbar from "@/components/QuickActionsToolbar";
import DigitalTwinSystem from "@/components/DigitalTwinSystem";
import BlackBoxRecorder from "@/components/BlackBoxRecorder";

type PanelType = "ai-partners" | "rendering" | "compliance" | "cost" | "materials" | "acoustic" | "vr-ar" | "space-architecture" | "transportation" | "measurement" | "smart-material" | "material-id" | null;

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [activeTool, setActiveTool] = useState("select");
  
  // Track tool usage
  useEffect(() => {
    if (activeTool) {
      trackToolUsage(activeTool);
    }
  }, [activeTool]);
  
  // Track panel opens
  useEffect(() => {
    if (activePanel) {
      trackPanelOpen(activePanel);
    }
  }, [activePanel]);
  
  // Undo/Redo state management
  const { state: sceneState, setState: setSceneState, undo, redo, canUndo, canRedo } = useUndoRedo<any>({});
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedAI, setSelectedAI] = useState<{ id: string; name: string; icon: string } | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showContractorDirectory, setShowContractorDirectory] = useState(false);
  const [showScheduling, setShowScheduling] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showInvoicing, setShowInvoicing] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const completed = localStorage.getItem('ardo-tour-completed');
    const skipped = localStorage.getItem('ardo-tour-skipped');
    return !completed && !skipped;
  });
  const [showProduct3DViewer, setShowProduct3DViewer] = useState(false);
  const [showDigitalTwin, setShowDigitalTwin] = useState(false);
  const [showBBR, setShowBBR] = useState(false);
  const [showARPreview, setShowARPreview] = useState(false);
  
  // Command Palette Actions
  const commandActions = [
    // Design Tools
    { id: 'ai-partners', title: 'AI Design Partners', description: '64 AI personalities + 50 trade specialists', icon: '🤖', category: 'Design Tools', keywords: ['ai', 'chat', 'assistant'], action: () => setActivePanel('ai-partners') },
    { id: 'rendering', title: 'Real-time Rendering', description: 'Multiple rendering styles', icon: '✨', category: 'Design Tools', keywords: ['render', 'preview', 'style'], action: () => setActivePanel('rendering') },
    { id: 'compliance', title: 'Compliance Check', description: 'Code scanning and validation', icon: '🛡️', category: 'Design Tools', keywords: ['code', 'check', 'validate'], action: () => setActivePanel('compliance') },
    { id: 'cost', title: 'Cost Optimizer', description: '4 optimization modes', icon: '💰', category: 'Design Tools', keywords: ['cost', 'budget', 'optimize'], action: () => setActivePanel('cost') },
    { id: 'materials', title: 'Material Library', description: '6,000+ materials', icon: '📚', category: 'Design Tools', keywords: ['material', 'texture', 'library'], action: () => setActivePanel('materials') },
    { id: 'acoustic', title: 'Acoustic Analysis', description: 'Sound simulation', icon: '🌊', category: 'Design Tools', keywords: ['sound', 'acoustic', 'noise'], action: () => setActivePanel('acoustic') },
    { id: 'vr-ar', title: 'VR/AR Preview', description: 'Immersive preview', icon: '🥽', category: 'Design Tools', keywords: ['vr', 'ar', 'immersive'], action: () => setActivePanel('vr-ar') },
    { id: 'space', title: 'Space Architecture', description: 'Design for space environments', icon: '🚀', category: 'Design Tools', keywords: ['space', 'mars', 'moon'], action: () => setActivePanel('space-architecture') },
    { id: 'transportation', title: 'Transportation Infrastructure', description: 'Roads, bridges, tunnels', icon: '🚆', category: 'Design Tools', keywords: ['road', 'bridge', 'rail'], action: () => setActivePanel('transportation') },
    { id: 'measurement', title: 'Measurement Tools', description: 'Precision instruments', icon: '📏', category: 'Design Tools', keywords: ['measure', 'ruler', 'distance'], action: () => setActivePanel('measurement') },
    { id: 'smart-material', title: 'Smart Material Selection', description: 'AI-powered recommendations', icon: '🎨', category: 'Design Tools', keywords: ['smart', 'recommend', 'ai'], action: () => setActivePanel('smart-material') },
    { id: 'material-id', title: 'Material Identification', description: 'AI vision analysis', icon: '📷', category: 'Design Tools', keywords: ['identify', 'camera', 'vision'], action: () => setActivePanel('material-id') },
    // Tools
    { id: 'tool-select', title: 'Select Tool', description: 'Select and move objects', icon: '🖱️', category: 'Tools', keywords: ['select', 'move'], action: () => setActiveTool('select') },
    { id: 'tool-draw', title: 'Draw Tool', description: 'Draw shapes and lines', icon: '✏️', category: 'Tools', keywords: ['draw', 'pen'], action: () => setActiveTool('draw') },
    { id: 'tool-3d', title: '3D View', description: 'Navigate 3D space', icon: '📦', category: 'Tools', keywords: ['3d', 'view'], action: () => setActiveTool('3d') },
    { id: 'tool-materials', title: 'Materials Tool', description: 'Apply materials', icon: '🎨', category: 'Tools', keywords: ['material', 'texture'], action: () => setActiveTool('materials') },
    { id: 'tool-lighting', title: 'Lighting Tool', description: 'Adjust lighting', icon: '💡', category: 'Tools', keywords: ['light', 'illuminate'], action: () => setActiveTool('lighting') },
    { id: 'tool-measure', title: 'Measure Tool', description: 'Measure distances', icon: '📏', category: 'Tools', keywords: ['measure', 'ruler'], action: () => setActiveTool('measure') },
    // Actions
    { id: 'load-model', title: 'Load 3D Model', description: 'Import GLTF/OBJ files', icon: '📁', category: 'Actions', keywords: ['load', 'import', 'model'], action: () => setShowModelLoader(true) },
    { id: 'export', title: 'Export Project', description: 'Export in multiple formats', icon: '💾', category: 'Actions', keywords: ['export', 'save', 'download'], action: () => setShowExport(true) },
    { id: 'projects', title: 'Manage Projects', description: 'View and manage projects', icon: '📂', category: 'Actions', keywords: ['project', 'manage'], action: () => setShowProjectManager(true) },
    { id: 'analytics', title: 'Analytics Dashboard', description: 'View usage metrics', icon: '📊', category: 'Actions', keywords: ['analytics', 'stats', 'metrics'], action: () => setShowAnalytics(true) },
    { id: 'notifications', title: 'Notifications', description: 'View all notifications', icon: '🔔', category: 'Actions', keywords: ['notification', 'alert'], action: () => setShowNotifications(true) },
    { id: 'shortcuts', title: 'Keyboard Shortcuts', description: 'View all shortcuts', icon: '⌨️', category: 'Actions', keywords: ['keyboard', 'shortcuts', 'help'], action: () => setShowShortcuts(true) },
    { id: 'tutorial', title: 'Tutorial', description: 'Interactive walkthrough', icon: '🎓', category: 'Actions', keywords: ['tutorial', 'help', 'guide'], action: () => setShowTutorial(true) },
    { id: 'theme', title: 'Toggle Theme', description: 'Switch dark/light mode', icon: theme === 'dark' ? '☀️' : '🌙', category: 'Actions', keywords: ['theme', 'dark', 'light'], action: () => toggleTheme?.() },
    { id: 'undo', title: 'Undo', description: 'Undo last action', icon: '↶', category: 'Actions', keywords: ['undo', 'revert'], action: undo },
    { id: 'redo', title: 'Redo', description: 'Redo last action', icon: '↷', category: 'Actions', keywords: ['redo', 'repeat'], action: redo },
    // Construction Management
    { id: 'contractors', title: 'Contractor Directory', description: '110 contractors across 32 cities', icon: '👷', category: 'Construction', keywords: ['contractor', 'hire', 'professional'], action: () => setShowContractorDirectory(true) },
    { id: 'scheduling', title: 'Project Scheduling', description: 'Calendar and timeline management', icon: '📅', category: 'Construction', keywords: ['schedule', 'calendar', 'timeline'], action: () => setShowScheduling(true) },
    { id: 'inventory', title: 'Inventory Management', description: 'Track materials and supplies', icon: '📦', category: 'Construction', keywords: ['inventory', 'stock', 'materials'], action: () => setShowInventory(true) },
    { id: 'marketplace', title: 'Marketplace', description: 'Buy materials, rent equipment, hire services', icon: '🛍️', category: 'Construction', keywords: ['marketplace', 'buy', 'shop', 'equipment'], action: () => setShowMarketplace(true) },
    { id: 'invoicing', title: 'Invoicing & Payments', description: 'Create invoices and track payments', icon: '💰', category: 'Construction', keywords: ['invoice', 'payment', 'billing', 'revenue'], action: () => setShowInvoicing(true) },
    { id: 'timeline', title: 'Project Timeline', description: 'Gantt chart and supply chain tracking', icon: '📊', category: 'Construction', keywords: ['timeline', 'gantt', 'schedule', 'deliveries', 'supply'], action: () => setShowTimeline(true) },
    { id: 'product-3d', title: '3D Product Visualizer', description: 'Place real products in 3D scene', icon: '🎨', category: 'Design', keywords: ['3d', 'product', 'visualize', 'render', 'materials'], action: () => setShowProduct3DViewer(true) },
    { id: 'digital-twin', title: 'Digital Twin System', description: 'Real-time simulation and predictive analytics', icon: '🔄', category: 'Advanced', keywords: ['twin', 'simulation', 'iot', 'sensors'], action: () => setShowDigitalTwin(true) },
    { id: 'bbr', title: 'Black Box Recorder', description: 'Tamper-proof audit trail and liability protection', icon: '🛡️', category: 'Advanced', keywords: ['audit', 'log', 'compliance', 'liability'], action: () => setShowBBR(true) },
    { id: 'ar', title: 'AR Preview', description: 'View products in real space', icon: '📱', category: 'Visualization', keywords: ['ar', 'augmented', 'reality', 'camera'], action: () => setShowARPreview(true) },
  ];
  
  // Cloud sync
  const cloudSync = useCloudSync(currentProjectId, {
    autoSync: true,
    syncInterval: 30000,
    onSyncComplete: () => {
      console.log('Project synced to cloud');
    },
    onSyncError: (error) => {
      console.error('Sync error:', error);
    },
  });
  
  // Set up sync function with trpc
  const updateProjectMutation = trpc.projects.update.useMutation();
  
  useEffect(() => {
    cloudSync.setSyncFunction(async (data) => {
      if (!currentProjectId) return;
      await updateProjectMutation.mutateAsync({
        id: currentProjectId,
        ...data,
      });
    });
  }, [currentProjectId, cloudSync, updateProjectMutation]);

  // Voice command handler
  const handleVoiceCommand = (command: string) => {
    switch (command) {
      case 'ai-partners': setActivePanel('ai-partners'); break;
      case 'materials': setActivePanel('materials'); break;
      case 'rendering': setActivePanel('rendering'); break;
      case 'compliance': setActivePanel('compliance'); break;
      case 'cost': setActivePanel('cost'); break;
      case 'contractors': setShowContractorDirectory(true); break;
      case 'scheduling': setShowScheduling(true); break;
      case 'inventory': setShowInventory(true); break;
      case 'marketplace': setShowMarketplace(true); break;
      case 'invoicing': setShowInvoicing(true); break;
      case 'timeline': setShowTimeline(true); break;
      case 'analytics': setShowAnalytics(true); break;
      case 'undo': undo(); break;
      case 'redo': redo(); break;
      case 'save': setShowProjectManager(true); break;
      case 'load-model': setShowModelLoader(true); break;
      case 'theme': toggleTheme?.(); break;
      case 'help': setShowShortcuts(true); break;
    }
  };

  // AI suggestion handler
  const handleAISuggestion = (suggestionId: string) => {
    console.log('Applying suggestion:', suggestionId);
    // Handle different suggestion types
    if (suggestionId === 's1') setActivePanel('materials');
    if (suggestionId === 's2') setActivePanel('materials');
    if (suggestionId === 's3') setActivePanel('cost');
    if (suggestionId === 's4') setActivePanel('compliance');
    if (suggestionId === 's5') setShowScheduling(true);
  };
  const [loadedModel, setLoadedModel] = useState<{ url: string; name: string; type: string } | null>(null);
  const [showModelLoader, setShowModelLoader] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // Global keyboard shortcuts
  // Track session on mount
  useEffect(() => {
    trackSession();
  }, []);

  // Update notification count
  useEffect(() => {
    const updateNotificationCount = () => {
      const stored = localStorage.getItem("ardo_notifications");
      if (stored) {
        const notifications = JSON.parse(stored);
        const unread = notifications.filter((n: any) => !n.read).length;
        setNotificationCount(unread);
      }
    };

    updateNotificationCount();
    window.addEventListener("ardo-notification-added", updateNotificationCount);
    
    // Update count every 30 seconds
    const interval = setInterval(updateNotificationCount, 30000);

    return () => {
      window.removeEventListener("ardo-notification-added", updateNotificationCount);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Show command palette with Cmd+K or Ctrl+K
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowCommandPalette(true);
        return;
      }
      
      // Show shortcuts with '?'
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setShowShortcuts(true);
      }
      // Undo/Redo shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) {
          undo();
          toast.success('Undo');
        }
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        if (canRedo) {
          redo();
          toast.success('Redo');
        }
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
    <div className="min-h-screen flex flex-col bg-[#0a0e14] text-white overflow-hidden">
      {showOnboarding && (
        <OnboardingTour
          onComplete={() => setShowOnboarding(false)}
          onSkip={() => setShowOnboarding(false)}
        />
      )}
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0 bg-[#0f1419]/80 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="text-xl font-light tracking-wide">ARDO</span>
          </div>
          
          <QuickActionsToolbar
            onSave={() => { cloudSync.forceSyncNow(); toast.success('Project saved!'); }}
            onExport={() => toast.info('Export coming soon')}
            onImport={() => setShowModelLoader(true)}
            onCopy={() => toast.success('Copied')}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
          
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
            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              Edit
            </button>
            
            <div className="relative group">
              <button className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                View
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-[#0f1419] border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <button
                  onClick={() => setShowAnalytics(true)}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all first:rounded-t-lg last:rounded-b-lg"
                >
                  Analytics Dashboard
                </button>
              </div>
            </div>
            
            <button className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              Project
            </button>
            <button
              onClick={() => setShowTutorial(true)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              Help
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Undo/Redo Buttons */}
          <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-2 rounded-lg transition-all ${
                canUndo
                  ? "text-gray-400 hover:text-white hover:bg-white/10"
                  : "text-gray-700 cursor-not-allowed"
              }`}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10" />
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-2 rounded-lg transition-all ${
                canRedo
                  ? "text-gray-400 hover:text-white hover:bg-white/10"
                  : "text-gray-700 cursor-not-allowed"
              }`}
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search tools, materials, and features..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-teal-400/50 focus:bg-white/10 transition-all placeholder:text-gray-500"
            />
          </div>
          
          <button
            onClick={() => setShowNotifications(true)}
            className="p-2.5 hover:bg-white/5 rounded-lg transition-all relative group"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-2.5 hover:bg-white/5 rounded-lg transition-all group"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            )}
          </button>
          
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
            <div className="flex items-center gap-4">
              <CollaborationPresence projectId={currentProjectId} />
              {currentProjectId && (
                <CloudSyncIndicator
                  status={cloudSync.syncStatus}
                  lastSyncTime={cloudSync.lastSyncTime}
                  pendingChanges={cloudSync.pendingChanges}
                  onSync={cloudSync.forceSyncNow}
                />
              )}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Ready</span>
              </div>
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
            {activePanel === null ? (
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
                    { id: "ai-partners", icon: Bot, label: "AI Design Partners", color: "text-blue-400", desc: "64 personalities + 50 trade specialists" },
                    { id: "rendering", icon: Sparkles, label: "Real-time Rendering", color: "text-purple-400", desc: "Multiple styles" },
                    { id: "compliance", icon: ShieldCheck, label: "Compliance Check", color: "text-green-400", desc: "Code scanning" },
                    { id: "cost", icon: DollarSign, label: "Cost Optimizer", color: "text-yellow-400", desc: "4 optimization modes" },
                    { id: "materials", icon: Library, label: "Material Library", color: "text-orange-400", desc: "6,000+ materials" },
                    { id: "acoustic", icon: Waves, label: "Acoustic Analysis", color: "text-cyan-400", desc: "Sound simulation" },
                    { id: "vr-ar", icon: Glasses, label: "VR/AR Preview", color: "text-pink-400", desc: "Immersive view" },
                    { id: "space-architecture", icon: Rocket, label: "Space Architecture", color: "text-indigo-400", desc: "Extraterrestrial design" },
                    { id: "transportation", icon: Train, label: "Transportation Infrastructure", color: "text-blue-400", desc: "Transit & roads" },
                    { id: "measurement", icon: Ruler, label: "Measurement Tools", color: "text-emerald-400", desc: "Precision instruments" },
                    { id: "smart-material", icon: Sparkles, label: "Smart Material Selection", color: "text-purple-400", desc: "AI recommendations" },
                    { id: "material-id", icon: Camera, label: "Material Identification", color: "text-cyan-400", desc: "AI vision analysis" },
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
                onClose={() => setActivePanel(null)}
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
              <ComplianceCheckPanel onClose={() => setActivePanel(null)} />
            ) : activePanel === "cost" ? (
              <CostOptimizerPanel onClose={() => setActivePanel(null)} />
            ) : activePanel === "materials" ? (
              <MaterialLibraryPanel onClose={() => setActivePanel(null)} />
            ) : activePanel === "acoustic" ? (
              <AcousticAnalysisPanel onClose={() => setActivePanel(null)} />
            ) : activePanel === "vr-ar" ? (
              <VRARPreviewPanel onClose={() => setActivePanel(null)} />
            ) : activePanel === "space-architecture" ? (
              <SpaceArchitecturePanel onClose={() => setActivePanel(null)} />
            ) : activePanel === "transportation" ? (
              <TransportationInfrastructurePanel onClose={() => setActivePanel(null)} />
            ) : activePanel === "rendering" ? (
              <RenderingPanel onClose={() => setActivePanel(null)} />
            ) : activePanel === "measurement" ? (
              <MeasurementToolsPanel onClose={() => setActivePanel(null)} />
            ) : activePanel === "smart-material" ? (
              <SmartMaterialSelectionPanel onClose={() => setActivePanel(null)} />
            ) : activePanel === "material-id" ? (
              <MaterialIdentificationPanel onClose={() => setActivePanel(null)} />
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

      {/* Command Palette */}
      {showCommandPalette && (
        <CommandPalette
          onClose={() => setShowCommandPalette(false)}
          actions={commandActions}
        />
      )}

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

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <AnalyticsDashboard onClose={() => setShowAnalytics(false)} />
      )}

      {/* Notification Center */}
      {showNotifications && (
        <NotificationCenter
          onClose={() => {
            setShowNotifications(false);
            // Update count after closing
            const stored = localStorage.getItem("ardo_notifications");
            if (stored) {
              const notifications = JSON.parse(stored);
              const unread = notifications.filter((n: any) => !n.read).length;
              setNotificationCount(unread);
            }
          }}
        />
      )}

      {/* Contractor Directory */}
      {showContractorDirectory && (
        <ContractorDirectory
          onClose={() => setShowContractorDirectory(false)}
          onSelectContractor={(contractor) => {
            console.log('Selected contractor:', contractor);
            // Here you can add logic to schedule or assign the contractor
          }}
        />
      )}

      {/* Scheduling System */}
      {showScheduling && (
        <SchedulingSystem onClose={() => setShowScheduling(false)} />
      )}

      {/* Inventory Management */}
      {showInventory && (
        <InventoryManagement onClose={() => setShowInventory(false)} />
      )}

      {/* Marketplace */}
      {showMarketplace && (
        <Marketplace onClose={() => setShowMarketplace(false)} />
      )}

      {/* Invoicing System */}
      {showInvoicing && (
        <InvoicingSystem onClose={() => setShowInvoicing(false)} />
      )}

      {/* Voice Commands */}
      <VoiceCommands onCommand={handleVoiceCommand} />

      {/* AI Design Suggestions */}
      {showAISuggestions && (
        <AIDesignSuggestions onApplySuggestion={handleAISuggestion} />
      )}

      {/* Project Timeline */}
      {showTimeline && (
        <ProjectTimeline onClose={() => setShowTimeline(false)} />
      )}

      {/* 3D Product Visualizer */}
      {showProduct3DViewer && <Product3DViewer onClose={() => setShowProduct3DViewer(false)} />}
      {showDigitalTwin && <DigitalTwinSystem onClose={() => setShowDigitalTwin(false)} />}
      {showBBR && <BlackBoxRecorder onClose={() => setShowBBR(false)} />}
      {showARPreview && <ARPreview onClose={() => setShowARPreview(false)} />}

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

