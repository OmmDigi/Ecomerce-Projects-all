import { Router } from "express";
import {
  getRazorpayGatewayPage,
  paymentResultPage,
  updatePaymentStatus,
  verifyPayment,
} from "../controllers/payments.controller";
import { isAuthorized } from "../middleware/isAuthorized";

export const paymentRoute = Router();

paymentRoute
  .get("/razorpay-gateway/:token", getRazorpayGatewayPage)
  .post("/verify/:gatewayname", verifyPayment)
  .get("/payment-result", paymentResultPage)
  .patch("/:orderid", isAuthorized, updatePaymentStatus)
