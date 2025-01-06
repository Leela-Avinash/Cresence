import React from "react";

export default function ML() {
  return (
    <div className="relative">
      {/* First Content Row (Visible on Medium Screens and Larger) */}
      <div className="hidden md:flex flex-col md:flex-row items-center justify-left mt-10 mx-4 pb-20">
        {/* About Image Section */}
        <div className="flex-1 w-3/4 h-80  p-4 shadow-md rounded-lg ml-5 ">
          <h2 className="text-xl font-semibold mb-2 text-white text-xl md:text-2xl xl:text-3xl">MachineLearning</h2>
          <p className="text-white text-lg md:text-xl xl:text-xl text-justify">
            This workshop provides an opportunity to explore and learn about
            various cutting-edge technologies and their real-world
            applications. Join us to enhance your skills and knowledge!
            This workshop provides an opportunity to explore and learn about
            various cutting-edge technologies and their real-world
            applications. Join us to enhance your skills and knowledge!This workshop provides an opportunity to explore and learn about
            
          </p>
        </div>
        {/* Image Section */}
        <div className="flex-1 max-w-sm pl-10 mr-10">
          <img
            src="../public/images/loading-background.png"
            alt="Workshop"
            className="w-80 h-80 rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Second Content Row (Visible on Smaller Screens) */}
      <div className="flex flex-col md:hidden items-center justify-left mx-4 pb-20">
        {/* Image Section */}
        <div className="flex-1 max-w-sm p-2 md:pl-10 mb-10">
          <img
            src="../public/images/loading-background.png"
            alt="Workshop"
            className="w-60 h-60 md:w-80 md:h-80 rounded-lg shadow-md"
          />
        </div>

        {/* About Image Section */}
        <div className="flex-1 w-3/4 h-80 md:p-4 shadow-md rounded-lg md:ml-5 ">
          <h2 className="text-xl font-semibold mb-2 text-white text-xl md:text-2xl xl:text-3xl">Machine Learning</h2>
          <p className="text-white text-lg md:text-xl xl:text-xl text-justify pr-10 absolute">
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
