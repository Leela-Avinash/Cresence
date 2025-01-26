import React, { useEffect, useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import {gsap} from "gsap";

export default function WorkShops() {
    const workshops = [
        {
            id: 1,
            title: "Cyber Security",
            description:
                "This workshop provides an opportunity to explore and learn about various cutting-edge technologies and their real-world applications. Join us to enhance your skills and knowledge!",
            image: "./images/cyber2.webp",
            div_id: "section1",
        },
        {
            id: 2,
            title: "Machine Learning",
            description:
                "This workshop provides an opportunity to explore and learn about various cutting-edge technologies and their real-world applications. Join us to enhance your skills and knowledge!",
            image: "./images/ml.jpg",
            div_id: "section2",
        },
        {
            id: 3,
            title: "Space Technology",
            description:
                "This workshop provides an opportunity to explore and learn about various cutting-edge technologies and their real-world applications. Join us to enhance your skills and knowledge!",
            image: "./images/space.jpg",
            div_id: "section3",
        },
    ];

    // Create refs for each workshop section
    const workshopRefs = useRef(workshops.map(() => React.createRef()));

    useEffect(() => {
        // Register ScrollTrigger for each workshop section
        workshops.forEach((workshop, index) => {
            const sectionRef = workshopRefs.current[index];
            gsap.fromTo(
                sectionRef.current,{
                    opacity: 1, // Start invisible
                    transform: "translateY(50px)", // Start below the viewport
                },
                {
                    opacity: 0, // Fade in
                    transform: "translateY(0px)", // Move to original position
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 150px ", // Start the animation when the top is 80% into the viewport
                        // end: "top 80%", // End when the top reaches 20% from the top of the viewport
                        scrub: true,
                        // markers :true,
                        toggleActions: "play none none none", // Play on enter, no actions on exit
                    },
                }
            );
        });
    }, []);

    return (
        <div className="relative">
            <div className="max-w-[1000px] mx-auto">
                {/* Title */}
                <h1 className="z-20 pt-20 text-2xl w-full text-center text-white">
                    WORKSHOPS
                </h1>

                {/* Map through workshops */}
                {workshops.map((workshop, index) => (
                    <div
                        key={workshop.id}
                        className={`flex flex-col ${
                            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        } items-center justify-center mt-5 mx-4`}
                        style={{ height: "100vh" }}
                        ref={workshopRefs.current[index]} // Attach ref
                        id={workshop.div_id}
                    >
                        {/* Image Section */}
                        <div className="flex-1 p-2 md:p-10 mb-10 md:w-[60%]">
                            <img
                                src={workshop.image}
                                alt={workshop.title}
                                className="w-full h-full rounded-lg shadow-md object-cover"
                            />
                        </div>

                        {/* About Section */}
                        <div className="flex-1 w-3/4 h-auto md:p-4 shadow-md rounded-lg md:ml-5">
                            <h2 className="text-xl font-semibold mb-2 text-white">
                                {workshop.title}
                            </h2>
                            <p className="text-white text-lg text-justify">
                                {workshop.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
