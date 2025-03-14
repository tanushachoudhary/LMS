import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User.js";
import Course from "../models/Course.js";
dotenv.config(); // Load environment variables

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // ✅ Use environment variables
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// ✅ Create an order
export const createOrder = async (req, res) => {
  // console.log("Received Order Request:", req.body); // ✅ Debugging Log

  const { amount, currency } = req.body;
  if (!amount || !currency) {
    return res
      .status(400)
      .json({ message: "Amount and currency are required" });
  }

  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    // console.log("Sending Request to Razorpay:", options); // ✅ Debugging Log
    const order = await razorpay.orders.create(options);
    // console.log("Order Created Successfully:", order); // ✅ Debugging Log

    res.status(201).json({
      success: true,
      order_id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    // Enhanced error handling
    console.error("Razorpay Order Creation Error:", error); // ✅ Full error log
    const message =
      error?.response?.data?.message || error.message || "Unknown error";
    res
      .status(500)
      .json({ message: `Failed to create order: ${message}`, error });
  }
};

// ✅ Verify Payment Webhook
export const capturePayment = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    return res.status(500).json({ message: "Webhook secret not set" });
  }

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("Payment captured:", req.body);

    // Extract the required fields from the webhook body
    const { payment_id, order_id, userId, courseId } =
      req.body.payload.payment.entity;

    try {
      // Find the user and course based on the payment details
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (!user || !course) {
        return res.status(404).json({ message: "User or Course not found" });
      }

      // Add the course to the user's enrolledCourses
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      return res.json({
        success: true,
        message: "Payment verified and course enrolled",
      });
    } catch (error) {
      console.error("Error during enrollment:", error);
      return res
        .status(500)
        .json({ message: "Error enrolling user in course", error });
    }
  } else {
    return res.status(400).json({ message: "Invalid signature" });
  }
};

// ✅ Refund Payment
export const refundPayment = async (req, res) => {
  const { paymentId, amount } = req.body;

  if (!paymentId || !amount) {
    return res
      .status(400)
      .json({ message: "Payment ID and amount are required" });
  }

  try {
    const response = await razorpay.payments.refund(paymentId, amount);
    res.json({ success: true, message: "Refund successful", refund: response });
  } catch (error) {
    res.status(400).json({ message: "Refund failed", error: error.message });
  }
};
