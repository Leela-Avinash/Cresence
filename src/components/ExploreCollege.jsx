import React, { useState, useRef, useEffect } from "react"; // Import ShootingStar for background
import LoadingCollege from "./LoadingCollege"; // Import LoadingCollege for loading bar

const ExploreCollege = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showForwardButton, setShowForwardButton] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false); // Track video load state
  const [videoTime, setVideoTime] = useState(0); // Track video time
  const [stopPoints, setStopPoints] = useState([5, 9, 13]); // Stopping points
  const [currentStopIndex, setCurrentStopIndex] = useState(0); // Current stop index
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0); // Track loading progress

  // Handle video load progress
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setShowVideo(true);
    setIsVideoPlaying(true);
  };

  // Handle explore button click
  const handleExploreClick = () => {
    setShowVideo(true);
    setIsVideoPlaying(true);
  };

  // Update video time and progress during playback
  useEffect(() => {
    if (isVideoPlaying && videoRef.current) {
      videoRef.current.play();

      const interval = setInterval(() => {
        setVideoTime(videoRef.current.currentTime);
        setProgress(
          Math.min(
            (videoRef.current.currentTime /
              videoRef.current.duration) *
              100,
            100
          )
        ); // Update loading progress
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isVideoPlaying]);

  // Handle stopping points in video and show forward button
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

  // Handle forward button click
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
              onCanPlay={handleVideoLoaded} // Trigger when video can start playing
              onLoadedData={handleVideoLoaded} // Trigger when video metadata is loaded
              src="/v2.mp4" // Replace with your actual video URL
            />
          </div>
          {/* Forward Button */}
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
