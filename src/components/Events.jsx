import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const eventData = [
    {
        name: "Cyber Security",
        resource_person: "Dr. A. P. J. Abdul Kalam (ISRO)",
        dates: "March 12th & 13th",
        description: "Learn about modern cyber threats and defense strategies",
        imgSrc: "https://dummyimage.com/300x400/eee/aaa",
    },
    {
        name: "Machine Learning",
        resource_person: "Jane Smith (Google)",
        dates: "March 12th & 13th",
        description: "Explore practical ML applications and techniques",
        imgSrc: "https://dummyimage.com/300x400/eee/aaa",
    },
    {
        name: "Space Technology",
        resource_person: "Elon Musk (SpaceX)",
        dates: "March 12th & 13th",
        description:
            "Discover advancements in space missions and satellite tech",
        imgSrc: "https://dummyimage.com/300x400/eee/aaa",
    },
];

const Events = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            const scrollWidth = container.scrollWidth - window.innerWidth;

            gsap.to(container.querySelector(".inner-container"), {
                x: -scrollWidth,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: () => `+=${scrollWidth + window.innerWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        if (self.progress < 0.02 || self.progress > 0.98) {
                            gsap.to(self, { timeScale: 0.2, duration: 1 });
                        } else {
                            gsap.to(self, { timeScale: 1, duration: 0.5 });
                        }
                    },
                },
            });

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[100dvh] bg-transparent text-white overflow-hidden"
        >
            <div className="h-full inner-container flex w-[300vw] items-center gap-20">
                <div className="scroll-item flex-shrink-0 w-screen flex flex-col justify-center items-center p-4 text-9xl">
                    <h2>Technical</h2>
                    <h2>Events</h2>
                </div>
                <div className="scroll-item flex-shrink-0 flex justify-between items-center p-4 w-[200vw]">
                    {eventData.map((event, index) => (
                        <div key={index} className="flex-shrink-0 flex flex-col justify-center p-4">
                            <p className="text-md pl-4">{`${event.dates}`}</p>
                            <div
                                className="scroll-item flex-shrink-0 flex flex-col lg:flex-row justify-center items-start p-4 pt-0 gap-4 pr-16"
                            >
                                <img
                                    src={event.imgSrc}
                                    alt={`Collection ${index + 1}`}
                                    className="max-w-[70%]"
                                />
                                <div className="flex flex-col gap-4">
                                    <p className="text-2xl lg:text-3xl font-bold mt-3">
                                        {`${event.name}`}
                                    </p>
                                    <p className="text-lg lg:text-xl">
                                        {`${event.resource_person}`}
                                    </p>
                                    {/* <p className="text-md">{`${event.dates}`}</p> */}
                                    <p className="text-lg">
                                        {event.description
                                            .split(" ")
                                            .slice(0, 4)
                                            .join(" ")}{" "}
                                        <br />
                                        {event.description
                                            .split(" ")
                                            .slice(6)
                                            .join(" ")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
