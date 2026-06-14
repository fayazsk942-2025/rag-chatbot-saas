"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access_token);

      router.push("/home");

    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md border p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 p-3 mb-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            className="w-full border p-3 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold">
            Register Here
          </Link>
        </p>

      </div>
    </div>
  );
}