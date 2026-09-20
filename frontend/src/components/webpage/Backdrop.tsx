type BackdropProps = {
  wallZ: number;
};

export default function Backdrop({ wallZ }: BackdropProps) {
  return (
    <group>
      {/* wall */}
      <mesh position={[0, 1, wallZ]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#0a1128" roughness={0.85} />
      </mesh>

      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, wallZ / 2]}>
        <planeGeometry args={[14, Math.abs(wallZ) + 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
    </group>
  );
}