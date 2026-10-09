"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
    } catch (error) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে!");
    }
  };

  const categories = [
    { name: "সব", slug: "" },
    { name: "চাল", slug: "chal" },
    { name: "ডাল", slug: "dal" },
    { name: "তেল", slug: "oil" },
    { name: "সবজি", slug: "vegetables" },
    { name: "মাছ-মাংস", slug: "meat-fish" },
    { name: "মসলা", slug: "spices" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Bar: Logo, Date & Auth Status */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Bangla Date */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="Logo" className="w-8 h-8 object-contain" />
          <div>
            <span className="font-extrabold text-lg text-gray-900 block leading-none">
              বাজার দর
            </span>
            <span className="text-[10px] text-gray-500 font-medium">
              আজকের বাজার দর
            </span>
          </div>
        </Link>

        {/* Auth Buttons / User Profile */}
        <div className="flex items-center gap-3">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-[#0f834d] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#0f834d] flex items-center justify-center font-bold">
                  {session.user.name?.[0]?.toUpperCase() || "👤"}
                </div>
                <span>{session.user.name || "প্রোফাইল"}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="btn btn-xs btn-outline border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="btn btn-xs sm:btn-sm btn-ghost text-xs text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-xs sm:btn-sm bg-[#0f834d] hover:bg-[#0c6b3e] text-white border-none rounded-lg text-xs"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-gray-50/80 border-t border-gray-100 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-1 py-1.5 text-xs whitespace-nowrap scrollbar-none">
          {categories.map((cat) => {
            const href = cat.slug ? `/category/${cat.slug}` : "/";
            const isActive =
              cat.slug === ""
                ? pathname === "/"
                : pathname.startsWith(`/category/${cat.slug}`);

            return (
              <Link
                key={cat.slug}
                href={href}
                className={`px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${
                  isActive
                    ? "bg-[#0f834d] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200/60"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}