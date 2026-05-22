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
} from "lucide-react";

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 🔹 Forgot Password state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  // 🔹 Handle OTP box input
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

  const handleForgotSubmit = () => {
    console.log("Email:", forgotEmail);
    console.log("OTP:", otp.join(""));
    alert("Password reset request submitted!");
    setShowForgot(false);
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
      className={`min-h-screen bg-gradient-to-br ${
        isLogin
          ? "from-[#e49191] via-[#f5caca] to-[#d69797]"
          : "from-[#d69797] via-[#f5caca] to-[#e49191]"
      } relative`}
    >
      {/* 🔹 Forgot Password Modal */}
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
              Enter your registered email and the 4-digit OTP sent to you.
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

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mb-6">
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

            {/* Submit Button */}
            <button
              onClick={handleForgotSubmit}
              className="w-full bg-[#d9667a] text-[#001e38] py-3 rounded-xl font-semibold hover:bg-[#b94b5e] transition-all shadow-lg hover:shadow-xl"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* 🌸 Rest of Your Main Auth Page UI */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Toggle Buttons */}
          <div className="bg-white rounded-t-2xl shadow-lg p-2 flex gap-2">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all shadow-3xl ${
                isLogin
                  ? "bg-[#d9667a] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
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

            <div className="space-y-5">
              {/* Password and forgot password link */}
              <div className="flex items-center justify-between">
                {isLogin && (
                  <a
                    href="#"
                    onClick={() => setShowForgot(true)}
                    className="text-sm text-[#001e38] hover:text-[#001e38] font-medium"
                  >
                    Forgot Password?
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
