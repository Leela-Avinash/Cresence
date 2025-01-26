import React, { useRef } from "react";
import { Images, UsersRound, HandHelping, Info } from "lucide-react";
import gsap from "gsap";

function Sidebar() {
  // Refs for the text elements
  const teamTextRef = useRef(null);
  const aboutTextRef = useRef(null);
  const galleryTextRef = useRef(null);
  const sponsorsTextRef = useRef(null);

  // Function to handle mouse enter (fade-in)
  const handleMouseEnter = (textRef) => {
    gsap.to(textRef.current, {
      opacity: 1,
      display: "block",
    });
  };

  // Function to handle mouse leave (fade-out)
  const handleMouseLeave = (textRef) => {
    gsap.to(textRef.current, {
      opacity: 0,
      onComplete: () => {
        textRef.current.style.display = "none";
      },
    });
   
  };

  return (
    <div className="rounded-r-3xl h-full p-4 flex flex-col space-y-4 justify-between">
      {/* Team Link */}
      <div
        onMouseEnter={() => handleMouseEnter(teamTextRef)}
        onMouseLeave={() => handleMouseLeave(teamTextRef)}
        className="border-2 border-gray-600 hover:border-teal-600 text-teal-600 rounded-full cursor-pointer space-x-4 flex w-fit items-center p-4 justify-evenly transition-all duration-300 hover:shadow-teal-600 hover:shadow-sm"
      >
        <UsersRound className="" />
        <p ref={teamTextRef} className="hidden font-bold ">
          OUR TEAM
        </p>
      </div>

      {/* About Link */}
      <div
        onMouseEnter={() => handleMouseEnter(aboutTextRef)}
        onMouseLeave={() => handleMouseLeave(aboutTextRef)}
        className="border-2 border-gray-600  cursor-pointer hover:border-rose-700 text-rose-700 rounded-full space-x-4 flex items-center w-fit p-4 justify-evenly transition-all duration-300 hover:shadow-rose-700 hover:shadow-sm"
      >
        <Info />
        <p ref={aboutTextRef} className="hidden font-bold">
          ABOUT
        </p>
      </div>

      {/* Gallery Link */}
      <div
        onMouseEnter={() => handleMouseEnter(galleryTextRef)}
        onMouseLeave={() => handleMouseLeave(galleryTextRef)}
        className="border-2 border-gray-600  cursor-pointer hover:border-blue-600 text-blue-600 rounded-full space-x-4 flex items-center w-fit p-4 transition-all duration-300 hover:shadow-blue-600 hover:shadow-sm"
      >
        <Images  />
        <p ref={galleryTextRef} className="hidden font-bold">
          GALLERY
        </p>
      </div>

      {/* Sponsors Link */}
      <div
        onMouseEnter={() => handleMouseEnter(sponsorsTextRef)}
        onMouseLeave={() => handleMouseLeave(sponsorsTextRef)}
        className="border-2 border-gray-600 cursor-pointer hover:border-yellow-600 text-yellow-600 rounded-full space-x-4 flex items-center w-fit p-4 transition-all duration-300 hover:shadow-yellow-600 hover:shadow-m"
      >
        <HandHelping  />
        <p ref={sponsorsTextRef} className="hidden font-bold">
          SPONSORS
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
