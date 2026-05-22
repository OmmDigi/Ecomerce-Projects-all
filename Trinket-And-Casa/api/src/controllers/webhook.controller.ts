import asyncErrorHandler from "../middleware/asyncErrorHandler";
import crypto from "crypto";
import { ErrorHandler } from "../utils/ErrorHandler";
import { doTransition } from "../utils/doTransition";
import { httpResponse } from "../utils/httpResponse";
import { processDelhiveryStatus } from "../services/webhook.service";
import { getAuthToken } from "../utils/getAuthToken";

export const verifyRazorpayPayment = asyncErrorHandler(async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret)
    throw new ErrorHandler(404, "Razorpay webhook secret is required");

  try {
    const receivedSignature = req.headers["x-razorpay-signature"] as string;

    if (!Buffer.isBuffer(req.body)) {
      throw new ErrorHandler(400, "Invalid body format");
    }

    const generatedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");

    if (generatedSignature === receivedSignature) {
      const body = JSON.parse(req.body.toString("utf8"));

      const payment = body.payload.payment.entity;
      const order_id = payment.order_id;
      const payment_id = payment.id;
      const created_at = payment.created_at;

      const date = new Date(created_at * 1000);
      const formattedDate = date
        .toISOString()
        .replace("T", " ")
        .replace("Z", "");

      await doTransition(async (client) => {
        if (body.event === "payment.captured") {
          const paymentInfo = await client.query(
            "UPDATE payments SET provider_payment_id = $1, status = 'PAID', created_at = $2::timestamp WHERE provider_order_id = $3 RETURNING order_id",
            [payment_id, formattedDate, order_id]
          );
          if (paymentInfo.rowCount == 0)
            throw new ErrorHandler(400, "Unable to update payment status");
          await client.query(
            "UPDATE orders SET payment_status = 'PAID' WHERE order_id = $1",
            [paymentInfo.rows[0].order_id]
          );
        } else if (body.event === "payment.failed") {
          const paymentInfo = await client.query(
            "UPDATE payments SET provider_payment_id = $1, status = 'FAILED', created_at = CURRENT_TIMESTAMP WHERE provider_order_id = $2 RETURNING order_id",
            [payment_id, order_id]
          );
          if (paymentInfo.rowCount == 0)
            throw new ErrorHandler(400, "Unable to update payment status");
          await client.query(
            "UPDATE orders SET payment_status = 'FAILED' WHERE order_id = $1",
            [paymentInfo.rows[0].order_id]
          );
        }
      });

      res.status(200).send("Razorpay Payment Verification Done");
    } else {
      console.log("❌ Invalid webhook signature");
      res.status(400).send("Invalid signature");
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).send("Error processing webhook");
  }
});

export const updateOrderStatusWebhook = asyncErrorHandler(async (req, res) => {
  // i need passwrod
  const token = getAuthToken(req);
  if(!token) throw new ErrorHandler(403, "Forbidden");

  const password = token;
  if (!password) throw new ErrorHandler(403, "Forbidden");

  if (password != process.env.DELHIVERY_WEBHOOK_SECRET)
    throw new ErrorHandler(403, "Forbidden");

  // offload the task to the background api
  processDelhiveryStatus(req.body);

  httpResponse(res, 200, "Thank you for your response");
});
