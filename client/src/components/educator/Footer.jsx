import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-between w-full px-6 py-4 border-t md:px-8 md:h-20">
      {/* Left Section: Logo & Copyright */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
        <img className="hidden md:block w-20" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="text-center text-xs md:text-sm text-gray-500">
          Copyright 2024 © Tanusha. All Rights Reserved.
        </p>
      </div>

      {/* Right Section: Social Icons */}
      <div className="flex items-center gap-3 mt-4 md:mt-0 justify-center w-full md:w-auto">
        <a href="#">
          <img className="w-5 md:w-6" src={assets.facebook_icon} alt="facebook_icon" />
        </a>
        <a href="#">
          <img className="w-5 md:w-6" src={assets.twitter_icon} alt="twitter_icon" />
        </a>
        <a href="#">
          <img className="w-5 md:w-6" src={assets.instagram_icon} alt="instagram_icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
