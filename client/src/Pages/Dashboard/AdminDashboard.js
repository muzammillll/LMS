import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getAllCourses } from "../../Redux/courseSlice";
import { getStatsData } from "../../Redux/statSlice";
import { getPaymentRecord } from "../../Redux/razorpaySlice";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedUsersCount } = useSelector(
    (state) => state.stat
  );
  const { allPayments, finalMonths, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedUsersCount],
        backgroundColor: ["yellow", "green"],
        borderColor: ["yellow", "green"],
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: [
      "January",
      "Febraury",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  // getting the courses data from redux toolkit store
  const myCourses = useSelector((state) => state.course.coursesData);

  // function to handle the course delete
  const handleCourseDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));

      // fetching the new updated data for the course
      if (res.payload.success) {
        await dispatch(getAllCourses());
      }
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <Layout>
      <div className="min-h-[90vh] pt-5 flex flex-col gap-10 text-white">
        <h1 className="text-3xl font-semibold text-center text-yellow-500">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-5 mx-10">
          {/* User Stats Section */}
          <div className="flex flex-col items-center gap-10 p-5 rounded-md shadow-lg">
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>
            <div className="grid w-full grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 border border-gray-700 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-semibold">Registered Users</p>
                  <h3 className="text-3xl font-bold">{allUsersCount}</h3>
                </div>
                <FaUsers className="text-4xl text-yellow-500" />
              </div>
              <div className="flex items-center justify-between p-5 border border-gray-700 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-semibold">Subscribed Users</p>
                  <h3 className="text-3xl font-bold">{subscribedUsersCount}</h3>
                </div>
                <FaUsers className="text-4xl text-green-500" />
              </div>
            </div>
          </div>

          {/* Sales Stats Section */}
          <div className="flex flex-col items-center gap-10 p-5 rounded-md shadow-lg">
            <div className="relative w-full h-80">
              <Bar data={salesData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="grid w-full grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 border border-gray-700 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-semibold">Subscriptions</p>
                  <h3 className="text-3xl font-bold">{allPayments?.length || 0}</h3>
                </div>
                <FcSalesPerformance className="text-4xl" />
              </div>
              <div className="flex items-center justify-between p-5 border border-gray-700 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="text-sm font-semibold">Total Revenue</p>
                  <h3 className="text-3xl font-bold">
                    ₹{(allPayments?.length || 0) * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-4xl text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table Section */}
        <div className="mx-[10%] flex flex-col items-center gap-10 mb-10">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-semibold">Courses Overview</h1>
            <button
              onClick={() => navigate("/course/create", { state: { initialCourseData: { newCourse: true } } })}
              className="px-4 py-2 font-semibold transition-all bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Create New Course
            </button>
          </div>

          <table className="table w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th>S No.</th>
                <th>Title</th>
                <th>Category</th>
                <th>Instructor</th>
                <th>Lectures</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCourses?.map((course, index) => (
                <tr key={course?._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{course?.title}</td>
                  <td>{course?.category}</td>
                  <td>{course?.createdBy}</td>
                  <td>{course?.numberOfLectures}</td>
                  <td className="flex justify-center gap-2">
                    <button onClick={() => navigate("/course/create", { state: { initialCourseData: { newCourse: false, ...course } } })} className="text-xl text-yellow-500"><MdOutlineModeEdit /></button>
                    <button onClick={() => handleCourseDelete(course._id)} className="text-xl text-red-500"><BsTrash /></button>
                    <button onClick={() => navigate("/course/displaylectures", { state: { ...course } })} className="text-xl text-green-500"><BsCollectionPlayFill /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
