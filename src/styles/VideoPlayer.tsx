import React, { useRef, useState, useEffect } from "react";
import "./VideoPlayer.css"; // Import custom CSS

interface VideoPlayerProps {
  src: string;
  title: string;
  controls?: boolean; // Whether to show custom controls
  autoplay?: boolean; // Whether to autoplay the video
  muted?: boolean; // Whether the video is muted
  loop?: boolean; // Whether to loop the video
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  controls = true,
  autoplay = false,
  muted = false,
  loop = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  // Handle play/pause on video click or overlay tap
  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  // Update current time and duration
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateTime = () => {
        setCurrentTime(video.currentTime);
        setDuration(video.duration || 0);
      };
      video.addEventListener("timeupdate", updateTime);
      return () => video.removeEventListener("timeupdate", updateTime);
    }
  }, []);

  // Show controls on hover or after interaction
  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => setShowControls(false);

  return (
    <div className="custom-video-player">
      <div
        className="video-wrapper"
        onClick={handlePlayToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={src}
          width="100%"
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          className="video"
          onPlay={() => setShowControls(true)}
          onPause={() => setShowControls(false)}
        >
          Your browser does not support the video tag.
        </video>
        {!isPlaying && (
          <div className="play-overlay" onClick={handlePlayToggle}>
            <button className="play-button">▶</button>
          </div>
        )}
      </div>
      {controls && showControls && (
        <div className="video-controls">
          <button onClick={togglePlayPause} className="control-btn">
            {isPlaying ? "⏸" : "▶"}
          </button>
          <input
            type="range"
            className="seek-bar"
            min="0"
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
          />
          <span className="time-display">
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)
              .toString()
              .padStart(2, "0")} / {Math.floor(duration / 60)}:{Math.floor(
              duration % 60
            )
              .toString()
              .padStart(2, "0")}
          </span>
          <button onClick={toggleMute} className="control-btn">
            {isMuted ? "🔇" : "🔊"}
          </button>
          <input
            type="range"
            className="volume-bar"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      )}
      {title && <h3 className="video-title">{title}</h3>}
    </div>
  );
};

export default VideoPlayer;