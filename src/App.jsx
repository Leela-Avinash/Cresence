import {
    BrowserRouter as Router,
    Route,
    Routes,
    NavLink,
    Link,
} from "react-router-dom";
import Stars from "./model_components/Stars";
import ExploreCollege from "./components/ExploreCollege";
import HomeScene from "./model_components/HomeScene";
import { CalendarCheck2 } from "lucide-react";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { RiTimeLine } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { useState } from "react";
import CanvasCursor from "./components/CanvasCursor";

function App() {
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    return (
        <Router>
            <div className="relative w-full h-[100dvh]">
                <CanvasCursor />
                <div className="w-full absolute flex justify-between px-3 items-center z-20">
                    <Link to="/" className="flex">
                        <img
                            src="/images/logo for website.png"
                            className="w-14 h-14 border-2 rounded-full border-gray-600 mt-2 cursor-pointer"
                        />
                    </Link>
                    <Link
                        href="/"
                        className=" cursor-pointer w-14 h-14 flex rounded-full border-2 bg-black border-blue-400 mt-2 justify-center items-center"
                    >
                        {/* <UserRound className="w-8 h-8 rounded-full text-white" /> */}
                        <img
                            src="images/prem.jpg"
                            className="rounded-full w-12 h-12"
                        />
                    </Link>
                </div>
                <div className="absolute -z-10 inset-0 w-full ">
                    <Stars />
                </div>
                <div className="relative">
                    <Routes>
                        <Route path="/" element={<HomeScene />} />
                        <Route path="/explore" element={<ExploreCollege />} />
                        <Route
                            path="/events"
                            element={<div>Events Page</div>}
                        />
                        <Route
                            path="/workshops"
                            element={<div>Workshops Page</div>}
                        />
                        <Route
                            path="/timeline"
                            element={<div>Timeline Page</div>}
                        />
                        <Route path="/stay" element={<div>Stay Page</div>} />
                        <Route path="/more" element={<div>More Page</div>} />
                    </Routes>
                </div>

                {/* Bottom Navigation Bar */}
                <div className="md:hidden md:pointer-events-none flex justify-evenly fixed bottom-0 w-full h-20 text-white bg-gray-950 z-50 md:-z-10">
                    {/* Navigation Links with NavLink */}
                    <NavLink
                        to="/events"
                        className={({ isActive }) =>
                            isActive
                                ? "flex flex-col items-center justify-center text-blue-600"
                                : "flex flex-col items-center justify-center text-gray-600"
                        }
                    >
                        <CalendarCheck2 className="h-5 w-5" />
                        <p className="text-sm">Events</p>
                    </NavLink>

                    <NavLink
                        to="/workshops"
                        className={({ isActive }) =>
                            isActive
                                ? "flex flex-col items-center justify-center text-blue-600"
                                : "flex flex-col items-center justify-center text-gray-600"
                        }
                    >
                        <LiaChalkboardTeacherSolid className="h-5 w-5" />
                        <p className="text-sm">Workshops</p>
                    </NavLink>

                    <button
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                        className="flex flex-col items-center justify-center"
                    >
                        <CiCircleMore className="h-5 w-5 text-gray-600" />
                        <p className="text-sm">More</p>
                    </button>

                    <NavLink
                        to="/timeline"
                        className={({ isActive }) =>
                            isActive
                                ? "flex flex-col items-center justify-center text-blue-600"
                                : "flex flex-col items-center justify-center text-gray-600"
                        }
                    >
                        <RiTimeLine className="h-5 w-5" />
                        <p className="text-sm">Timeline</p>
                    </NavLink>

                    <NavLink
                        to="/stay"
                        className={({ isActive }) =>
                            isActive
                                ? "flex flex-col items-center justify-center text-blue-600"
                                : "flex flex-col items-center justify-center text-gray-600"
                        }
                    >
                        <FaBed className="h-5 w-5" />
                        <p className="text-sm">Stay</p>
                    </NavLink>
                    {showMoreMenu && (
                        <div className="fixed bottom-20 right-0 w-60 h-60 bg-gray-950 text-white rounded-tl-full flex flex-col justify-around items-center z-50 shadow-lg">
                            <NavLink
                                to="/sub-option-1"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 flex items-center justify-center"
                                        : "text-gray-600 flex items-center justify-center"
                                }
                            >
                                Sub Option 1
                            </NavLink>
                            <NavLink
                                to="/sub-option-2"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 flex items-center justify-center"
                                        : "text-gray-600 flex items-center justify-center"
                                }
                            >
                                Sub Option 2
                            </NavLink>
                            <NavLink
                                to="/sub-option-3"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 flex items-center justify-center"
                                        : "text-gray-600 flex items-center justify-center"
                                }
                            >
                                Sub Option 3
                            </NavLink>
                            <NavLink
                                to="/sub-option-4"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 flex items-center justify-center"
                                        : "text-gray-600 flex items-center justify-center"
                                }
                            >
                                Sub Option 4
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </Router>
    );
}

export default App;
