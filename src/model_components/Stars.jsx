import { useRef } from "react";
import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import { useProgress } from "@react-three/drei";
import * as random from "maath/random";
import LoadingCresence from "../components/LoadingCresence";

export default function Stars() {

    return (
        <div className="w-full h-full bg-[url('images/rm218-bb-07.jpg')] bg-cover bg-center bg-opacity-30 fixed top-0 left-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                className="pointer-events-none"
            >
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

    const mousePosition = useRef({ x: 0, y: 0 });
    const prevMousePosition = useRef({ x: 0, y: 0 });
    const defaultRotationSpeed = useRef({ x: 0.002, y: 0.001 }); // Default rotation speed

    // Update mouse position
    React.useEffect(() => {
        const handleMouseMove = (event) => {
            const { innerWidth, innerHeight } = window;
            const normalizedX = (event.clientX / innerWidth) * 2 - 1; // Normalize to range [-1, 1]
            const normalizedY = -(event.clientY / innerHeight) * 2 + 1; // Normalize to range [-1, 1]

            mousePosition.current = { x: normalizedX, y: normalizedY };
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Animate rotation
    useFrame(() => {
        const { x, y } = mousePosition.current;
        const { x: prevX, y: prevY } = prevMousePosition.current;

        if (ref.current) {
            // Add default rotation
            ref.current.rotation.x -= defaultRotationSpeed.current.x;
            ref.current.rotation.y -= defaultRotationSpeed.current.y;

            // // Add rotation based on mouse delta
            // ref.current.rotation.x -= (y - prevY) * 0.2;
            // ref.current.rotation.y += (x - prevX) * 0.2;
        }

        // Update previous mouse position
        prevMousePosition.current = { x, y };
    });

    return (
        <group>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled={false}
                {...props}
            >
                <PointMaterial
                    transparent
                    size={0.007}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}
