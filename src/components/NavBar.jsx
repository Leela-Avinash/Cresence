import React, { useState } from "react";
import { useEffect } from "react";
import { UserRound } from 'lucide-react';
import { Link } from "react-router-dom";

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
    <nav className="flex justify-between px-3 items-center">
      
      <div className="w-[dvh] fixed inset-0 hidden md:flex justify-center h-20 text-white font-medium">
        {/* Logo */}


        {/* Links for larger screens */}
        {/* <div className="hidden md:flex justify-between w-full space-x-6 text-white font-medium border"> */}
        <div className="flex justify-center">
          <div className="skewed-container-l border-b-2 border-l-2  border-[#8000FF] px-3 flex items-center">
            <div className="flex items-center justify-evenly md:w-[7rem] lg:w-[13rem] xl:w-[20rem] md:text-xs lg:text-base inner-content-l py-3">
              <Link to="/events" className="hover:text-gray-300  ">Events</Link>
              <a href="#workshops" className="hover:text-gray-300">Workshops</a>
            </div>
          </div>
          <div className="text-center py-1 px-8 border-b-2 border-[#8000FF] text-white flex items-center">
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
          <div className="skewed-container-r border-r-2 border-b-2 border-[#8000FF]  px-3 flex items-center">
            <div className="flex items-center justify-evenly md:w-[7rem] lg:w-[15rem] xl:w-[20rem] md:text-xs lg:text-base inner-content-r py-3">
              <a href="#sponsors" className="hover:text-gray-300">Timeline</a>
              <a href="#accommodation" className="hover:text-gray-300">Stay</a>
            </div>
          </div>
          </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
