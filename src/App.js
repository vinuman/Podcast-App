import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App font-inter bg-theme w-[100vw] h-[100vh]">
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
