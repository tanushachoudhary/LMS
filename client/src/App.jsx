import { Route, Routes, useLocation, useMatch } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import MyEnrollments from "./pages/student/MyEnrollments";
import CourseDetails from "./pages/student/CourseDetails";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AppContext } from "./context/AppContext";
import EduNavbar from "./components/educator/EduNavbar";
import Navbar from "./components/student/Navbar";
import ViewProfile from "./pages/student/ViewProfile";
import BuyCourse from "./pages/student/BuyCourse";

const App = () => {
  const { user, isEducator, setUser, setIsEducator, getToken } =
    useContext(AppContext);
  // const location = useLocation();
  const token = getToken();
  const isEducatorRoute = useMatch("/educator/*");
  // ✅ Fetch user data only once when token changes
  useEffect(() => {
    if (!token) return; // Prevent unnecessary runs if token is null

    try {
      const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT safely
      if (user?.email !== userData?.email) {
        setUser(userData);
        setIsEducator(userData.role === "educator");
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }, [token]); // ✅ Only runs when `token` changes

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />

      {/* ✅ Show correct Navbar based on user role */}
      {/* {!isEducator ? <Navbar /> : <Navbar />} */}
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/buy-course/:id" element={<BuyCourse />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* ✅ Educator Routes */}
        <Route path="/educator" element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
