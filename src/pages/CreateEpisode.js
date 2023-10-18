import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import FileInput from "../components/FileInput";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateEpisode = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const audioFileHandle = (file) => {
    setAudioFile(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (title.trim() === "" || desc.trim() === "" || audioFile === "") {
      if (title.trim() === "") {
        setTitleError(true);
      }
      if (desc.trim() === "") {
        setDescError(true);
      }
      if (audioFile.trim() === "") {
        setAudioError(true);
      }
      setLoading(false);
    } else {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );

        await uploadBytes(audioRef, audioFile);

        const audioURL = await getDownloadURL(audioRef);

        const episodeData = {
          title,
          description: desc,
          audioFile: audioURL,
        };
        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("Episode created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "#20062e",
        });
        navigate(`/podcast/${id}`);
        setTitle("");
        setDesc("");
        setAudioFile("");
      } catch (err) {
        toast.error(err.message, {
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
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className=" min-h-screen  w-[80%]  mx-auto mt-[2rem] flex flex-col items-center">
        <h1 className="text-white text-[1.6rem] font-bold pb-4">
          Create an Episode
        </h1>
        <input
          type="text"
          value={title}
          placeholder="Title"
          className={`bg-theme text-white border-2 border-solid  rounded-md p-4 text-[1rem] w-[50%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297]  ${
            titleError ? "border-red-600 mb-1" : "mb-4"
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
          value={desc}
          required={true}
          placeholder="Episode Description"
          className={`bg-theme text-white border-2 border-solid  rounded-md p-4 text-[1rem] w-[50%] h-32 font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] ${
            descError ? "border-red-600 mb-1" : "mb-4"
          }`}
          onChange={(e) => {
            setDesc(e.target.value);
            setDescError(false);
          }}
        ></textarea>
        {descError && (
          <p className=" text-red-700 mb-2 pr-[350px] pt-1">
            This field cannot be empty
          </p>
        )}
        <FileInput
          text="Upload Audio File"
          accept={"audio/*"}
          id="audio-file-input"
          fileHandleFnc={audioFileHandle}
          className={`${audioError ? "border-red-600 mb-0" : ""}`}
          onClick={() => setAudioError(false)}
        />
        {audioError && (
          <p className=" text-red-700 mb-2 pr-[300px] pt-1">
            Please upload your episode audio
          </p>
        )}
        <Button
          text={loading ? "Loading..." : "Create Podcast"}
          disabled={loading}
          onClick={handleSubmit}
          className={`border text-white font-bold w-[300px] h-[48px] rounded-lg hover:bg-white hover:text-theme transition-all duration-300`}
        />
      </div>
    </>
  );
};

export default CreateEpisode;
