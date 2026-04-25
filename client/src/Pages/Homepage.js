import React from "react";
import Layout from "../Layout/Layout";
import homePageMainImage from "../Assets/Images/homePageMainImage.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Layout>
      <div className="flex flex-col-reverse items-center justify-center gap-10 px-4 pt-10 text-white md:flex-row md:px-16 min-h-[90vh]">
        {/* for platform details */}
        <div className="w-full max-w-xl space-y-6 text-center md:w-1/2 md:text-left">
        <h1 className="text-3xl font-semibold md:text-5xl">
            Find out best{" "}
            <span className="font-bold text-yellow-500">Online Courses</span>
          </h1>
          <p className="text-base text-gray-200 md:text-xl">
            We have a large library of courses taught by highly skilled and
            qualified faculities at a very affordable cost.
          </p>

          {/* for buttons */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <Link to={"/courses"}>
              <button className="px-5 py-3 text-lg font-semibold transition-all duration-300 ease-in-out bg-yellow-500 rounded-md cursor-pointer hover:bg-yellow-600">
                Explore Courses
              </button>
            </Link>
            <Link to={"/contact"}>
              <button className="px-5 py-3 text-lg font-semibold transition-all duration-300 ease-in-out border border-yellow-500 rounded-md cursor-pointer hover:border-yellow-600">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* right section for image */}
        <div className="flex items-center justify-center w-full md:w-1/2">
        <img
  src={homePageMainImage}
  alt="home page" 
  className="w-full max-w-md"
/>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
