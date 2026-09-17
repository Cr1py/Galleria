import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import adobeStockImg from "../../assets/adobe_stock.jpg";

function Mapping() {
  const map = useTexture(adobeStockImg);

  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      {/* canvas will throw a hissy fit with map if called inside canvas, so it's here now*/}
      <meshStandardMaterial map={map} side={THREE.BackSide}/> 
    </mesh>
  );
}

export default function Sphere() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Mapping />

        <OrbitControls />
      </Canvas>
    </div>
  );
}