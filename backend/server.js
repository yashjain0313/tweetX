const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { v2 } = require("cloudinary");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./route/auth");
const userRoutes = require("./route/user");

const connectMongoDB = require("./db/connectMongoDB");
const postRoutes = require("./route/post");
const notificationsRoutes = require("./route/notification");

dotenv.config();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced CORS configuration to handle origins with and without trailing slashes
const corsOptions = {
  origin: function (origin, callback) {
    // For development/testing - allow requests with no origin
    if (!origin) return callback(null, true);

    // Remove trailing slashes from origins for comparison
    const requestOrigin = origin.endsWith("/") ? origin.slice(0, -1) : origin;

    // List of allowed origins (without trailing slashes)
    const allowedOrigins = [
      process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.endsWith("/")
          ? process.env.FRONTEND_URL.slice(0, -1)
          : process.env.FRONTEND_URL
        : null,
      "http://localhost:5173",
      "https://tweet-x-tweet.vercel.app",
      "https://tweetx-git-main-yashjain.vercel.app",
      "https://tweetx-yashjain.vercel.app",
      "https://tweetx-beige.vercel.app",
    ].filter(Boolean); // Remove any null/undefined entries

    console.log("Request origin:", origin);
    console.log("Allowed origins:", allowedOrigins);

    if (allowedOrigins.includes(requestOrigin)) {
      // Return the actual requesting origin to avoid CORS issues
      callback(null, origin);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error(`CORS not allowed for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set SameSite and Secure cookie options for cross-domain requests
app.use((req, res, next) => {
  const originalCookie = res.cookie;
  res.cookie = function (name, value, options = {}) {
    // For production environments, ensure cookies work cross-domain
    if (process.env.NODE_ENV === "production") {
      options.sameSite = "None";
      options.secure = true;
    }
    return originalCookie.call(this, name, value, options);
  };
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationsRoutes);

// Improved environment check that works across platforms
const isProduction =
  process.env.NODE_ENV &&
  (process.env.NODE_ENV.trim() === "production" ||
    process.env.NODE_ENV.includes("prod"));

// Serve static assets if in production
if (isProduction) {
  const parentDir = path.resolve(__dirname, "..");
  app.use(express.static(path.join(parentDir, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(parentDir, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
  connectMongoDB();
});
