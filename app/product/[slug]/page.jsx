"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toBnDigit, formatUnit } from "@/lib/utils";

function ProductDetailsContent() {
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`https://openapi.programming-hero.com/api/bazardor/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="h-48 bg-gray-200 animate-pulse rounded-2xl mb-6"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
      </div>
    );
  }

  if (!product) return null;

  const minPrices = product.markets?.map((m) => m.min) || [];
  const maxPrices = product.markets?.map((m) => m.max) || [];
  const minPrice = minPrices.length ? Math.min(...minPrices) : product.today;
  const maxPrice = maxPrices.length ? Math.max(...maxPrices) : product.today;
  const avgPrice = Math.round((minPrice + maxPrice) / 2);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <Link href="/">হোম</Link> <span>/</span>
        <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link> <span>/</span>
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </div>

      {/* Header Summary Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="text-5xl bg-gray-50 p-3 rounded-2xl">{product.image}</div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">{product.nameBn}</h1>
            <p className="text-xs text-gray-500 mt-1">
              {formatUnit(product.unit)} • {product.categoryNameBn}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-3 rounded-xl border border-gray-100 text-right w-full md:w-auto">
          <p className="text-xs text-gray-500">আজকের গড় দাম</p>
          <p className="text-2xl font-bold text-gray-900">{toBnDigit(product.today)} টাকা</p>
          <p className="text-xs text-gray-500">{formatUnit(product.unit)}</p>
        </div>
      </div>

      {/* Price Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
          <p className="text-xl font-bold text-[#0f834d] mt-1">{toBnDigit(minPrice)} টাকা</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
          <p className="text-xl font-bold text-red-600 mt-1">{toBnDigit(maxPrice)} টাকা</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">গড় দাম</p>
          <p className="text-xl font-bold text-gray-800 mt-1">{toBnDigit(avgPrice)} টাকা</p>
        </div>
      </div>

      {/* Market Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs">
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন</th>
                <th>সর্বাধিক</th>
                <th>গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets?.map((m, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="font-medium text-gray-800">{m.market}</td>
                  <td className="text-gray-600">{m.division}</td>
                  <td className="text-[#0f834d] font-semibold">{toBnDigit(m.min)} টাকা</td>
                  <td className="text-red-600 font-semibold">{toBnDigit(m.max)} টাকা</td>
                  <td className="font-bold text-gray-800">{toBnDigit(Math.round((m.min + m.max) / 2))} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="h-48 bg-gray-200 animate-pulse rounded-2xl mb-6"></div>
          <div className="h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
        </div>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}