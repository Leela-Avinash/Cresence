import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import CresenceText from "./Cresence_text";
import { useNavigate } from "react-router-dom";
import LoadingCresence from "../components/LoadingCresence";
import Moon from "./Moon";
import FestVideo from "../components/FestVideo";
import Cyber from "../components/Cyber";
import Space from "../components/Space";
import ML from "../components/ML";

function OrthographicCamera() {
    const { camera, size } = useThree();

    React.useEffect(() => {
        camera.near = 0.01;
        camera.far = 1000;
        camera.left = size.width / -2;
        camera.right = size.width / 2;
        camera.top = size.height / 2;
        camera.bottom = size.height / -2;
        camera.position.set(0, 0, 1);
        camera.updateProjectionMatrix();
    }, [camera, size]);

    return null;
}

export default function HomeScene() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const { progress } = useProgress();

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => setLoaded(true), 500);
        }
    }, [progress]);

    return (
        <div className="w-full h-auto bg-transparent relative">
            {!loaded && <LoadingCresence progress={progress} />}
            {loaded && (
                <div className="relative w-full h-[200vh] bg-transparent">
                    {/* Fixed Background Scene */}
                    <div className="fixed inset-0 z-0">
                        <Canvas>
                            <OrthographicCamera />
                            <Moon />
                        </Canvas>
                    </div>

                    {/* Landing Page Content */}
                    <div className="relative z-10 h-[100vh] flex flex-col items-center justify-center">
                        <div className="absolute top-0 left-0 w-full h-full">
                            <Canvas>
                                <OrthographicCamera />
                                <CresenceText />
                            </Canvas>
                        </div>
                        <button
                            className="absolute right-5 bottom-5 px-5 py-2 bg-white/10 border border-white/50 text-white rounded-md hover:bg-white/20 transition hover:cursor-pointer"
                            onClick={() => navigate("/explore")}
                        >
                            Explore →
                        </button>
                    </div>
                    <FestVideo />
                    <Cyber/>
                    <ML/>
                    <Space/>
                    {/* <h1 className="absolute z-20 text-3xl font-bold text-white bg-slate-500 w-full">Charan</h1> */}


                    {/* Hello Section */}
                    <div className="relative z-20 h-[100vh] flex items-center justify-center bg-transparent">
                        {/* <h1 className="text-3xl text-white">Hello</h1> */}
                    </div>
                </div>
            )}

            
        </div>
    );
}
