import express from "express";
import {
  checkout,
  getAllCourse,
  getCourseId,
  paymentVerification,
} from "../controllers/courseController.js";
import { protectUser } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import crypto from "crypto";

const courseRouter = express.Router();

courseRouter.get("/all", getAllCourse);
courseRouter.get("/:id", getCourseId);
courseRouter.post("/checkout/:courseId", protectUser, checkout);
courseRouter.post("/verification/:courseId", protectUser, paymentVerification);
courseRouter.get("/api/user/courses", protectUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");
    res.json({ success: true, courses: user.enrolledCourses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
export default courseRouter;
