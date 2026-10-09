// app/signup/page.jsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/signin");
  };

  return (
    <main className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-10 bg-[#f4f6f0]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-xs text-gray-500 mt-1">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm w-full max-w-md space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">নাম</label>
            <input
              type="text"
              required
              placeholder="যেমন: রহিম উদ্দিন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full rounded-lg text-xs"
            />
          </div>

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

          <button type="submit" className="btn bg-[#0f834d] hover:bg-[#0c6b3e] text-white w-full rounded-lg border-none text-xs">
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="divider text-xs text-gray-400">অথবা</div>

        <div className="space-y-2">
          <button
            onClick={() => router.push("/")}
            className="btn btn-outline w-full rounded-lg text-xs font-normal border-gray-300 flex items-center justify-center gap-2"
          >
            <span>🌐</span> Google দিয়ে চালিয়ে যান
          </button>
          <button
            onClick={() => router.push("/")}
            className="btn btn-outline w-full rounded-lg text-xs font-normal border-gray-300 flex items-center justify-center gap-2"
          >
            <span>🐙</span> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-xs text-gray-500">
          অ্যাাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-[#0f834d] font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="text-xs text-gray-500 hover:text-gray-800 mt-6 flex items-center gap-1">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}