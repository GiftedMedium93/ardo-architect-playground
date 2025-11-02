import { ChevronLeft, Upload, Camera, Sparkles, Loader2, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface MaterialIdentificationPanelProps {
  onClose: () => void;
}

export default function MaterialIdentificationPanel({ onClose }: MaterialIdentificationPanelProps) {
  const [activeCategory, setActiveCategory] = useState<"color" | "stone" | "plant">("color");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const identifyMutation = trpc.ai.identifyMaterial.useMutation({
    onSuccess: (data: any) => {
      setAnalysisResult(data);
      setIsAnalyzing(false);
      toast.success("Material identified successfully!");
    },
    onError: (error: any) => {
      setIsAnalyzing(false);
      toast.error("Failed to identify material: " + error.message);
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsAnalyzing(true);
    identifyMutation.mutate({
      imageData: uploadedImage,
      category: activeCategory,
    });
  };

  const categories = [
    { id: "color", label: "Color/Texture/Fabric", desc: "Identify colors, textures, and fabric materials" },
    { id: "stone", label: "Stone/Wood/Metal", desc: "Identify building materials and finishes" },
    { id: "plant", label: "Plant/Animal/Fungi", desc: "Identify natural organisms and materials" },
  ];

  return (
    <>
      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/5"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </Button>
          <div>
            <h3 className="text-lg font-light tracking-wide text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-cyan-400" />
              Material Identification
            </h3>
            <p className="text-xs text-gray-500">AI-powered image recognition</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Category Selection */}
        <div>
          <h4 className="text-sm font-medium text-white mb-4">Identification Category</h4>
          <div className="grid grid-cols-1 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${
                  activeCategory === category.id
                    ? "bg-cyan-500/10 border-cyan-400/30 shadow-lg shadow-cyan-500/10"
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-cyan-400/20"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activeCategory === category.id
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-white/5 text-gray-400"
                }`}>
                  <Camera className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white mb-1">{category.label}</div>
                  <div className="text-xs text-gray-500">{category.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h4 className="text-sm font-medium text-white mb-4">Upload Image</h4>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-white/10 rounded-xl p-8 hover:border-cyan-400/30 hover:bg-white/5 transition-all cursor-pointer group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            {uploadedImage ? (
              <div className="space-y-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-64 object-contain rounded-lg bg-black/20"
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Image
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-all">
                  <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <p className="text-sm text-white mb-2">Click to upload an image</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        {uploadedImage && (
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Identify Material
              </>
            )}
          </Button>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Identification Results
            </h4>

            {/* Primary Identification */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="text-lg font-semibold text-white mb-1">
                    {analysisResult.primaryMaterial}
                  </h5>
                  <p className="text-sm text-gray-400">{analysisResult.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-400">
                    {analysisResult.confidence}%
                  </div>
                  <div className="text-xs text-gray-500">Confidence</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-300 leading-relaxed">
                {analysisResult.description}
              </p>
            </div>

            {/* Additional Properties */}
            {analysisResult.properties && analysisResult.properties.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-white mb-3">Material Properties</h5>
                <div className="grid grid-cols-2 gap-2">
                  {analysisResult.properties.map((prop: any, index: number) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="text-xs text-gray-500 mb-1">{prop.label}</div>
                      <div className="text-sm font-medium text-white">{prop.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alternative Matches */}
            {analysisResult.alternatives && analysisResult.alternatives.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-white mb-3">Alternative Matches</h5>
                <div className="space-y-2">
                  {analysisResult.alternatives.map((alt: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <span className="text-sm text-white">{alt.name}</span>
                      <span className="text-sm text-gray-400">{alt.confidence}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysisResult.recommendations && (
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-400/20">
                <h5 className="text-sm font-medium text-blue-400 mb-2">Architectural Applications</h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  {analysisResult.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
          <h4 className="text-sm font-medium text-cyan-400 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            How It Works
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Upload an image of any material, and our AI will analyze it to identify colors, textures, material types, and provide architectural recommendations. The system uses advanced computer vision to recognize thousands of materials with high accuracy.
          </p>
        </div>
      </div>
    </>
  );
}

