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

import ImageCarousel from "../components/Slider";
import OurTeam from "../components/OurTeam";

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
                <div className="absolute top-0 w-full z-30">
                    <NavBar />
                </div>

                {/* Landing Page Content */}
                <div className="relative h-[100dvh] flex flex-col items-center justify-center">
                    <div className="hidden md:flex absolute inset-0 z-10 flex-col justify-center">
                        <div className="">
                            <SideBar />
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full">

                        <Canvas >
                            <OrthographicCamera />
                            <CresenceText />
                            {/* <OrbitControls /> */}
                        </Canvas>
                    </div>
                    <div className="absolute bottom-[30vh]  text-{1.5}">
                        <p style={{ wordSpacing: "0.5rem" }} className="text-lg bg-gradient-to-r from-green-300  to-cyan-200  font-serif italic text-transparent bg-clip-text">March - 12&13, 2k25</p>
                    </div>
                    <button
                        className="absolute right-5 bottom-5 text-[#800000] px-6 py-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 text-white text-lg font-mono italic rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
                        onClick={() => navigate("/explore")}
                    >
                        Explore →
                    </button>

                </div>
                <div>
                    Date
                </div>
                <FestVideo />
                <WorkShops />
                <Events />
                {/* Hello Section */}
                <div className="relative h-[100vh] flex items-center justify-center bg-transparent"></div>
            </div>
            {/* )} */}
            
        </div>
    );
}
