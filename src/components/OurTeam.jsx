import ImageCarousel from "./Slider";
import React, { useEffect, useState, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { MoveLeft, MoveRight } from "lucide-react";

const OurTeam = () => {
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
        <div className="relative text-white">
            <div className="hidden lg:block">
                <ImageCarousel />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col bg-transparent pointer-events-none">
                    <div className="w-[90%] text-left px-10 pt-6">
                        <h2 className="text-4xl font-bold mb-4">Our Team</h2>
                        <p className="text-base max-w-md">
                            The team of "CreSencE" is a dynamic group of young
                            individuals who are eager to make a difference in
                            the tech industry. Their hard work, dedication, and
                            passion for technology are reflected in the success
                            of the festival.
                        </p>
                    </div>
                </div>
            </div>

            <div className="block lg:hidden w-full max-w-screen-3xl mx-auto p-4 text-center">
                <div className="flex flex-col gap-8">
                    <div className="text-center">
                        <h2 className="text-5xl font-bold">Our Team</h2>
                    </div>
                    <ImageCarousel />
                </div>
            </div>
        </div>
    );
};

export default OurTeam;
