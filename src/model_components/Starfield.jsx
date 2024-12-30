import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

function generateStarfield(numStars = 500) {
  const randomSpherePoint = () => {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  const positions = [];
  const colors = [];
  for (let i = 0; i < numStars; i++) {
    const pos = randomSpherePoint();
    const hue = 0.6;
    const color = new THREE.Color().setHSL(hue, 0.2, Math.random());
    positions.push(pos.x, pos.y, pos.z);
    colors.push(color.r, color.g, color.b);
  }

  return { positions, colors };
}

export default function Starfield({ numStars = 500 }) {
  const stars = useMemo(() => generateStarfield(numStars), [numStars]);
  const texture = useLoader(THREE.TextureLoader, './textures/circle.png');
  
  // Create a reference for the starfield group to apply rotation
  const starfieldRef = useRef();
  const rotationSpeed = 0.00028; // Rotation speed

  // Animate the starfield's rotation
  useEffect(() => {
    const animateRotation = () => {
      if (starfieldRef.current) {
        starfieldRef.current.rotation.y += rotationSpeed; // Rotate around the Y-axis
      }
      requestAnimationFrame(animateRotation); // Loop the animation
    };

    animateRotation();
  }, [rotationSpeed]);

  return (
    <group ref={starfieldRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(stars.positions)}
            count={stars.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={new Float32Array(stars.colors)}
            count={stars.colors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          vertexColors
          map={texture}
          transparent
        />
      </points>
    </group>
  );
}
