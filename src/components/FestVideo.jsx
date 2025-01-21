import React from "react";

export default function FestVideo() {
    return (
        <div className="pb-20 relative">
            {/* Title */}
            <h1 className="absolute z-20 w-full text-3xl text-white pt-10 text-center">
                Word from the team
            </h1>

            {/* Content Section */}
            <div className="z-30 flex flex-col items-center justify-center pt-32">
                <div className="flex flex-col md:flex-row w-11/12 max-w-6xl gap-4">
                    {/* YouTube Video Section */}
                    <div className="flex-1 p-4 shadow-md rounded-lg">
                        <div className="relative pb-[56.25%] w-full">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-md"
                                src="https://www.youtube.com/embed/Xd4lGBtfktQ?si=c9-7f-0-gE3WBSZE"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                            ></iframe>
                        </div>
                    </div>

                    {/* About Video Section */}
                    <div className="flex-1 p-4 shadow-md rounded-lg">
                        <h2 className="text-white font-semibold mb-2 text-2xl md:text-2xl xl:text-3xl md:mt-10">
                            About the Video
                        </h2>
                        <p className="text-white text-lg md:text-xl xl:text-xl">
                            This video showcases the highlights of our fest,
                            capturing the spirit and energy of the event. It
                            includes memorable moments and performances that
                            made this celebration unforgettable.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
