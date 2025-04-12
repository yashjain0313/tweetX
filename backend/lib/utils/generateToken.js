const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Determine environment
  const isProduction =
    process.env.NODE_ENV &&
    (process.env.NODE_ENV.trim() === "production" ||
      process.env.NODE_ENV.includes("prod"));

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15days in milliseconds
    httpOnly: true, // prevent XSS attacks cross site scripting attacks
    sameSite: isProduction ? "None" : "Lax", // Allow cross-site cookies in production
    secure: isProduction, // Use secure cookies in production
    path: "/", // Make cookie available on all paths
  });
};

module.exports = generateTokenAndSetCookie;
