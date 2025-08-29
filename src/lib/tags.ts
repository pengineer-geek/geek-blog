// src/lib/tags.ts
import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";

export type CategoryKey = "career" | "tech" | "wellness" | "wellbeing";
export type TagGroups = Record<CategoryKey, string[]>;

const TAGS_PATH = path.join(process.cwd(), "src/data/tags.yaml");

let cache: TagGroups | null = null;

/** tags.yaml を読み込んでキャッシュ（非同期 & サーバー専用） */
export async function loadTagGroups(): Promise<TagGroups> {
  if (cache) return cache;
  const raw = await readFile(TAGS_PATH, "utf8");
  const data = parse(raw) as Record<string, string[]>;

  // 空配列でフォールバックして型を固定
  cache = {
    career: data.career ?? [],
    tech: data.tech ?? [],
    wellness: data.wellness ?? [],
    wellbeing: data.wellbeing ?? [],
  };
  return cache!;
}

/** 単一カテゴリのタグ配列を取得 */
export async function getCategoryTags(category: CategoryKey): Promise<string[]> {
  const groups = await loadTagGroups();
  return groups[category] ?? [];
}

/** "a,b" / ["a","b"] / undefined すべてを配列に正規化 */
export function splitTags(input?: string | string[]): string[] {
  if (!input) return [];
  const arr = Array.isArray(input) ? input : [input];
  return arr
    .flatMap((s) => s.split(","))
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * カテゴリに存在するタグだけに絞り込む（存在しないタグは console.warn）
 * - category を省略するとバリデーションせず正規化のみ
 */
export async function validateTags(
  category: CategoryKey | undefined,
  tags: string[] | string | undefined
): Promise<string[]> {
  const list = splitTags(tags);
  if (!category) return list;

  const valid = new Set(await getCategoryTags(category));
  return list.filter((t) => {
    const ok = valid.has(t);
    if (!ok) console.warn(`[tags] Unknown tag "${t}" for category "${category}"`);
    return ok;
  });
}

/** 全カテゴリをフラット化（UI 等で使う） */
export async function allTagsFlat(): Promise<{ key: CategoryKey; tag: string }[]> {
  const g = await loadTagGroups();
  return (Object.keys(g) as CategoryKey[]).flatMap((key) =>
    g[key].map((tag) => ({ key, tag }))
  );
}
