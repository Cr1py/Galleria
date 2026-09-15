"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Sphere() {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial color="pink" />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  );
}