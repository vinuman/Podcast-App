import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App font-inter">
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
