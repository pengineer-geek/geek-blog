// src/app/_components/pickup/new-pickup.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getLatestPosts } from "@/lib/pickup";
import { imgUrl } from "@/lib/img";

type Props = {
  title?: string;
  limit?: number;
};

export default function NewPickup({ title = "新着記事", limit = 5 }: Props) {
  // ✅ limit は数値で渡す
  const posts = useMemo(() => getLatestPosts(limit), [limit]);

  if (!posts.length) return null;

  return (
    <section className="my-10">
      <div className="flex items-end justify-between mb-4">
        <h3 className="text-xl font-extrabold text-primary">{title}</h3>
        <Link href="/posts" className="text-sm underline opacity-70 hover:opacity-100">
          すべて見る
        </Link>
      </div>

      <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-5 gap-4">
        {posts.map((p) => <PickupCard key={p.slug} {...p} />)}
      </div>

      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
        {posts.map((p) => (
          <div className="min-w-[80%] snap-start" key={p.slug}>
            <PickupCard {...p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PickupCard(p: any) {
  const dateLabel = p.updated || p.date;
  return (
    <Link
      href={`/posts/${p.slug}`}
      className="block group rounded-2xl overflow-hidden border border-black/10 hover:shadow-md transition-shadow bg-white"
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
          {dateLabel ? new Date(dateLabel).toLocaleDateString("ja-JP") : ""}
        </div>
        <h3 className="font-semibold leading-snug line-clamp-2">{p.title}</h3>
        {p.excerpt && <p className="text-sm mt-2 opacity-80 line-clamp-2">{p.excerpt}</p>}
      </div>
    </Link>
  );
}
