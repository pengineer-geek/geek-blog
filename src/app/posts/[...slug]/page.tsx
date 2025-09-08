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

// --- helpers ---
import postIndex, { PostMeta } from "generated/post-index";

function buildHrefFromStringSlug(s: string) {
  const parts = s.split("/").filter(Boolean);
  return "/posts/" + parts.map(encodeURIComponent).join("/");
}

function sortByNumber(a?: number, b?: number) {
  const av = typeof a === "number" ? a : Number.POSITIVE_INFINITY;
  const bv = typeof b === "number" ? b : Number.POSITIVE_INFINITY;
  return av - bv;
}

function shouldSkip(p: PostMeta) {
  // 1) diary の meta サブ（サマリー等）は除外
  if (p.subKey === "meta") return true;
  // 2) 将来の拡張: frontmatter で navSkip: true を入れたら除外
  if ((p as any)?.navSkip === true) return true;
  // 3) 念のため slug 末尾 /meta の単体ページも除外
  if (p.slug.endsWith("/meta")) return true;
  return false;
}

function flattenSection(sectionKey: string): PostMeta[] {
  const section = postIndex.sections.find((s) => s.key === sectionKey);
  if (!section) return [];
  const subs = [...section.subs].sort((a, b) => sortByNumber(a.order, b.order));
  const acc: PostMeta[] = [];
  for (const sub of subs) {
    const posts = [...sub.posts]
      .sort((a, b) => sortByNumber(a.order, b.order))
      .filter((p) => !shouldSkip(p));
    acc.push(...posts);
  }
  return acc;
}

function findPrevNextByIndex(sectionKey: string, currentSlugParts: string[]) {
  const list = flattenSection(sectionKey);
  const currentSlug = currentSlugParts.join("/");
  const i = list.findIndex((p) => p.slug === currentSlug);
  if (i === -1) return { prev: undefined as PostMeta | undefined, next: undefined as PostMeta | undefined };
  const prev = i > 0 ? list[i - 1] : undefined;
  const next = i < list.length - 1 ? list[i + 1] : undefined;
  return { prev, next };
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
  // sectionKey は Frontmatter 未定義の可能性があるため slug から安全に推定
  // slug 例: ["career", "diary", ...] → sectionKey = "diary"
  const safeSectionKey = (data as any)?.sectionKey ?? post.slug?.[1];
  const { prev, next } = safeSectionKey
    ? findPrevNextByIndex(safeSectionKey, post.slug ?? "")
    : { prev: undefined, next: undefined };

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
              href={buildHrefFromStringSlug(prev.slug)}
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
              href={buildHrefFromStringSlug(next.slug)}
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
