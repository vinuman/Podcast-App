import React from "react";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";

const AudioPlayer = ({ audioSrc, image }) => {
  const [duration, setDuration] = useState("");
  const [volume, setVolume] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef();
  const handleDuration = (e) => {
    setDuration(e.target.value);
  };
  const handleVolume = (e) => {
    setVolume(e.target.value);
  };
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
          <p className="text-white">00:00</p>
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
            onChange={handleDuration}
            className="w-[80%] filter"
          ></input>
          <p className="text-white">-21:00</p>
          <div onClick={() => setIsMute(!isMute)}>
            {isMute ? (
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
            onChange={handleVolume}
            className="w-[20%] filter"
          ></input>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
