import React from "react";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { auth, db, storage, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { toast } from "react-toastify";
import FileInput from "./FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [displayImage, setDisplayImage] = useState("");
  const [displayImageError, setDisplayImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    //Form validation
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      password !== confirmPassword ||
      password.length < 6 ||
      displayImage === ""
    ) {
      if (fullName.trim() === "") {
        setNameError(true);
      }
      if (email.trim() === "") {
        setEmailError(true);
      }
      if (password.trim() === "" || password.length < 6) {
        setPasswordError(true);
      }
      if (confirmPassword.trim() === "") {
        setConfirmPasswordError(true);
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError(true);
      }
      if (displayImage === "") {
        setDisplayImageError(true);
      }
    }
    //Email validator
    if (validator.isEmail(email) === false) {
      setEmailError(true);
    }

    //After validation
    if (
      password === confirmPassword &&
      password.length >= 6 &&
      validator.isEmail(email) &&
      fullName.length
    ) {
      try {
        //Creating user account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const displayImageRef = ref(
          storage,
          `users/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        //save user details to firestore
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
          displayImage: displayImageUrl,
        });

        //save the user state

        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
            displayImage: displayImageUrl,
          })
        );

        toast.success("User created", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "#20062e",
        });
        setLoading(false);
        //navigate to the  profile page
        navigate("/profile");
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
    }
    setLoading(false);
  };

  //Google Auth
  const googleAuth = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      //save user details to firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        displayImage: user.photoURL,
      });

      //save the user state

      dispatch(
        setUser({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          displayImage: user.photoURL,
        })
      );

      toast.success("User created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "#20062e",
      });
      setLoading(false);
      //navigate to the  profile page
      navigate("/profile");
    } catch (error) {
      // Handle Errors here.
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "#20062e",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="sm:w-[30%] w-[90%] block mx-auto mt-[2rem]">
        <input
          type="text"
          value={fullName}
          required={true}
          placeholder="Full Name"
          className={`bg-theme text-white border-2 border-solid  rounded-md px-4 py-2 text-[0.8rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] ${
            nameError ? " border-red-700" : "border-[#8f8297] mb-4"
          }`}
          onChange={(e) => {
            setFullName(e.target.value);
            setNameError(false);
          }}
        ></input>
        {nameError && (
          <p className=" text-red-700 mb-2">This field cannot be empty</p>
        )}
        <input
          type="text"
          value={email}
          required={true}
          placeholder="Email"
          className={`bg-theme text-white border-2 border-solid  rounded-md px-4 py-2 text-[0.8rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] ${
            emailError ? " border-red-700" : "border-[#8f8297] mb-4"
          }`}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
        ></input>
        {emailError && (
          <p className=" text-red-700 mb-2">Please enter a valid email ID</p>
        )}
        <input
          type="password"
          value={password}
          required={true}
          placeholder="Password"
          className={`bg-theme text-white border-2 border-solid  rounded-md px-4 py-2 text-[0.8rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] ${
            passwordError ? " border-red-700" : "border-[#8f8297] mb-4"
          }`}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
        ></input>
        {passwordError && (
          <p className=" text-red-700 mb-2">
            Please enter a password with length more than 5
          </p>
        )}
        <input
          type="password"
          value={confirmPassword}
          required={true}
          placeholder="Confirm Password"
          className={`bg-theme text-white border-2 border-solid  rounded-md px-4 py-2 text-[0.8rem] w-[100%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] ${
            confirmPasswordError ? " border-red-700" : "border-[#8f8297] mb-8"
          }`}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError(false);
          }}
        ></input>
        {confirmPasswordError && (
          <p className=" text-red-700 mb-4">The passwords has to match</p>
        )}
        <FileInput
          text="Upload Display Image"
          accept={"image/*"}
          id="display-image-input"
          fileHandleFnc={setDisplayImage}
          className={`${
            displayImageError ? "border-red-600" : "border-[#8f8297] mb-8"
          }`}
          onClick={() => setDisplayImageError(false)}
        />
        {displayImageError && (
          <p className=" text-red-700 mt-4">Please upload a display picture</p>
        )}

        <Button
          className="text-center text-[1.2rem] font-bold border-2 border-solid border-white p-2 rounded-md text-white w-[100%] mx-auto hover:bg-white hover:text-theme transition-all duration-300 mt-8"
          onClick={handleSignUp}
          text={loading ? "Loading..." : "Sign Up using Email"}
          disabled={loading}
        />
        <p className=" text-white flex items-center justify-center pt-2 font-bold">
          Or
        </p>
        <Button
          className="text-center text-[1.2rem] font-bold border-2 border-solid border-white p-2 rounded-md text-white w-[100%] mx-auto hover:bg-white hover:text-theme transition-all duration-300 mt-2"
          onClick={googleAuth}
          text={loading ? "Loading..." : "Sign Up Using Google"}
          disabled={loading}
        />
      </div>
    </>
  );
};

export default SignUpForm;
