"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

type RegisterForm = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError("");

      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      await api.post("/auth/register", {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      setSuccess(
        "Registration successful. Redirecting..."
      );

      reset();

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md border p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        {success && (
          <div className="bg-green-100 p-3 rounded mb-4">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <input
            {...register("first_name")}
            placeholder="First Name"
            className="w-full border p-3 rounded"
          />

          <input
            {...register("last_name")}
            placeholder="Last Name"
            className="w-full border p-3 rounded"
          />

          <input
            {...register("username")}
            placeholder="Username"
            className="w-full border p-3 rounded"
          />

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600"
          >
            Login Here
          </Link>
        </p>

      </div>
    </div>
  );
}