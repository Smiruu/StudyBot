import jwt from "jsonwebtoken";

// Generate access + refresh tokens
export const generateTokensAndSetCookies = (user, res) => {
  // Access token (short lifespan, e.g., 15m)
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
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
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  // Optionally also store access token in cookie
  

  return { accessToken };
};


export const generateAccess = (refreshToken) => {
  try {
    // Verify refresh token first
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );


    return newAccessToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
