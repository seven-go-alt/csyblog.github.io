interface LoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Serves Unsplash covers at the size the layout actually needs instead of a
 * single 1200px file. Any other host (e.g. the GitHub avatar) is passed through.
 */
export default function imageLoader({ src, width, quality }: LoaderProps): string {
  if (!src.includes("images.unsplash.com")) return src;

  try {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.toString();
  } catch {
    return src;
  }
}
