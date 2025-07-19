import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure:false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export const sendVerificationEmail = async ({email, otp}, res) => {
    try{
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification",
            text: `Your OTP is ${otp}. Please use this to verify your email.`,
        };
        console.log("Sending verification email to:", email);
        await transporter.sendMail(mailOptions);
    }catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send verification email." });
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Password Reset",
            html: `<p>Click <a href="${resetURL}">here</a> to reset your password. Link will expire in 30 minutes.</p>`

        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent successfully", info.messageId);
    } catch (error) {
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};