import React, { useEffect, useState } from "react";
import { assets } from "./../../assets/assets";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import { fadeIn } from "./motionFrameVarients";

// Background random images
import backgroundImg1 from "../../assets/random bg img/coding bg1.jpg";
import backgroundImg2 from "../../assets/random bg img/coding bg2.jpg";
import backgroundImg3 from "../../assets/random bg img/coding bg3.jpg";
import backgroundImg4 from "../../assets/random bg img/coding bg4.jpg";
import backgroundImg7 from "../../assets/random bg img/coding bg7.jpg";
import backgroundImg8 from "../../assets/random bg img/coding bg8.jpeg";
import backgroundImg10 from "../../assets/random bg img/coding bg10.jpg";
import backgroundImg11 from "../../assets/random bg img/coding bg11.jpg";

// Array of random images
const randomImages = [
  backgroundImg1,
  backgroundImg2,
  backgroundImg3,
  backgroundImg4,
  backgroundImg7,
  backgroundImg8,
  backgroundImg10,
  backgroundImg11,
];

const Hero = () => {
  const [backgroundImg, setBackgroundImg] = useState(randomImages[0]);

  useEffect(() => {
    const randomBg =
      randomImages[Math.floor(Math.random() * randomImages.length)];
    setBackgroundImg(randomBg);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-svh pb-16 z-[1] opacity-60">
        <img
          src={backgroundImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Heading */}
      <h1 className="relative z-10 md:text-home-heading-large text-home-heading-small font-bold text-gray-900 max-w-3xl mx-auto">
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="text-center text-4xl lg:text-5xl font-semibold mt-7"
        >
          Empower your future with the courses designed to{" "}
          <span className="text-blue-600">fit your choice.</span>
          <img
            src={assets.sketch}
            alt="sketch"
            className="md:block hidden absolute -bottom-6 right-0 text-blue-600 sketch-blue fill-current"
          />
        </motion.div>
      </h1>

      {/* Subtext */}
      <div className="relative z-10 md:block hidden max-w-2xl mx-auto">
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="mt-4 w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300"
        >
          We bring together world-class instructors to help you achieve your
          professional goals.
        </motion.div>
      </div>

      {/* Search Bar */}
      <SearchBar />
    </div>
  );
};

export default Hero;
