import React from "react";
import Layout from "../Layout/Layout";
import homePageMainImage from "../Assets/Images/homePageMainImage.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Layout>
      <div className="text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="flex flex-col-reverse items-center justify-center max-w-6xl min-h-[90vh] md:min-h-screen gap-10 px-4 py-10 mx-auto md:flex-row md:justify-between md:px-16">
          
          {/* LEFT: text section */}
          <div className="w-full max-w-lg mt-4 space-y-5 text-center md:mt-0 md:w-1/2 md:text-left">
            
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Find out best{" "}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Online Courses
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
              We have a large library of courses taught by highly skilled and
              qualified faculties at a very affordable cost.
            </p>

            {/* buttons */}
            <div className="flex flex-col items-center w-full gap-4 md:flex-row md:justify-start">
              
              {/* Primary Button */}
              <Link to={"/courses"}>
                <button className="w-full sm:w-[80%] md:w-auto px-5 py-3 text-lg font-semibold bg-yellow-500 text-black rounded-md 
                hover:bg-yellow-600 hover:scale-105 active:scale-95 transition-all duration-300">
                  Explore Courses
                </button>
              </Link>

              {/* Secondary Button */}
              <Link to={"/contact"}>
                <button className="w-full sm:w-[80%] md:w-auto px-5 py-3 text-lg font-semibold border border-yellow-500 rounded-md 
                hover:border-yellow-600 hover:scale-105 active:scale-95 transition-all duration-300">
                  Contact Us
                </button>
              </Link>

            </div>
          </div>

          {/* RIGHT: image section */}
          <div className="relative flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
            
            {/* Glow Effect */}
            <div className="absolute z-0 bg-yellow-500 rounded-full w-72 h-72 opacity-20 blur-3xl"></div>

            {/* Image */}
            <img
              src={homePageMainImage}
              alt="home page"
              className="relative z-10 w-64 max-w-md transition-transform duration-500 sm:w-72 md:w-full drop-shadow-2xl hover:scale-105"
            />
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Homepage;