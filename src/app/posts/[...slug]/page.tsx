// src/app/posts/[...slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import BackLinks from "@/app/_components/navigation/back-links";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { mdxComponents, mdxOptions } from "@/app/_components/mdx/config";

// --- ルーティング (SSG) ---
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs(); // 例: string[][]
  return slugs.map((slug) => ({ slug })); // slug は string[]
}

// --- メタデータ生成 ---
// ★ Next15/React19 RC では params は Promise
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    const title = post.data.title ?? post.slug.at(-1) ?? "Post";
    const desc = post.data.excerpt ?? "";
    const ogImage =
      post.data.cover ?? `/api/og?title=${encodeURIComponent(title)}`;

    return {
      title,
      description: desc,
      openGraph: {
        title,
        description: desc,
        images: [{ url: ogImage }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: desc,
        images: [ogImage],
      },
    };
  } catch {
    return { title: "Post" };
  }
}

// --- MDX内で使うコンポーネント（必要に応じて拡張） ---
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
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={mdxOptions}
        />
      </article>

      <BackLinks category={slug?.[0]} />
    </main>
  );
}
