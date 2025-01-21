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
            setTimeout(() => setLoaded(true), 500); 
        }
    }, [progress]);

    return (
        <div className="w-full h-[100dvh] bg-black fixed top-0 left-0">
            {!loaded && <LoadingCresence progress={progress}/>}
            <Canvas onCreated={() => setLoaded(true)}>
                <PerspectiveCamera />
                <Starfield numStars={3000} />
                <ShootingStar />
            </Canvas>
        </div>
    );
}
