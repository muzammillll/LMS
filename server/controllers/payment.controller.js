import crypto from 'crypto';

import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';
import { razorpay } from '../server.js';
import Payment from '../models/Payment.model.js';

/**
 * @ACTIVATE_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/subscribe
 * @ACCESS Private (Logged in user only)
 */
export const buySubscription = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError('Unauthorized, please login'));
  }

  if (user.role === 'ADMIN') {
    return next(new AppError('Admin cannot purchase', 400));
  }

  // ✅ Order-based payment
  const order = await razorpay.orders.create({
    amount: 499 * 100,
    currency: "INR",
  });

  res.status(200).json({
    success: true,
    message: "Order created successfully",
    order_id: order.id,
  });
});

 

/**
 * @VERIFY_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/verify
 * @ACCESS Private (Logged in user only)
 */
export const verifySubscription = asyncHandler(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    return next(new AppError('Payment not verified', 400));
  }

  try {
    await Payment.create({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      user: req.user.id,
      amount: 499,
    });

    const user = await User.findById(req.user.id);

    user.subscription = { status: "active" };
    await user.save();

    const token = await user.generateJWTToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.log("DB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Database error during payment save",
    });
  }
});
/**
 * @CANCEL_SUBSCRIPTION
 * @ROUTE @POST {{URL}}/api/v1/payments/unsubscribe
 * @ACCESS Private (Logged in user only)
 */
export const cancelSubscription = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  // Finding the user
  const user = await User.findById(id);

  // Checking the user role
  if (user.role === 'ADMIN') {
    return next(
      new AppError('Admin does not need to cannot cancel subscription', 400)
    );
  }

  
 

user.subscription.status = "inactive";
user.subscription.id = null;
await user.save();

return res.status(200).json({
  success: true,
  message: "Subscription cancelled successfully",
});
});

/**
 * @GET_RAZORPAY_ID
 * @ROUTE @POST {{URL}}/api/v1/payments/razorpay-key
 * @ACCESS Public
 */
export const getRazorpayApiKey = asyncHandler(async (_req, res, _next) => {
  res.status(200).json({
    success: true,
    message: 'Razorpay API key',
    key: process.env.RAZORPAY_KEY_ID,
  });
});

/**
 * @GET_RAZORPAY_ID
 * @ROUTE @GET {{URL}}/api/v1/payments
 * @ACCESS Private (ADMIN only)
 */
export const allPayments = asyncHandler(async (req, res) => {

  // ✅ Get all payments from MongoDB
  const payments = await Payment.find();

  console.log("PAYMENTS FROM DB:", payments);

  // ✅ Calculate total revenue (₹499 per payment)
  const totalRevenue = payments.length * 499;

  // Optional: monthly breakdown
  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];

  const finalMonths = {
    January: 0, February: 0, March: 0, April: 0,
    May: 0, June: 0, July: 0, August: 0,
    September: 0, October: 0, November: 0, December: 0,
  };

  payments.forEach((payment) => {
    const date = new Date(payment.createdAt);
    const month = monthNames[date.getMonth()];
    finalMonths[month]++;
  });

  const monthlySalesRecord = Object.values(finalMonths);

  res.status(200).json({
    success: true,
    message: 'All payments',
    allPayments: payments,
    finalMonths,
    monthlySalesRecord,
    totalRevenue, // ✅ IMPORTANT
  });
});