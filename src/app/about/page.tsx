// src/app/about/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc"; // App RouterではRSC版を使う

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "content", "about.mdx");
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);

  return (
    <article className="prose mx-auto px-4 py-8">
      <h1 className="mb-6">{data.title}</h1>
      <MDXRemote source={content} />
    </article>
  );
}
