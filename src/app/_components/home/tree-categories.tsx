'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { SectionIndex, SubIndex, PostMeta } from 'generated/post-index';
type PostIndexData = { sections: SectionIndex[] };

// ─────────────────────────────────────────────
// 表示系ラベルのマッピング（必要に応じて拡張）
const CATEGORY_MAP = {
  career: { label: 'キャリア', href: '/categories/career', sections: ['diary', 'column'] },
  tech: { label: 'テック', href: '/categories/tech', sections: ['how-to-setup', 'tech-intro', 'gadget'] },
  wellness: { label: 'ウェルネス', href: '/categories/wellness', sections: ['training', 'nutrition', 'recovery'] },
  wellbeing: { label: 'ウェルビーイング', href: '/categories/wellbeing', sections: ['others'] },
} as const;

const SECTION_LABEL_JA: Record<string, string> = {
  diary: "ペンギニア's リアル ダイアリー",
  column: 'コラム',
  'how-to-setup': '個人ブログ開設・運営',
  'tech-intro': '技術紹介',
  gadget: 'ガジェット',
  training: '鍛錬',
  nutrition: '栄養',
  recovery: '休養',
  others: 'その他',
};
const SUB_LABEL_JA: Record<string, string> = {
  'high-school': 'ハイスクール編 @自称進学校',
  university: 'キャンパスライフ編 @都内私立大学(理工)',
  'graduate-school': 'ブラック研究室編 @都内私立大学院(工学)',
  'job-hunting': '新卒就活編',
  'game-planner': '新卒ゲームプランナー編 @メガベンチャー',
  'no-job': '無職編 @プログラミングスクール',
  'junior-engineer': 'ジュニアエンジニア @受託・SES(小規模)',
  'middle-engineer-1-1': 'ミドルエンジニア 新天地 編 @自社開発(小規模)',
  'middle-engineer-1-2': 'ミドルエンジニア 業務効率化 編 @自社開発(小規模)',
  'middle-engineer-1-3': 'ミドルエンジニア EC事業部 編 @自社開発(小規模)',
  'middle-engineer-1-4': 'ミドルエンジニア 転職 編 @自社開発(小規模)',
  sidejob: '副業エンジニア編 @受託・SES(極小規模)',
  'career-up': 'キャリアアップ',
  'web-industry': 'Web業界',
  qualification: '資格',
  workstyle: '働き方',
  literacy: 'リテラシー',
  'how-to-start': 'サイト構築・運用',
  'weight-training': 'ウェイトトレーニング',
  bjj: 'ブラジリアン柔術',
  recipe: 'レシピ',
  supplement: 'サプリメント',
  sleep: '睡眠',
  relax: 'リラックス',
  habit: '習慣',
};
// ─────────────────────────────────────────────

function toPostHref(slug: string) {
  const s = slug.replace(/^\/+|\/+$/g, '');         // 両端の / を除去
  return s.startsWith('post/') ? `/${s}` : `/post/${s}`;
}

/** フォールバック：key を見やすい日本語に（未定義時） */
function labelFromKey(key: string) {
  return SUB_LABEL_JA[key] || SECTION_LABEL_JA[key] || key.replace(/-/g, ' ');
}

type Props = { indexData: PostIndexData };

export default function TreeCategories({ indexData }: Props) {
  // id 体系: root / cat:{career} / sec:{career}:{sectionKey} / sub:{career}:{sectionKey}:{subKey}
  // 末端(記事)は leaf:{slug}
  const initialOpen = new Set<string>(['root']); // ルートのみ初期展開（=カテゴリが見える）
  const [open, setOpen] = useState<Set<string>>(initialOpen);

  const toggle = (id: string) =>
    setOpen(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  // indexData → カテゴリ別に絞り込んだ木構造に
  const tree = useMemo(() => {
    const secMap = new Map(indexData.sections.map(s => [s.key, s]));
    return (Object.keys(CATEGORY_MAP) as Array<keyof typeof CATEGORY_MAP>).map(catKey => {
      const cat = CATEGORY_MAP[catKey];
      const sections = cat.sections
        .map(sk => secMap.get(sk))
        .filter(Boolean) as SectionIndex[];

      return {
        id: `cat:${catKey}`,
        label: cat.label,
        href: cat.href,
        children: sections.map(sec => ({
          id: `sec:${catKey}:${sec.key}`,
          label: labelFromKey(sec.key),
          children: sec.subs.map((sub: SubIndex) => ({
            id: `sub:${catKey}:${sec.key}:${sub.key}`,
            label: labelFromKey(sub.key),
            children: sub.posts.map((p: PostMeta) => ({
              id: `leaf:${p.slug}`,
              label: p.title,
              href: toPostHref(p.slug),
            })),
          })),
        })),
      };
    });
  }, [indexData]);

  // UI
  return (
    <nav aria-label="記事ツリー" className="rounded-xl border border-border bg-white p-4 md:p-6">
      {/* ルート */}
      <div className="mb-2">
        <button
          onClick={() => toggle('root')}
          className="flex items-center gap-2 text-lg font-bold text-primary"
          aria-expanded={open.has('root')}
        >
          <Chevron isOpen={open.has('root')} />
          ルート
        </button>
      </div>

      {/* カテゴリ（root配下） */}
      {open.has('root') && (
        <ul className="ml-6 space-y-2">
          {tree.map(cat => (
            <li key={cat.id}>
              <Row
                id={cat.id}
                label={cat.label}
                linkHref={cat.href}
                open={open}
                toggle={toggle}
              />
              {open.has(cat.id) && (
                <ul className="ml-6 mt-1 space-y-1 border-l-2 border-primary/20 pl-3">
                  {cat.children.map(sec => (
                    <li key={sec.id}>
                      <Row id={sec.id} label={sec.label} open={open} toggle={toggle} />
                      {open.has(sec.id) && (
                        <ul className="ml-6 mt-1 space-y-1 border-l border-primary/10 pl-3">
                          {sec.children.map(sub => (
                            <li key={sub.id}>
                              <Row id={sub.id} label={sub.label} open={open} toggle={toggle} />
                              {open.has(sub.id) && (
                                <ul className="ml-6 mt-1 space-y-1 pl-1">
                                  {sub.children.map(leaf => (
                                    <li key={leaf.id}>
                                      <Link
                                        href={leaf.href!}
                                        className="text-sm text-text/80 hover:text-primary hover:underline underline-offset-4"
                                      >
                                        {leaf.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

// 行（トグル＋ラベル＋任意リンク）
function Row({
  id,
  label,
  linkHref,
  open,
  toggle,
}: {
  id: string;
  label: string;
  linkHref?: string;
  open: Set<string>;
  toggle: (id: string) => void;
}) {
  const expanded = open.has(id);
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => toggle(id)}
        className="inline-flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100"
        aria-expanded={expanded}
        aria-controls={`${id}-panel`}
      >
        <Chevron isOpen={expanded} />
      </button>
      {linkHref ? (
        <Link href={linkHref} className="font-semibold text-primary underline-offset-4 hover:underline">
          {label}
        </Link>
      ) : (
        <span className="font-semibold text-text">{label}</span>
      )}
    </div>
  );
}

function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d={
          isOpen
            ? 'M5.23 7.21a.75.75 0 011.06.02L10 11.084l3.71-3.853a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z'
            : 'M7.21 14.77a.75.75 0 01-.02-1.06L10.94 10 7.19 6.29a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06.02z'
        }
        clipRule="evenodd"
      />
    </svg>
  );
}
