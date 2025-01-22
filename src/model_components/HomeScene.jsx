import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
// import CresenceText from "./Cresence_text";
import CresenceText from "./ParticleSystem";
import { useNavigate } from "react-router-dom";
import LoadingCresence from "../components/LoadingCresence";
import Moon from "./Moon";
import FestVideo from "../components/FestVideo";
import WorkShops from "../components/WorkShops";
import Events from "../components/Events";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

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

    return (
        <div className="w-full h-auto bg-transparent relative">
            {/* {!loaded && <LoadingCresence progress={progress} />}
            {loaded && ( */}
                <div className="relative w-full h-[100dvh] bg-transparent">
                    <NavBar />
                    
                    {/* Landing Page Content */}
                    <div className="relative z-10 h-[100dvh] flex flex-col items-center justify-center">
                        <div className="absolute top-56 left-0 z-10"> 
                            <SideBar/>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full z-20">

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
                    <WorkShops />
                    <Events />
                    {/* Hello Section */}
                    <div className="relative z-20 h-[100vh] flex items-center justify-center bg-transparent"></div>
                </div>
            {/* )} */}
        </div>
    );
}
