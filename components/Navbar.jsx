// src/components/Navbar.jsx
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
    <header className="sticky top-0 z-50 bg-base-100 shadow-sm border-b border-gray-100">
      {/* 1. Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white p-2 rounded-lg text-xl font-bold">🛒</div>
          <div>
            <h1 className="text-xl font-bold text-emerald-800">বাজার দর</h1>
            <p className="text-xs text-gray-500">শুক্রবার, ৯ অক্টোবর, ২০২৬</p>
          </div>
        </Link>

        <div className="flex gap-2">
          <Link href="/signin" className="btn btn-sm btn-ghost text-gray-700">
            সাইন ইন
          </Link>
          <Link href="/signup" className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-700">
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* 2. Category Nav Links */}
      <div className="bg-gray-50 border-t border-b border-gray-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 py-2 whitespace-nowrap">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.icon} {cat.nameBn}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. Price Ticker (Marquee) */}
      <div className="bg-emerald-50 text-emerald-900 text-xs py-1.5 overflow-hidden whitespace-nowrap border-b border-emerald-100">
        <div className="inline-block animate-marquee space-x-6">
          {products.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-1 font-medium mx-4">
              <span>{p.image}</span>
              <span>{p.nameBn}</span>
              <span className="font-semibold">{toBnDigit(p.today)} টাকা/{p.unit}</span>
              <span className={p.change?.dir === "up" ? "text-red-600" : p.change?.dir === "down" ? "text-emerald-600" : "text-gray-500"}>
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