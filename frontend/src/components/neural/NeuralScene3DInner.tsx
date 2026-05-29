"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

const NODES = [
  [0, 1.2, 0],
  [1, 0.5, 0.8],
  [-1, 0.3, 0.5],
  [0.3, -0.8, 1],
  [-0.5, -0.5, -0.8],
  [0.8, 0.2, -1],
];

function NeuralNodes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const lines = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        if (Math.random() > 0.45) {
          pairs.push([
            new THREE.Vector3(...(NODES[i] as [number, number, number])),
            new THREE.Vector3(...(NODES[j] as [number, number, number])),
          ]);
        }
      }
    }
    return pairs;
  }, []);

  return (
    <group ref={group}>
      <Sphere args={[0.35, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.8} />
      </Sphere>
      {NODES.map((pos, i) => (
        <Sphere key={i} args={[0.12, 16, 16]} position={pos as [number, number, number]}>
          <meshStandardMaterial
            color={i % 2 === 0 ? "#06B6D4" : "#8B5CF6"}
            emissive={i % 2 === 0 ? "#06B6D4" : "#8B5CF6"}
            emissiveIntensity={0.6}
          />
        </Sphere>
      ))}
      {lines.map((pair, i) => (
        <Line key={i} points={pair} color="#8B5CF6" lineWidth={1} transparent opacity={0.4} />
      ))}
    </group>
  );
}

export function NeuralScene3DInner() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true, antialias: true }}>
      <color attach="background" args={["#050816"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#7C3AED" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#06B6D4" />
      <NeuralNodes />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
