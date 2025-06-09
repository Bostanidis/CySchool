export function formatTimeAgo(
  timestamp: string | number | Date
): string {
  // 1. Parse into a JS Date
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    // invalid input — treat as "just now"
    return "just now";
  }

  // 2. Compute difference in seconds
  const now = Date.now();
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);
  if (diffInSeconds < 1) {
    return "just now";
  }

  // 3. Define thresholds (seconds per unit)
  const intervals: { seconds: number; unit: string }[] = [
    { seconds: 31536000, unit: "year"   },
    { seconds: 2592000,  unit: "month"  },
    { seconds: 604800,   unit: "week"   },
    { seconds: 86400,    unit: "day"    },
    { seconds: 3600,     unit: "hour"   },
    { seconds: 60,       unit: "minute" },
    { seconds: 1,        unit: "second" }
  ];

  // 4. Find the first interval that fits
  for (const { seconds, unit } of intervals) {
    const count = Math.floor(diffInSeconds / seconds);
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
  }

  // Fallback (shouldn't really happen)
  return "just now";
}
