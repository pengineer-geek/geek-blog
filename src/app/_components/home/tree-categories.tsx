'use client';

import Link from 'next/link';
import type { SectionIndex, SubIndex, PostMeta } from 'generated/post-index'; // ← @generated の型を使う
type PostIndexData = { sections: SectionIndex[] };

// 4カテゴリと、それに含める sectionKey の対応表
const CATEGORY_MAP = {
  career: {
    label: 'キャリア',
    href: '/categories/career',
    sections: ['diary', 'column'],
  },
  tech: {
    label: 'テック',
    href: '/categories/tech',
    sections: ['how-to-setup', 'tech-intro'],
  },
  wellness: {
    label: 'ウェルネス',
    href: '/categories/wellness',
    sections: ['training', 'nutrition', 'recovery'],
  },
  wellbeing: {
    label: 'ウェルビーイング',
    href: '/categories/wellbeing',
    sections: ['others'],
  },
} as const;

type Props = { indexData: PostIndexData };

// index から各カテゴリのタグ一覧を作る
function buildCategoryTags(indexData: PostIndexData) {
  const out: Record<
    keyof typeof CATEGORY_MAP,
    { label: string; href: string; tags: string[] }
  > = {
    career: { label: CATEGORY_MAP.career.label, href: CATEGORY_MAP.career.href, tags: [] },
    tech: { label: CATEGORY_MAP.tech.label, href: CATEGORY_MAP.tech.href, tags: [] },
    wellness: { label: CATEGORY_MAP.wellness.label, href: CATEGORY_MAP.wellness.href, tags: [] },
    wellbeing: { label: CATEGORY_MAP.wellbeing.label, href: CATEGORY_MAP.wellbeing.href, tags: [] },
  };

  const sectionByKey = new Map(indexData.sections.map(s => [s.key, s]));

  (Object.keys(CATEGORY_MAP) as Array<keyof typeof CATEGORY_MAP>).forEach(catKey => {
    const conf = CATEGORY_MAP[catKey];
    const tagSet = new Set<string>();

    conf.sections.forEach(secKey => {
      const sec = sectionByKey.get(secKey);
      if (!sec) return;
      sec.subs?.forEach((sub: SubIndex) => {
        sub.posts?.forEach((p: PostMeta) => {
          p.tags?.forEach(t => tagSet.add(t));
        });
      });
    });

    // 日本語タグの見やすいソート
    out[catKey].tags = Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'ja'));
  });

  return out;
}

export default function TreeCategories({ indexData }: Props) {
  const cats = buildCategoryTags(indexData);

  return (
    <nav aria-label="カテゴリ ツリー" className="rounded-xl border border-border bg-white p-4 md:p-6">
      <ul className="space-y-6">
        {(Object.keys(CATEGORY_MAP) as Array<keyof typeof CATEGORY_MAP>).map(catKey => {
          const node = cats[catKey];
          return (
            <li key={catKey}>
              <details open>
                <summary className="cursor-pointer list-none text-lg font-bold text-primary hover:opacity-80">
                  <Link href={node.href} className="underline-offset-4 hover:underline">
                    {node.label}
                  </Link>
                </summary>

                {node.tags.length > 0 && (
                  <ul className="mt-2 grid grid-cols-1 gap-1 border-l-2 border-primary/20 pl-4 sm:grid-cols-2 md:grid-cols-3">
                    {node.tags.map(tag => (
                      <li key={tag}>
                        <Link
                          href={`${node.href}?tag=${encodeURIComponent(tag)}`}
                          className="text-sm text-text/80 hover:text-primary hover:underline underline-offset-4"
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
