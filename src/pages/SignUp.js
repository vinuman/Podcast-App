import React, { useState } from "react";
import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

const SignUp = () => {
  const [flag, setFlag] = useState(false);
  return (
    <>
      <div>
        <Header />
        {!flag ? (
          <h1 className="text-[1.8rem] font-bold text-white text-center my-[2rem]">
            Sign Up
          </h1>
        ) : (
          <h1 className="text-[1.8rem] font-bold text-white text-center my-[2rem]">
            Login
          </h1>
        )}
        {!flag ? <SignUpForm /> : <LoginForm />}
        {!flag ? (
          <p
            className="text-white mx-auto mt-8 cursor-pointer text-center opacity-80 hover:opacity-100 transition-all duration-300"
            onClick={() => setFlag(true)}
          >
            Click here if you already have an Account. Login
          </p>
        ) : (
          <p
            className="text-white mx-auto mt-8 cursor-pointer text-center opacity-80 hover:opacity-100 transition-all duration-300"
            onClick={() => setFlag(false)}
          >
            Click here if you do not have an account. Sign up
          </p>
        )}
      </div>
    </>
  );
};

export default SignUp;
