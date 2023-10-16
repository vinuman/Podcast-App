import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { toast } from "react-toastify";
import FileInput from "./FileInput";

const StartPodcast = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [bannerImage, setBannerImage] = useState();
  const [titleError, setTitleError] = useState();
  const [descriptionError, setDescriptionError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bannerImgHandleFnc = (file) => {
    setBannerImage(file);
  };

  const displayImgHandleFnc = (file) => {
    setDisplayImage(file);
  };

  const handleCreatePodcast = () => {
    if (title.trim() === "" || description.trim() === "") {
      if (title.trim() === "") {
        setTitleError(true);
      }
      if (description.trim() === "") {
        setDescriptionError(true);
      }
    } else {
      toast.success("created", {
        position: "top-right",
        autoClose: 3000,
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
      <div className="w-[80%] block mx-auto mt-[4rem] ">
        <h1 className="text-[2rem] text-white font-semibold text-center mb-16">
          Create a Podcast
        </h1>
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={title}
            required={true}
            placeholder="Podcast Title"
            className={` bg-theme text-white border-2 border-solid  rounded-md p-4 text-[1rem] w-[50%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] ${
              titleError ? " border-red-700" : "border-[#8f8297] mb-4"
            }`}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
          ></input>
          {titleError && (
            <p className=" text-red-700 mb-2 pr-[350px] pt-1">
              This field cannot be empty
            </p>
          )}
          <textarea
            value={description}
            required={true}
            placeholder="Podcast Description"
            className={`bg-theme text-white border-2 border-solid  rounded-md p-4 text-[1rem] w-[50%] h-32 font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] ${
              descriptionError ? " border-red-700" : "border-[#8f8297] mb-4"
            }`}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError(false);
            }}
          ></textarea>
          {descriptionError && (
            <p className=" text-red-700 mb-2 pr-[350px] pt-1">
              This field cannot be empty
            </p>
          )}
          <FileInput
            text="Upload Display Image"
            accept={"image/*"}
            id="display-image-input"
            fileHandleFnc={displayImgHandleFnc}
          />
          <FileInput
            text="Upload Banner Image"
            accept={"image/*"}
            id="banner-image-input"
            fileHandleFnc={bannerImgHandleFnc}
          />
          <Button
            className="text-center text-[1.2rem] font-bold border-2 border-solid border-white p-4 rounded-md text-white w-[50%] mx-auto hover:bg-white hover:text-theme transition-all duration-300"
            onClick={handleCreatePodcast}
            text={loading ? "Loading..." : "Create Podcast"}
            disabled={loading}
          />
        </div>
      </div>
    </>
  );
};

export default StartPodcast;
