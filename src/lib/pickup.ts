// src/lib/pickup.ts
import postIndex from "generated/post-index";
import type { SectionIndex, PostMeta } from "generated/post-index";

type FlatPost = PostMeta & {
  draft?: boolean;
  order?: number;
  slug?: string;
  date?: string;
  updated?: string;
  tags?: string[];
  hero?: { file?: string; alt?: string };
};

function getSections(idx: unknown): SectionIndex[] {
  // 形: { sections: SectionIndex[] } か、単純な SectionIndex[] を許容
  if (idx && typeof idx === "object" && "sections" in (idx as any)) {
    return ((idx as any).sections ?? []) as SectionIndex[];
  }
  return (idx as SectionIndex[]) ?? [];
}

function flattenPosts(): FlatPost[] {
  const sections = getSections(postIndex);
  const out: FlatPost[] = [];

  for (const section of sections) {
    for (const sub of section.subs ?? []) {
      // 通常のposts
      for (const p of sub.posts ?? []) out.push(p as FlatPost);
      // サマリー用に metaPost があれば拾いたい場合はここで
      // if (sub.metaPost) out.push(sub.metaPost as FlatPost);
    }
  }

  // slug重複を除外
  const seen = new Set<string>();
  return out.filter((p) => {
    if (!p?.slug || seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

function toTime(s?: string) {
  if (!s) return 0;
  const t = new Date(s).getTime();
  return Number.isFinite(t) ? t : 0;
}

function ord(p: { order?: number }) {
  return Number.isFinite(p.order as number)
    ? (p.order as number)
    : Number.POSITIVE_INFINITY; // 未指定は最後
}

/** 最新順に上位N件（updated > date）。同時刻は order 昇順→slug 昇順。 */
export function getLatestPosts(limit = 10) {
  const now = Date.now();
  return flattenPosts()
    .filter((p) => !p.draft)
    .map((p) => ({
      p,
      t: Math.max(toTime(p.updated), toTime(p.date)),
      o: ord(p),
    }))
    .filter((x) => x.t > 0 && x.t <= now)
    .sort((a, b) => {
      if (b.t !== a.t) return b.t - a.t; // 1) 新しい順
      if (a.o !== b.o) return a.o - b.o; // 2) order 昇順
      return (a.p.slug || "").localeCompare(b.p.slug || ""); // 3) 安定化
    })
    .slice(0, limit)
    .map((x) => x.p);
}