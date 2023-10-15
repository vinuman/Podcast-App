import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  console.log("user", user);
  return (
    <>
      <Header />
      <div>
        <h1 className="text-white">{user.name}</h1>
        <h2 className="text-white">{user.email}</h2>
      </div>
    </>
  );
};

export default Profile;
