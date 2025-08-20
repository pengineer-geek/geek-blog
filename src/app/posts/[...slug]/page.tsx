// src/app/posts/[...slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import BackLinks from "@/app/_components/navigation/back-links";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { mdxComponents, mdxOptions } from "@/app/_components/mdx/config";
import ArticleHero from "@/app/_components/img/article-hero";
import { imgUrl } from "@/lib/img";

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

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10 pt-14">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {data?.title ?? ""}
        </h1>
        {date && (
          <p className="mt-2 text-sm text-gray-500">
            {new Date(date).toLocaleDateString("ja-JP")}
          </p>
        )}
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

      <BackLinks category={slug?.[0]} />
    </main>
  );
}
