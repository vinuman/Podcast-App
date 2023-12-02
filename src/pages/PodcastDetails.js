import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/Button";
import EpisodeDetails from "../components/EpisodeDetails";
import AudioPlayer from "../components/AudioPlayer";

const PodcastDetails = () => {
  // State variables to hold podcast and episode data
  const [podcasts, setPodcasts] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playFile, setPlayFile] = useState("");
  const navigate = useNavigate();

  // Get the podcast ID from the route parameter
  const { id } = useParams();

  // Effect to fetch podcast data when the ID changes
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  // Function to fetch podcast data
  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPodcasts({ id: id, ...docSnap.data() });
      }
      // If no document found, display an error and navigate to podcasts page
      else {
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

  // Effect to listen for changes in episodes
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.error("Error fetching episodes:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <>
      <Header />
      <div className=" min-h-screen w-[80%] block mx-auto mt-[2rem] pb-4">
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
            {episodes.length > 0 ? (
              <>
                {episodes.map((episode, index) => (
                  <EpisodeDetails
                    key={index}
                    index={index + 1}
                    title={episode.title}
                    desc={episode.description}
                    audioFile={episode.audioFile}
                    onClick={() => setPlayFile(episode.audioFile)}
                  />
                ))}
              </>
            ) : (
              <p className="text-white pt-[1rem] text-[1.6rem] opacity-80">
                No episodes yet !!
              </p>
            )}
          </div>
        )}
        {playFile !== "" && (
          <AudioPlayer audioSrc={playFile} image={podcasts.displayImage} />
        )}
      </div>
    </>
  );
};

export default PodcastDetails;
