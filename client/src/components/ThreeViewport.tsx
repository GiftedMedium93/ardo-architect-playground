import { OrbitControls, Grid, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef } from "react";
import * as THREE from "three";

interface ThreeViewportProps {
  className?: string;
}

interface InteractiveMeshProps {
  position: [number, number, number];
  geometry: "box" | "sphere" | "cylinder";
  onMaterialApply?: (material: any) => void;
}

function InteractiveMesh({ position, geometry, onMaterialApply }: InteractiveMeshProps) {
  const [material, setMaterial] = useState<any>({
    color: "#14b8a6",
    metalness: 0.3,
    roughness: 0.4,
  });
  const meshRef = useRef<THREE.Mesh>(null);

  const handleClick = () => {
    console.log("Mesh clicked", meshRef.current);
  };

  const geometryComponent = {
    box: <boxGeometry args={[2, 2, 2]} />,
    sphere: <sphereGeometry args={[1.5, 32, 32]} />,
    cylinder: <cylinderGeometry args={[0.5, 0.5, 1, 32]} />,
  }[geometry];

  return (
    <mesh ref={meshRef} position={position} castShadow onClick={handleClick}>
      {geometryComponent}
      <meshStandardMaterial
        color={material.color}
        metalness={material.metalness}
        roughness={material.roughness}
      />
    </mesh>
  );
}

export default function ThreeViewport({ className }: ThreeViewportProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const materialData = JSON.parse(e.dataTransfer.getData("application/json"));
      console.log("Material dropped:", materialData);
      // TODO: Apply material to selected 3D object
    } catch (error) {
      console.error("Failed to parse material data:", error);
    }
  };

  return (
    <div 
      className={`${className} relative`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragOver && (
        <div className="absolute inset-0 bg-teal-500/20 border-4 border-teal-400 border-dashed rounded-xl z-10 flex items-center justify-center pointer-events-none">
          <div className="px-8 py-4 bg-teal-500/90 backdrop-blur-sm rounded-xl text-white text-lg font-medium shadow-2xl">
            Drop material to apply
          </div>
        </div>
      )}
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
          <OrbitControls makeDefault />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <hemisphereLight intensity={0.3} groundColor="#444444" />
          
          {/* Grid */}
          <Grid
            args={[100, 100]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6f6f6f"
            sectionSize={10}
            sectionThickness={1}
            sectionColor="#9d4b4b"
            fadeDistance={50}
            fadeStrength={1}
            infiniteGrid
          />
          
          {/* Interactive 3D Objects */}
          <InteractiveMesh position={[0, 1, 0]} geometry="box" />
          <InteractiveMesh position={[4, 0.5, 0]} geometry="cylinder" />
          <InteractiveMesh position={[-4, 1.5, 0]} geometry="sphere" />
          
          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0} roughness={1} />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}

