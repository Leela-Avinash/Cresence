import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function randomStartPosition() {
  return [
    Math.random() * 50 - 25,
    Math.random() * 50 - 25,
    Math.random() * -50,
  ];
}

export default function ShootingStar() {
  const starRef = useRef();

  useEffect(() => {
    starRef.current.position.set(...randomStartPosition());
  }, []);

  useFrame(() => {
    const star = starRef.current;
    if (!star) return;
    star.position.z += 0.5; // Move star forward
    if (star.position.z > 10) {
      star.position.set(...randomStartPosition()); // Reset when it exits view
    }
  });

  return (
    <mesh ref={starRef}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}
