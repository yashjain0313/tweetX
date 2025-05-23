import React, { useState } from "react";
import XSvg from "../../components/X";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "../../utils/axios/axiosConfig"; // Import your configured axios instance
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../../utils/firebase/firebase";
import { signInWithPopup } from "firebase/auth";

interface FormInputs {
  username: string;
  password: string;
}
function Login() {
  const [formData, setFormData] = useState<FormInputs>({
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();

  // Regular login mutation
  const {
    mutate: loginMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }: FormInputs) => {
      try {
        const res = await axiosConfig.post(
          "/api/auth/login",
          {
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // toast.success("Account created successfully");
        //re fetch data for updating
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        return res.data;
      } catch (error) {
        if (isAxiosError(error)) {
          const errorMsg = error.response?.data?.message || "Server is not responding";
          toast.error(errorMsg);
        } else {
          toast.error("An unexpected error occurred");
        }
        return;
      }
    },
  });

  // Google login mutation
  const { mutate: googleLoginMutation, isPending: isGoogleLoginPending } =
    useMutation({
      mutationFn: async (userData: {
        email: string;
        fullname: string;
        googleId: string;
        profileImg: string;
      }) => {
        try {
          const res = await axiosConfig.post("/api/auth/google", userData, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          return res.data;
        } catch (error) {
          console.log(error);

          if (isAxiosError(error)) {
            const errorMsg = error.response?.data?.message || "Server is not responding";
            toast.error(errorMsg);
          } else {
            console.error(error);
            toast.error("An unexpected error occurred");
          }
          return;
        }
      },
    });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send user data to our backend
      googleLoginMutation({
        email: user.email || "",
        fullname: user.displayName || "",
        googleId: user.uid,
        profileImg: user.photoURL || "",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-screen-xl mx-auto flex justify-center h-screen">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isPending ? "Loading ..." : "Login"}
          </button>

          {/* Google Sign-in Button */}
          <div className="divider text-white">OR</div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn rounded-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            {isGoogleLoginPending ? "Loading..." : "Sign in with Google"}
          </button>

          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
