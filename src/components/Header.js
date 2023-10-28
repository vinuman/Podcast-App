import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isActive = location.pathname;

  return (
    <>
      <div className="flex justify-center items-center p-[1.5rem]">
        <div className="absolute sm:w-[800px] h-[150px] mx-auto bg-blue blur-[100px] top-[-90px]"></div>
        <div className="flex justify-center gap-[3rem] font-semibold text-[#8f8297] bg-theme">
          <Link
            className={`hover:text-white transition-all duration-300 z-10 ${
              isActive === "/" ? "underline text-white" : ""
            }`}
            to="/"
          >
            Signup
          </Link>
          <Link
            className={`hover:text-white transition-all duration-300 z-10 ${
              isActive === "/podcasts" ? "underline text-white" : ""
            }`}
            to="/podcasts"
          >
            Podcasts
          </Link>
          <Link
            className={`hover:text-white transition-all duration-300 z-10 ${
              isActive === "/create-a-podcast" ? "underline text-white" : ""
            }`}
            to="/create-a-podcast"
          >
            Start A Podcast
          </Link>
          <Link
            className={`hover:text-white transition-all duration-300 z-10 ${
              isActive === "/profile" ? "underline text-white" : ""
            }`}
            to="/profile"
          >
            Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
