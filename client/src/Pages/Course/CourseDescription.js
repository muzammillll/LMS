import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";

const CourseDescription = () => {
  const location = useLocation();
const state = location?.state;
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);

  useEffect(() => {
    // scroll to the top on page render
    window.scrollTo(0, 0);
  }, []);

  if (!state) {
    return (
      <Layout>
        <div className="mt-20 text-xl text-center text-white">
          No course data found. Please go back.
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      {/* wrapper for course description */}
      <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
        {/* displaying the course details */}
        {/* <div className="relative grid grid-cols-2 gap-10 py-10"> */}
        <div className="relative grid grid-cols-1 gap-6 px-4 py-10 md:grid-cols-2 md:px-20">
          {/* creating the left side of description box */}
          <div className="space-y-5">
            <img
              className="w-full h-64"
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
            />

            {/* course details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xl">
                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">
                    Total Lectures :{" "}
                  </span>
                  {state.numberOfLectures}
                </p>
                <p className="font-semibold">
                  <span className="font-bold text-yellow-500">
                    Instructor :{" "}
                  </span>
                  {state.createdBy}
                </p>
              </div>

              {/* adding the subscribe button */}
              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                <button
                  onClick={() =>
                    navigate("/course/displaylectures", {
                      state: { ...state },
                    })
                  }
                  className="w-full px-5 py-3 text-xl font-bold transition-all duration-300 ease-in-out bg-yellow-600 rounded-md hover:bg-yellow-500"
                >
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full px-5 py-3 text-xl font-bold transition-all duration-300 ease-in-out bg-yellow-600 rounded-md hover:bg-yellow-500"
                >
                  Subscribe to Course
                </button>
              )}
            </div>
          </div>

          {/* creating the right section of description box */}
          <div className="space-y-2 text-xl">
            <h1 className="mb-4 text-3xl font-bold text-center text-yellow-500">
              {state.title}
            </h1>

            <p className="font-bold text-yellow-500">Course Description :</p>

            <p>{state.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDescription;
