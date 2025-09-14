import jwt from "jsonwebtoken";
import { User } from "../apps/users/models/userModel.js";

// Middleware to authenticate user using access + refresh tokens
export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const refreshToken = req.cookies?.refreshToken; // refresh stored in cookie

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized. No access token provided." });
    }

    const accessToken = authHeader.split(" ")[1];

    try {
      // ✅ Verify access token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found." });

      req.user = user;
      return next();
    } catch (err) {
      // ❌ Access token expired
      if (err.name !== "TokenExpiredError") {
        console.error("Invalid access token:", err);
        return res.status(401).json({ message: "Unauthorized. Invalid access token." });
      }

      // 🔄 Try refresh token
      if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized. No refresh token." });
      }

      try {
        console.log("Verifying refresh token...");
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decodedRefresh.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found." });

        // ♻️ Generate new access token
        const newAccessToken = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        // Attach both user + token to request
        req.user = user;
        req.newAccessToken = newAccessToken;

        // 🔥 Continue request, but tell frontend a new token was issued
        res.setHeader("x-access-token", newAccessToken); // optional: send in header
        return next();
      } catch (refreshErr) {
        console.error("Invalid refresh token:", refreshErr);
        return res.status(401).json({ message: "Unauthorized. Invalid refresh token." });
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized." });
  }
};
