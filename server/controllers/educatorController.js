import Course from "./../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import User from "./../models/User.js";
import { Purchase } from "../models/Purchase.js";

export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role === "educator") {
      return res
        .status(400)
        .json({ success: false, message: "Already an educator" });
    }

    user.role = "educator";
    await user.save();

    res.json({ success: true, message: "You are now an educator!" });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Add a new course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.user.id;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Thumbnail Not Attached" });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    // ✅ Upload image to Cloudinary (buffer-based upload)
    const imageUpload = await cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "course_thumbnails" },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ success: false, message: "Image upload failed" });
        }

        parsedCourseData.courseThumbnail = result.secure_url;
        const newCourse = await Course.create(parsedCourseData);
        res.json({
          success: true,
          message: "Course Added Successfully",
          course: newCourse,
        });
      }
    );

    imageUpload.end(imageFile.buffer); 
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all courses created by an educator
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.user.id;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get educator dashboard data (total earnings, enrolled students, course count)
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.user.id;
    const courses = await Course.find({ educator }).select(
      "_id courseTitle enrolledStudents"
    );
    const totalCourses = courses.length;
    const courseIds = courses.map((course) => course._id);

    // ✅ Calculate total earnings
    const purchases = await Payment.find({
      courseId: { $in: courseIds },
      status: "completed",
    });
    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // ✅ Collect enrolled student data efficiently
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        { _id: { $in: course.enrolledStudents } },
        "fullname profile.profilePhoto"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: { totalCourses, totalEarnings, enrolledStudentsData },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get enrolled students data with purchase details
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.user.id;
    const courses = await Course.find({ educator }).select("_id");
    const courseIds = courses.map((course) => course._id);

    // ✅ Populate user and course details
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "fullname profile.profilePhoto")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
