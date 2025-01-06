import React from "react";

export default function Cyber() {
  return (
    <div className="relative">
      {/* Title */}
      <h1 className=" z-20 pt-20 text-2xl w-full text-center text-white">
        WORKSHOPS
      </h1>

      {/* Content Row */}
      <div className="flex flex-col md:flex-row items-center justify-left mt-10 mx-4 pb-20">
        {/* Image Section */}
        <div className="flex-1 max-w-sm p-2 md:pl-10 mb-10">
          <img
            src="../public/images/loading-background.png"
            alt="Workshop"
            className="w-60 h-60 md:w-80 md:h-80 rounded-lg shadow-md"
          />
        </div>

        {/* About Image Section */}
        <div className="flex-1 w-3/4 h-80  md:p-2 shadow-md rounded-lg md:ml-5 ">
          <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold mb-2 text-white  text-xl md:text-2xl xl:text-3xl">Cyber Security</h2>
          <p className="text-white  text-lg md:text-xl xl:text-xl text-justify pr-12 absolute">
            This workshop provides an opportunity to explore and learn about
            various cutting-edge technologies and their real-world
            applications. Join us to enhance your skills and knowledge!
            This workshop provides an opportunity to explore and learn about
            various cutting-edge technologies and their real-world
            applications. Join us to enhance your skills and knowledge!
            This workshop provides an opportunity to explore and learn about
            various cutting-edge technologies and their real-world
            applications. Join us to enhance your skills and knowledge!
            
          </p>
        </div>
      </div>
    </div>
  );
}
