import React from "react";
import Button from "./Button";

const EpisodeDetails = ({ title, desc, audioFile, onClick, index }) => {
  return (
    <>
      <div>
        <h1 className="text-left text-white text-[1.2rem] font-semibold pt-2">
          {index}) {title}
        </h1>
        <p className="pb-4 text-[#8f8297]">{desc}</p>
        <Button
          className="w-[200px] h-[48px] border text-white font-bold hover:bg-white hover:text-theme transition-all duration-300 rounded-lg tracking-wide"
          text="Play"
          onClick={() => onClick(audioFile)}
        ></Button>
      </div>
    </>
  );
};

export default EpisodeDetails;
