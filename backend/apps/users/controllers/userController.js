
import UserService from "../services/userServices.js";



class UserController {

    static userRegister = async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const newUser = await UserService.registerUser({ email, password, name }, res);
    
      await UserService.sendVerificationEmail(newUser, res);
      return res.status(201).json({
        message: "User registered successfully. Please check your email for verification.",
        user: {
          _id: newUser._id, // Only include necessary properties
          email: newUser.email,
          name: newUser.name,
        }});
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: error.message });
    }

    }

  static verifyEmail = async (req,res) => {
    const {token} = req.body;

    try{
        const user = await UserService.verifyUserEmail(token);
        res.status(200).json({
            message: "Email verified successfully.",
            user: {
                ...user._doc,
                password: undefined, // Exclude password from response
            }
        });

    }catch (error) {
      console.error("Error verifying email:", error);
      return res.status(500).json({ message: "Email verification failed." });
    }
  };

  static userLogin = async (req,res) => {
    const {email, password} = req.body;
    try {
      const user = await UserService.userLogin(email,password,res);

      res.status(200).json({
        message: "User logged in successfully.",
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          token: user.token,
        }
      });
      
      
    }catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({ message: "Login failed.", error: error });  
  }
};

  static userSendResetPassword = async (req, res) => {
    const {email} = req.body;
    try{
      await UserService.userSendResetPassword(email);
      res.status(200).json({ message: "Password reset email sent successfully." });
    }catch(error){
      console.error("Error sending password reset email:", error);
      return res.status(500).json({ message: "Failed to send password reset email." }); 
    }
  }

  static userResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
      const user = await UserService.userResetPassword(token, newPassword);
      res.status(200).json({
        message: "Password reset successfully.",
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        }
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Failed to reset password." });
    }
  }
}


export default UserController;
