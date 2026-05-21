import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgcolor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgcolor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg p-8 w-full max-w-md border-[1px]`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className={`text-gray-600 mb-2`} style={{ color: primaryColor }}>
          Vingo
        </h1>
        <p className={`text-gray-600 mb-8`}>
          create your account to get delicious food delivery
        </p>

        {/* Full Name */}

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className={`block mb-1 text-gray-700 font-medium mb-1`}
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
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
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            placeholder="Enter your email"
          />
        </div>

        {/* mobile */}

        <div className="mb-4">
          <label
            htmlFor="mobile"
            className={`block mb-1 text-gray-700 font-medium mb-1`}
          >
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            placeholder="Enter your mobile number"
          />
        </div>

        {/* password */}

        <div className="mb-4">
          <label
            htmlFor="password"
            className={`block mb-1 text-gray-700 font-medium mb-1`}
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              style={{ border: `1px solid ${borderColor}` }}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-[14px] text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* role */}

        <div className="mb-4">
          <label
            htmlFor="role"
            className={`block mb-1 text-gray-700 font-medium mb-1`}
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                type="button"
                className="flex-1 border rounded-lg px-3 py-2 
                text-center font-medium transition-colors duration-200"
                style={{
                  backgroundColor: role === r ? primaryColor : "transparent",
                  color: role === r ? "#fff" : "#333",
                  border: `1px solid ${borderColor}`,
                }}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
