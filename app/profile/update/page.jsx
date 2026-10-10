"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";

export default function ProfileUpdatePage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "Rezwan Ahmed");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser({ name });
      toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      router.push("/profile");
    } catch (err) {
      toast.error("তথ্য আপডেট করতে ব্যর্থ হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">তথ্য আপডেট করুন</h1>
        <p className="text-xs text-gray-500 mt-1">আপনার নাম পরিবর্তন করুন।</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <form onSubmit={handleUpdate} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">নাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full rounded-lg text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-[#0f834d] hover:bg-[#0c6b3e] text-white w-full rounded-lg border-none text-xs"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </main>
  );
}