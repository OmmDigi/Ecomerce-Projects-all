"use client";
import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  X,
  LogIn,
} from "lucide-react";

import { postFetcher } from "@/lib/fetcher";
import { message } from "antd";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { useIsLoggedIn, useUserStore } from "@/store/useUserStore";

interface FormData {
  name?: string;
  email: string;
  phone_no?: string;
  password: string;
  confirmPassword?: string;
}

const AuthPages = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const isLoggedIn = useIsLoggedIn();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOtpPopup, setShowOtpPopup] = useState<boolean>(false);
  const [timer, setTimer] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loginVerify, setLoginVerify] = useState(false);

  const { trigger: create } = useSWRMutation(
    "api/v1/users/login",
    (url, { arg }) => postFetcher(url, arg)
  );
  const { trigger: create2 } = useSWRMutation(
    "api/v1/users/signup",
    (url, { arg }) => postFetcher(url, arg)
  );
  const { trigger: verifyOtp } = useSWRMutation(
    "api/v1/users/verify-otp",
    (url, { arg }) => postFetcher(url, arg)
  );
  const { trigger: sendOtp } = useSWRMutation(
    "api/v1/users/send-otp",
    (url, { arg }) => postFetcher(url, arg)
  );

  // 🔹 Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // 🔹 Handle email submit → show OTP modal
  const handleForgotSubmit = async () => {
    if (!forgotEmail) return alert("Please enter your email");

    setShowOtpPopup(true);
    const email = { email: forgotEmail };
    try {
      const response = await sendOtp(email as any);

      messageApi.open({
        type: "success",
        content: response.message,
      });
      const userData = {
        token: response.data.refreshToken,
      };
      setUser(userData);
      localStorage.setItem("token", response.data.refreshToken);

      setShowForgot(false);
      setTimer(60);
      setIsResendVisible(false);

      router.push("/");
    } catch (err: any) {
      if (err.response.data.statusCode == 301) {
        messageApi.open({
          type: "success",
          content: err.response.data.message,
        });
        setShowOtpPopup(true);
      } else {
        messageApi.open({
          type: "error",
          content: err.response.data.message,
        });
      }
    }
  };

  // 🔹 Countdown timer for OTP validity
  useEffect(() => {
    if (!showOtpPopup) return;
    if (timer <= 0) {
      setIsResendVisible(true);
      return;
    }
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer, showOtpPopup]);

  // 🔹 Resend OTP handler
  const handleResendOtp = async () => {
    console.log("Resending OTP to:", forgotEmail);

    setOtp(["", "", "", ""]);
    setTimer(60);
    setIsResendVisible(false);
    const email = { email: forgotEmail };
    try {
      const response = await sendOtp(email as any);

      messageApi.open({
        type: "success",
        content: response.message,
      });
      const userData = {
        token: response.data.refreshToken,
      };
      setUser(userData);
      localStorage.setItem("token", response.data.refreshToken);

      setShowForgot(false);
      setShowOtpPopup(true);
      setTimer(60);
      setIsResendVisible(false);

      router.push("/");
    } catch (err: any) {
      if (err.response.data.statusCode == 301) {
        messageApi.open({
          type: "success",
          content: err.response.data.message,
        });
        setShowOtpPopup(true);
      } else {
        messageApi.open({
          type: "error",
          content: err.response.data.message,
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await create(formData as any);

        messageApi.open({
          type: "success",
          content: response.message,
        });
        const userData = {
          token: response.data.refreshToken,
        };
        setUser(userData);
        localStorage.setItem("token", response.data.refreshToken);
        router.push("/");
      } catch (err: any) {
        if (err.response.data.statusCode == 301) {
          messageApi.open({
            type: "success",
            content: err.response.data.message,
          });
          setShowOtpPopup(true);
          setLoginVerify(false);
        } else {
          messageApi.open({
            type: "error",
            content: err.response.data.message,
          });
        }
      }
    } else if (!isLogin) {
      try {
        const response = await create2(formData as any);
        messageApi.open({
          type: "success",
          content: response.message,
        });

        setShowOtpPopup(true);
      } catch (err: any) {
        messageApi.open({
          type: "error",
          content: err.response?.data?.message
            ? err.response?.data?.message
            : "Try Again",
        });
      }
    }
  };

  // 🔹 Submit new password
  const handlePasswordReset = async () => {
    if (otp.join("").length < 4) return alert("Please enter full OTP");
    const varifyOtp = {
      email: formData.email || forgotEmail,
      otp: otp.join(""),
      ...(isLogin && loginVerify ? { password: password } : {}),
    };
    try {
      const response = await verifyOtp(varifyOtp as any);
      messageApi.open({
        type: "success",
        content: response.message,
      });
      setIsLogin(true);
      setShowOtpPopup(false);
      setShowForgot(false);
      setFormData({
        email: "",
        password: "",
        // confirmPassword: "",
        // name: "",
        // phone_no: "",
      });
    } catch (err: any) {
      messageApi.open({
        type: "error",
        content: err?.response?.data?.message
          ? err?.response?.data?.message
          : " Try Again",
      });
    }
    // if ((isLogin && !password) || (isLogin && !confirmPassword)) {
    //   return alert("Please fill all password fields");
    // }
    // if (isLogin && password !== confirmPassword)
    //   return alert("Passwords do not match!");

    console.log("Reset Password Submitted:", {
      email: forgotEmail,
      otp: otp.join(""),
      password: password,
    });

    // alert("Login successful!");
    // setShowOtpPopup(false);
  };
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#4d9add]  ${
        isLogin
          ? "from-[#e49191] via-[#f5caca] to-[#d69797]"
          : "from-[#d69797] via-[#f5caca] to-[#e49191]"
      } `}
    >
      {contextHolder}
      {/* forgot section  */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[400px] relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowForgot(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Forgot Password
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Enter your registered email to receive OTP.
            </p>

            {/* Email Input */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#001e38] focus:outline-none transition"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <button
              onClick={handleForgotSubmit}
              className="w-full bg-[#d9667a] text-white py-3 rounded-xl font-semibold hover:bg-[#b94b5e] transition-all shadow-lg hover:shadow-xl"
            >
              Send OTP
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Step 2: OTP & Password Reset Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[420px] relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowOtpPopup(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Verify OTP
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Enter the 4-digit OTP sent to <b>{forgotEmail}</b>
            </p>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mb-4">
              {otp.map((value, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-12 h-12 text-center border-2 border-gray-300 rounded-xl focus:border-[#001e38] text-lg font-semibold focus:outline-none"
                />
              ))}
            </div>

            {/* Timer + Resend */}
            <div className="text-center text-sm mb-6">
              {isResendVisible ? (
                <button
                  onClick={handleResendOtp}
                  className="text-[#d9667a] font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-gray-600">
                  OTP valid for <span className="font-semibold">{timer}s</span>
                </p>
              )}
            </div>

            {/* Password Fields */}
            {isLogin && loginVerify && (
              <>
                <div className="mb-4 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#001e38] focus:outline-none transition"
                  />
                </div>
                <div className="mb-6 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#001e38] focus:outline-none transition"
                  />
                </div>
              </>
            )}

            <button
              onClick={handlePasswordReset}
              className="w-full bg-[#d9667a] text-white py-3 rounded-xl font-semibold hover:bg-[#b94b5e] transition-all shadow-lg hover:shadow-xl"
            >
              {isLogin ? "Submit" : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* Orbiting Sparkles */}

      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="hidden md:flex absolute top-40 left-20 animate-pulse"
          style={{
            transform: `rotate(${
              i * 72 + mousePosition.x
            }deg) translateY(-50px)`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          <Sparkles className="w-8 h-8 text-[#001e38]" />
        </div>
      ))}

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Toggle Buttons */}
          <div className="bg-white rounded-t-2xl shadow-lg p-2 flex gap-2">
            <button
              onClick={() => {
                setIsLogin(true), setFormData({ email: "", password: "" });
              }}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all shadow-3xl ${
                isLogin
                  ? "bg-[#d9667a] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false), setFormData({ email: "", password: "" });
              }}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all shadow-3xl ${
                !isLogin
                  ? "bg-[#d9667a] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-b-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isLogin ? "Welcome Back!" : "Create Account"}
              </h2>
              <p className="text-gray-600">
                {isLogin
                  ? "Login to access your account"
                  : "Sign up to get started with us"}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Field (Signup Only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 border-2 text-gray-700 border-gray-200 rounded-xl focus:border-[#001e38] focus:outline-none transition"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required={true}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border-2 text-gray-700 border-gray-200 rounded-xl focus:border-[#001e38] focus:outline-none transition"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone Field (Signup Only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 border-2 text-gray-700 border-gray-200 rounded-xl focus:border-[#001e38] focus:outline-none transition"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required={true}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-12 py-3 border-2 text-gray-700 border-gray-200 rounded-xl focus:border-[#001e38] focus:outline-none transition"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Signup Only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      // onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 border-2 text-gray-700 border-gray-200 rounded-xl focus:border-[#001e38] focus:outline-none transition"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password (Login Only) */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#001e38] rounded focus:ring-[#001e38]"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <a
                    href="#"
                    onClick={() => {
                      setShowForgot(true),
                        setLoginVerify(true),
                        setLoginVerify(true);
                    }}
                    className="text-sm text-[#001e38] hover:text-[#001e38] font-medium"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Terms (Signup Only) */}
              {!isLogin && (
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-1 text-[#001e38] rounded focus:ring-[#001e38]"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-[#001e38] hover:text-[#001e38] font-medium"
                      >
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-[#001e38] hover:text-[#001e38] font-medium"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button className="w-full bg-[#d9667a]  text-white py-3 rounded-xl font-semibold hover:bg-[#b94b5e] transition-all shadow-lg hover:shadow-xl transform ">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* Divider */}
            {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div> */}

            {/* Social Login */}
            {/* <div className="grid grid-cols-1 ">
              <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Google
                </span>
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="hidden md:flex absolute right-20 top-140 animate-pulse"
          style={{
            transform: `rotate(${
              i * 72 + mousePosition.y
            }deg) translateY(-150px)`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          <Sparkles className="w-8 h-8 text-[#001e38]" />
        </div>
      ))}

      {/* Footer */}
    </div>
  );
};

export default AuthPages;
