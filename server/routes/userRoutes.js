import express from "express";
import {
  addUserRating,
  getUserCourseProgress,
  getUserData,
  login,
  logout,
  purchaseCourse,
  register,
  updateUserCourseProgress,
  userEnrolledCourses,
} from "../controllers/userController.js";
import { protectUser } from "../middlewares/authMiddleware.js";
// import { singleUpload } from "../configs/multer.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/data", protectUser, getUserData); 
userRouter.get("/enrolled-courses", protectUser, userEnrolledCourses);
userRouter.post("/purchase", purchaseCourse);
userRouter.post("/update-course-progress", updateUserCourseProgress);
userRouter.post("/get-course-progress", getUserCourseProgress);
userRouter.post("/add-rating", addUserRating);

export default userRouter;
