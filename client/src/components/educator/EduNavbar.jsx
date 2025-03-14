import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const EduNavbar = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 lg:w-32" />
      </Link>
      <div className="flex items-center gap-5 text-gray-500 relative">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default EduNavbar;
