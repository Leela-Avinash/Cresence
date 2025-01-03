import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function randomStartPosition() {
  return [
    Math.random() * 50 + 25,
    Math.random() * 25 + 25,
    Math.random() * -100,
  ];
}

export default function ShootingStar() {
  const starRef = useRef();
  const trailRef = useRef();

  useEffect(() => {
    starRef.current.position.set(...randomStartPosition());
  }, []);

  useFrame(() => {
    const star = starRef.current;
    const trail = trailRef.current;
    if (!star || !trail) return;
    star.position.x -= 0.5; 
    star.position.y -= 0.5;
    trail.position.copy(star.position); 
    trail.rotation.z = Math.atan2(-0.5, -0.5) - Math.PI / 2; 
    trail.position.x += 0.5 / 2; 
    trail.position.y += 0.5 / 2;
    if (star.position.x < -25 || star.position.y < -25) {
      star.position.set(...randomStartPosition());
    }
  });

  return (
    <>
      <mesh ref={starRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh ref={trailRef}>
        <cylinderGeometry args={[0.05, 0.05, 1, 32]} />
        <meshBasicMaterial color="lightblue" transparent opacity={0.5} />
      </mesh>
    </>
  );
}
