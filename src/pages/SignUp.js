import React, { useState } from "react";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import logo from "../assets/microphone_8333936.png";

const SignUp = () => {
  const [flag, setFlag] = useState(false);
  return (
    <>
      <div className="pb-8 min-h-screen">
        <Header />
        <div className="flex justify-center items-center">
          <h1 className="text-white text-center text-[36px] underline">
            PodSpark
          </h1>
          <img className="w-[40px] h-[40px]" src={logo} alt="logo"></img>
        </div>

        {!flag ? (
          <h2 className=" font-semibold text-white text-center text-[28px] mt-[2rem]">
            Sign Up
          </h2>
        ) : (
          <h2 className=" font-semibold text-white text-center text-[28px] mt-[2rem]">
            Login
          </h2>
        )}
        {!flag ? <SignUpForm /> : <LoginForm />}
        {!flag ? (
          <p
            className="text-white mx-auto mt-8 cursor-pointer text-center text-[28px] opacity-80 hover:opacity-100 transition-all duration-300 underline pb-8"
            onClick={() => setFlag(true)}
          >
            Click here if you already have an Account !
          </p>
        ) : (
          <p
            className="text-white mx-auto mt-8 cursor-pointer text-center text-[28px] opacity-80 hover:opacity-100 transition-all duration-300 underline pb-8"
            onClick={() => setFlag(false)}
          >
            Click here if you DO NOT have an account !
          </p>
        )}
      </div>
    </>
  );
};

export default SignUp;
