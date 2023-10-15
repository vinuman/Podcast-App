import React from "react";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password === confirmPassword && password.length >= 0) {
      try {
        //Creating user account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        //save user details to firestore
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        //save the user state
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );

        //navigate to the  profile page
        navigate("/profile");
      } catch (err) {
        console.log(err);
      }
    } else {
      //throw error
    }
  };

  return (
    <>
      <div className="w-[80%] block mx-auto mt-[4rem]">
        <Input
          state={fullName}
          setState={setFullName}
          type="text"
          value={fullName}
          required={true}
          placeholder="Full Name"
          className=" bg-theme text-white border-2 border-solid border-[#8f8297] rounded-md p-4 text-[1rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] mb-4"
        />
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
        <Input
          state={confirmPassword}
          setState={setConfirmPassword}
          type="password"
          value={confirmPassword}
          required={true}
          placeholder="Confirm password"
          className=" bg-theme text-white border-2 border-solid border-[#8f8297] rounded-md p-4 text-[1rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] mb-4"
        />
        <Button
          className="text-center text-[1.2rem] font-bold border-2 border-solid border-white p-4 rounded-md text-white w-[100%] mx-auto hover:bg-white hover:text-theme transition-all duration-300"
          onClick={handleSignUp}
          text="Sign Up"
        />
      </div>
    </>
  );
};

export default SignUpForm;
