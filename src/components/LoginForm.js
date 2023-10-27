import React from "react";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { auth, db, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/userSlice";
import validator from "validator";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Login function
  const handleLogin = async () => {
    setLoading(true);
    //Validation
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      !validator.isEmail(email)
    ) {
      if (email.trim() === "" || validator.isEmail(email) === false) {
        setEmailError(true);
      }
      if (password.trim() === "") {
        setPasswordError(true);
      }
    }
    //After validation
    if (validator.isEmail(email) && password.trim() !== "") {
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
            displayImage: userData.displayImage,
          })
        );
        toast.success("login succcesfull", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "#20062e",
        });
        navigate("/profile");
        setLoading(false);
      } catch (err) {
        toast.error("invalid login credentials", {
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
      <div className="w-[80%] block mx-auto mt-[4rem]">
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          type="text"
          value={email}
          required={true}
          placeholder="Email"
          className={`bg-theme text-white border-2 border-solid  rounded-md p-4 text-[1rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] ${
            emailError ? " border-red-700" : "border-[#8f8297] mb-4"
          }`}
        ></input>
        {emailError && (
          <p className=" text-red-700 mb-2">
            Please enter your registered email ID
          </p>
        )}
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
          type="password"
          value={password}
          required={true}
          placeholder="Password"
          className={`bg-theme text-white border-2 border-solid  rounded-md p-4 text-[1rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] ${
            emailError ? " border-red-700" : "border-[#8f8297] mb-4"
          }`}
        ></input>
        {passwordError && (
          <p className=" text-red-700 mb-2">Please enter your password</p>
        )}

        <Button
          className="text-center text-[1.2rem] font-bold border-2 border-solid border-white p-4 rounded-md text-white w-[100%] mx-auto hover:bg-white hover:text-theme transition-all duration-300"
          onClick={handleLogin}
          text={loading ? "loading..." : "Login"}
          dispatch={loading}
        />
      </div>
    </>
  );
};

export default LoginForm;
