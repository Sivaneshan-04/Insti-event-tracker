"use client";
import Link from "next/link";
import React, { useState } from "react";
import signUp from "../../../utils/auth/signupHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) { 
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    const res = await signUp(email, name, password);
        if (res.error) {
          setLoading(false);
          toast.error(res.error);
        } else {
          toast.success("Signup successful");
          Router.push("/blogs")
        }
  };

  return (
    <div className="min-h-screen flex align-middle">
      <div className="m-auto w-96 px-8 pb-6 shadow-lg">
        <h2 className="text-center font-bold text-3xl">Signup</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 p-2 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 p-2 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {!loading && (
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md"
            >
              SignUp
            </button>
          )}
          {loading && (
            <button
              disabled
              className="w-full bg-gray-400 text-white p-2 rounded-md"
            >
              Loading...
            </button>
          )}
        </form>
        <div>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600">
              Login Here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
