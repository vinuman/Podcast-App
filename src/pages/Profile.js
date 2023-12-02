import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Button from "../components/Button";
import EditModal from "../components/EditModal";
import { auth, db, storage } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Icon } from "@iconify/react";
import { clearUser } from "../slices/userSlice";
import {
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [password, setPassword] = useState("");
  const [userPodcasts, setUserPodcasts] = useState([]);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPodcasts = async () => {
      try {
        // Create a query to fetch podcasts created by the current user
        const q = query(
          collection(db, "podcasts"),
          where("createdBy", "==", auth.currentUser.uid)
        );

        // Execute the query and get the documents
        const querySnapshot = await getDocs(q);

        // Extract the data from the documents and update the state
        const podcasts = [];
        querySnapshot.forEach((doc) => {
          podcasts.push({ id: doc.id, ...doc.data() });
        });
        setUserPodcasts(podcasts);
        if (userPodcasts.length) {
          console.log(userPodcasts);
        }
      } catch (error) {
        console.error("Error fetching user podcasts:", error.message);
      }
    };

    // Fetch user podcasts when the component mounts
    fetchUserPodcasts();
  }, []); // Empty dependency array ensures the effect runs only once on mount

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

  //Delete profile
  const handleDeleteProfile = () => {
    const user = auth.currentUser;
    if (user) {
      deleteUser(user)
        .then(() => {
          // Account deleted.
          toast.success("Your account has been successfully deleted.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "#20062e",
          });
          dispatch(clearUser);
          navigate("/");
        })
        .catch((error) => {
          // An error occurred.
          toast.error(error.message, {
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
    }
  };

  const handleReauthentication = () => {
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(user.email, password);

      reauthenticateWithCredential(user, credential)
        .then(() => {
          // Successfully re-authenticated, now you can delete the account
          handleDeleteProfile();
        })
        .catch((error) => {
          toast.error(error.message, {
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
    }
  };

  if (!user) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <div className="flex flex-col items-center pt-24 min-h-screen">
        <div className="w-[100px] h-[100px] rounded-lg group transition-all duration-300">
          <img
            className=" w-[100%] h-[100%] rounded-lg"
            src={user.displayImage}
          ></img>
        </div>

        <h1 className="text-white mt-4 text-[32px] font-bold">{user.name}</h1>
        <h2 className="text-white tracking-wide mb-12">{user.email}</h2>

        <h3 className="text-white mb-2 font-extrabold text-[1.6rem] tracking-wide">
          Your Podcasts
        </h3>
        {userPodcasts ? (
          userPodcasts.map((item, index) => (
            <div
              onClick={() => navigate(`/podcast/${item.id}`)}
              key={item.id}
              className="flex items-center gap-4 border w-[50%] px-8 py-4 mb-4 cursor-pointer rounded-lg"
            >
              <p className="text-white border rounded-full w-[20px] h-[20px] text-[0.8rem] flex items-center justify-center p-2">
                {index + 1}
              </p>
              <img
                className="w-[50px] h-[50px]"
                src={item.displayImage}
                alt="display image"
              ></img>
              <div>
                <p className="text-white text-[0.8rem] font-bold">
                  {item.title}
                </p>
                <p className="text-white text-[0.6rem]">
                  {item.description.slice(0, 200)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No Podcasts created yet</p>
        )}

        <div className="flex gap-4">
          <div
            onClick={openModal}
            className="w-[140px] h-[52px] rounded-lg flex items-center justify-center gap-2 cursor-pointer group bg-blue-500 border my-8 group transition-all duration-300"
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
            className="w-[140px] h-[52px]  rounded-lg flex items-center justify-center gap-2 cursor-pointer group bg-red-500 my-8 group transition-all duration-300"
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
                Enter your password to delete the account
              </label>
              <input
                className="h-[48px] p-4 outline-none rounded-lg"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              onClick={handleReauthentication}
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
