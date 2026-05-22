import { Router } from "express";
// import { isAuthorized } from "../middleware/isAuthorized";
// import {
//   createDiscount,
//   deleteDiscount,
//   getAllDiscountList,
//   validateDiscountController,
// } from "../controllers/discount.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { isAuthorized } from "../middleware/isAuthorized";
import {
  createDiscount,
  deleteDiscount,
  getDiscountList,
  getSingleDiscount,
  updateDiscount,
  validateDiscount,
} from "../controllers/discount.controller";
import { checkUser } from "../middleware/checkUser";

export const discountRoute = Router();

// discountRoute
//   .post("/", isAuthorized, createDiscount)
//   .get("/", getAllDiscountList)
//   .delete("/:id", isAuthorized, deleteDiscount)
//   .post("/validate", isAuthenticated, validateDiscountController)

discountRoute
  .get("/", checkUser, getDiscountList)
  .delete("/:id", deleteDiscount)
  .post("/", isAuthorized, createDiscount)
  .post("/validate", isAuthenticated, validateDiscount)
  .put("/:id", isAuthorized, updateDiscount)
  .get("/:id", isAuthorized, getSingleDiscount)
