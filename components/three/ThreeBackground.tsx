"use client";

import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import { useState } from "react";

const PARTICLE_COUNT = 1200;

function Stars() {
  const [positions] = useState(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  });

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#b8a7ff"
        size={0.06}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export function ThreeBackground() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0c0f1a"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1} color="#ffdfba" />
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#7ee7ff"
          metalness={0.2}
          roughness={0.4}
          emissive="#7ee7ff"
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>
      <Stars />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
