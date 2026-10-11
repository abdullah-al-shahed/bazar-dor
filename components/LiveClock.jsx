"use client";
import { useState, useEffect } from "react";

export default function LiveClock() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = now.toLocaleDateString("bn-BD", options);
      const formattedTime = now.toLocaleTimeString("bn-BD");
      setTimeString(`${formattedDate} - ${formattedTime}`);
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  
  if (!timeString) {
    return <span className="text-gray-400">তারিখ ও সময় লোড হচ্ছে...</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <span>{timeString}</span>
    </div>
  );
}