import { useState, useEffect } from "react";
import { X, Camera, Maximize2, RotateCw, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { product3DCatalog } from "@/lib/product3DCatalog";

interface ARPreviewProps {
  onClose: () => void;
}

export default function ARPreview({ onClose }: ARPreviewProps) {
  const [isARSupported, setIsARSupported] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(product3DCatalog[0]);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Check if WebXR AR is supported
    if ('xr' in navigator) {
      (navigator as any).xr.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setIsARSupported(supported);
      });
    }
  }, []);

  const startARSession = async () => {
    if (!isARSupported) {
      alert('AR is not supported on this device. Please use a device with ARCore (Android) or ARKit (iOS) support.');
      return;
    }

    try {
      setIsARActive(true);
      // In production, this would initialize WebXR session
      // For now, we'll show a simulated AR view
    } catch (error) {
      console.error('Failed to start AR session:', error);
      setIsARActive(false);
    }
  };

  const stopARSession = () => {
    setIsARActive(false);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-purple-500/30">
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-bold text-white">AR Preview</h2>
            <p className="text-sm text-gray-400">View products in your space</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Product Selection */}
        <div className="w-80 bg-gray-900/50 border-r border-gray-800 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Select Product</h3>
            <div className="space-y-2">
              {product3DCatalog.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedProduct.id === product.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm opacity-75">{product.category}</div>
                  <div className="text-xs opacity-60 mt-1">
                    {product.dimensions.width}×{product.dimensions.depth}×{product.dimensions.height} m
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - AR View */}
        <div className="flex-1 relative bg-gradient-to-br from-gray-900 to-black">
          {!isARActive ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-24 h-24 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">Ready for AR</h3>
              <p className="text-gray-400 mb-6 text-center max-w-md">
                Point your camera at a flat surface to place {selectedProduct.name}
              </p>
              
              {isARSupported ? (
                <Button
                  onClick={startARSession}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg"
                >
                  <Camera className="w-6 h-6 mr-2" />
                  Start AR Experience
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-yellow-400 mb-4">⚠️ AR not supported on this device</p>
                  <p className="text-sm text-gray-500 max-w-md">
                    AR Preview requires a device with ARCore (Android 7.0+) or ARKit (iOS 11+) support.
                    You can still use the 3D Product Visualizer for desktop viewing.
                  </p>
                </div>
              )}

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Maximize2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Scale</div>
                  <div className="text-xs text-gray-500">Pinch to resize</div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <RotateCw className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Rotate</div>
                  <div className="text-xs text-gray-500">Two-finger twist</div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <Move className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Move</div>
                  <div className="text-xs text-gray-500">Drag to reposition</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-pulse mb-4">
                  <Camera className="w-16 h-16 text-purple-400 mx-auto" />
                </div>
                <p className="text-white text-lg mb-2">AR Session Active</p>
                <p className="text-gray-400 mb-6">Point camera at a flat surface</p>
                <Button
                  onClick={stopARSession}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  Exit AR
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Product Info & Controls */}
        <div className="w-80 bg-gray-900/50 border-l border-gray-800 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Product Details</h3>
            
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-white mb-2">{selectedProduct.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{selectedProduct.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dimensions:</span>
                  <span className="text-white">
                    {selectedProduct.dimensions.width}×{selectedProduct.dimensions.depth}×{selectedProduct.dimensions.height} m
                  </span>
                </div>

              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-4">AR Controls</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Scale: {scale.toFixed(1)}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Rotation: {rotation}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <Button
                onClick={() => {
                  setScale(1.0);
                  setRotation(0);
                }}
                variant="outline"
                className="w-full"
              >
                Reset Transform
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">💡 AR Tips</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Find a well-lit area</li>
                <li>• Point at flat surfaces</li>
                <li>• Move slowly for tracking</li>
                <li>• Use pinch/twist gestures</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

