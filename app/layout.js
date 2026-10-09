// app/layout.js
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "বাজার দর - Bazar Dor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
      <body className="bg-[#f4f6f0] min-h-screen flex flex-col justify-between antialiased">
        <Toaster position="top-right" />
        <div>
          {/* Navbar কে Suspense দিয়ে র‍্যাপ করা হয়েছে */}
          <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100 animate-pulse" />}>
            <Navbar />
          </Suspense>

          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}