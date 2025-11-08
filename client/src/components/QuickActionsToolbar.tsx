import { Save, Download, Upload, Copy, Undo, Redo, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsToolbarProps {
  onSave: () => void;
  onExport: () => void;
  onImport: () => void;
  onCopy: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function QuickActionsToolbar({
  onSave, onExport, onImport, onCopy, onUndo, onRedo, canUndo, canRedo
}: QuickActionsToolbarProps) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg">
      <Button size="sm" variant="ghost" onClick={onSave} className="h-8 px-2 hover-lift">
        <Save className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="ghost" onClick={onExport} className="h-8 px-2 hover-lift">
        <Download className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="ghost" onClick={onImport} className="h-8 px-2 hover-lift">
        <Upload className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="ghost" onClick={onCopy} className="h-8 px-2 hover-lift">
        <Copy className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-white/10 mx-1" />
      <Button size="sm" variant="ghost" onClick={onUndo} disabled={!canUndo} className="h-8 px-2 hover-lift">
        <Undo className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="ghost" onClick={onRedo} disabled={!canRedo} className="h-8 px-2 hover-lift">
        <Redo className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-white/10 mx-1" />
      <div className="flex items-center gap-1 px-2 text-xs text-teal-400">
        <Zap className="w-3 h-3" />
        <span>Quick Actions</span>
      </div>
    </div>
  );
}

