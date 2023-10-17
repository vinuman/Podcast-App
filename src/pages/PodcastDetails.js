import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/Button";

const PodcastDetails = () => {
  const [podcasts, setPodcasts] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPodcasts({ id: id, ...docSnap.data() });
      } else {
        toast.error("No such documents", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "#20062e",
        });
        navigate("/podcasts");
      }
    } catch (err) {
      toast.error(err, {
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
      <Header />
      <div className=" min-h-screen w-[80%] block mx-auto mt-[2rem]">
        {podcasts.id && (
          <div>
            <div className="flex justify-between items-center pb-4">
              <h1 className="text-white text-left text-[2rem] font-semibold">
                {podcasts.title}
              </h1>
              {podcasts.createdBy === auth.currentUser.uid && (
                <Button
                  className=" border text-white font-bold py-4 px-16 hover:bg-white hover:text-theme rounded-lg"
                  text="Create Episode"
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                ></Button>
              )}
            </div>

            <div className="bg-gradient-to-b from-[#180000] to-gray-800 rounded-lg h-[330px] mb-4 p-4">
              <img
                className="w-[100%] h-[300px] object-fill rounded-lg"
                src={podcasts.bannerImage}
                alt={podcasts.title}
              ></img>
            </div>
            <p className="text-[#8f8297] text-left pb-6">
              {podcasts.description}
            </p>
            <h1 className="text-white text-[1.8rem] font-bold">Episodes</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default PodcastDetails;
