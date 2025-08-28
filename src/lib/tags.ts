import fs from "fs";
import path from "path";
import yaml from "yaml";

export type CategoryKey = "career" | "tech" | "wellness" | "wellbeing";

const TAGS_PATH = path.join(process.cwd(), "src/data/tags.yaml");

let cache: Record<CategoryKey, string[]> | null = null;

export function getAllTags(): Record<CategoryKey, string[]> {
  if (cache) return cache;
  const raw = fs.readFileSync(TAGS_PATH, "utf8");
  const parsed = yaml.parse(raw) as Record<string, string[]>;
  cache = parsed as Record<CategoryKey, string[]>;
  return cache!;
}

export function validateTags(
  category: CategoryKey | string | undefined,
  tags: unknown
): string[] {
  if (!Array.isArray(tags)) return [];
  const all = getAllTags();
  const list = (category && (all as any)[category]) as string[] | undefined;
  if (!list) return tags; // カテゴリ未指定ならそのまま返す（緩め）

  const set = new Set(list);
  return tags.filter((t) => {
    const ok = typeof t === "string" && set.has(t);
    if (!ok) {
      // ビルド時にコンソールで気づける程度の注意
      console.warn(`[tags] Unknown tag "${t}" for category "${category}"`);
    }
    return ok;
  });
}
