import { Router } from "express";
import {
  getUserOrdersList,
  login,
  loginWithGoogle,
  sendOtp,
  signUp,
  verifyGoogleLogin,
  verifyOtp,
} from "../controllers/user.controller";
import { httpResponse } from "../utils/httpResponse";
import { isAuthenticated } from "../middleware/isAuthenticated";

export const userRoute = Router();

userRoute
  .get("/is-login", isAuthenticated, (_, res) => {
    httpResponse(res, 200, "Yes loggedin");
  })
  .post("/signup", signUp)
  .post("/login", login)
  .post("/verify-otp", verifyOtp)
  .post("/send-otp", sendOtp)

  .get("/login/google", loginWithGoogle)
  .get("/login/google/verify", verifyGoogleLogin)

  .get("/orders", isAuthenticated, getUserOrdersList)
