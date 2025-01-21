import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            const scrollWidth = container.scrollWidth - window.innerWidth;

            gsap.to(container.querySelector(".inner-container"), {
                x: -scrollWidth, 
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true, 
                    anticipatePin: 1,
                },
            });

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Cleanup
            };
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[100dvh] bg-black text-white overflow-hidden"
        >
            <div className="h-full inner-container flex w-[300vw] justify-center items-center">
                {/* Scroll Items */}
                <div className="scroll-item flex-shrink-0 w-screen flex flex-col justify-center items-center p-4">
                    <img
                        src="https://via.placeholder.com/400x600"
                        alt="Collection 1"
                        className="max-w-[70%] mb-4"
                    />
                    <p className="text-lg font-bold text-center">
                        [COLLECTION NAME] {`{ QUANTUM GLAMOUR }`}
                    </p>
                    <p className="text-md text-center">
                        [DESCRIPTION]{" "}
                        {`{ Vintage allure meets futuristic style. }`}
                    </p>
                </div>
                <div className="scroll-item flex-shrink-0 w-screen flex flex-col justify-center items-center p-4">
                    <img
                        src="https://via.placeholder.com/400x600"
                        alt="Collection 2"
                        className="max-w-[70%] mb-4"
                    />
                    <p className="text-lg font-bold text-center">
                        [COLLECTION NAME] {`{ SPACE AGE GLAM }`}
                    </p>
                    <p className="text-md text-center">
                        [DESCRIPTION]{" "}
                        {`{ '60s minimalism with a space-age twist. }`}
                    </p>
                </div>
                <div className="scroll-item flex-shrink-0 w-screen flex flex-col justify-center items-center p-4">
                    <img
                        src="https://via.placeholder.com/400x600"
                        alt="Collection 3"
                        className="max-w-[70%] mb-4"
                    />
                    <p className="text-lg font-bold text-center">
                        [COLLECTION NAME] {`{ FUTURE FUSION }`}
                    </p>
                    <p className="text-md text-center">
                        [DESCRIPTION]{" "}
                        {`{ Where retro aesthetics blend with modern innovation. }`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Events;
