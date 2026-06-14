"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">

      <h1 className="text-2xl font-bold">Profile 👤</h1>

      {/* Profile Image */}
      <div className="w-32 h-32 rounded-full border overflow-hidden flex items-center justify-center">
        {image ? (
          <img src={image} className="w-full h-full object-cover" />
        ) : (
          <span>No Image</span>
        )}
      </div>

      <input type="file" onChange={handleImageUpload} />

      <p className="text-gray-500">
        (Backend integration later: store image in DB/S3)
      </p>

    </div>
  );
}