// Axios configuration for API base URL
import axios from "axios";

// Set the base URL for axios based on environment
const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL || "https://tweetx-api-lokm.onrender.com" // Remove trailing slash
  : "/api"; // For local development, keep using the proxy

// Log the baseURL for debugging
console.log("Using API baseURL:", baseURL);

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true; // Important for cookies/authentication

export default axios;
