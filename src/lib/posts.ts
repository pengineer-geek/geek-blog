// src/lib/posts.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { validateTags, CategoryKey } from "./tags";

export type Frontmatter = {
  title: string;
  date?: string;
  updated?: string;
  tags?: string[];
  category?: CategoryKey | string;
  excerpt?: string;
  cover?: string;      // 例: "/images/og-keyboard.jpg"
  hero?: { file: string; alt: string };
  slug?: string;
};

export type Post = {
  slug: string[];      // 例: ["tech", "gadget", "keyboard-mechanical"]
  url: string;         // 例: "/posts/tech/gadget/keyboard-mechanical"
  content: string;     // MDX 本文
  data: Frontmatter;   // フロントマター
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function toUrl(slugParts: string[]) {
  return `/posts/${slugParts.join("/")}`;
}

async function walkMdxFiles(dir: string, prefix: string[] = []): Promise<string[][]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result: string[][] = [];

  for (const ent of entries) {
    if (ent.isDirectory()) {
      result.push(...(await walkMdxFiles(path.join(dir, ent.name), [...prefix, ent.name])));
    } else if (ent.isFile() && ent.name.endsWith(".mdx")) {
      const base = ent.name.replace(/\.mdx$/, "");
      result.push([...prefix, base]);
    }
  }
  return result;
}

export async function getAllPostSlugs(): Promise<string[][]> {
  try {
    return await walkMdxFiles(CONTENT_DIR);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slugParts: string[]): Promise<Post> {
  const filePath = path.join(CONTENT_DIR, ...slugParts) + ".mdx";
  const raw = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(raw);

  const category =
    (data.category as string | undefined) ??
    (slugParts.length > 0 ? (slugParts[0] as string) : undefined);

  const safeTags = validateTags(category as CategoryKey, data.tags);

  return {
    slug: slugParts,
    url: toUrl(slugParts),
    content,
    data: {
      title: data.title,
      date: data.date,
      updated: data.updated,
      tags: safeTags,
      category: category as CategoryKey,
      excerpt: data.excerpt,
      cover: data.cover,
      hero: data.hero,
      slug: slugParts.join("/"),
    },
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(slugs.map((s) => getPostBySlug(s)));

  // date があれば新しい順にソート
  posts.sort((a, b) => {
    const ad = a.data.updated ?? a.data.date ?? "1970-01-01";
    const bd = b.data.updated ?? b.data.date ?? "1970-01-01";
    return bd.localeCompare(ad);
  });

  return posts;
}
