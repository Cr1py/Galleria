import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Art } from "../../types/types";

type SphereProps = {
  art: Art;
};

export default function Sphere({ art }: SphereProps) {
  const map = useTexture(art.imageUrl);

  return (
    <mesh>
      <sphereGeometry args={[20, 64, 64]} />
      <meshStandardMaterial map={map} side={THREE.BackSide} />
    </mesh>
  );
}