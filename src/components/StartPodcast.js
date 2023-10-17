import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { toast } from "react-toastify";
import FileInput from "./FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

const StartPodcast = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [displayImageError, setDisplayImageError] = useState(false);
  const [bannerImageError, setBannerImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bannerImgHandleFnc = (file) => {
    setBannerImage(file);
  };

  const displayImgHandleFnc = (file) => {
    setDisplayImage(file);
  };

  const handleCreatePodcast = async () => {
    setLoading(true);
    //Form validation
    if (title.trim() === "" || description.trim() === "") {
      if (title.trim() === "") {
        setTitleError(true);
      }
      if (description.trim() === "") {
        setDescriptionError(true);
      }
      /*  if (bannerImage === "") {
        setBannerImageError(true);
      }
      if (displayImage === "") {
        setDisplayImageError(true);
      } */
      //Validation success
    } else {
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        const podcastData = {
          title,
          description,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        setTitle("");
        setDescription("");
        setBannerImage("");
        setDisplayImage("");

        toast.success("podcast created", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "#20062e",
        });
      } catch (err) {
        toast.error(err.message, {
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
    }
    setLoading(false);
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
            onClick={() => setDisplayImageError(false)}
            text="Upload Display Image"
            accept={"image/*"}
            id="display-image-input"
            fileHandleFnc={displayImgHandleFnc}
          />
          {displayImageError && (
            <p className=" text-red-700 mb-2 pr-[350px] pt-0">
              Please upload an image
            </p>
          )}
          <FileInput
            onClick={() => setBannerImageError(false)}
            text="Upload Banner Image"
            accept={"image/*"}
            id="banner-image-input"
            fileHandleFnc={bannerImgHandleFnc}
          />
          {bannerImageError && (
            <p className=" text-red-700 mb-2 pr-[350px] pt-1">
              Please upload an image
            </p>
          )}
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
