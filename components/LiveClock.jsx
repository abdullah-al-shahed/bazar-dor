"use client";
import { useState, useEffect } from "react";

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // প্রতি ১ সেকেন্ডে আপডেট হবে

    return () => clearInterval(timer); // মেমোরি লিক বন্ধ করতে ক্লিনআপ
  }, []);

  return (
    <span>
      {time.toLocaleTimeString("bn-BD")}
    </span>
  );
}