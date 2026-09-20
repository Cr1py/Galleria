import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Picture from "../Frame/Picture";
import Backdrop from "./Backdrop";

function Spotlight() {
  const lightRef = useRef<THREE.SpotLight>(null!);
  const targetRef = useRef<THREE.Object3D>(null!);

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <>
      <spotLight
        ref={lightRef}
        position={[0, 8.5, -5]}
        angle={0.9}
        penumbra={0.7}
        intensity={80}
        castShadow
      />
      <primitive object={new THREE.Object3D()} ref={targetRef} position={[0, 5, -7]} />
    </>
  );
}

function Gallery() {
  const frameZ = -7.45;

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows={{ type: THREE.VSMShadowMap }}
        // camera settings:
        // position: [x, y, z]
        //   x = centered left/right, looking straight at the frame
        //   y = eye-level height off the ground
        //   z = how far back the camera starts
        //
        // fov: field of view in degrees
        //   lower = more zoomed-in
        //   higher = wider angle
        camera={{ position: [0, 0.5, 6], fov: 60 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />

        <Backdrop wallZ={frameZ} />
        {/*
          position: [x, y, z]
          x = centered left/right on the wall; - left + right
          y = vertical height off the ground; higher = higher level
          z = depth; matches wallZ passed to Backdrop, so the picture
              sits flush against the wall rather than floating in
              front of it or clipping through it
        */}
        <Picture position={[0, 5, -7]} />

        <Spotlight />

        <OrbitControls
          // target: [x, y, z]: the point the camera orbits around and looks at.
          target={[0, 4.5, -7]}

          // enablePan={false}: disables the ability to drag the whole scene
          // sideways (normally right-click or shift+drag)
          enablePan={false}

          // minDistance / maxDistance: how close/far the camera can get to `target` via scroll-zoom 
          // minDistance stops the camera from zooming
          minDistance={-1}
          maxDistance={8}

          // minPolarAngle / maxPolarAngle: vertical rotation limit, measured from straight up (0) to straight down (Math.PI)
          // Math.PI / 2 is level with the horizon.
          minPolarAngle={Math.PI / 2.1} 
          maxPolarAngle={Math.PI / 1.5}

          // minAzimuthAngle / maxAzimuthAngle: horizontal rotation limit
          minAzimuthAngle={-Math.PI / 4.5}
          maxAzimuthAngle={Math.PI / 4.5}
        />
      </Canvas>
    </div>
  );
}

export default Gallery;