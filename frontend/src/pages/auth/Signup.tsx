import React, { useState } from "react";
import XSvg from "../../components/X";
import {
  MdDriveFileRenameOutline,
  MdOutlineMail,
  MdPassword,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "../../utils/axios/axiosConfig"; // Import your configured axios instance
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { auth, googleProvider } from "../../utils/firebase/firebase";
import { signInWithPopup } from "firebase/auth";

interface FormInput {
  username: string;
  email: string;
  password: string;
  fullname: string;
}

const Signup = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<FormInput>({
    username: "",
    email: "",
    password: "",
    fullname: "",
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullname, password }: FormInput) => {
      try {
        const res = await axiosConfig.post(
          "/api/auth/signup",
          {
            email,
            username,
            fullname,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Account created successfully");
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        return res.data;
      } catch (error) {
        if (isAxiosError(error)) {
          const errorMsg =
            error.response?.data?.message || "Server is not responding";
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

          toast.success("Account created successfully with Google");
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          return res.data;
        } catch (error) {
          if (isAxiosError(error)) {
            const errorMsg =
              error.response?.data?.message || "Server is not responding";
            toast.error(errorMsg);
          } else {
            toast.error("An unexpected error occurred");
          }
          return;
        }
      },
    });

  const handleGoogleSignup = async () => {
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
      toast.error("Failed to sign up with Google");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-screen-xl mx-auto flex  justify-center h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className=" lg:w-2/3 fill-white" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Join today</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>

          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullname"
                onChange={handleInputChange}
                value={formData.fullname}
              />
            </label>
          </div>

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
            {isPending ? "Loading..." : "Sign up"}
          </button>

          {/* Google Sign-up Button */}
          <div className="divider text-white">OR</div>
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="btn rounded-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            {isGoogleLoginPending ? "Loading..." : "Sign up with Google"}
          </button>

          {isError && <p className="text-red-500">{error.message}</p>}
        </form>

        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
