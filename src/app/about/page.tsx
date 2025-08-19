// src/app/about/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents, mdxOptions } from "@/app/_components/mdx/config";

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "content", "about.mdx"); // 実ファイル名に合わせる
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  const date = (data as any)?.updated ?? (data as any)?.date;

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {data?.title ?? "自己紹介"}
        </h1>
        {date && (
          <p className="mt-2 text-sm text-gray-500">
            {new Date(date).toLocaleDateString("ja-JP")}
          </p>
        )}
      </header>

      <article className="prose prose-zinc max-w-none dark:prose-invert">
        <MDXRemote source={content} components={mdxComponents} options={mdxOptions} />
      </article>
    </main>
  );
}
