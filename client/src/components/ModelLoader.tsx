import { useState, useRef } from "react";
import { Upload, FileUp, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModelLoaderProps {
  onModelLoad: (modelData: { url: string; name: string; type: string }) => void;
}

export default function ModelLoader({ onModelLoad }: ModelLoaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const modelFile = files.find((file) =>
      [".gltf", ".glb", ".obj", ".fbx"].some((ext) => file.name.toLowerCase().endsWith(ext))
    );

    if (modelFile) {
      handleFileUpload(modelFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadedFile(file);

    // Create object URL for the file
    const url = URL.createObjectURL(file);
    const fileType = file.name.split(".").pop()?.toLowerCase() || "";

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onModelLoad({
      url,
      name: file.name,
      type: fileType,
    });

    setIsUploading(false);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6">
      <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
        Load 3D Model
      </h4>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
          isDragging
            ? "border-teal-400 bg-teal-500/10"
            : "border-white/20 hover:border-white/30 bg-white/5"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".gltf,.glb,.obj,.fbx"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4 text-center">
          {uploadedFile ? (
            <>
              <div className="w-16 h-16 bg-teal-500/20 rounded-xl flex items-center justify-center">
                <Check className="w-8 h-8 text-teal-400" />
              </div>
              <div>
                <p className="text-white font-medium mb-1">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                onClick={() => setUploadedFile(null)}
                variant="outline"
                className="bg-transparent border-white/20"
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center">
                {isUploading ? (
                  <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-white font-medium mb-1">
                  {isUploading ? "Uploading..." : "Drop your 3D model here"}
                </p>
                <p className="text-sm text-gray-500">
                  Supports GLTF, GLB, OBJ, FBX formats
                </p>
              </div>
              <Button
                onClick={handleBrowseClick}
                disabled={isUploading}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400"
              >
                <FileUp className="w-4 h-4 mr-2" />
                Browse Files
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Sample Models */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
          Sample Models
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Modern House", type: "GLTF" },
            { name: "Office Building", type: "GLB" },
            { name: "Urban Plaza", type: "OBJ" },
            { name: "Interior Space", type: "GLTF" },
          ].map((sample, index) => (
            <button
              key={index}
              onClick={() =>
                onModelLoad({
                  url: `/samples/${sample.name.toLowerCase().replace(" ", "-")}.gltf`,
                  name: sample.name,
                  type: sample.type.toLowerCase(),
                })
              }
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/30 transition-all text-left"
            >
              <div className="text-sm font-medium text-white mb-1">{sample.name}</div>
              <div className="text-xs text-gray-500">{sample.type}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

