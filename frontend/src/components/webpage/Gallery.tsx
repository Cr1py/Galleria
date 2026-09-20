import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Picture from "../Frame/Picture";
import Backdrop from "./Backdrop";

function Gallery() {
  const frameZ = -7.45;

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        // Camera settings:
        // position: [x, y, z]
        //   x     -> centered left/right, looking straight at the frame
        //   y     -> eye-level height off the ground (roughly average
        //            human eye height), not the frame's center height
        //   z     -> how far back the camera starts, in front of the
        //            frame along the depth axis (frame sits at negative z,
        //            so a positive z here puts the camera on the near side)
        //
        //   fov   -> field of view in degrees, i.e. how wide the camera's
        //            "lens" sees. Lower = more zoomed-in/telephoto feel with
        //            less distortion at the edges; higher (e.g. 75, a common
        //            default) = wider angle, more of the scene visible but
        //            with more perspective stretching near the frame's edges
        camera={{ position: [0, 0.5, 6], fov: 50 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1} />

        <Backdrop wallZ={frameZ} />
        {/*
          Picture position: [x, y, z]
          x -> centered left/right on the wall; - left + right
          y -> vertical height off the ground; higher = higher level
          z -> depth; matches wallZ passed to Backdrop, so the picture
               sits flush against the wall rather than floating in
               front of it or clipping through it
        */}
        <Picture position={[0, 2, -6.6]} />

        <OrbitControls
          // target: [x, y, z]: the point the camera orbits around and looks at.
          // Matches Frame's position exactly, so rotating/zooming pivots around
          // the frame itself rather than some other point in space.
          target={[0, 1.5, -7]}

          // enablePan={false}: disables the ability to drag the whole scene
          // sideways (normally right-click or shift+drag). Without this, the
          // frame's on-screen position could shift away from `target`, breaking
          // the "frame stays fixed in place" behavior.
          enablePan={false}

          // minDistance / maxDistance: how close/far the camera can get to
          // `target` via scroll-zoom. minDistance stops the camera from zooming
          // through the frame's geometry; maxDistance stops it from zooming out
          // far enough to see past the edges of the wall/floor planes.
          minDistance={-1}
          maxDistance={8}

          // minPolarAngle / maxPolarAngle: vertical rotation limit, measured
          // from straight up (0) to straight down (Math.PI). Math.PI / 2 is
          // level with the horizon.
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 1.5}

          // minAzimuthAngle / maxAzimuthAngle: horizontal rotation limit
          // around the target, in radians left/right of the camera's starting
          // direction. This range (-45° to +45°) stops the user from dragging
          // far enough sideways to see the wall/floor planes' edges or the back
          // of the frame.
          minAzimuthAngle={-Math.PI / 4.5}
          maxAzimuthAngle={Math.PI / 4.5}
        />
      </Canvas>
    </div>
  );
}

export default Gallery;