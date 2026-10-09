// components/Navbar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toBnDigit } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#f4f6f0] border-b border-gray-200">
      {/* 1. Top Navbar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#0f834d] text-white p-2 rounded-xl text-xl font-bold flex items-center justify-center">
            🛒
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">বাজার দর</h1>
            <p className="text-xs text-gray-500">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
          </div>
        </Link>

        <div className="flex gap-2">
          <Link href="/signin" className="btn btn-sm btn-ghost text-gray-700">
            সাইন ইন
          </Link>
          <Link href="/signup" className="btn btn-sm bg-[#0f834d] hover:bg-[#0c6b3e] text-white border-none rounded-lg px-4">
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* 2. Category Nav Links */}
      <div className="border-t border-b border-gray-200 bg-white/50 backdrop-blur-sm overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex gap-2 py-2 whitespace-nowrap">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                  isActive
                    ? "bg-[#0f834d] text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. Running Price Ticker (Marquee) */}
      <div className="bg-white/80 border-b border-gray-200 text-xs py-2 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee space-x-6">
          {products.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-1 font-medium mx-4 text-gray-700">
              <span>{p.image}</span>
              <span className="font-semibold">{p.nameBn}</span>
              <span>{toBnDigit(p.today)} টাকা/{p.unit}</span>
              <span className={p.change?.dir === "up" ? "text-red-600 font-bold" : p.change?.dir === "down" ? "text-[#0f834d] font-bold" : "text-gray-500"}>
                {p.change?.dir === "up" ? "▲" : p.change?.dir === "down" ? "▼" : "—"}{" "}
                {toBnDigit(Math.abs(p.change?.pct || 0))}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}