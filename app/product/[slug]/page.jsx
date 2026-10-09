// app/category/[slug]/page.jsx
"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { sortProductsByPrice } from "@/lib/utils";

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${resolvedParams.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [resolvedParams.slug]);

  const sortedList = sortProductsByPrice(products, sortBy);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">কোনো পণ্য পাওয়া যায়নি!</h2>
        <p className="text-gray-500 text-sm">এই ক্যাটাগরিতে বর্তমানে কোনো ডেটা নেই।</p>
        <Link href="/" className="btn bg-[#0f834d] text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Category Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{products[0]?.categoryNameBn}</h1>
          <p className="text-xs text-gray-500 mt-1">{products.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
        <span className="text-xs text-gray-500">মোট {products.length}টি পণ্য দেখানো হচ্ছে</span>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-600">সাজান:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-sm select-bordered rounded-lg focus:outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedList.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}