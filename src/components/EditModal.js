import React, { useState } from "react";
import FileInput from "./FileInput";
import Button from "../components/Button";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { setUser } from "../slices/userSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { toast } from "react-toastify";

const Modal = ({ isOpen, onClose, children }) => {
  const user = useSelector((state) => state.user.user);
  const [newName, setNewName] = useState(user.name);
  const [newImage, setNewImage] = useState("");
  console.log(user.displayImage);
  const modalStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#d7d7d7",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    height: "80%",
    width: "80%",
  };

  const dispatch = useDispatch();

  const handleEdit = async () => {
    try {
      //If image is  selected
      if (newImage !== "") {
        const displayImageRef = ref(
          storage,
          `users/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, newImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        await setDoc(doc(db, "users", user.uid), {
          name: newName,
          email: user.email,
          uid: user.uid,
          displayImage: displayImageUrl,
        });

        dispatch(
          setUser({
            name: newName,
            email: user.email,
            uid: user.uid,
            displayImage: displayImageUrl,
          })
        );
        //If image is not selected
      } else {
        await setDoc(doc(db, "users", user.uid), {
          name: newName,
          email: user.email,
          uid: user.uid,
          displayImage: user.displayImage,
        });

        dispatch(
          setUser({
            name: newName,
            email: user.email,
            uid: user.uid,
            displayImage: user.displayImage,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={modalStyle}>
      <Icon
        icon="zondicons:close"
        color="black"
        width="36"
        height="36"
        className=" absolute right-8 cursor-pointer"
        onClick={onClose}
      />
      <div className="flex flex-col">
        <FileInput
          className="my-4 w-[150px] h-[100px] flex justify-center items-center"
          text="Upload Image"
          accept={"image/*"}
          id="display-image-input"
          fileHandleFnc={setNewImage}
        />
        <input
          type="text"
          required={true}
          placeholder="Full Name"
          className={`bg-theme text-white border-2 border-solid  rounded-md p-4 text-[1rem] w-[20%] font-bold focus:outline-none focus:border-white placeholder:text-[#8f8297] 
            border-[#8f8297] mb-4"
          `}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        ></input>
        <Button
          onClick={() => {
            handleEdit();
            onClose();
          }}
          className="mt-4 text-white bg-theme  font-bold group-hover:text-black border w-[10%] h-[48px]"
          text="Submit"
        />
      </div>
      {children}
    </div>
  );
};

export default Modal;
