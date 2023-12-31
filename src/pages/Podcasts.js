import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { setPodcast } from "../slices/podcastSlice";
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import PodcastCard from "../components/PodcastCard";

const Podcasts = () => {
  const [search, setSearch] = useState("");

  // Redux hooks for dispatching actions and selecting state
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);

  // Filter podcasts based on search input
  let filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  // Subscribe to podcasts collection in Firebase and update Redux state
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcast(podcastsData));
      },
      (error) => {
        console.log("Error fetching podcasts:", error);
      }
    );
    // Clean up listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const factorial = (n) => {
    let ans = 1;
    if (n === 0) {
      return 1;
    }
    for (let i = 1; i <= n; i++) {
      ans *= i;
    }
    return ans;
  };

  console.log(factorial(0));

  return (
    <>
      <Header />
      <div className="w-[80%] block mx-auto mt-[2rem] min-h-screen">
        <h1 className="text-white text-center text-[2rem] font-bold mb-4">
          Discover podcasts
        </h1>
        <input
          type="text"
          value={search}
          placeholder="Search by Title"
          className={`bg-theme text-white border-2 border-solid-theme  rounded-md p-4 text-[1rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] 
          mb-4`}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        {filteredPodcasts.length > 0 ? (
          <div className="flex justify-center items-center flex-wrap gap-[2rem]">
            {filteredPodcasts.map((item) => (
              <PodcastCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
              />
            ))}
          </div>
        ) : (
          <p className="text-white text-center text-[1.6rem] font-medium py-32">
            {search !== "" ? "Podcast Not found" : "No Podcasts Yet"}
          </p>
        )}
      </div>
    </>
  );
};

export default Podcasts;
