import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ path }) {
  // Load the 3D model using useGLTF
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

export default function Sample() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      
      {/* Load the 3D model */}
      <Model path="models/night_sky_visible_spectrum_monochromatic.glb" />
      
      {/* Controls to orbit around the model */}
      <OrbitControls />
    </Canvas>
  );
}
