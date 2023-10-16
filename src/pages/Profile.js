import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Button from "../components/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

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
    return <p>Loading...</p>;
  }
  return (
    <>
      <Header />
      <div>
        <h1 className="text-white">{user.name}</h1>
        <h2 className="text-white">{user.email}</h2>
        <Button text="Logout" onClick={handleLogout} />
      </div>
    </>
  );
};

export default Profile;
