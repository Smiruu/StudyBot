import { generateTokenAndSetCookie } from "../../../utils/generateTokenAndSetCookie.js";
import { generateVerificationToken } from "../../../utils/generateVerification.js";
import { sendVerificationEmail } from "../../../utils/sendEmail.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

class UserService {
  static async registerUser(userData, res) {
    console.log("Registering user:", userData);
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

    generateTokenAndSetCookie(newUser, res);

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
    generateTokenAndSetCookie(user, res);
    return user;
  }
}



export default UserService;
