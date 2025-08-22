// src/app/about-penguin/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents, mdxOptions } from "@/app/_components/mdx/config";
import Image from "next/image";
import BackLink from "@/app/_components/navigation/back-link";

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "content", "about-penguin.mdx"); // 実ファイル名に合わせる
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  const date = (data as any)?.updated ?? (data as any)?.date;

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10 pt-14">
      <div className="mb-4">
        <BackLink href="/" label="トップに戻る" />
      </div>
      
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {data?.title ?? "ペンギンに込めた想い"}
        </h1>
        {date && (
          <p className="mt-2 text-sm text-gray-500">
            {new Date(date).toLocaleDateString("ja-JP")}
          </p>
        )}
      </header>

      {data.cover && (
        <figure className="mb-8 overflow-hidden rounded-xl border shadow-sm">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={data.cover}
              alt={data.title ?? "cover"}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
              priority
            />
          </div>
          {/* キャプション付けたい時だけ */}
          {/* <figcaption className="px-3 py-2 text-center text-sm text-gray-500">
            アバター画像（仮アイキャッチ）
          </figcaption> */}
        </figure>
      )}

      <article className="prose prose-zinc max-w-none dark:prose-invert">
        <MDXRemote source={content} components={mdxComponents} options={mdxOptions} />
      </article>

      <div className="mt-4">
        <BackLink href="/" label="トップに戻る" />
      </div>
    </main>
  );
}
