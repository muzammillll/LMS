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
      <div className="min-h-[90vh] pt-12 px-4 md:px-20 flex flex-col items-center justify-center text-white">
        
        <div className="w-full max-w-6xl">
          
          <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2">
            
            {/* LEFT SIDE */}
            <div className="space-y-5">
              <img
                src={state?.thumbnail?.secure_url}
                alt="course thumbnail"
                className="object-cover w-full h-auto rounded-lg max-h-64"
              />
  
              <div className="space-y-4">
                <div className="flex flex-col gap-2 text-base md:text-xl md:flex-row md:justify-between">
                  <p className="font-semibold">
                    <span className="font-bold text-yellow-500">
                      Total Lectures :
                    </span>{" "}
                    {state.numberOfLectures}
                  </p>
                  <p className="font-semibold">
                    <span className="font-bold text-yellow-500">
                      Instructor :
                    </span>{" "}
                    {state.createdBy}
                  </p>
                </div>
  
                {role === "ADMIN" || data?.subscription?.status === "active" ? (
                  <button
                    onClick={() =>
                      navigate("/course/displaylectures", {
                        state: { ...state },
                      })
                    }
                    className="w-full px-5 py-3 text-base font-bold transition-all bg-yellow-600 rounded-md md:text-xl hover:bg-yellow-500"
                  >
                    Watch Lectures
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full px-5 py-3 text-base font-bold transition-all bg-yellow-600 rounded-md md:text-xl hover:bg-yellow-500"
                  >
                    Subscribe to Course
                  </button>
                )}
              </div>
            </div>
  
            {/* RIGHT SIDE */}
            <div className="space-y-3 text-base md:text-xl">
              <h1 className="mb-4 text-xl font-bold text-center text-yellow-500 md:text-3xl">
                {state.title}
              </h1>
  
              <p className="font-bold text-yellow-500">
                Course Description :
              </p>
  
              <p className="text-sm leading-relaxed md:text-base">
                {state.description}
              </p>
            </div>
  
          </div>
        </div>
      </div>
    </Layout>
  );

};

export default CourseDescription;
