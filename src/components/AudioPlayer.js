import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";

const AudioPlayer = ({ audioSrc, image }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef();

  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };
  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isMute) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMute]);

  return (
    <>
      <div className="w-[100vw] h-[3rem] borders fixed bottom-0 left-0 p-4 flex justify-center items-center gap-[1rem] bg-slate-800">
        <img
          className="h-[30px] w-[30px] object-cover"
          src={image}
          alt="display image"
        ></img>
        <audio ref={audioRef} src={audioSrc}></audio>
        <div className="flex justify-start items-center gap-[0.5rem] w-[70%]">
          <p className="text-white">{formatTime(currentTime)}</p>
          <div onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Icon
                className=" cursor-pointer"
                icon="carbon:pause-filled"
                color="white"
                width="24"
                height="24"
              />
            ) : (
              <Icon
                className=" cursor-pointer"
                icon="ph:play-fill"
                color="white"
                width="20"
                height="20"
              />
            )}
          </div>

          <input
            type="range"
            max={duration}
            value={currentTime}
            step={0.01}
            onChange={handleDuration}
            className="w-[80%] filter cursor-pointer"
          ></input>
          <p className="text-white">{formatTime(duration - currentTime)}</p>
          <div onClick={() => setIsMute(!isMute)}>
            {!isMute ? (
              <Icon
                className=" cursor-pointer"
                icon="codicon:unmute"
                color="white"
                width="24"
                height="24"
              />
            ) : (
              <Icon
                className=" cursor-pointer"
                icon="codicon:mute"
                color="white"
                width="24"
                height="24"
              />
            )}
          </div>
          <input
            type="range"
            value={volume}
            max={1}
            min={0}
            step={0.01}
            onChange={handleVolume}
            className="w-[20%] filter cursor-pointer"
          ></input>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
