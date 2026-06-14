import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">
        DocuMind AI
      </h1>

      <p className="mb-8">
        AI Powered Document Intelligence Platform
      </p>

      <div className="flex gap-4">
        <Link
          href="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Register
        </Link>

        <Link
          href="/login"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Login
        </Link>
      </div>
    </main>
  );
}