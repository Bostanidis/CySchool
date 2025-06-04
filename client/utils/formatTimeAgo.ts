export function formatTimeAgo(timestamp: string | number | Date): string {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (isNaN(seconds) || seconds < 0) return "just now";

    const intervals: [number, string][] = [
        [60, "second"],
        [60 * 60, "minute"],
        [60 * 60 * 24, "hour"],
        [60 * 60 * 24 * 7, "day"],
        [60 * 60 * 24 * 30, "week"],
        [60 * 60 * 24 * 365, "month"],
        [Infinity, "year"]
    ];

    let divisor = 1;
    let unit = "second";

    for (const [threshold, name] of intervals) {
        if (seconds < threshold) break;
        divisor = threshold;
        unit = name;
    }

    const value = Math.floor(seconds / divisor);
    if (value <= 0) return "just now";

    return `${value} ${unit}${value !== 1 ? "s" : ""} ago`;
}
