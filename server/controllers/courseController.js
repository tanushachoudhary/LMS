import Course from "../models/Course.js";
import User from "../models/User.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import { Purchase } from "./../models/Purchase.js";

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// ✅ Get all courses
export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get course by ID
export const getCourseId = async (req, res) => {
  const { id } = req.params;

  try {
    const courseData = await Course.findById(id).populate({ path: "educator" });

    if (!courseData) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Remove lecture URLs if isPreviewFree is false
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });

    res.json({ success: true, courseData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get courses that a user is enrolled in
export const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("enrolledCourses");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, courses: user.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Checkout for course purchase
export const checkout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.params.id);

    if (!user || !course) {
      return res
        .status(404)
        .json({ success: false, message: "User or course not found" });
    }

    if (user.enrolledCourses.includes(course._id.toString())) {
      return res
        .status(400)
        .json({ success: false, message: "You already have this course" });
    }

    const options = {
      amount: Number(course.coursePrice * 100), // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({ success: true, order, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Verify Payment and Enroll User in Course
export const paymentVerification = async (req, res) => {
  console.log("Received Payment Verification Request:", req.body);

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }

  const userId = req.user._id; // ✅ Ensure user exists

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    console.log("Payment Verified ✅ Storing in DB...");

    // ✅ Store purchase in DB
    const purchase = await Purchase.create({
      userId, // ✅ Corrected
      courseId,
      amount: 560, // Get from order
      orderId: razorpay_order_id,
      status: "COMPLETED",
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    console.log("Purchase Saved:", purchase);

    res.status(200).json({
      message: "Payment Verified & Course Purchased!",
    });
  } catch (error) {
    console.error("Error saving purchase:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
