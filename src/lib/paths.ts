/** Prefix absolute paths for GitHub Pages project sites (e.g. /harry.github.io). */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/") || !base) return path;
  return `${base}${path}`;
}
