import React from "react";
import { useState } from "react";
import Button from "./Button";
import { Icon } from "@iconify/react";

const EpisodeDetails = ({ title, desc, audioFile, onClick, index }) => {
  const [purplePlayBtn, setPurplePlayBtn] = useState(false);
  const handlePlayBtn = () => {
    setPurplePlayBtn(!purplePlayBtn);
  };
  return (
    <>
      <div className="pb-4">
        <h1 className="text-left text-white text-[1.2rem] font-semibold pt-2 pb-2">
          {index}) {title}
        </h1>
        <p className="pb-4 text-[0.8rem] sm:text-[1rem] text-[#8f8297]">
          {desc}
        </p>
        <div
          onClick={onClick}
          onMouseEnter={handlePlayBtn}
          onMouseLeave={handlePlayBtn}
          className="w-[160px] h-[48px] border rounded-lg flex items-center justify-center gap-2 cursor-pointer group hover:bg-white transition-all duration-300 mb-8"
        >
          <Button
            className="text-white font-bold text-[20px] tracking-wide group-hover:text-theme"
            text="Play"
          ></Button>
          {purplePlayBtn ? (
            <Icon icon="ph:play-fill" color="#20062e" width="20" height="20" />
          ) : (
            <Icon icon="ph:play-fill" color="white" width="20" height="20" />
          )}
        </div>
      </div>
    </>
  );
};

export default EpisodeDetails;
