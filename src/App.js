import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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
    <div className="App font-inter bg-theme w-[100vw] h-[100vh]">
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
