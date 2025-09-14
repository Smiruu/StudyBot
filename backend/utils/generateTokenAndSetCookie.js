import jwt from "jsonwebtoken";

// Generate access + refresh tokens
export const generateTokensAndSetCookies = (user, res) => {
  // Access token (short lifespan, e.g., 15m)
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1s" }
  );

  // Refresh token (long lifespan, e.g., 7 days)
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET, // <-- use a different secret for refresh
    { expiresIn: "7d" }
  );

  // Store refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Optionally also store access token in cookie
  

  return { accessToken };
};
