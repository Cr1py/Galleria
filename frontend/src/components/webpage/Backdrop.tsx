type BackdropProps = {
  wallZ: number;
};

export default function Backdrop({ wallZ }: BackdropProps) {
  const roomWidth = 30;
  const roomDepth = Math.abs(wallZ) + 6;
  const floorY = -2;
  const ceilingY = 12; 

  // wall height + vertical center
  const wallHeight = ceilingY - floorY;
  const wallY = (floorY + ceilingY) / 2;

  const wallColor = "#242331";
  const baseboardColor = "#242331";
  const floorColor = "#533e2d";

  return (
    <group>
      {/* wall positions: [x, y, z]
        x = +x = right | -x = left
        y = height
        z = depth
      */}
      {/* back wall */}
      <mesh position={[0, wallY, wallZ]} receiveShadow>
        <planeGeometry args={[roomWidth, wallHeight]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>

      {/* side walls */}
      <mesh
        position={[-roomWidth / 2, wallY, wallZ / 2]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomDepth, wallHeight]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>

      <mesh
        position={[roomWidth / 2, wallY, wallZ / 2]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomDepth, wallHeight]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>

      {/* floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, floorY, wallZ / 2]}
        receiveShadow
      >
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color={floorColor} roughness={0.6} />
      </mesh>

      {/* ceiling
          rotation: [Math.PI / 2, 0, 0] -> rotates the opposite direction from
          the floor's rotation, so this plane's front face points downward
          (into the room) instead of upward
      */}
      <mesh 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, ceilingY, wallZ / 2]}
        receiveShadow
      >
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color={wallColor} roughness={0.85} />
      </mesh>

      {/* baseboards */}
      <mesh position={[0, floorY + 0.25, wallZ + 0.05]} receiveShadow>
        <boxGeometry args={[roomWidth, 0.5, 0.1]} />
        <meshStandardMaterial color={baseboardColor} roughness={0.5} />
      </mesh>

      {/* left wall baseboard */}
      <mesh
        position={[-roomWidth / 2 + 0.05, floorY + 0.25, wallZ / 2]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[roomDepth, 0.5, 0.1]} />
        <meshStandardMaterial color={baseboardColor} roughness={0.5} />
      </mesh>

      {/* right wall baseboard */}
      <mesh
        position={[roomWidth / 2 - 0.05, floorY + 0.25, wallZ / 2]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[roomDepth, 0.5, 0.1]} />
        <meshStandardMaterial color={baseboardColor} roughness={0.5} />
      </mesh>
    </group>
  );
}