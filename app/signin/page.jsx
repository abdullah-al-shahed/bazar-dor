// app/signin/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn.email({
        email,
        password,
        callbackURL: "/",
      });
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
    } catch (err) {
      toast.error(err?.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে!");
    }
  };

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">সাইন ইন</h1>
        <p className="text-xs text-gray-500 mt-1">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm w-full max-w-md space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">ইমেইল</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full rounded-lg text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-[#0f834d] hover:bg-[#0c6b3e] text-white w-full rounded-lg border-none text-xs"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="divider text-xs text-gray-400">অথবা</div>

        <div className="space-y-2">
          <button
            onClick={() => handleSocialSignIn("google")}
            className="btn btn-outline w-full rounded-lg text-xs font-normal border-gray-300 flex items-center justify-center gap-2"
          >
            <span>🌐</span> Google দিয়ে চালিয়ে যান
          </button>
          <button
            onClick={() => handleSocialSignIn("github")}
            className="btn btn-outline w-full rounded-lg text-xs font-normal border-gray-300 flex items-center justify-center gap-2"
          >
            <span>🐙</span> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-xs text-gray-500">
          অ্যাাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-[#0f834d] font-semibold hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="text-xs text-gray-500 hover:text-gray-800 mt-6 flex items-center gap-1">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}