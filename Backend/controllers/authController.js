import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import genToken from "../utils/token.js";

const signUp = async (req, res) => {
  try {
    const { fullname, email, password, mobile, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (mobile.length !== 10) {
      return res
        .status(400)
        .json({ message: "Mobile number must be 10 digits long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(`Error signing up: ${error}`);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`Error signing in: ${error}`);
  }
};

const signOut = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    res.status(500).json(`Error signing out: ${error}`);
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail(email, otp);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json(`Error sending OTP: ${error}`);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user || user.resetOtp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.isOtpVerified = true;
    user.resetOtp = null;
    user.otpExpiry = null;
    await user.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json(`Error verifying OTP: ${error}`);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.isOtpVerified = false;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json(`Error resetting password: ${error}`);
  }
};

const googleAuth = async (req, res) => {
  try {
    const { fullname, email, mobile } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullname,
        email,
        mobile,
        role,
      });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`Google Auth Error: ${error}`);
  }
};

export {
  signUp,
  signIn,
  signOut,
  sendOtp,
  verifyOtp,
  resetPassword,
  googleAuth,
};
