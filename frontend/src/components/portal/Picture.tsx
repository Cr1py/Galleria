import { Canvas } from "@react-three/fiber";
import { art } from "../../data/data";
import { MeshPortalMaterial } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import Sphere from "./Sphere";
import FrameModel from "./FrameModel";

function Mapping() {
  return (
    <group>
      <mesh position={[0, 0, -0.4]}>
        <planeGeometry args={[4.5,2.5]} />
        <MeshPortalMaterial resolution={1024} blur={0}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Sphere art={art[0]} />
        </MeshPortalMaterial>
      </mesh>

      <FrameModel scale={[3,3,10]} position={[0, 0, 0]} />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
}

export default function Picture() {
  return (
    <div className="h-full w-full">
      <Canvas>
        <Mapping />
        <OrbitControls />
      </Canvas>
    </div>
  )
}