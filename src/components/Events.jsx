import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slider from "react-slick";
import { eventData } from "../utils/Content";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventsCarousel from "./EventsCarousel";

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
    const containerRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Check if the device supports touch events (mobile/tablet)
        const checkTouchDevice = () => {
            const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
            const userAgent = navigator.userAgent.toLowerCase();

            if (
                hasTouch ||
                /android|iphone|ipad|ipod|blackberry|bb10|mini|windows phone|mobile|tablet|touch/i.test(userAgent)
            ) {
                setIsTouchDevice(true);
            } else {
                setIsTouchDevice(false);
            }
        };

        checkTouchDevice();
    }, []);

    useEffect(() => {
        if (!isTouchDevice && containerRef.current) {
            const container = containerRef.current;
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
                },
            });

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        }
    }, [isTouchDevice]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[100dvh] bg-transparent text-white overflow-hidden"
        >
            {isTouchDevice ? (
                <EventsCarousel />
            ) : (
                <div className="h-full inner-container flex w-[300vw] items-center gap-20">
                    <div className="scroll-item flex-shrink-0 w-screen flex flex-col justify-center items-center p-4 text-9xl">
                        <h2>Technical</h2>
                        <h2>Events</h2>
                    </div>
                    <div className="scroll-item flex-shrink-0 flex justify-between items-center p-4 w-[200vw]">
                        {eventData.map((event, index) => (
                            <div key={index} className="flex-shrink-0 flex flex-col justify-center p-4">
                                <p className="text-md pl-4">{event.dates}</p>
                                <div className="scroll-item flex-shrink-0 flex flex-col lg:flex-row justify-center items-start p-4 pt-0 gap-4 pr-16">
                                    <img
                                        src={event.imgSrc}
                                        alt={`Collection ${index + 1}`}
                                        className="max-w-[70%]"
                                    />
                                    <div className="flex flex-col gap-4">
                                        <p className="text-2xl lg:text-3xl font-bold mt-3">
                                            {event.name}
                                        </p>
                                        <p className="text-lg lg:text-xl">{event.resource_person}</p>
                                        <p className="text-lg">
                                            {event.description.split(" ").slice(0, 4).join(" ")} <br />
                                            {event.description.split(" ").slice(6).join(" ")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
