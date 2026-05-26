import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        {
          email,
        },
        { withCredentials: true },
      );
      if (result.data.success) {
        setError("");
        setStep(2);
        setLoading(false);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true },
      );
      if (result.data.success) {
        setError("");
        setStep(3);
        setLoading(false);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    if (newPassword != confirmPassword) {
      return null;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email,
          newPassword,
        },
        { withCredentials: true },
      );
      console.log(result);
      navigate("/signin");
      if (result.data.success) {
        setError("");
        setStep(3);
        setLoading(false);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full flex items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: "#fff9f6" }}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border-[1px]"
        style={{ border: `1px solid #ddd` }}
      >
        <div className="flex items-center gap-4 mb-4 cursor-pointer">
          <IoMdArrowBack
            size={30}
            onClick={() => navigate("/signin")}
            className="text-[#ff4d2d]"
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className={`block mb-1 text-gray-700 font-medium mb-1`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none
            border-[1px] border-gray-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              className={`w-full mt-4 font-semibold py-2 rounded-lg 
              transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleSendOtp}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Send Otp"}
            </button>
            {error && <p className="text-red-500 text-center">*{error}</p>}
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className={`block mb-1 text-gray-700 font-medium mb-1`}
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none
            border-[1px] border-gray-200"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              className={`w-full mt-4 font-semibold py-2 rounded-lg 
              transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleVerifyOtp}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Verify"}
            </button>
            {error && <p className="text-red-500 text-center">*{error}</p>}
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="newpassword"
                className={`block mb-1 text-gray-700 font-medium mb-1`}
              >
                New Password
              </label>
              <input
                type="password"
                id="newpassword"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none
            border-[1px] border-gray-200"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmnewpassword"
                className={`block mb-1 text-gray-700 font-medium mb-1`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none
            border-[1px] border-gray-200"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              className={`w-full mt-4 font-semibold py-2 rounded-lg 
              transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleResetPassword}
            >
              {loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
            {error && <p className="text-red-500 text-center">*{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
