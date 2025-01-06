import React, { useState, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { getFresnelMat } from "../utils/FresnalMat";

export default function Moon() {
  const [scale, setScale] = useState([1, 1, 1]);
  const moonTexture = useTexture("textures/Solarsystemscope_texture_8k_moon.jpg");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setScale([0.5, 0.5, 0.5]);
      } else if (width <= 768) {
        setScale([0.8, 0.8, 0.8]);
      } else {
        setScale([1, 1, 1]);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <mesh position={[0, 0, -1]} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={moonTexture} />
      </mesh>
      <mesh position={[0, 0, -1]} scale={scale}>
        <ringGeometry args={[1.1, 1.2, 32]} />
        <shaderMaterial args={[getFresnelMat()]} />
      </mesh>
      <directionalLight position={[10, -2, -4]} intensity={3} />
      {/* <pointLight position={[6, -2, -3]} intensity={203} /> */}
      {/* <spotLight position={[-2, 0, -2]} intensity={10} />
      <spotLight position={[-1.8, 0.6, -2]} intensity={10} />
      <spotLight position={[-1.8, -0.6, -2]} intensity={10} />
      <spotLight position={[-1.85, 1, -2]} intensity={10} />
      <spotLight position={[-1.8, -0.6, -2]} intensity={10} /> */}
    </>
  );
}
