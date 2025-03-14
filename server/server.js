import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
// import { clerkWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
// import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoute.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import cookieParser from "cookie-parser"; // ✅ Import it correctly

const app = express();

// Connect to database before starting the server
await connectDB();
await connectCloudinary();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // ✅ Allow cookies, authentication tokens, etc.
  })
);
// app.use(clerkMiddleware());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ Handle cookies properly

// Routes
app.get("/", (req, res) => res.send("API Working!"));

// app.post("/clerk", express.json(), clerkWebhooks);

app.use("/api/educator", educatorRouter);

app.use("/api/course", courseRouter);

app.use("/api/user", userRouter);

app.use("/api/payment", paymentRoutes);

// app.post("/order", async (req, res) => {
//   console.log("Request Body:", req.body); // Debugging line

//   const razorpay = new Razorpay({
//     key_id: req.body.keyId,
//     key_secret: req.body.keySecret,
//   });

//   const options = {
//     amount: req.body.amount,
//     currency: req.body.currency,
//     receipt: "any_unique_id_for_every_order",
//     payment_capture: 1,
//   };

//   try {
//     const response = await razorpay.orders.create(options);
//     res.json({
//       order_id: response.id,
//       currency: response.currency,
//       amount: response.amount,
//     });
//   } catch (err) {
//     console.error("Error creating order:", err); // Debugging error
//     res.status(500).send("Not able to create order. Please try again!");
//   }
// });

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
