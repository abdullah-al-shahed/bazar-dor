"use client";
import { useEffect, useState } from "react";

export default function MarqueeBar() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  if (!products.length) return null;

  return (
    <div className="bg-white border-b border-gray-200 py-2.5 overflow-hidden whitespace-nowrap shadow-sm">
      <div className="animate-marquee inline-flex gap-6 items-center text-xs font-medium text-gray-700">
        {products.concat(products).map((p, index) => (
          <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <span>{p.categoryIcon || "🛒"}</span>
            <span className="font-bold text-gray-900">{p.nameBn}</span>
            <span className="text-gray-600">{p.today} টাকা</span>
            <span className={p.change?.dir === "up" ? "text-red-600 font-bold" : "text-emerald-600 font-bold"}>
              {p.change?.dir === "up" ? "▲" : "▼"} {Math.abs(p.change?.pct)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}