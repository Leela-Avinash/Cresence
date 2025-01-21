import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    ScrollControls,
    useScroll,
    useGLTF,
    OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { temp } from "three/tsl";
import { gsap } from "gsap";

const extractCombinedGeometry = (model) => {
    const geometries = [];

    model.scene.traverse((child) => {
        if (child.isMesh && child.geometry) {
            const clonedGeometry = child.geometry.clone();
            clonedGeometry.applyMatrix4(child.matrixWorld);
            geometries.push(clonedGeometry);
        }
    });

    return (
        BufferGeometryUtils.mergeGeometries(geometries, true)
    );
};

const generateParticlesOnSurface = (geometry, count) => {
    const tempPosition = new Float32Array(count * 3);
    const tempColor = new Float32Array(count * 3);
    console.log(tempPosition);

    const positionAttribute = geometry.attributes.position;
    const faceCount = positionAttribute.count / 3;

    for (let i = 0; i < count; i++) {
        const faceIndex = Math.floor(Math.random() * faceCount) * 3;
        

        const vA = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            faceIndex
        );
        if(i == 0)  console.log(faceIndex, vA);
        const vB = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            faceIndex + 1
        );
        const vC = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            faceIndex + 2
        );

        const r1 = Math.random();
        const r2 = Math.random();
        const sqrtR1 = Math.sqrt(r1);

        const barycentricCoords = [1 - sqrtR1, sqrtR1 * (1 - r2), sqrtR1 * r2];
        


        const point = new THREE.Vector3()
            .addScaledVector(vA, barycentricCoords[0])
            .addScaledVector(vB, barycentricCoords[1])
            .addScaledVector(vC, barycentricCoords[2]);
        if(i == 0)  {
            console.log(faceIndex, vA, vB, vC);
            console.log(r1, r2, sqrtR1);
            console.log(barycentricCoords);
            console.log(point);
        }

        tempPosition[i * 3] = point.x;
        tempPosition[i * 3 + 1] = point.y;
        tempPosition[i * 3 + 2] = point.z;

        if (i < count * 0.2) {
            tempColor[i * 3] = 1.0; 
            tempColor[i * 3 + 1] = 0.8;
            tempColor[i * 3 + 2] = 0.0; 
        } else {
            tempColor[i * 3] = 0.6;
            tempColor[i * 3 + 1] = 0.2; 
            tempColor[i * 3 + 2] = 1.0; 
        }
    }

    return { tempPosition, tempColor };
};

/* ------------------------------- */
/* 🌌 Particle System Component */
/* ------------------------------- */
const generateParticlesOnPlane = (width, height,breadth, count) => {
    const tempPosition = new Float32Array(count * 3);
    const tempColor = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        // Randomly distribute particles on the plane
        const x = Math.random() * width - width / 2; // Center the particles on the plane
        const y = Math.random() * height - height / 2+1;
        const z = Math.random()*breadth-breadth/2; // Keep particles on the plane (z = 0)
        if(i==0) console.log(x, y, z);

        tempPosition[i * 3] = x;
        tempPosition[i * 3 + 1] = y;
        tempPosition[i * 3 + 2] = z;
        // console.log(tempPosition)

        // Assign colors
        if (i < count * 0.2) {
            tempColor[i * 3] = 1.0; // Orange
            tempColor[i * 3 + 1] = 0.8;
            tempColor[i * 3 + 2] = 0.0;
        } else {
            tempColor[i * 3] = 0.6; // Purple
            tempColor[i * 3 + 1] = 0.2;
            tempColor[i * 3 + 2] = 1.0;
        }
    }

    return { tempPosition, tempColor };
};

const ParticleSystem = () => {
    const particlesRef = useRef();
    const materialRef = useRef();
    const newModelRef = useRef();
    const AmbientLightRef=useRef();
    const DirectLightRef=useRef();
    // const scroll = useScroll();
    const startTimeRef = useRef(null);

    // const modelA = useGLTF("/fontforweb.glb"); // Replace with your GLTF path
    const modelB = useGLTF("models/fontforweb.glb"); // Replace with your GLTF path
    const {scene,nodes} = useGLTF("models/fontforweb.glb"); // Replace with your GLTF path
    // console.log(modelA) // Assuming model has multiple meshes

  // Accessing all meshes within the model
  const meshes = [];
  Object.values(nodes).forEach((node) => {
    if (node.isMesh) {
      meshes.push(node);
    }
  });


    useEffect(() => {
        const particleCount = 50000;

        // const geometryA = extractCombinedGeometry(modelA);
        const geometryB = extractCombinedGeometry(modelB);
        const planeWidth = 2; // Adjust width of the plane
        const planeHeight = 2; // Adjust height of the plane
        const planeBreadth=2
        const particlesA = generateParticlesOnPlane(planeWidth, planeHeight,planeBreadth, particleCount);
        const particlesB = generateParticlesOnSurface(geometryB, particleCount);

        const geometry = new THREE.BufferGeometry();
        console.log(geometry);
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(particlesA.tempPosition, 3)
        );
        geometry.setAttribute(
            "targetPosition",
            new THREE.BufferAttribute(particlesB.tempPosition, 3)
        );
        geometry.setAttribute(
            "color",
            new THREE.BufferAttribute(particlesA.tempColor, 3)
        );

        particlesRef.current.geometry = geometry;
        particlesRef.current.rotation.x= Math.PI/2;
        particlesRef.current.scale.set(5,5,5);
        newModelRef.current.rotation.x= Math.PI/2;
        newModelRef.current.scale.set(5,5,5);
        // newModelRef.current.material.opacity=1;
        newModelRef.current.traverse((child) => {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xffffff, 
                opacity: 0, // Initially hidden
                transparent: true, 
                depthWrite: false, // Ensure no depth writing
                depthTest: false, // Ensure no depth testing
                emissive: 0x000000,
                roughness: 0.2,
                metalness: 0.7,
              });
            }
          });
        console.log(newModelRef.current);

        startTimeRef.current = performance.now();
        gsap.to(materialRef.current.uniforms.fadeFactor, {
            value: 0,
            delay: 3, // Fade-out after 8 seconds
            duration: 2, // Fade-out duration
            ease: "power2.inOut", // Smooth easing
          });
        gsap.to(newModelRef.current.material,{
            opacity:1,
            delay:3,
            duration:3,
            ease: "power2.inOut",
        })
        if (meshes.length > 0) {
            meshes.forEach((mesh) => {
              // GSAP animation to fade in each mesh
              gsap.to(mesh.material, {
                delay:2.5,
                opacity: 1,
                duration: 2,  // Fade duration
                ease: "power2.inOut",
              });
            });
          }
          
        // Example: Animate the ambient light intensity using GSAP
        gsap.to(AmbientLightRef.current, {
          intensity: 1, 
          delay:3.0,       // New intensity value
          duration: 3,         // Duration of the animation (in seconds)
          ease: "power2.inOut", // Easing function
        });
        gsap.to(DirectLightRef.current, {
            intensity: 0.5, 
            delay:3.0,       // New intensity value
            duration: 3,         // Duration of the animation (in seconds)
            ease: "power2.inOut", // Easing function
          });
    
        // Example: Animate the color of the ambient light using GSAP
        // gsap.to(lightRef.current, {
        //   color: "#ff5733",    // New color value (HEX format)
        //   duration: 3,         // Duration of the color transition
        //   ease: "power2.inOut", // Easing function
        // });

    }, [modelB]);

    useFrame(() => {
        if (startTimeRef.current && materialRef.current) {
            // Calculate elapsed time
            const elapsedTime = (performance.now() - startTimeRef.current) / 1000; // Convert ms to seconds

            // Calculate progress (0 to 1, loops every 5 seconds)
            const progress = Math.min(elapsedTime / 3, 1); // Clamp progress between 0 and 1

            // Compute animation values
            const morphFactor = progress; // Morphing factor
            const scaleFactor = 1 + Math.sin(progress * Math.PI); // Scaling effect
            const dispersionFactor = Math.sin(progress * Math.PI) * 500; // Particle dispersion

            // Update uniforms
            materialRef.current.uniforms.morphFactor.value = morphFactor;
            materialRef.current.uniforms.scaleFactor.value = scaleFactor;
            materialRef.current.uniforms.dispersionFactor.value = dispersionFactor;
        }
        // if (particlesRef.current) {
        //     particlesRef.current.rotation.y += 0.001; // Adjust the rotation speed as desired
        // }
    });

    return (
        <group>
        <points ref={particlesRef} scale={[1, 1, 1]}>
            <shaderMaterial
                ref={materialRef}
                uniforms={{
                    morphFactor: { value: 0 },
                    scaleFactor: { value: 1 },
                    dispersionFactor: { value: 0 },
                    fadeFactor: { value: 1 },
                }}
                vertexShader={`
          attribute vec3 targetPosition;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float morphFactor;
          uniform float scaleFactor;
          uniform float dispersionFactor;

          void main() {
            // Apply dispersion to particles
            vec3 explodedPosition = position ;
            
            // Morph between exploded and target positions
            vec3 morphedPosition = mix(explodedPosition, targetPosition, morphFactor);
            
            // Apply scaling
            morphedPosition *= scaleFactor;

            vColor = color;
            gl_PointSize = 2.0 * scaleFactor;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(morphedPosition, 1.0);
          }
        `}
                fragmentShader={`
          varying vec3 vColor;
          uniform float fadeFactor;
          void main() {
            float dist = distance(gl_PointCoord, vec2(0.5));
            if (dist > 0.5) discard;
            gl_FragColor = vec4(vColor * fadeFactor, fadeFactor); 
          }
        `}
                transparent
            />
        </points>
        <ambientLight ref={AmbientLightRef} intensity={0} color={'#925ce0'} />
        <directionalLight ref={DirectLightRef}  intensity={0} position={[0, 0, 5]} />
        <primitive
        object={scene}
        ref={newModelRef}
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
      />
      </group>
    );
};

/* ------------------------------- */
/* 🎥 Main Scene Component */
/* ------------------------------- */
const ParticleMorphing = () => {
    
    return (
        
        <Canvas
            camera={{ position: [0, 0, 1] }}
            style={{ height: "100vh", background: "black" }}
        >


            <ScrollControls>
                <ParticleSystem />
                <OrbitControls />
            </ScrollControls>
        </Canvas>
    );
};

export default ParticleSystem;
