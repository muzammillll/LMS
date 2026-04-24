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
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-3xl font-semibold text-center">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry Experts</span>
        </h1>

        {/* wrapper for courses card */}
        <div className="flex flex-wrap mb-10 gap-14">
          {coursesData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
