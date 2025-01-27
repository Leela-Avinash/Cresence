import React, { useEffect, useState, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { MoveLeft, MoveRight } from "lucide-react";
import {team} from "../utils/Content";

const ImageCarousel = () => {   
    const [centerIndex, setCenterIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);
    const splideRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (carouselRef.current) {
                const containerWidth = carouselRef.current.offsetWidth;
                const totalSlidesWidth =
                    team.length * 300 + (team.length - 1) * 64;
                setIsOverflow(totalSlidesWidth > containerWidth);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [team.length]);

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
                    perPage: 5,
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
                        1280: { 
                            perPage: 3, 
                            fixedWidth: "350px",
                            height: "450px" 
                        },
                        1024: { 
                            perPage: 2, 
                            fixedWidth: "300px",
                            height: "400px" 
                        },
                        768: { 
                            perPage: 1, 
                            fixedWidth: "250px",
                            height: "350px" 
                        },
                        480: { 
                            perPage: 1, 
                            fixedWidth: "200px",
                            height: "300px" 
                        },
                    }
                }}
                onMove={handleMove}
            >
                {team.map((member, index) => (
                    <SplideSlide key={index}>
                        <div
                            className={`transition-all duration-1000 ease-in-out mx-auto ${
                                index === centerIndex
                                    ? "scale-100 opacity-100 filter-none"
                                    : "scale-80 opacity-10 filter grayscale"
                            }`}
                            style={{
                                transform: `scale(${
                                    index === centerIndex ? 1 : 0.8
                                })`,
                                opacity: index === centerIndex ? 1 : 0.1,
                            }}
                        >
                            <div className="overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src={member.image}
                                    alt={`Slide ${index}`}
                                    className="object-cover lg:h-[450px] md:h-[400px] h-[300px]"
                                />
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
            <div className="lg:absolute lg:top-4 lg:left-[62%] lg:bg-transparent lg:text-left text-white text-center mt-4">
                <h2 className="text-4xl font-bold mb-4">
                    {team[centerIndex].Role}
                </h2>
                <p className="text-lg">{team[centerIndex].Name}</p>
                <div id="socials" className="mt-4">
                    {team[centerIndex].socials.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-2"
                        >
                            <i>{social.name}</i>
                        </a>
                    ))}
                </div>
            </div>
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

export default ImageCarousel;
