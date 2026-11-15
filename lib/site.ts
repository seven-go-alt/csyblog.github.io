export const SITE = {
  name: "CSY Blog",
  author: "CSY",
  description: "记录关于 AI、硬件与工程实践的思考。",
} as const;

/**
 * Canonical site origin, without a trailing slash.
 *
 * Priority: NEXT_PUBLIC_BASE_URL (set this in Vercel if you use a custom
 * domain), then Vercel's own production URL, then localhost for `next dev`.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_BASE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}
