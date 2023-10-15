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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Login function
  const handleLogin = async () => {
    console.log("Login");
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userDate = userDoc.data();

      dispatch(
        setUser({
          name: userDate.name,
          email: user.email,
          uid: user.uid,
        })
      );
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-[80%] block mx-auto mt-[4rem]">
        <Input
          state={email}
          setState={setEmail}
          type="text"
          value={email}
          required={true}
          placeholder="Email"
          className=" bg-theme text-white border-2 border-solid border-[#8f8297] rounded-md p-4 text-[1rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] mb-4"
        />
        <Input
          state={password}
          setState={setPassword}
          type="password"
          value={password}
          required={true}
          placeholder="Password"
          className=" bg-theme text-white border-2 border-solid border-[#8f8297] rounded-md p-4 text-[1rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] mb-4"
        />

        <Button
          className="text-center text-[1.2rem] font-bold border-2 border-solid border-white p-4 rounded-md text-white w-[100%] mx-auto hover:bg-white hover:text-theme transition-all duration-300"
          onClick={handleLogin}
          text="Login"
        />
      </div>
    </>
  );
};

export default LoginForm;
