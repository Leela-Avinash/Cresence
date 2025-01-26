import React, { useEffect, useState, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { MoveLeft, MoveRight } from "lucide-react";

const ImageCarousel = () => {
    const team = [
        {
            id: 0,
            Role: "Fest Coordinators",
            Name: "V. Thanooj Hemanth",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
        {
            id: 1,
            Role: "Fest Coordinator",
            Name: "S. G. Charan Teja",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
        {
            id: 2,
            Role: "Fest Coordinator",
            Name: "P. Bala Sri",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
        {
            id: 3,
            Role: "Fest Coordinator",
            Name: "N. Praneetha",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
        {
            id: 4,
            Role: "Technical Coordinator",
            Name: "J. Prema Sagar",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
        {
            id: 5,
            Role: "Technical Coordinator",
            Name: "S. Mohana Swarupa",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
        {
            id: 6,
            Role: "Non-Technical Coordinator",
            Name: "N. Sai Swaroop",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
        {
            id: 7,
            Role: "Non-Technical Coordinator",
            Name: "G. Namitha",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
        {
            id: 8,
            Role: "Workshop Coordinator",
            Name: "B. Venkat Sai",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
        {
            id: 9,
            Role: "Workshop Coordinator",
            Name: "B. Venkat Sai",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
        {
            id: 10,
            Role: "Workshop Coordinator",
            Name: "B. Venkat Sai",
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
            socials: [
                { name: "Facebook", link: "#" },
                { name: "Twitter", link: "#" },
                { name: "Instagram", link: "#" },
            ],
        },
    ];

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
                        1024: { perPage: 3 },
                        640: { perPage: 1 },
                    },
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
                                    src={member.image} // Use member image based on index
                                    alt={`Slide ${index}`}
                                    className="object-cover w-[300px] h-[450px]"
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
            <div className="text-center lg:hidden m-10 ">
                <p>
                    The team of "CreSencE" is a dynamic group of young
                    individuals who are eager to make a difference in the tech
                    industry. Their hard work, dedication, and passion for
                    technology are reflected in the success of the festival,
                    making it an exciting and enriching experience for all
                    participants.
                </p>
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
