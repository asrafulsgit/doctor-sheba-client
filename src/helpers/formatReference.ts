export function formatReference(
  value?: string | null,
  length: number = 8,
): string {
  if (!value) return "-";

  return value.slice(0, length).toUpperCase();
}
