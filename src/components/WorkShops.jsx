import React from "react";

export default function WorkShops() {
    const workshops = [
        {
            id: 1,
            title: "Cyber Security",
            description:
                "This workshop provides an opportunity to explore and learn about various cutting-edge technologies and their real-world applications. Join us to enhance your skills and knowledge!",
            image: "./images/cyber2.webp",
        },
        {
            id: 2,
            title: "Machine Learning",
            description:
                "This workshop provides an opportunity to explore and learn about various cutting-edge technologies and their real-world applications. Join us to enhance your skills and knowledge! This workshop provides an opportunity to explore and learn about various cutting-edge technologies and their real-world applications. Join us to enhance your skills and knowledge!",
            image: "./images/ml.jpg",
        },
        {
            id: 3,
            title: "Space Technology",
            description:
                "This workshop provides an opportunity to explore and learn about various cutting-edge technologies and their real-world applications. Join us to enhance your skills and knowledge!",
            image: "./images/space.jpg",
        },
    ];

    return (
        <div className="relative">
            <div className="max-w-[1400px] mx-auto">
                {/* Title */}
                <h1 className="z-20 pt-20 text-2xl w-full text-center text-white">
                    WORKSHOPS
                </h1>

                {workshops.map((workshop, index) => (
                    <div
                        key={workshop.id}
                        className={`flex flex-col ${
                            index % 2 === 0
                                ? "md:flex-row"
                                : "md:flex-row-reverse"
                        } items-center justify-center mt-5 mx-4`}
                        style={{ height: "100dvh" }}
                    >
                        {/* Image Section */}
                        <div className="flex-1 p-2 md:p-10 mb-10 md:w-[60%]">
                            <img
                                src={workshop.image}
                                alt={workshop.title}
                                className="w-full h-full rounded-lg shadow-md object-cover"
                            />
                        </div>

                        {/* About Image Section */}
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
