import { generateTokensAndSetCookies } from "../../../utils/generateTokenAndSetCookie.js";
import { generateVerificationToken } from "../../../utils/generateVerification.js";
import { sendPasswordResetEmail, sendVerificationEmail } from "../../../utils/sendEmail.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
class UserService {
  static async registerUser(userData, res) {
   
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) { 
      console.log("User already exists:", userData.email);
      throw new Error("User already exists with this email.");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const verificationToken = generateVerificationToken();
    const newUser = new User({
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      verificationToken,
      verificationTokenExpire: Date.now() + 24 * 60 * 60 * 1000, // Token valid for 24 hours
    });



    await newUser.save();
    return newUser;
    
  }

    static async sendVerificationEmail(user, res) {
    const { email, verificationToken } = user;
    await sendVerificationEmail({ email: email, otp: verificationToken }, res);
  }


  static async verifyUserEmail(token) {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpire: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user) {
      throw new Error("Invalid or expired verification token.");
    }  

    user.isVerified = true;
    user.verificationToken = undefined; // Clear the verification token
    user.verificationTokenExpire = undefined; // Clear the expiration date
    

    return await user.save();
}

 static async userLogin(email,password, res){

    const user = await User.findOne({email})
    if (!user){
      throw new Error("User not found with this email.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
      throw new Error("Invalid password.");
    }
    if (user.verificationToken) {
  throw new Error("Email not verified. Please check your email for verification.");
}

    return user;
  }

  static async userSendResetPassword(email){

    const user = await User.findOne({email})

    if (!user) {
      throw new Error("User not found with this email.");
    }
    
    const resetPasswordToken = generateVerificationToken();
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`;

    await sendPasswordResetEmail(email, resetURL);
    return;
  }

  static async userResetPassword(token, newPassword) {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }, // Check if token is still valid
    });
    if (!user) {
      throw new Error("Invalid or expired password reset token.");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Clear the reset token 
    user.resetPasswordExpire = undefined; // Clear the expiration date
    await user.save();
    return user;
  }

  static async userRefresh(accessToken) {

  const decoded = jwt.decode(accessToken); // <- decode, not verify
  if (!decoded?.id) {
    throw new Error("Invalid access token.");
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}
}



export default UserService;
