export function toBnDigit(num) {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bnDigits[d]);
}

export function formatUnit(unit) {
  if (unit === "kg") return "প্রতি কেজি";
  if (unit === "litre") return "প্রতি লিটার";
  if (unit === "dozen") return "প্রতি ডজন";
  if (unit === "piece") return "প্রতি পিস";
  return `প্রতি ${unit || "একক"}`;
}

export function sortProductsByPrice(products, sortBy) {
  if (!products) return [];
  const list = [...products];
  if (sortBy === "low-to-high") {
    return list.sort((a, b) => Number(a.today) - Number(b.today));
  }
  if (sortBy === "high-to-low") {
    return list.sort((a, b) => Number(b.today) - Number(a.today));
  }
  return list;
}