import type { Art } from "../../types/types";
import { MeshPortalMaterial } from "@react-three/drei";
import Sphere from "./Sphere";
import FrameModel from "./FrameModel";

type PictureProps = {
  position?: [number, number, number];
  art: Art;
};

export default function Picture({ position = [0, 1.5, -4.9], art }: PictureProps) {
  return (
    <group position={position}>
      <mesh position={[0, 0, -0.4]}>
        <planeGeometry args={[7.5,4.5]} />
        <MeshPortalMaterial resolution={1024} blur={0}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Sphere art={art} />
        </MeshPortalMaterial>
      </mesh>

      <FrameModel scale={[4,4,6]} position={[0, 0, 0]} />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
}