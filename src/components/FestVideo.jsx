import React from "react";

export default function FestVideo() {
  return (
    <div className="pb-20 relative">
      {/* Title */}
      <h1 className="absolute z-20 w-full text-3xl text-white pt-10 text-center">
        Word from the team
      </h1>

      {/* Content Section */}
      <div className="relative z-30 flex flex-col items-center justify-center pt-32">
        <div className="flex flex-col md:flex md:flex-row w-11/12 max-w-6xl gap-4">
          {/* Video Section */}
          <div className="flex-1  p-4 shadow-md rounded-lg">
            <video
              className="w-full h-auto rounded-md"
              controls
              src="../public/v2.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* About Video Section */}
          <div className="flex-1 p-4 shadow-md rounded-lg">
            <h2 className="text-white text-2xl font-semibold mb-2  text-xl md:text-2xl xl:text-3xl">About the Video</h2>
            <p className="text-white  text-lg md:text-xl xl:text-xl">
              This video showcases the highlights of our fest, capturing the
              spirit and energy of the event. It includes memorable moments and
              performances that made this celebration unforgettable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
