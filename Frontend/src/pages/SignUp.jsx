import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const SignUp = () => {
  const primaryColor = "#ff4d2d";

  const bgcolor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          mobile,
          password,
          role,
        },
        { withCredentials: true },
      );
      console.log(res);
      dispatch(setUserData(res.data));
      setError("");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data?.message || err.message || "Something went wrong",
      );
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!mobile) {
      return setError("mobile no is required");
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true },
      );
      console.log(data);
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data?.message || error.message || "Google auth failed",
      );
    }
  };

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
          Create your account to get delicious food delivery
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
                text-center font-medium transition-colors duration-200 cursor-pointer"
                style={{
                  backgroundColor: role === r ? primaryColor : "transparent",
                  border: `1px solid ${borderColor}`,
                  color: role === r ? "#fff" : primaryColor,
                }}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            className={`w-full mt-4 font-semibold py-2 rounded-lg 
              transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Signup"}
            Sign Up
          </button>
          {error && <p className="text-red-500 text-center">*{error}</p>}

          <button
            className="w-full mt-4 flex items-center justify-center 
          gap-2 border rounded-lg px-4 py-2 transition-colors duration-200 border-gray-400 hover:bg-gray-100"
            onClick={handleGoogleAuth}
          >
            <FcGoogle size={20} />
            <span>Sign Up with Google</span>
          </button>
          <p
            onClick={() => navigate("/signin")}
            className={`text-center mt-4 text-gray-600 cursor-pointer`}
          >
            Already Have an Account ?
            <span className="text-[#ff4d2d] cursor-pointer"> Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
