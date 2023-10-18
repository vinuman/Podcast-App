import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import PrivateRoutes from "./components/PrivateRoutes";
import CreatePodcast from "./pages/CreatePodcast";
import Podcasts from "./pages/Podcasts";
import PodcastDetails from "./pages/PodcastDetails";
import CreateEpisode from "./pages/CreateEpisode";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/podcasts");
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                  profilePic: userData.profilePic,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data", error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });
    return () => {
      authUnsubscribe();
    };
  }, []);

  return (
    <div className="App font-inter bg-theme w-[100vw]">
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-a-podcast" element={<CreatePodcast />}></Route>
          <Route path="podcasts" element={<Podcasts />}></Route>
          <Route path="podcast/:id" element={<PodcastDetails />}></Route>
          <Route
            path="/podcast/:id/create-episode"
            element={<CreateEpisode />}
          ></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
