import express from "express";
import {
  addCourse,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
  updateRoleToEducator, 
} from "../controllers/educatorController.js";
import { protectUser } from "../middlewares/authMiddleware.js"; // ✅ Fix typo here
import { singleUpload } from "../configs/multer.js";

const educatorRouter = express.Router();

educatorRouter.get("/update-role", protectUser, updateRoleToEducator);

// Add course
educatorRouter.post(
  "/add-course",
  singleUpload,
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    next();
  },
  protectUser,
  addCourse
);

// Get courses
educatorRouter.get("/courses", protectUser, getEducatorCourses);

// Educator dashboard data
educatorRouter.get("/dashboard", protectUser, educatorDashboardData);

// Enrolled students data
educatorRouter.get(
  "/enrolled-students",
  protectUser,
  getEnrolledStudentsData
);

export default educatorRouter;
