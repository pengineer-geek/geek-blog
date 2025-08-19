// src/app/posts/[...slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import BackLinks from "@/app/_components/back-links";

import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

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
const mdxComponents = {
  // eslint-disable-next-line @next/next/no-img-element
  img: (props: any) => <img {...props} className="my-4 rounded-lg" />,
  h2: (props: any) => <h2 {...props} className="mt-10 mb-3 text-2xl font-bold" />,
  h3: (props: any) => <h3 {...props} className="mt-8 mb-2 text-xl font-bold" />,
  p:  (props: any) => <p  {...props} className="my-4 leading-relaxed" />,
  ul: (props: any) => <ul {...props} className="my-4 list-disc pl-6 space-y-1" />,
  ol: (props: any) => <ol {...props} className="my-4 list-decimal pl-6 space-y-1" />,
  code: (props: any) => (
    <code
      {...props}
      className={`rounded bg-gray-100 px-1 py-0.5 text-sm ${props.className ?? ""}`}
    />
  ),
  pre: (props: any) => (
    <pre
      {...props}
      className={`my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100 ${props.className ?? ""}`}
    />
  ),
};

// ★ ここも params は Promise。最初に await してから使う
export default async function PostPage(
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { data, content } = post;
  const date = data.updated ?? data.date;

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      {/* タイトル */}
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {data.title}
        </h1>
        {date && (
          <p className="mt-2 text-sm text-gray-500">
            {new Date(date).toLocaleDateString("ja-JP")}
          </p>
        )}
        {data.tags?.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {data.tags.map((t) => (
              <li key={t} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                #{t}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {/* カバー画像（任意） */}
      {data.cover && (
        <div className="mb-8 overflow-hidden rounded-xl border">
          <Image
            src={data.cover}
            alt={data.title ?? ""}
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </div>
      )}

      {/* 本文（MDX） */}
      <article className="prose prose-zinc max-w-none dark:prose-invert">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
            },
          }}
        />
      </article>

      {/* 戻る */}
      <BackLinks category={slug?.[0]} />
    </main>
  );
}
