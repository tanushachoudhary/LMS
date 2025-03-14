import express from "express";
import {
  capturePayment,
  createOrder,
} from "../controllers/paymentController.js";
import { paymentVerification } from "../controllers/courseController.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/order", createOrder);
router.post("/paymentCapture", capturePayment);
router.post("/paymentVerification", protectUser, paymentVerification);

export default router;
