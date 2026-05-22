import { Router } from "express";
import { checkUser } from "../middleware/checkUser";
import {
  createOrder,
  doCancel,
  doReturn,
  downloadInvoice,
  getOrderList,
  getSingleOrderInfo,
  trackOrder,
  updateOrderStatus,
} from "../controllers/order.controller";
import { isAuthorized } from "../middleware/isAuthorized";
import { isAuthenticated } from "../middleware/isAuthenticated";

export const orderRoutes = Router();
orderRoutes
  .post("/place-order", checkUser, createOrder)
  .get("/", isAuthorized, getOrderList)
  .get("/track", trackOrder)
  .post("/return", isAuthenticated, doReturn)
  .post("/cancel", isAuthenticated, doCancel)
  .get("/invoice/:orderid", downloadInvoice)
  .patch("/", isAuthorized, updateOrderStatus)
  .get("/:orderid", isAuthorized, getSingleOrderInfo)
