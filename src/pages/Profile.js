import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Button from "../components/Button";
import EditModal from "../components/EditModal";
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Icon } from "@iconify/react";
import { clearUser } from "../slices/userSlice";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const handleDeleteProfile = () => {
    if (deleteConfirmation === "delete account") {
    }
  };

  console.log(user.displayImage);

  if (!user) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <div className="flex flex-col items-center pt-24 min-h-screen">
        <div className="w-[200px] h-[200px] rounded-lg group transition-all duration-300">
          <img
            className=" w-[100%] h-[100%] rounded-lg"
            src={user.displayImage}
          ></img>
        </div>

        <h1 className="text-white mt-4 text-[32px] font-bold">{user.name}</h1>
        <h2 className="text-white tracking-wide pb-4">{user.email}</h2>

        <div className="flex gap-4">
          <div
            onClick={openModal}
            className="w-[140px] h-[52px] rounded-lg flex items-center justify-center gap-2 cursor-pointer group bg-blue-500 border mb-8 group transition-all duration-300"
          >
            <Button
              className=" text-white  font-bold group-hover:text-gray-500"
              text="Edit Profile"
            />
            <Icon
              icon="mdi:edit-outline"
              color="white"
              width="20"
              height="20"
            />
          </div>
          <div
            onClick={handleLogout}
            className="w-[140px] h-[52px]  rounded-lg flex items-center justify-center gap-2 cursor-pointer group bg-red-500 mb-8 group transition-all duration-300"
          >
            <Button
              className=" text-white  font-bold group-hover:text-black"
              text="Logout"
            />
            <Icon
              icon="solar:logout-line-duotone"
              color="white"
              width="24"
              height="24"
            />
          </div>
        </div>
        {/*  DELETE ACCOUNT DIV */}
        <div className="mt-16 border-t-2 border-red-800 pt-4 sm:w-[60%] w-[100%] flex justify-center items-center gap-4">
          {deleteProfile && (
            <div className="border flex flex-col p-4 rounded-lg">
              <label className="text-white pb-4">
                Type in "delete account" and press confirm
              </label>
              <input
                className="h-[48px] p-4 outline-none rounded-lg"
                type="text"
                placeholder="delete account"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
              ></input>
            </div>
          )}
          {!deleteProfile && (
            <div
              onClick={() => setDeleteProfile(true)}
              className="w-[140px] h-[52px]  rounded-lg flex items-center justify-center gap-2 cursor-pointer group bg-red-500 mb-8 group transition-all duration-300"
            >
              <Button
                className=" text-white  font-bold group-hover:text-black"
                text="Delete Account"
              />
            </div>
          )}
          {deleteProfile && (
            <div
              onClick={handleDeleteProfile}
              className="w-[140px] h-[52px]  rounded-lg flex items-center justify-center gap-2 cursor-pointer group bg-red-500 mb-8 group transition-all duration-300"
            >
              <Button
                className=" text-white  font-bold group-hover:text-black"
                text="Confirm"
              />
            </div>
          )}
          {deleteProfile && (
            <div
              onClick={() => setDeleteProfile(false)}
              className="w-[140px] h-[52px]  rounded-lg flex items-center justify-center gap-2 cursor-pointer group bg-emerald-600 mb-8 group transition-all duration-300"
            >
              <Button
                className=" text-white  font-bold group-hover:text-black"
                text="Cancel"
              />
            </div>
          )}
        </div>
        {/*  DELETE ACCOUNT DIV ENDS */}
      </div>
      <EditModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Profile;
