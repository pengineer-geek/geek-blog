// src/app/posts/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import postIndex from "generated/post-index";
import type { SectionIndex, PostMeta } from "generated/post-index";
import { imgUrl } from "@/lib/img";

type FlatPost = PostMeta & {
  slug?: string;
  date?: string;
  updated?: string;
  excerpt?: string;
  tags?: string[];
  hero?: { file?: string; alt?: string };
  order?: number;
};

// 追加：型ガード & ヘルパ
function hasSections(x: unknown): x is { sections: SectionIndex[] } {
  return !!x && typeof x === "object" && Array.isArray((x as any).sections);
}
function getSections(idx: unknown): SectionIndex[] {
  return hasSections(idx) ? idx.sections : (idx as SectionIndex[]) ?? [];
}

// postIndexをフラット化
function flattenPosts(): FlatPost[] {
  const sections = getSections(postIndex); // ✅ どちらの形でもOK
  const out: FlatPost[] = [];
  for (const section of sections) {
    for (const sub of section.subs ?? []) {
      for (const p of sub.posts ?? []) out.push(p as FlatPost);
    }
  }

  // 日付で降順ソート
  return out
    .filter((p) => p.slug)
    .filter((p) => p.subKey !== "meta") // ✅ メタ記事は除外
    .sort((a, b) => {
      const at = new Date(a.updated || a.date || 0).getTime();
      const bt = new Date(b.updated || b.date || 0).getTime();
      if (bt !== at) return bt - at;
      return (a.order ?? Infinity) - (b.order ?? Infinity);
    });
}

export default function PostsPage() {
  const allPosts = flattenPosts();
  const [visible, setVisible] = useState(10);

  const posts = allPosts.slice(0, visible);
  const hasMore = visible < allPosts.length;

  return (
    <main className="container pt-14 pb-10 md:pt-14 md:pb-14">
      <h1 className="text-2xl font-bold mb-8">記事一覧</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/posts/${p.slug}`}
            className="block rounded-xl overflow-hidden border border-black/10 hover:shadow-md transition bg-white"
          >
            <div className="aspect-video bg-neutral-100">
              <img
                src={imgUrl(p.slug, p.hero?.file || "cover.jpg")}
                alt={p.hero?.alt || p.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <div className="text-xs opacity-60 mb-1">
                {p.updated || p.date
                  ? new Date(p.updated || p.date!).toLocaleDateString("ja-JP")
                  : ""}
              </div>
              <h2 className="font-semibold leading-snug line-clamp-2">
                {p.title}
              </h2>
              {p.excerpt && (
                <p className="text-sm mt-2 opacity-80 line-clamp-2">
                  {p.excerpt}
                </p>
              )}
              {p.tags?.length ? (
                <div className="flex flex-wrap gap-1 mt-3">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs rounded-full bg-neutral-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((v) => v + 10)}
            className="px-6 py-2 rounded-full bg-black text-white hover:bg-black/80 transition"
          >
            もっと見る
          </button>
        </div>
      )}
    </main>
  );
}
