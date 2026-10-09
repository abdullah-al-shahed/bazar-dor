import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <h1 className="text-6xl font-black text-[#0f834d]">404</h1>
      <h2 className="text-2xl font-bold text-gray-800">পৃষ্ঠাটি পাওয়া যায়নি!</h2>
      <p className="text-gray-500 text-sm max-w-md">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই অথবা অন্য কোথাও সরিয়ে নেওয়া হয়েছে।
      </p>
      <Link href="/" className="btn bg-[#0f834d] hover:bg-[#0c6b3e] text-white border-none rounded-lg px-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}