// components/ProductCard.jsx
import Link from "next/link";
import { toBnDigit, formatUnit } from "@/lib/utils";

export default function ProductCard({ product }) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl bg-gray-50 p-2.5 rounded-xl">{product.image || "🍚"}</div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">{product.nameBn}</h3>
          <p className="text-[11px] text-gray-400">{formatUnit(product.unit)}</p>
          <div className="mt-1">
            <span className="text-[11px] text-gray-400">আজকের দাম </span>
            <span className="font-bold text-gray-900 text-sm ml-1">
              {toBnDigit(product.today)} টাকা
            </span>
          </div>
        </div>
      </div>

      <div
        className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
          isUp
            ? "bg-red-50 text-red-600"
            : isDown
            ? "bg-emerald-50 text-[#0f834d]"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
        <span>{toBnDigit(Math.abs(product.change?.pct || 0))}%</span>
      </div>
    </Link>
  );
}