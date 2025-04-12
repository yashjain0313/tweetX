import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAMWhm-zOqqb1-rrLx3oCOqzAjRqKrXBAc",
  authDomain: "tweetx-1.firebaseapp.com",
  projectId: "tweetx-1",
  storageBucket: "tweetx-1.firebasestorage.app",
  messagingSenderId: "325171751932",
  appId: "1:325171751932:web:5450c7ed4032ebce8e6079",
  measurementId: "G-P9WFZB4E8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
