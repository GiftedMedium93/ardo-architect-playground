import { OrbitControls, Grid, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

interface ThreeViewportProps {
  className?: string;
}

export default function ThreeViewport({ className }: ThreeViewportProps) {
  return (
    <div className={className}>
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
          
          {/* Example 3D Objects - Replace with actual models */}
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#14b8a6" metalness={0.3} roughness={0.4} />
          </mesh>
          
          <mesh position={[4, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
            <meshStandardMaterial color="#06b6d4" metalness={0.5} roughness={0.3} />
          </mesh>
          
          <mesh position={[-4, 1.5, 0]} castShadow>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial color="#0891b2" metalness={0.2} roughness={0.5} />
          </mesh>
          
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

