import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

/** GitHub Pages base path: user sites at /, project sites at /{repo-name}/ */
function getBasePath(): string {
  if (process.env.GITHUB_PAGES !== "true") return "";

  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const owner = process.env.GITHUB_REPOSITORY?.split("/")[0] ?? "";

  // e.g. harrylal/harrylal.github.io → served at https://harrylal.github.io/
  if (repo === `${owner}.github.io`) return "";

  // e.g. harrylal/harry.github.io → served at https://harrylal.github.io/harry.github.io/
  return repo ? `/${repo}` : "";
}

const basePath = getBasePath();

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);
