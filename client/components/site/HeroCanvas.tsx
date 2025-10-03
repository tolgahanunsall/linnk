import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function PointsField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 6 * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.035,
    color: new THREE.Color("#6366F1"),
    transparent: true,
    opacity: 0.7,
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.05;
      ref.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  return <points ref={ref} geometry={geom} material={mat} />;
}

export function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 2]} intensity={0.6} />
          <PointsField />
        </Suspense>
      </Canvas>
    </div>
  );
}
