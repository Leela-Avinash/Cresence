import React, { useEffect, useState, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { MoveLeft, MoveRight } from "lucide-react";
import { eventData } from "../utils/Content";

const EventsCarousel = () => {
    const [centerIndex, setCenterIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);
    const splideRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (carouselRef.current) {
                const containerWidth = carouselRef.current.offsetWidth;
                const totalSlidesWidth =
                    eventData.length * 300 + (eventData.length - 1) * 64;
                setIsOverflow(totalSlidesWidth > containerWidth);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [eventData.length]);

    const handleMove = (splide) => {
        const newCenterIndex = splide.index;
        setCenterIndex(newCenterIndex);
    };

    const goPrev = () => {
        splideRef.current.splide.go("-1");
    };

    const goNext = () => {
        splideRef.current.splide.go("+1");
    };

    return (
        <div
            className="w-full h-auto max-w-screen-3xl mx-auto p-4 overflow-hidden"
            ref={carouselRef}
        >
            <Splide
                ref={splideRef}
                options={{
                    type: "loop",
                    perPage: 3,
                    perMove: 1,
                    focus: "center",
                    fixedWidth: "300px",
                    gap: "5rem",
                    arrows: false,
                    keyboard: 'global',
                    pagination: false,
                    drag: isOverflow,
                    clones: isOverflow ? undefined : 10,
                    breakpoints: {
                        1280: { perPage: 2, fixedWidth: "350px" },
                        1024: { perPage: 1, fixedWidth: "300px" },
                        768: { perPage: 1, fixedWidth: "250px" },
                        480: { perPage: 1, fixedWidth: "200px" },
                    }
                }}
                onMove={handleMove}
            >
                {eventData.map((event, index) => (
                    <SplideSlide key={index}>
                        <div
                            className={`transition-all duration-700 ease-in-out mx-auto`}
                        >
                            <div className="overflow-hidden rounded-xl shadow-lg p-4 bg-gray-800 text-white">
                                <img
                                    src={event.imgSrc}
                                    alt={event.name}
                                    className="object-cover w-full h-64 rounded-lg"
                                />
                                <h3 className="text-2xl font-bold mt-4">{event.name}</h3>
                                <p className="text-lg">{event.resource_person}</p>
                                <p className="text-md mt-2">{event.dates}</p>
                                <p className="text-sm mt-2">{event.description}</p>
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
            <div className="flex justify-center gap-6 mt-6">
                <button
                    onClick={goPrev}
                    className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition hover:bg-purple-700"
                >
                    <MoveLeft size={24} />
                </button>
                <button
                    onClick={goNext}
                    className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition hover:bg-purple-700"
                >
                    <MoveRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default EventsCarousel;
