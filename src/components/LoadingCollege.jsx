import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Starfield from "../model_components/Starfield";
import ShootingStar from "../model_components/ShootingStar";
import { useThree } from "@react-three/fiber";

const SpaceLoadingBar = ({ progress }) => {
    useEffect(() => {
        console.log(progress);
    }, [progress]);
    return (
        <div className="relative w-full max-w-4xl mx-auto mt-5">
            <div className="relative w-full h-4 bg-transparent">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{
                        width: `${progress}%`,
                        clipPath: "polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)",
                    }}
                />
                <div
                    className="absolute top-0 left-0 h-full bg-transparent"
                    style={{
                        width: "100%",
                        clipPath: "polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)",
                        border: "2px solid transparent",
                        background: "linear-gradient(to right, blue, purple)",
                        backgroundClip: "border-box",
                        WebkitMask:
                            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                        mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                    }}
                />
            </div>
            <div className="absolute top-1/2 w-full text-center text-white font-bold text-lg mt-2">{`${progress}%`}</div>
        </div>
    );
};

// Perspective Camera for Canvas
function PerspectiveCamera() {
    const { camera, size } = useThree();

    React.useEffect(() => {
        camera.near = 0.01;
        camera.far = 1000;
        camera.aspect = size.width / size.height;
        camera.position.set(0, 0.1, 1);
        camera.updateProjectionMatrix();
    }, [camera, size]);

    return null;
}

export default function LoadingCollege({ setVideoLoaded }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 2;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // Check if progress is 100% and then set video loaded
    useEffect(() => {
        if (progress >= 100) {
            setVideoLoaded(true);
        }
    }, [progress, setVideoLoaded]);

    return (
        <div className="w-screen h-screen bg-black relative">
            <Canvas>
                <PerspectiveCamera />
                <Starfield numStars={3000} />
                <ShootingStar />
                <ambientLight intensity={0.5} />
            </Canvas>

            <div className="absolute inset-0 flex items-center justify-center z-10 text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Loading The Model...
                    </h1>
                    <SpaceLoadingBar progress={progress} />
                </div>
            </div>
        </div>
    );
}
