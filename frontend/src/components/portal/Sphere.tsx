import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Art } from "../../types/types";

type SphereProps = {
  art: Art;
};

function Mapping({ art }: SphereProps) {
  const map = useTexture(art.imageUrl);

  return (
    <mesh>
      <sphereGeometry args={[3, 64, 64]} />
      {/* canvas will throw a hissy fit with map if called inside canvas, so it's here now*/}
      <meshStandardMaterial map={map} side={THREE.BackSide} />
    </mesh>
  );
}

export default function Sphere({ art }: SphereProps) {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Mapping art={art} />

      <OrbitControls />
    </Canvas>
  );
}