import { X, Plus, Trash2, Eye, EyeOff, Move, RotateCw, Maximize2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { product3DCatalog, Product3D, getProductsByCategory } from "@/lib/product3DCatalog";

interface PlacedProduct {
  id: string;
  productId: string;
  product: Product3D;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  visible: boolean;
}

interface Product3DViewerProps {
  onClose: () => void;
}

export default function Product3DViewer({ onClose }: Product3DViewerProps) {
  const [placedProducts, setPlacedProducts] = useState<PlacedProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Product3D['category']>('flooring');
  const [selectedPlacedProduct, setSelectedPlacedProduct] = useState<string | null>(null);

  const categories: Product3D['category'][] = ['flooring', 'tile', 'countertop', 'lighting', 'furniture', 'fixture'];

  const addProductToScene = (product: Product3D) => {
    const newPlaced: PlacedProduct = {
      id: `placed-${Date.now()}`,
      productId: product.id,
      product,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      visible: true,
    };
    setPlacedProducts([...placedProducts, newPlaced]);
  };

  const removeProduct = (id: string) => {
    setPlacedProducts(placedProducts.filter(p => p.id !== id));
    if (selectedPlacedProduct === id) {
      setSelectedPlacedProduct(null);
    }
  };

  const toggleVisibility = (id: string) => {
    setPlacedProducts(placedProducts.map(p =>
      p.id === id ? { ...p, visible: !p.visible } : p
    ));
  };

  const updatePosition = (id: string, axis: 'x' | 'y' | 'z', value: number) => {
    setPlacedProducts(placedProducts.map(p =>
      p.id === id ? { ...p, position: { ...p.position, [axis]: value } } : p
    ));
  };

  const updateRotation = (id: string, axis: 'x' | 'y' | 'z', value: number) => {
    setPlacedProducts(placedProducts.map(p =>
      p.id === id ? { ...p, rotation: { ...p.rotation, [axis]: value } } : p
    ));
  };

  const updateScale = (id: string, value: number) => {
    setPlacedProducts(placedProducts.map(p =>
      p.id === id ? { ...p, scale: { x: value, y: value, z: value } } : p
    ));
  };

  const categoryProducts = getProductsByCategory(selectedCategory);
  const selectedProduct = placedProducts.find(p => p.id === selectedPlacedProduct);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-[95vw] h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-teal-500/10 to-blue-500/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-light text-white mb-1">3D Product Visualizer</h2>
              <p className="text-gray-400 text-sm">Place real-world products in your 3D scene with photorealistic rendering</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Product Library Sidebar */}
          <div className="w-80 border-r border-white/10 flex flex-col">
            {/* Category Tabs */}
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-medium mb-3">Product Categories</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-colors capitalize ${
                      selectedCategory === cat
                        ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {categoryProducts.map(product => (
                  <div
                    key={product.id}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm mb-1">{product.name}</h4>
                        <p className="text-gray-500 text-xs">{product.vendor}</p>
                      </div>
                      <button
                        onClick={() => addProductToScene(product)}
                        className="p-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded border border-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        {(product.dimensions.width * 39.37).toFixed(1)}" × {(product.dimensions.depth * 39.37).toFixed(1)}"
                      </span>
                      <span className="text-teal-400 font-medium">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Viewport */}
          <div className="flex-1 flex flex-col">
            {/* 3D Canvas */}
            <div className="flex-1 bg-gradient-to-br from-gray-900 to-black relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-teal-500/10 rounded-full flex items-center justify-center border-2 border-teal-500/30">
                    <Maximize2 className="w-16 h-16 text-teal-400" />
                  </div>
                  <p className="text-gray-400 mb-2">3D Viewport</p>
                  <p className="text-gray-500 text-sm">Select products from the left to place them in the scene</p>
                  <p className="text-gray-600 text-xs mt-4">{placedProducts.length} products placed</p>
                </div>
              </div>
            </div>

            {/* Placed Products List */}
            <div className="h-48 border-t border-white/10 p-4 overflow-y-auto bg-black/20">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <span>Placed Products</span>
                <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 text-xs rounded border border-teal-500/30">
                  {placedProducts.length}
                </span>
              </h3>
              {placedProducts.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">No products placed yet</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {placedProducts.map(placed => (
                    <div
                      key={placed.id}
                      onClick={() => setSelectedPlacedProduct(placed.id)}
                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                        selectedPlacedProduct === placed.id
                          ? 'bg-teal-500/20 border-teal-500/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-white text-xs font-medium truncate flex-1">{placed.product.name}</p>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleVisibility(placed.id); }}
                            className="p-0.5 hover:bg-white/10 rounded"
                          >
                            {placed.visible ? (
                              <Eye className="w-3 h-3 text-gray-400" />
                            ) : (
                              <EyeOff className="w-3 h-3 text-gray-600" />
                            )}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeProduct(placed.id); }}
                            className="p-0.5 hover:bg-red-500/20 rounded"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs">${placed.product.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Properties Panel */}
          {selectedProduct && (
            <div className="w-80 border-l border-white/10 p-4 overflow-y-auto bg-black/20">
              <h3 className="text-white font-medium mb-4">Product Properties</h3>
              
              <div className="space-y-4">
                {/* Position */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <Move className="w-4 h-4" />
                    Position
                  </label>
                  <div className="space-y-2">
                    {(['x', 'y', 'z'] as const).map(axis => (
                      <div key={axis} className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs w-4">{axis.toUpperCase()}</span>
                        <input
                          type="range"
                          min="-5"
                          max="5"
                          step="0.1"
                          value={selectedProduct.position[axis]}
                          onChange={(e) => updatePosition(selectedProduct.id, axis, parseFloat(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-gray-400 text-xs w-12 text-right">
                          {selectedProduct.position[axis].toFixed(1)}m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rotation */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <RotateCw className="w-4 h-4" />
                    Rotation
                  </label>
                  <div className="space-y-2">
                    {(['x', 'y', 'z'] as const).map(axis => (
                      <div key={axis} className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs w-4">{axis.toUpperCase()}</span>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          step="15"
                          value={selectedProduct.rotation[axis]}
                          onChange={(e) => updateRotation(selectedProduct.id, axis, parseFloat(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-gray-400 text-xs w-12 text-right">
                          {selectedProduct.rotation[axis]}°
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scale */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    Scale
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={selectedProduct.scale.x}
                      onChange={(e) => updateScale(selectedProduct.id, parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-gray-400 text-xs w-12 text-right">
                      {selectedProduct.scale.x.toFixed(1)}x
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-white font-medium mb-2">Product Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vendor:</span>
                      <span className="text-gray-300">{selectedProduct.product.vendor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price:</span>
                      <span className="text-teal-400 font-medium">${selectedProduct.product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Dimensions:</span>
                      <span className="text-gray-300 text-xs">
                        {(selectedProduct.product.dimensions.width * 39.37).toFixed(1)}" × 
                        {(selectedProduct.product.dimensions.height * 39.37).toFixed(1)}" × 
                        {(selectedProduct.product.dimensions.depth * 39.37).toFixed(1)}"
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

