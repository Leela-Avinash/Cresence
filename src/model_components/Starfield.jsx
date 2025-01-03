import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';

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
  
  const starfieldRef = useRef();
  const rotationSpeed = 0.00028;

  useEffect(() => {
    const animateRotation = () => {
      if (starfieldRef.current) {
        starfieldRef.current.rotation.y += rotationSpeed;
      }
      requestAnimationFrame(animateRotation);
    };

    animateRotation();
  }, [rotationSpeed]);

  useFrame(() => {
    if (starfieldRef.current && starfieldRef.current.geometry && starfieldRef.current.geometry.attributes) {
      const positions = starfieldRef.current.geometry.attributes.position.array;
      const scales = starfieldRef.current.geometry.attributes.scale.array;
      for (let i = 0; i < positions.length; i += 3) {
        scales[i / 3] = 1 + Math.sin(Date.now() * 0.001 + positions[i]) * 0.5;
      }
      starfieldRef.current.geometry.attributes.scale.needsUpdate = true;
    }
  });

  const handlePointerMove = (event) => {
    if (starfieldRef.current && starfieldRef.current.geometry && starfieldRef.current.geometry.attributes) {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, starfieldRef.current.parent.camera);

      const intersects = raycaster.intersectObject(starfieldRef.current);
      if (intersects.length > 0) {
        const index = intersects[0].index;
        const scales = starfieldRef.current.geometry.attributes.scale.array;
        scales[index] = 2; // Make the star glow
        starfieldRef.current.geometry.attributes.scale.needsUpdate = true;
      }
    }
  };

  return (
    <group ref={starfieldRef} onPointerMove={handlePointerMove}>
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
          <bufferAttribute
            attach="attributes-scale"
            array={new Float32Array(stars.positions.length / 3).fill(1)}
            count={stars.positions.length / 3}
            itemSize={1}
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
