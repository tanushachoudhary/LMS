import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [user, setUser] = useState(null); // Added user state

  // Function to get JWT token from localStorage
  const getToken = () => localStorage.getItem("token");
  // console.log("Stored Token:", localStorage.getItem("token"));

  // Function to decode JWT token and get user data
  // const getUserFromToken = () => {
  //   const token = getToken();
  //   if (token && token.split(".").length === 3) {
  //     // JWT has 3 parts
  //     try {
  //       return jwtDecode(token);
  //     } catch (error) {
  //       console.error("Invalid token", error);
  //       return null;
  //     }
  //   }
  //   return null;
  // };

  // Fetch all courses
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/all`);
      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  // Fetch user data
  const UserData = async () => {
    const token = getToken();
    if (!token) {
      console.log("No token found, user is not logged in.");
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (data.success && data.user) {
        // console.log("Fetched User Data:", data.user);
        setUser(data.user);
        setIsEducator(data.user.role === "educator");
      } else {
        console.log("User data not received:", data);
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    }
  };

  // Fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    try {
      const token = getToken();
      const { data } = await axios.get(
        `${backendUrl}/api/user/enrolled-courses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  // Function to calculate average course rating
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    return Math.floor(
      course.courseRatings.reduce((sum, r) => sum + r.rating, 0) /
        course.courseRatings.length
    );
  };

  // Function to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = chapter.chapterContent.reduce(
      (sum, lecture) => sum + lecture.lectureDuration,
      0
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate total course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) => {
      time += chapter.chapterContent.reduce(
        (sum, lecture) => sum + lecture.lectureDuration,
        0
      );
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate number of lectures in a course
  const calculateNoOfLectures = (course) => {
    return course.courseContent.reduce(
      (count, chapter) => count + chapter.chapterContent.length,
      0
    );
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (getToken()) {
      UserData();
      fetchUserEnrolledCourses();
    }
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    enrolledCourses,
    fetchUserEnrolledCourses,
    backendUrl,
    user,
    setUser,
    UserData,
    getToken,
    fetchAllCourses,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
