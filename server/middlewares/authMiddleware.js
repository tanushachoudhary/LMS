import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, token missing", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify token

    // Attach the user to the request object
    req.auth = { userId: decoded.userId }; // Make sure you set the `userId` here.

    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid token", success: false });
  }
};
