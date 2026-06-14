"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">

      <h1 className="text-2xl font-bold">
        Dashboard 🚀
      </h1>

      <div className="flex gap-4">

        <button
          onClick={() => router.push("/chat")}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Chat
        </button>

        <button
          onClick={() => router.push("/profile")}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Profile
        </button>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-6 py-3 rounded"
        >
          Logout
        </button>

      </div>
    </div>
  );
}