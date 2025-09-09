// src/app/sitemap.ts
import { MetadataRoute } from "next";
import postIndex from "generated/post-index"; // あなたの生成物
import type { PostMeta, SectionIndex } from "generated/post-index";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "https://pengineer-geek-blog.vercel.app"; // フォールバック

function* iterPosts(data: { sections: SectionIndex[] }) {
  for (const section of data.sections) {
    for (const sub of section.subs) {
      for (const p of sub.posts) yield p as PostMeta;
    }
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  for (const p of iterPosts(postIndex)) {
    const d = p.date ? new Date(p.date) : now;
    // あなたのルーティングは /posts/[...slug] なのでここで接頭辞を付ける
    entries.push({
      url: `${BASE_URL}/posts/${p.slug}`,
      lastModified: d,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
