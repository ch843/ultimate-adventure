/**
 * Get the color classes for an experience level badge
 */
export function getExperienceBadgeColor(level: string | null): string {
  if (!level) return "";

  switch (level.toLowerCase()) {
    case "beginner":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "intermediate":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "advanced":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    case "expert":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "";
  }
}
