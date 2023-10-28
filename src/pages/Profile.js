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

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  console.log(user.displayImage);

  if (!user) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <div className=" min-h-screen flex flex-col items-center pt-24">
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
      </div>
      <EditModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Profile;
