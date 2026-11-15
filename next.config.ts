import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

const withMDX = createMDX({
  // Plugin names are passed as strings so they work with Turbopack.
  options: {
    remarkPlugins: ["remark-frontmatter"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);

