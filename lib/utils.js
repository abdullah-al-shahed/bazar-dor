// src/lib/utils.js

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর
export function toBnDigit(num) {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[d]);
}

// দামের নিউমেরিক সর্টিং (C1)
export function sortProductsByPrice(products, sortBy) {
  if (!products) return [];
  const list = [...products];
  if (sortBy === "low-to-high") {
    return list.sort((a, b) => Number(a.today) - Number(b.today));
  }
  if (sortBy === "high-to-low") {
    return list.sort((a, b) => Number(b.today) - Number(a.today));
  }
  return list; // default
}