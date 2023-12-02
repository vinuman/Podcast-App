import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className=" min-h-screen px-16 py-32 flex justify-center">
        {/*  div left */}
        <div className=" w-[50%]">
          <h1 className="text-white text-[64px]">PodSpark</h1>
          <p className=" text-[15px] w-[70%] pb-4 text-grey">
            PodSpark, where creativity ignites and voices come alive. Unleash
            your passion for storytelling on this dynamic podcast platform.
            Whether you're a seasoned creator or a budding podcaster, PodSpark
            provides the spark to amplify your voice and share your unique
            narrative with the world. Ignite engaging conversations, explore
            diverse topics, and let your ideas blaze a trail in the vast
            landscape of audio content. Join the PodSpark community and
            experience the power of sparking connections through the art of
            podcasting.
          </p>
          <div className="flex gap-4">
            <div
              onClick={() => navigate("/signup")}
              className="w-[240px] h-[52px]  rounded-lg flex items-center justify-center gap-2 cursor-pointer group bg-sky-800 mb-8 group transition-all duration-300"
            >
              <Button
                className=" text-white  font-bold group-hover:text-black"
                text="Sign Up/ Sign In"
              />
            </div>
          </div>
        </div>
        {/* LEFT DIV ENDS */}
      </div>
    </>
  );
};

export default Home;
