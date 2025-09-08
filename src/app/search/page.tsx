// src/app/search/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { listAllPosts } from "@/lib/posts";
import TagList from "@/app/_components/tags/tag-list";
import BackLink from "@/app/_components/navigation/back-link";
import { IconSearch } from "@/app/_components/icons";
import { imgUrl } from "@/lib/img";
import TagPicker from "@/app/_components/tags/tag-picker";
import { loadTagGroups } from "@/lib/tags";

function toArray<T>(v: T | T[] | undefined): T[] {
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}

function normTag(t: string) {
  return t.trim().toLowerCase();
}

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ tag?: string | string[]; q?: string }> }
): Promise<Metadata> {
  const sp = await searchParams;
  const tags = toArray(sp.tag).flatMap(s => s.split(",")).map(normTag);
  const q = sp.q?.trim();
  const title =
    tags.length && q
      ? `検索: ${tags.join(", ")} / "${q}"`
      : tags.length
      ? `検索: ${tags.join(", ")}`
      : q
      ? `検索: "${q}"`
      : "検索";

  return { title };
}

export default async function SearchPage(
  { searchParams }: { searchParams: Promise<{ tag?: string | string[]; q?: string }> }
) {
  const sp = await searchParams;
  const tags = toArray(sp.tag).flatMap(s => s.split(",")).map(normTag); // ?tag=a,b or ?tag=a&tag=b
  const q = (sp.q ?? "").trim();

  const all = await listAllPosts();

  const hit = all.filter((p) => {
    const isNotMeta = p.subKey !== "meta";

    // タグフィルタ
    const tagOk =
      tags.length === 0
        ? true
        : (p.tags ?? []).map(normTag).some(t => tags.includes(t));

    // キーワードフィルタ（タイトル・抜粋）
    const qOk =
      q === ""
        ? true
        : (p.title + " " + (p.excerpt ?? "")).toLowerCase().includes(q.toLowerCase());

    return tagOk && qOk && isNotMeta;
  });

  const groups = await loadTagGroups();

  return (
    <main className="container pt-14 pb-10 md:pt-14 md:pb-14">
      {/* トップへ戻る */}
      <div className="mb-4">
        <BackLink href="/" label="トップに戻る" />
      </div>

      {/* ヘッダ */}
      <div className="mb-6 flex items-center gap-3 text-primary">
        <IconSearch className="h-7 w-7" />
        <h1 className="text-3xl font-extrabold text-text md:text-4xl">検索</h1>
        <p className="mt-2 text-gray-600">
          {tags.length > 0 && (
            <>
              タグ:{" "}
              <span className="font-medium">{tags.join(", ")}</span>
              {q && " / "}
            </>
          )}
          {q && <>キーワード: <span className="font-medium">&quot;{q}&quot;</span></>}
          {(tags.length > 0 || q) && <>（{hit.length}件）</>}
        </p>

        {/* クリアボタン */}
        {(tags.length > 0 || q) && (
          <div className="mt-3">
            <Link
              href="/search"
              className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              クリア
            </Link>
          </div>
        )}
      </div>

      {/* 空状態 */}
      {tags.length === 0 && !q && (
        <p className="text-gray-600">
          上のURLに <code>?tag=xxx</code>（カンマ区切り可）や <code>?q=keyword</code> を付けて検索できます。<br />
          例: <code>/search?tag=新卒,ゲーム業界</code> / <code>/search?q=キーボード</code>
        </p>
      )}

      {/* タグから探す */}
      <section className="container py-10 md:py-14 rounded-xl bg-gray-100">
        <h2 className="mb-4 text-2xl font-extrabold text-text md:text-3xl">
          タグから探す
        </h2>

        {/* 「キャリア / テック / …」の見出しでグループ化してチップを表示 */}
        <TagPicker
          groups={{
            キャリア: groups.career,
            テック: groups.tech,
            ウェルネス: groups.wellness,
            ウェルビーイング: groups.wellbeing,
          }}
        />
      </section>

      {/* 結果 */}
      <ul className="mt-6 space-y-3">
        {hit.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="flex gap-3 rounded-xl border bg-white p-3 transition hover:border-primary/50 hover:bg-primary/5"
            >
              <img
                src={imgUrl(p.slug.join("/"), "cover.jpg")}
                alt={p.title}
                className="h-12 w-16 flex-shrink-0 rounded object-cover"
              />

              <div className="min-w-0">
                <h3 className="font-bold text-link line-clamp-1">{p.title}</h3>
                {p.excerpt && (
                  <p className="mt-0.5 text-sm text-gray-600 line-clamp-2">{p.excerpt}</p>
                )}
                {/* タグ */}
                <TagList tags={p.tags} className="mt-2" size="sm" />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* 戻る */}
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-primary">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
