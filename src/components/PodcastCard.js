import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const PodcastCard = ({ title, displayImage, id }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (user) {
      navigate(`/podcast/${id}`);
    } else {
      toast.error("Please Signup/Login to continue", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "#20062e",
      });
    }
  };
  return (
    <>
      <div
        onClick={handleCardClick}
        className="p-4 w-[250px]  bg-gradient-to-r from-purple-500 to-pink-500 rounded-[1rem] opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer border m-4"
      >
        <img
          className="w-[100%] h-[200px] border rounded-[0.8rem]"
          src={displayImage}
          alt={title}
        ></img>
        <p className="text-white font-bold p-2">{title}</p>
      </div>
    </>
  );
};

export default PodcastCard;
