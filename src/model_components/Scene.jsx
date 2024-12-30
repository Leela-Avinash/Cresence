import React, { useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import Starfield from "./Starfield";
import CresenceText from "./Cresence_text";
import ShootingStar from "./ShootingStar";
import { useNavigate } from "react-router-dom";
import LoadingCresence from "../components/LoadingCresence";

function PerspectiveCamera() {
    const { camera, size } = useThree();

    React.useEffect(() => {
        camera.near = 0.01;
        camera.far = 1000;
        camera.fov = 75;
        camera.aspect = size.width / size.height;
        camera.position.set(0, 0, 1);
        camera.updateProjectionMatrix();
    }, [camera, size]);

    return null;
}

export default function Scene() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const { progress } = useProgress();

    React.useEffect(() => {
        if (progress === 100) {
            setTimeout(() => setLoaded(true), 500); // Add slight delay for a smooth transition
        }
    }, [progress]);

    return (
        <div className="w-[100dvw] h-[100dvh] bg-black relative">
            {!loaded && <LoadingCresence progress={progress}/>}
            <Canvas onCreated={() => setLoaded(true)}>
                <PerspectiveCamera />
                <Starfield numStars={3000} />
                <ShootingStar />
                <ambientLight intensity={0.5} />
                <CresenceText />
            </Canvas>
            {loaded && (
                <button
                    className="absolute bottom-5 right-5 px-5 py-2 bg-white/10 border border-white/50 text-white rounded-md hover:bg-white/20 transition"
                    onClick={() => navigate("/explore")}
                >
                    Explore →
                </button>
            )}
        </div>
    );
}
