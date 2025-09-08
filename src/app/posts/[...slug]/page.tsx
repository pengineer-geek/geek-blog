// src/app/posts/[...slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import BackLinks from "@/app/_components/navigation/back-links";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { mdxComponents, mdxOptions } from "@/app/_components/mdx/config";
import ArticleHero from "@/app/_components/img/article-hero";
import { imgUrl } from "@/lib/img";
import TagList from "@/app/_components/tags/tag-list";
import { ArrowLeft, ArrowRight } from "lucide-react";

// --- types (lightweight) ---
type PostLite = {
  slug: string[];
  title: string;
  sectionKey?: string;
  subKey?: string;
  order?: number;
  date?: string;
  updated?: string;
};

// --- helpers ---
function sortVal(p: PostLite) {
  // 1) order が定義されていれば order で昇順
  if (typeof p.order === "number") return [0, p.order];
  // 2) updated / date の新しい順（ただし並びは昇順にしたいので古い→新しいの評価用タプルに）
  const d = new Date(p.updated ?? p.date ?? 0).getTime();
  if (d) return [1, d];
  // 3) 最後に slug を文字列として
  return [2, p.slug.join("/")];
}

function byAsc(a: PostLite, b: PostLite) {
  const av = sortVal(a);
  const bv = sortVal(b);
  if (av[0] !== bv[0]) return (av[0] as number) - (bv[0] as number);
  // number / string 両対応
  if (av[1] < bv[1]) return -1;
  if (av[1] > bv[1]) return 1;
  return 0;
}

async function getAllPostsLite(): Promise<PostLite[]> {
  const slugs = await getAllPostSlugs();
  const posts: PostLite[] = [];
  for (const slug of slugs) {
    try {
      const p = await getPostBySlug(slug);
      posts.push({
        slug: p.slug,
        title: p.data.title ?? p.slug.at(-1) ?? "",
        sectionKey: p.data.sectionKey,
        subKey: p.data.subKey,
        order: typeof p.data.order === "number" ? p.data.order : undefined,
        date: p.data.date,
        updated: p.data.updated,
      });
    } catch {
      // skip corrupted
    }
  }
  return posts.sort(byAsc);
}

function buildHref(slug: string[]) {
  return "/posts/" + slug.map(encodeURIComponent).join("/");
}

// --- ルーティング (SSG) ---
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// --- メタデータ生成 ---
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    const title = post.data.title ?? post.slug.at(-1) ?? "Post";
    const desc = post.data.excerpt ?? "";

    // ★ hero をOGに使う（hero.fileがあればR2のURLを組み立て）
    const ogImage = post.data.hero?.file && post.data.slug
      ? imgUrl(post.data.slug, post.data.hero.file)
      : `/api/og?title=${encodeURIComponent(title)}`;

    return {
      title,
      description: desc,
      openGraph: { title, description: desc, images: [{ url: ogImage }] },
      twitter: { card: "summary_large_image", title, description: desc, images: [ogImage] },
    };
  } catch {
    return { title: "Post" };
  }
}

// --- ページ本体 ---
export default async function PostPage(
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => notFound());
  const { data, content } = post;
  const date = data.updated ?? data.date;

  // === Prev/Next 探索ロジック ===
  const all = await getAllPostsLite();

  const pool: PostLite[] = all.filter((p) => p.sectionKey === data.sectionKey);

  // プールに自分が含まれない場合はナビゲーション無し
  const selfIdx = pool.findIndex((p) => p.slug.join("/") === post.slug.join("/"));
  const prev = selfIdx > 0 ? pool[selfIdx - 1] : undefined;
  const next = selfIdx >= 0 && selfIdx < pool.length - 1 ? pool[selfIdx + 1] : undefined;

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10 pt-14">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {data?.title ?? ""}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {data.excerpt ?? ""}
        </p>
        {date && (
          <p className="mt-2 text-sm text-gray-500">
            {new Date(date).toLocaleDateString("ja-JP")}
          </p>
        )}
        {data.tags?.length ? <TagList tags={data.tags} size="md" /> : null}
      </header>

      {/* ★ heroセクション（data.heroがあれば表示） */}
      {data?.hero?.file && data?.slug && (
        <figure className="mb-8 overflow-hidden rounded-xl border shadow-sm">
          <ArticleHero slug={data.slug} hero={data.hero} />
        </figure>
      )}

      <article className="prose prose-zinc max-w-none dark:prose-invert">
        <MDXRemote source={content} components={mdxComponents} options={mdxOptions} />
      </article>

      {/* === Prev / Next ナビゲーション === */}
      {(prev || next) && (
        <nav className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Prev */}
          {prev ? (
            <Link
              href={buildHref(prev.slug)}
              className="group flex items-center gap-3 rounded-xl border p-4 no-underline shadow-sm transition hover:shadow-md"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 opacity-70 transition group-hover:opacity-100" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">前の記事</p>
                <p className="truncate font-medium">{prev.title}</p>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {/* Next */}
          {next ? (
            <Link
              href={buildHref(next.slug)}
              className="group flex items-center justify-end gap-3 rounded-xl border p-4 no-underline shadow-sm transition hover:shadow-md"
            >
              <div className="min-w-0 text-right">
                <p className="text-xs text-gray-500">次の記事</p>
                <p className="truncate font-medium">{next.title}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 opacity-70 transition group-hover:opacity-100" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}

      <BackLinks category={slug?.[0]} />
    </main>
  );
}
