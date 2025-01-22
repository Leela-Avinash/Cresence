import React, { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
    const targetDate = new Date("2025-01-31T00:00:00+05:30");
    const [isOpen, setIsOpen] = useState(false);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
    function calculateTimeLeft(targetDate) {
        const now = new Date();
        const difference = new Date(targetDate) - now;
    
        // Calculate days, hours, minutes, and seconds left
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
        return { days, hours, minutes, seconds };
      }

  // Update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [targetDate]);

    return (
        <nav className=" fixed top-0 w-full z-50  ">
            <div className="hidden md:flex justify-between w-full space-x-6 text-white font-medium">
                {/* Logo */}


                {/* Links for larger screens */}
                {/* <div className="hidden md:flex justify-between w-full space-x-6 text-white font-medium border"> */}
                <div className="skewed-container-r border-b-2 border-r-2 px-5">
                    <div className="flex items-center justify-evenly space-x-28 inner-content-r w-[32rem] py-3">
                        <div className="text-white text-2xl font-bold">
                            <a href="#">Logo</a>
                        </div>
                        <a href="#events" className="hover:text-gray-300  ">Events</a>
                        <a href="#workshops" className="hover:text-gray-300">Workshops</a>
                    </div>
                </div>
                <div className="text-center py-1 text-white">
      {/* <h2 className="text-2xl mb-4">Countdown to Event</h2> */}
      <div className="flex justify-center space-x-4">
        <div>
          <span className="">{timeLeft.days}</span>
          <p className="">Days</p>
        </div>
        <div>
          <span className="">{timeLeft.hours}</span>
          <p className="">Hours</p>
        </div>
        <div>
          <span className="">{timeLeft.minutes}</span>
          <p className="">Minutes</p>
        </div>
        <div>
          <span className="">{timeLeft.seconds}</span>
          <p className="">Seconds</p>
        </div>
      </div>
    </div>
                <div className="skewed-container-l border-b-2 border-l-2 px-5">
                    <div className="flex items-center justify-evenly space-x-24 inner-content-l w-[32rem] py-3">
                        <a href="#sponsors" className="hover:text-gray-300">Timeline</a>
                        <a href="#accommodation" className="hover:text-gray-300">Accommodation</a>
                        <a href="#timeline" className="hover:text-gray-300">Login</a>
                    </div>
                </div>
                {/* </div> */}

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white md:hidden focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-500 text-white space-y-4 px-4 py-4">
                    <a href="#events" className="block hover:text-gray-300">Events</a>
                    <a href="#workshops" className="block hover:text-gray-300">Workshops</a>
                    <a href="#sponsors" className="block hover:text-gray-300">Sponsors</a>
                    <a href="#accommodation" className="block hover:text-gray-300">Accommodation</a>
                    <a href="#timeline" className="block hover:text-gray-300">Timeline</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
