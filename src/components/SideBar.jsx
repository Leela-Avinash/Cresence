import React, { useState } from 'react';

function Sidebar() {
    return (
        <div className="w-20 bg-gray-800 h-full p-4 relative flex flex-col justify-between">
            {/* Logo Section for Links */}
            <div className="flex flex-col items-center space-y-4">
                
                {/* Team Link */}
                <div className="group relative flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:w-24 transition-all duration-300">
                        <img src="path_to_logo_team" alt="Logo" className="w-8 h-8" />
                    </div>
                    <div className="group-hover:block absolute left-16 top-0 bg-gray-700 text-white rounded-md p-2 hidden">
                        <a href="#team" className="block px-4 py-2 hover:bg-blue-500">Our Team</a>
                    </div>
                </div>

                {/* About Link */}
                <div className="group relative flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:w-24 transition-all duration-300">
                        <img src="path_to_logo_about" alt="Logo" className="w-8 h-8" />
                    </div>
                    <div className="group-hover:block absolute left-16 top-0 bg-gray-700 text-white rounded-md p-2 hidden">
                        <a href="#about" className="block px-4 py-2 hover:bg-green-500">About</a>
                    </div>
                </div>

                {/* Gallery Link */}
                <div className="group relative flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center group-hover:w-24 transition-all duration-300">
                        <img src="path_to_logo_gallery" alt="Logo" className="w-8 h-8" />
                    </div>
                    <div className="group-hover:block absolute left-16 top-0 bg-gray-700 text-white rounded-md p-2 hidden">
                        <a href="#gallery" className="block px-4 py-2 hover:bg-red-500">Gallery</a>
                    </div>
                </div>

                {/* Sponsors Link */}
                <div className="group relative flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center group-hover:w-24 transition-all duration-300">
                        <img src="path_to_logo_sponsors" alt="Logo" className="w-8 h-8" />
                    </div>
                    <div className="group-hover:block absolute left-16 top-0 bg-gray-700 text-white rounded-md p-2 hidden">
                        <a href="#sponsors" className="block px-4 py-2 hover:bg-yellow-500">Sponsors</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
