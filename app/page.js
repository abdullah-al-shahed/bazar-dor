"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const risers = products.filter((p) => p.change?.dir === "up").slice(0, 6);
  const fallers = products.filter((p) => p.change?.dir === "down").slice(0, 6);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* 1. Hero Banner */}
      <section className="bg-emerald-50 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-4 max-w-lg">
          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
            শুক্রবার, ৯ অক্টোবর, ২০২৬
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-sm text-gray-600">
            চাল, ডাল, তেল, সবজি সহ অন্যান্য নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ এবং আপডেটেড বাজার দর জানুন।
          </p>
          <a
            href="#সব-পণ্য"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-sm"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center items-center w-full md:w-auto">
    <img
      src="/bazar-hero.png"
      alt="Hero Basket"
      className="w-56 md:w-72 h-auto object-contain drop-shadow-md"
    />
  </div>
      </section>

      {/* 2. Section A: আজ দাম বেড়েছে */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
          <span>▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 3. Section B: আজ দাম কমেছে */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-emerald-600 flex items-center gap-2">
          <span>▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. Section C: সব পণ্য */}
      <section id="সব-পণ্য" className="space-y-4 pt-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-xs text-gray-500">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}