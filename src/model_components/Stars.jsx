import {  useRef } from 'react';
import React, { useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import { useProgress } from "@react-three/drei";
import * as random from 'maath/random';
import LoadingCresence from "../components/LoadingCresence";

export default function Stars() {
    const [loaded, setLoaded] = useState(false);
    const { progress } = useProgress();

    React.useEffect(() => {
        if (progress === 100) {
            setTimeout(() => setLoaded(true), 500); 
        }
    }, [progress]);
  return (
    <div className="w-full h-full  bg-[url('images/rm218-bb-07.jpg')] bg-cover bg-center bg-opacity-30 fixed top-0 left-0">
         {!loaded && <LoadingCresence progress={progress}/>}
      <Canvas  onCreated={() => setLoaded(true)} camera={{ position: [0, 0, 1] }}>
        <group>
          <StarsComponent />
        </group>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

function StarsComponent(props) {
 
  const ref = useRef();
  const [sphere] = useState(() =>
    random.onSphere(new Float32Array(2500), { radius: 2 })
  );

  // Random colors for the stars
  // const colors = useRef(new Float32Array(sphere.length));
  // for (let i = 0; i < colors.current.length; i += 3) {
  //   colors.current[i] = Math.random(); // Red channel
  //   colors.current[i + 1] = Math.random(); // Green channel
  //   colors.current[i + 2] = Math.random(); // Blue channel
  // }

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          size={0.007} // Larger size for glowing effect
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

