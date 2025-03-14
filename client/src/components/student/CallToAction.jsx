import React from "react";
import { assets } from "./../../assets/assets";
import { BrowserRouter } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-gray-500 text-xl sm:text-xl">
        Unlock limitless learning opportunities with expert-led courses,
        interactive lessons, and hands-on projects—accessible anytime, anywhere.
       <br /> Whether you're upskilling, exploring new fields, or preparing for your
        dream career, we’ve got you covered.
      </p>
      <div className="flex items-center font-medium mt-4 gap-6">
        <button className="px-10 py-3 rounded-md text-white bg-blue-600">
          Get started
        </button>
        <button className="flex items-center gap-2">
          Learn more <img src={assets.arrow_icon} alt="arrow_icon" />{" "}
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
