"use client";
import Link from "next/link";

export default function ProfilePage() {
  const user = {
    name: "Rezwan Ahmed",
    email: "rezwanahmed@gmail.com",
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-xs text-gray-500 mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      {/* User Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
            👤
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        <Link href="/profile/update" className="btn btn-sm btn-outline border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400">
          আপডেট করুন
        </Link>
      </div>
    </main>
  );
}