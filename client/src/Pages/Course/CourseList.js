import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";
import { getAllCourses } from "../../Redux/courseSlice";

const Courses = () => {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <Layout>
      {/* courses container for displaying the cards */}
      <div className="min-h-[90vh] pt-12 px-4 md:px-20 flex flex-col gap-10 text-white">
  
  <h1 className="text-2xl font-semibold text-center md:text-3xl">
    Explore the courses made by{" "}
    <span className="font-bold text-yellow-500">Industry Experts</span>
  </h1>

  {!coursesData?.length && (
    <p className="text-center text-gray-400">
      No courses available right now.
    </p>
  )}

  <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {coursesData?.map((element) => (
      <CourseCard key={element._id} data={element} />
    ))}
  </div>

</div>
    </Layout>
  );
};

export default Courses;
