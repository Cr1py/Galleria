import { Canvas } from "@react-three/fiber";
import { art } from "../../data/data";
import { MeshPortalMaterial } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import Sphere from "./Sphere";

function Mapping() {
  return (
    <mesh>
      <planeGeometry args={[4,6,8]} />
      <MeshPortalMaterial resolution={1024} blur={0}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Sphere art={art[0]} />
      </MeshPortalMaterial>
    </mesh>
  );
}

export default function Frame() {
  return (
    <div className="h-full w-full">
      <Canvas>
        <Mapping />
        <OrbitControls />
      </Canvas>
    </div>
  )
}