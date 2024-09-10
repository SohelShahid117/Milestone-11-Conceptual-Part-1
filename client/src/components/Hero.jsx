import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ image, text }) => {
  return (
    <div
      className="w-full bg-center bg-cover h-[38rem] rounded-2xl"
      style={{
        backgroundImage: `url(${image})`,
        // backgroundImage: `url(
        //   "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
        // )`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl my-10">
            {text}
            {/* Build your new <span className="text-blue-400">Saas</span> Project */}
          </h1>
          <Link
            to="/addJob"
            className="w-full px-5 py-2 mt-10 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          >
            Post Job & Hire Expert
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
