// Axios configuration for API base URL
import axios from "axios";

// Set the base URL for axios based on environment
const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL || "https://tweetx-api-a8d8.onrender.com/api"
  : "/api"; // For local development, keep using the proxy

console.log("Using API baseURL:", baseURL); // Debug log

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true; // Important for cookies/authentication

export default axios;
