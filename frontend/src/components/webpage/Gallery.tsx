import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Picture from "../frame/Picture";
import Backdrop from "./Backdrop";
import type { Art } from "../../types/types";
import { fetchInitialArt, fetchNextArt } from "../../lib/api";

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
        position={[0, 8.5, -3]}
        angle={0.7}
        penumbra={0.8}
        intensity={100}
        castShadow
      />
      <primitive object={new THREE.Object3D()} ref={targetRef} position={[0, 5, -7]} />
    </>
  );
}

function Gallery() {
  const frameZ = -7.45;

  const [current, setCurrent] = useState<Art | null>(null);
  const [history, setHistory] = useState<Art[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch the very first random piece once
  useEffect(() => {
    fetchInitialArt()
      .then(setCurrent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleNext = async () => {
    if (!current || loading) return;
    setLoading(true);
    try {
      const next = await fetchNextArt(current.id);
      // push last picture onto history, so prev can return to it later without another network call.
      setHistory((prev) => [...prev, current]);
      setCurrent(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load next art");
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrent(previous);
  };

  if (error) {
    return <div className="flex h-full w-full items-center justify-center text-red-500">{error}</div>;
  }

  if (!current) {
    return <div className="flex h-full w-full items-center justify-center">Loading...</div>;
  }

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
        <Picture position={[0, 5, -7]} art={current} />

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

      <button
        onClick={handlePrev}
        disabled={history.length === 0 || loading}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-2xl text-white disabled:opacity-30"
        aria-label="Previous room"
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        disabled={loading}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-2xl text-white disabled:opacity-30"
        aria-label="Next room"
      >
        Next
      </button>

    </div>
  );
}

export default Gallery;