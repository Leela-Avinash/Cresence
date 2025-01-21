import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        BufferGeometryUtils.mergeGeometries(geometries, true) ||
        new THREE.BufferGeometry()
    );
};

const generateParticlesOnSurface = (geometry, count) => {
    const tempPosition = new Float32Array(count * 3);
    const tempColor = new Float32Array(count * 3);

    const positionAttribute = geometry.attributes.position;
    const faceCount = positionAttribute.count / 3;

    for (let i = 0; i < count; i++) {
        const faceIndex = Math.floor(Math.random() * faceCount) * 3;

        const vA = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            faceIndex
        );
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

const ParticleSystem = () => {
    const particlesRef = useRef();
    const materialRef = useRef();

    const modelA = useGLTF("/models/toy_rocket_modified_2.glb");
    const modelB = useGLTF("/models/space_ship_design.glb");
    const modelC = useGLTF("/models/toy_rocket_modified_2.glb");

    useEffect(() => {
        const particleCount = 50000;
    
        const geometryA = extractCombinedGeometry(modelA);
        const geometryB = extractCombinedGeometry(modelB);
        const geometryC = extractCombinedGeometry(modelC);
    
        const particlesA = generateParticlesOnSurface(geometryA, particleCount);
        const particlesB = generateParticlesOnSurface(geometryB, particleCount);
        const particlesC = generateParticlesOnSurface(geometryC, particleCount);
    
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(particlesA.tempPosition, 3)
        );
        geometry.setAttribute(
            "targetPositionB",
            new THREE.BufferAttribute(particlesB.tempPosition, 3)
        );
        geometry.setAttribute(
            "targetPositionC",
            new THREE.BufferAttribute(particlesC.tempPosition, 3)
        );
        geometry.setAttribute(
            "color",
            new THREE.BufferAttribute(particlesA.tempColor, 3)
        );
    
        particlesRef.current.geometry = geometry;

        ScrollTrigger.create({
            trigger: "#section1",
            start: "bottom center", // When section1's bottom is at the center
            endTrigger: "#section2",
            end: "top top", // When empty-section1's bottom is at the bottom
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                materialRef.current.uniforms.morphFactor.value = progress;
                // particlesRef.current.position.set( progress * -25, 0, 0);
            },
        });
    
        // ScrollTrigger for B to C morphing
        ScrollTrigger.create({
            trigger: "#section2",
            start: "bottom center", // When section2's bottom is at the center
            endTrigger: "section3",
            end: "top top", // When empty-section2's bottom is at the bottom
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                materialRef.current.uniforms.morphFactor2.value = progress;
                // particlesRef.current.position.set(progress * 15, 0, 0); 
            },
        });
    }, [modelA, modelB, modelC]);
    
    useFrame(() => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.001; // Adjust rotation speed as desired
        }
    });

    return (
        <points ref={particlesRef}>
            <shaderMaterial
                ref={materialRef}
                uniforms={{
                    morphFactor: { value: 0 },
                    morphFactor2: { value: 0 },
                    dispersionFactor: { value: 0 },
                }}
                vertexShader={`
          attribute vec3 targetPositionB;
          attribute vec3 targetPositionC;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float morphFactor;
          uniform float morphFactor2;
          uniform float dispersionFactor;

          void main() {
            vec3 explodedPosition = position + normalize(position) * (dispersionFactor * 2.0);
            vec3 morphedPositionB = mix(explodedPosition, targetPositionB, morphFactor);
            vec3 finalPosition = mix(morphedPositionB, targetPositionC, morphFactor2);

            vColor = color;
            gl_PointSize = 2.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0);
          }
        `}
                fragmentShader={`
          varying vec3 vColor;
          void main() {
            float dist = distance(gl_PointCoord, vec2(0.5));
            if (dist > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0);
          }
        `}
                transparent
            />
        </points>
    );
};

const ParticleMorphing = () => {
    return (
        <Canvas
            camera={{ position: [15, 5, 10], fov: 75 }}
            style={{
                position: "fixed", // Ensures the canvas is fixed
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: 2, // Places it behind the content
            }}
        >
            <ParticleSystem />
            {/* <OrbitControls /> */}
        </Canvas>
    );
};

export default ParticleMorphing;
