export function formatDaysAgo(dateString?: string) {
    if (!dateString) return "";

    const inserted = new Date(dateString);
    const today = new Date();

    const diffMs = today.getTime() - inserted.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "დღეს";
    if (diffDays === 1) return "1 დღის წინ";

    return `${diffDays} დღის წინ`;
}
