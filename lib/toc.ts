import GithubSlugger from "github-slugger";

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Extracts `##` / `###` headings from MDX source.
 *
 * Uses the same slugger as rehype-slug, so the generated ids match the ones
 * rendered into the article — duplicate headings get the same `-1` suffixes.
 */
export function extractHeadings(markdown: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const withoutCode = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "");

  const headings: TocHeading[] = [];

  for (const line of withoutCode.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2]
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[*_~]/g, "")
      .trim();

    if (!text) continue;
    headings.push({ id: slugger.slug(text), text, level });
  }

  return headings;
}
