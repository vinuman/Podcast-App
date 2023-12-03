import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/microphone_8333936.png";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className=" px-16 py-16 flex justify-center items-center max-w-[1700px] mx-auto">
        {/*  div left */}
        <div className=" w-[100%] h-[100vh]  flex flex-col justify-start items-center pt-32">
          <div className="flex gap-2 items-center">
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-white text-[64px] underline"
            >
              PodSpark
            </motion.h1>
            <motion.img
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{
                type: "smooth",
                repeatType: "mirror",
                duration: 2,
                repeat: Infinity,
              }}
              className="w-[50px] h-[50px]"
              src={logo}
              alt="logo"
            ></motion.img>
          </div>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className=" text-[15px] w-[70%] pb-4 text-grey text-center"
          >
            PodSpark, where creativity ignites and voices come alive. Unleash
            your passion for storytelling on this dynamic podcast platform.
            Whether you're a seasoned creator or a budding podcaster, PodSpark
            provides the spark to amplify your voice and share your unique
            narrative with the world. Ignite engaging conversations, explore
            diverse topics, and let your ideas blaze a trail in the vast
            landscape of audio content. Join the PodSpark community and
            experience the power of sparking connections through the art of
            podcasting.
          </motion.p>
          <div className="flex gap-4">
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              onClick={() => navigate("/signup")}
              className="w-[240px] h-[52px]  rounded-lg flex items-center justify-center gap-2 cursor-pointer group bg-sky-800 mb-8 group transition-all duration-300"
            >
              <Button
                className=" text-white  font-bold group-hover:text-black"
                text="Sign Up/ Sign In"
              />
            </motion.div>
          </div>
        </div>
        {/* LEFT DIV ENDS */}
      </div>
    </>
  );
};

export default Home;
