import React, { useState, useEffect } from "react";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function CresenceText(props) {
  const { nodes, materials } = useGLTF("/models/CRESENCE.glb");
  const [scale, setScale] = useState([5, 5, 5]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  useEffect(() => {
    if (materials["Diamond Dust"]) {
      materials["Diamond Dust"].roughness = 0;
      materials["Diamond Dust"].metalness = 1; 
    }
  }, [materials]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width <= 480) { 
        setScale([2.5, 2.5, 2.5]);
      } else if (width <= 768) {
        setScale([4, 4, 4]); 
      } else {
        setScale([5, 5, 5]);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     const { innerWidth: width, innerHeight: height } = window;
  //     const x = (event.clientX / width) * 2 - 1;
  //     const y = -(event.clientY / height) * 2 + 1;

  //     setRotation([y * 0.2, x * 0.2, 0]);
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  return (
    <group {...props} dispose={null} position={[0, 0, 0]} scale={scale} rotation={rotation}>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} position={[10, 10, 10]} castShadow />
      <spotLight
        intensity={0.5}
        angle={Math.PI / 6}
        penumbra={0.5}
        position={[0, 5, 10]}
        castShadow
      />

      {/* 3D Text */}
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.001}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3D_Text_-_C"].geometry}
          material={materials["Diamond Dust"]}
          position={[-127.983, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3D_Text_-_R"].geometry}
          material={materials["Diamond Dust"]}
          position={[-96.051, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3D_Text_-_E"].geometry}
          material={materials["Diamond Dust"]}
          position={[-63.848, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3D_Text_-_S"].geometry}
          material={materials["Diamond Dust"]}
          position={[-32.951, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3D_Text_-_E_1"].geometry}
          material={materials["Diamond Dust"]}
          position={[-1.919, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3D_Text_-_N"].geometry}
          material={materials["Diamond Dust"]}
          position={[28.978, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3D_Text_-_C_1"].geometry}
          material={materials["Diamond Dust"]}
          position={[65.501, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3D_Text_-_E_2"].geometry}
          material={materials["Diamond Dust"]}
          position={[97.433, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/CRESENCE.glb");
