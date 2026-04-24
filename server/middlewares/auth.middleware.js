import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";
import asyncHandler from "./asyncHandler.middleware.js";
import User from "../models/user.model.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {

  console.log("COOKIES:", req.cookies);

  const { token } = req.cookies;

  console.log("TOKEN:", token);

  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    console.log("DECODED ID:", decoded.id);
    console.log("USER FROM DB:", user);

    if (!user) {
      return next(new AppError("User not found", 401));
    }

    console.log("USER FROM DB:", user.role);

    req.user = user; // ✅ FIXED

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);

    return next(new AppError("Unauthorized, please login to continue", 401));
  }
});
// Middleware to check if user is admin or not
export const authorizeRoles = (...roles) =>
  asyncHandler(async (req, _res, next) => {

    const userRole = req.user.role?.toString(); // 🔥 FIX

    console.log("USER ROLE:", userRole);
    console.log("ALLOWED:", roles);

    if (!roles.includes(userRole)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  });

  export const authorizeSubscribers = asyncHandler(async (req, _res, next) => {

    // ✅ Allow admin directly
    if (req.user.role === "ADMIN") {
      return next();
    }
  
    // ✅ Safe optional chaining
    if (req.user.subscription?.status !== "active") {
      return next(new AppError("Please subscribe to access this route.", 403));
    }
  
    next();
  });