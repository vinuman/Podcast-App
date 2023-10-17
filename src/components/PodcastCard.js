import React from "react";
import { Link } from "react-router-dom";

const PodcastCard = ({ title, displayImage, id }) => {
  return (
    <>
      <Link to={`/podcast/${id}`}>
        <div className="p-4 w-[250px] h-[260px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-[1rem] opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer border m-4">
          <img
            className="w-[100%] h-[200px] border rounded-[0.8rem]"
            src={displayImage}
            alt={title}
          ></img>
          <p className="text-white font-bold p-2">{title}</p>
        </div>
      </Link>
    </>
  );
};

export default PodcastCard;
