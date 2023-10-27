import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Button from "../components/Button";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import FileInput from "../components/FileInput";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setUser } from "../slices/userSlice";

const Profile = () => {
  const [displayImage, setDisplayImage] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDisplayUpload = async (file) => {
    try {
      const displayImageRef = ref(
        storage,
        `users/${auth.currentUser.uid}/${Date.now()}`
      );
      await uploadBytes(displayImageRef, file);
      const displayImageUrl = await getDownloadURL(displayImageRef);

      await setDoc(doc(db, "users", user.uid), {
        name: user.name,
        email: user.email,
        uid: user.uid,
        displayImage: displayImageUrl,
      });

      dispatch(
        setUser({
          name: user.name,
          email: user.email,
          uid: user.uid,
          displayImage: displayImageUrl,
        })
      );
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

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("logged out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "#20062e",
        });
        /*  navigate("/"); */
      })
      .catch((err) => {
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
      });
  };

  if (!user) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <div className=" min-h-screen flex flex-col items-center pt-24">
        {user.displayImage ? (
          <div className="w-[200px] h-[200px] rounded-lg relative right-0 bottom-1 group cursor-pointer transition-all duration-300">
            <p className=" absolute right-1 bottom-1 font-bold text-white group-hover:text-black group-hover:text-xl">
              Change image
            </p>
            <img
              className=" w-[100%] h-[100%] rounded-lg"
              src={user.displayImage}
            ></img>
          </div>
        ) : (
          /* <div className="w-[200px] h-[200px] border rounded-lg cursor-pointer group">
            <p className="opacity-80 text-white flex justify-center pt-[40%] group-hover:opacity-100">
              Upload an image
            </p>
          </div> */
          <FileInput
            className="my-4 w-[200px] h-[200px] flex justify-center items-center"
            text="Upload Image"
            accept={"image/*"}
            id="display-image-input"
            fileHandleFnc={handleDisplayUpload}
          />
        )}

        <h1 className="text-white mt-4 text-[32px] font-bold">{user.name}</h1>
        <h2 className="text-white tracking-wide">{user.email}</h2>

        <Button
          className="border text-white px-4 py-2 mt-4 hover:text-theme hover:bg-white transition-all duration-300 rounded-lg font-bold"
          text="Logout"
          onClick={handleLogout}
        />
      </div>
    </>
  );
};

export default Profile;
