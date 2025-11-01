import { useState } from "react";
import { Download, FileImage, FileText, Box, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportPanelProps {
  onClose: () => void;
  projectName?: string;
}

export default function ExportPanel({ onClose, projectName = "Untitled Project" }: ExportPanelProps) {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const exportFormats = [
    {
      id: "png",
      name: "PNG Image",
      description: "High-quality raster image",
      icon: FileImage,
      extension: ".png",
      category: "2D",
    },
    {
      id: "jpg",
      name: "JPEG Image",
      description: "Compressed raster image",
      icon: FileImage,
      extension: ".jpg",
      category: "2D",
    },
    {
      id: "pdf",
      name: "PDF Document",
      description: "Portable document with annotations",
      icon: FileText,
      extension: ".pdf",
      category: "2D",
    },
    {
      id: "gltf",
      name: "GLTF Model",
      description: "3D model for web and AR",
      icon: Box,
      extension: ".gltf",
      category: "3D",
    },
    {
      id: "obj",
      name: "OBJ Model",
      description: "Universal 3D model format",
      icon: Box,
      extension: ".obj",
      category: "3D",
    },
    {
      id: "fbx",
      name: "FBX Model",
      description: "Autodesk interchange format",
      icon: Box,
      extension: ".fbx",
      category: "3D",
    },
  ];

  const handleExport = async () => {
    if (!selectedFormat) return;

    setIsExporting(true);

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const format = exportFormats.find((f) => f.id === selectedFormat);
    if (format) {
      // Create a download link (in real implementation, this would be actual file data)
      const fileName = `${projectName.replace(/\s+/g, "_")}${format.extension}`;
      console.log(`Exporting as: ${fileName}`);
      
      // In a real implementation, you would:
      // 1. Capture the 3D scene
      // 2. Convert to the selected format
      // 3. Trigger browser download
    }

    setIsExporting(false);
    setExportComplete(true);

    // Auto-close after showing success
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-light text-white">Export Project</h3>
            <p className="text-sm text-gray-500 mt-1">{projectName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-all"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Export Formats */}
        <div className="p-6">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
            Select Format
          </h4>

          {/* 2D Formats */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-3">2D Formats</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {exportFormats
                .filter((format) => format.category === "2D")
                .map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      selectedFormat === format.id
                        ? "border-teal-400 bg-teal-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedFormat === format.id
                            ? "bg-teal-500/20"
                            : "bg-white/10"
                        }`}
                      >
                        <format.icon
                          className={`w-5 h-5 ${
                            selectedFormat === format.id ? "text-teal-400" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white mb-1">
                          {format.name}
                        </div>
                        <div className="text-xs text-gray-500">{format.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* 3D Formats */}
          <div>
            <p className="text-xs text-gray-500 mb-3">3D Formats</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {exportFormats
                .filter((format) => format.category === "3D")
                .map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      selectedFormat === format.id
                        ? "border-teal-400 bg-teal-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedFormat === format.id
                            ? "bg-teal-500/20"
                            : "bg-white/10"
                        }`}
                      >
                        <format.icon
                          className={`w-5 h-5 ${
                            selectedFormat === format.id ? "text-teal-400" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white mb-1">
                          {format.name}
                        </div>
                        <div className="text-xs text-gray-500">{format.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {selectedFormat
              ? `Ready to export as ${exportFormats.find((f) => f.id === selectedFormat)?.name}`
              : "Select a format to continue"}
          </p>
          <div className="flex items-center gap-3">
            <Button onClick={onClose} variant="outline" className="bg-transparent border-white/20">
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={!selectedFormat || isExporting || exportComplete}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400"
            >
              {exportComplete ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Exported
                </>
              ) : isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

