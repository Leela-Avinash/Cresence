import React, { useState, useRef, useEffect } from "react";
import LoadingCollege from "./LoadingCollege";

const ExploreCollege = () => {
    const [showVideo, setShowVideo] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showForwardButton, setShowForwardButton] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoTime, setVideoTime] = useState(0);
    const [stopPoints, setStopPoints] = useState([5, 9, 13]);
    const [currentStopIndex, setCurrentStopIndex] = useState(0);
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const handleVideoLoaded = () => {
        setVideoLoaded(true);
        setShowVideo(true);
        setIsVideoPlaying(true);
    };

    useEffect(() => {
        if (isVideoPlaying && videoRef.current) {
            videoRef.current.play();

            const interval = setInterval(() => {
                setVideoTime(videoRef.current.currentTime);
                setProgress(
                    Math.min(
                        (videoRef.current.currentTime /
                            videoRef.current.duration) * 100,
                        100
                    )
                );
            }, 100);

            return () => clearInterval(interval);
        }
    }, [isVideoPlaying]);

    useEffect(() => {
        if (
            isVideoPlaying &&
            videoTime >= stopPoints[currentStopIndex] &&
            videoTime < stopPoints[currentStopIndex] + 0.2
        ) {
            videoRef.current.pause();
            setIsVideoPlaying(false);
            setShowForwardButton(true);
        }
    }, [videoTime, isVideoPlaying, stopPoints, currentStopIndex]);

    const handleForwardClick = () => {
        setShowForwardButton(false);
        setIsVideoPlaying(true);
        setCurrentStopIndex((prevIndex) => prevIndex + 1);
        videoRef.current.play();
    };

    return (
        <div className="ExploreCollege-container flex justify-center items-center min-h-[100dvh] bg-gray-100 relative">
            {!videoLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center z-10 text-white">
                    <LoadingCollege setVideoLoaded={setVideoLoaded} />
                </div>
            ) : (
                <>
                    <div className="video-container relative w-[100dvw] h-[100dvh]">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover object-center"
                            muted
                            onCanPlay={handleVideoLoaded}
                            onLoadedData={handleVideoLoaded}
                            src="/v2.mp4" 
                            disablePictureInPicture
                            disableRemotePlayback
                        />
                    </div>
                    {showVideo && !isVideoPlaying && showForwardButton && (
                        <button
                            onClick={handleForwardClick}
                            className="absolute bottom-5 right-5 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
                        >
                            Forward
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default ExploreCollege;
