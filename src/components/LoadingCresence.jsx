import React from "react";

export default function LoadingCresence({ progress }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center flex-col bg-black">
            <div className="relative w-[80px] sm:w-[100px] h-[80px] sm:h-[100px] overflow-hidden border border-gray-700 rounded-md">
                <div
                    className="absolute inset-0 bg-cover bg-center filter grayscale"
                    style={{ backgroundImage: "url('/images/loading-background.png')" }}
                ></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/loading-background.png')",
                        clipPath: `inset(0 ${(100 - progress)}% 0 0)`,
                        transition: "clip-path 0.3s ease",
                    }}
                ></div>
            </div>

            <p aria-live="polite" className="mt-4 text-white text-sm font-medium">
                {Math.round(progress)}% Loading...
            </p>
        </div>
    );
}
