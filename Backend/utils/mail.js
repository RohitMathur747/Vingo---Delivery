import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // use SSL (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendOtpMail = async (to, otp) => {};
