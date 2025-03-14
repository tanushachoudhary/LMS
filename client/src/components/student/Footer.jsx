import React from "react";
import { assets } from "./../../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-left w-full mt-10">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row items-start px-6 md:px-36 justify-center gap-10 md:gap-20 py-10 border-b border-white/30">
        
        {/* Logo & Description */}
        <div className="flex flex-col md:items-start items-center w-full text-center md:text-left">
          <img src={assets.logo_dark} alt="logo" className="w-36" />
          <p className="mt-6 text-sm text-white/80 leading-relaxed">
            Unlock the power of learning with EDEMY. We offer a vast range of
            expertly crafted courses designed to elevate your skills and open
            new career opportunities. Learn at your own pace, anytime, anywhere—
            whether you're exploring a new field or advancing in your current profession.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-4">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 space-y-2 md:space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About us</a></li>
            <li><a href="#" className="hover:text-white">Contact us</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col items-center md:items-start w-full">
          <h2 className="font-semibold text-white mb-4 text-center md:text-left">
            Subscribe to our newsletter
          </h2>
          <p className="text-sm text-white/80 text-center md:text-left">
            Get the latest news, articles, and resources sent to your inbox weekly.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 pt-4 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-full md:w-64 h-10 rounded px-3 text-sm"
            />
            <button 
              className="bg-blue-600 w-full md:w-24 h-10 text-white rounded transition hover:bg-blue-700"
              onClick={() => navigate("/")}
            >
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Text */}
      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        Copyright 2024 © Tanusha. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
