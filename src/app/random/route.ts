import { NextResponse } from "next/server";
import postIndex from "generated/post-index";
import type { PostMeta, SectionIndex } from "generated/post-index";

export const dynamic = "force-dynamic"; // 毎回ランダム
export const runtime = "nodejs";

function seedFromString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// クエリ: ?prefix=career/&prefix=tech/&tag=...&section=...&sub=...&exclude=...&seed=...
function readParams(url: string) {
  const u = new URL(url);
  return {
    prefixes: u.searchParams.getAll("prefix"),
    tags: u.searchParams.getAll("tag"),
    sections: u.searchParams.getAll("section"),
    subs: u.searchParams.getAll("sub"),
    exclude: new Set(u.searchParams.getAll("exclude")),
    seed: u.searchParams.get("seed") ?? undefined,
  };
}

function collectPool(params: ReturnType<typeof readParams>): PostMeta[] {
  const secs: SectionIndex[] = postIndex.sections;
  const out: PostMeta[] = [];
  for (const sec of secs) {
    if (params.sections.length && !params.sections.includes(sec.key)) continue;
    for (const sub of sec.subs) {
      if (sub.key === "meta") continue; // 説明用subは除外
      if (params.subs.length && !params.subs.includes(sub.key)) continue;
      for (const p of sub.posts) {
        if (params.exclude.has(p.slug)) continue;
        if (params.prefixes.length && !params.prefixes.some((pre) => p.slug.startsWith(pre))) continue;
        if (params.tags.length && !(p.tags ?? []).some((t) => params.tags.includes(t))) continue;
        out.push(p);
      }
    }
  }
  return out;
}

export async function GET(req: Request) {
  const params = readParams(req.url);
  const pool = collectPool(params);

  if (pool.length === 0) {
    // 何もヒットしなければトップへ戻す
    return NextResponse.redirect(new URL("/", req.url), { status: 302 });
  }

  // 乱択（seed指定あれば再現性あり）
  const rnd = params.seed ? mulberry32(seedFromString(params.seed))() : Math.random();
  const pick = pool[Math.floor(rnd * pool.length)];

  const target = new URL(`/posts/${pick.slug}`, req.url);
  const res = NextResponse.redirect(target, { status: 302 });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
