"use client";

import { useState } from "react";
import Link from "next/link";
import { IconDiary, IconColumn } from "@/app/_components/icons";
import { imgUrl } from "@/lib/img";
import TagList from  "@/app/_components/tags/tag-list";

// 生成物（型付き）
import postIndex from "generated/post-index";
import type { SectionIndex, SubIndex, PostMeta } from "generated/post-index";

const TOP_PREFIX = "career/";

// UI用の型
type Post = {
  title: string;
  slug: string;
  excerpt?: string;
  tags?: string[];
};
type Sub = { key: string; title: React.ReactNode; posts: Post[] };
type Section = {
  key: string;
  title: React.ReactNode;
  desc: string;
  icon: React.ReactNode;
  subs: Sub[];
  metaPost?: Post;
};

// セクション見出し
type SubMetaBySection = Record<string, Record<string, { title: React.ReactNode }>>;
const SECTION_META: Record<string, { title: React.ReactNode; desc: string; icon: React.ReactNode }> = {
  diary: {
    title: (
      <>
        <span className="text-primary">
          <span>ペンジニア&apos;s</span>
          <br />
          Real Diary
        </span>
      </>
    ),
    desc: "時系列に沿ったペンジニアのリアルな記録",
    icon: <IconDiary className="h-6 w-6" />,
  },
  column: {
    title: <span className="text-primary">コラム</span>,
    desc: "キャリア形成や働き方などに関するあれこれ",
    icon: <IconColumn className="h-6 w-6" />,
  },
};

const SUB_META: SubMetaBySection = {
  // ▼ ダイアリー用
  diary: {
    "high-school": { title: <>ハイスクール編<br />@ 自称進学校</> },
    "university": { title: <>キャンパスライフ編<br />@ 都内Aランク私立大学(理工学部)</> },
    "graduate-school": { title: <>ブラック研究室編<br />@ 都内私立大学院(工学)</> },
    "job-hunting": { title: <>新卒就活編<br />@ 都内私立大学院(工学)</> },
    "game-planner": { title: <>新卒ゲームプランナー編<br />@ ゲーム会社(メガベンチャー)</> },
    "no-job": { title: <>無職編<br />@ プログラミングスクール</> },
    "junior-engineer": { title: <>ジュニアエンジニア編<br />@ 受託SES企業(小規模)</> },
    "middle-engineer-1-1": { title: <>ミドルエンジニア 新天地 編<br />@ 自社開発企業(小規模)</> },
    "middle-engineer-1-2": { title: <>ミドルエンジニア 業務効率化 編<br />@ 自社開発企業(小規模)</> },
    "sidejob": { title: <>副業エンジニア編<br />@ 受託SES企業(極小規模)</> },
    "middle-engineer-1-3": { title: <>ミドルエンジニア EC事業部 編<br />@ 自社開発企業(小規模)</> },
    "middle-engineer-1-4": { title: <>ミドルエンジニア 転職 編<br />@ 自社開発企業(小規模)</> },
  },

  // ▼ コラム用（同じ subKey を別表示にできる）
  column: {
    "job-hunting": { title: <>就活・転職</> },
    "career-up": { title: <>キャリアアップ</> },
    "qualification": { title: <>資格</> },
    "workstyle": { title: <>ワークスタイル</> },
    "literacy": { title: <>情報リテラシー</> },
  },

  // ▼ どのセクションにも共通で効くデフォルト（任意）
  "*": {
    // 例: "meta": { title: "このセクションについて" },
  },
};

const href = (slug: string) => `/posts/${slug}`;

export default function AccordionCareer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  // ① 生成物の型を明示
  const sourceSections: SectionIndex[] = postIndex.sections;

  // ② career/ だけを残す（型を維持）
  const filteredSections: SectionIndex[] = sourceSections
    .map<SectionIndex>((sec) => ({
      key: sec.key,
      subs: sec.subs
        .map<SubIndex>((sub) => ({
          key: sub.key,
          posts: sub.posts.filter((p: PostMeta) => p.slug.startsWith(TOP_PREFIX)) as PostMeta[],
        }))
        .filter((sub) => sub.posts.length > 0),
    }))
    .filter((sec) => sec.subs.length > 0);

  // ③ UI用構造へ変換
  const sections: Section[] = filteredSections.map((sec) => {
    const meta = SECTION_META[sec.key] ?? { title: sec.key, desc: "", icon: null as unknown as React.ReactNode };
  
    // metaサブを拾う
    const metaFirst = sec.subs.find((s) => s.key === "meta")?.posts?.[0];
  
    // 表示用のsubsからは meta を除外
    const subs: Sub[] = sec.subs
      .filter((sub) => sub.key !== "meta")
      .map((sub) => ({
        key: sub.key,
        title: (
          SUB_META[sec.key]?.[sub.key]?.title ??
          SUB_META["*"]?.[sub.key]?.title ??
          sub.key
        ) as React.ReactNode,
        posts: sub.posts.map<Post>((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          tags: p.tags,
        })),
      }));
  
    const metaPost: Post | undefined = metaFirst
      ? { title: metaFirst.title, slug: metaFirst.slug, excerpt: metaFirst.excerpt, tags: metaFirst.tags }
      : undefined;
  
    return { key: sec.key, title: meta.title, desc: meta.desc, icon: meta.icon, subs, metaPost };
  });
  

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
    setOpenSub(null);
  };

  const toggleSub = (sectionKey: string, subKey: string) => {
    const k = `${sectionKey}:${subKey}`;
    setOpenSub((prev) => (prev === k ? null : k));
  };

  return (
    <div className="space-y-4">
      {sections.map((sec) => {
        const isOpen = openSection === sec.key;
        return (
          <div key={sec.key} className="rounded-2xl border border-border bg-white shadow-sm">
            {/* 大項目ヘッダ */}
            <button
              onClick={() => toggleSection(sec.key)}
              className="flex w-full items-center justify-between p-6 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <div className="text-primary">{sec.icon}</div>
                <div>
                  <h3 className="text-xl font-extrabold text-text">{sec.title}</h3>
                  <p className="text-text/70">{sec.desc}</p>

                  {/* ▼ ここを追加（メタ記事リンク） */}
                  {sec.metaPost && (
                    <div className="mt-1">
                      <Link
                        href={href(sec.metaPost.slug)}
                        prefetch={false}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-sm text-link underline underline-offset-2 decoration-2 hover:text-primary"
                      >
                        <span>🗒️{sec.metaPost.title}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <span className="ml-4 text-primary">{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* 中項目リスト */}
            {isOpen && (
              <div className="px-6 pb-6">
                <ul className="space-y-2">
                  {sec.subs.map((sub) => {
                    const subKey = `${sec.key}:${sub.key}`;
                    const subOpen = openSub === subKey;

                    // ① 1件目のサムネ（cover.jpg）を取得
                    const firstPost = sub.posts[0];
                    const subThumb =
                      firstPost ? imgUrl(firstPost.slug, "cover.jpg") : null;

                    return (
                      <li key={sub.key} className="rounded-xl border border-border/70 bg-white">
                        {/* 中項目ヘッダ */}
                        <button
                          onClick={() => toggleSub(sec.key, sub.key)}
                          className="
                            flex w-full items-center justify-between gap-3
                            rounded-xl p-3 text-left hover:bg-primary/5
                          "
                          aria-expanded={subOpen}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            {/* ② サムネ */}
                            {subThumb && (
                              <img
                                src={subThumb}
                                alt={`${sub.key} thumbnail`}
                                className="hidden sm:block h-10 w-10 flex-shrink-0 rounded-lg object-cover ring-1 ring-black/5"
                                loading="lazy"
                                decoding="async"
                              />
                            )}
                            {/* ③ タイトル */}
                            <span className="font-medium text-text">
                              {sub.title}
                            </span>
                          </div>
                          <span className="text-primary">{subOpen ? "▲" : "▼"}</span>
                        </button>

                        {/* 記事一覧 */}
                        {subOpen && (
                          <div className="px-4 pb-3">
                            <ul className="space-y-2">
                              {sub.posts.map((p, i) => {
                                const thumb = imgUrl(p.slug, "cover.jpg");
                                return (
                                  <li key={i}>
                                    <Link
                                      href={href(p.slug)}
                                      prefetch={false}
                                      className="group flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 transition hover:border-primary/50 hover:bg-primary/5"
                                    >
                                      <img
                                        src={thumb}
                                        alt={p.title}
                                        className="h-12 w-16 flex-shrink-0 rounded object-cover"
                                      />
                                      <div className="min-w-0">
                                        <h4 className="line-clamp-1 font-bold text-link group-hover:text-primary">
                                          {p.title}
                                        </h4>
                                        {p.excerpt && (
                                          <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">
                                            {p.excerpt}
                                          </p>
                                        )}
                                        <TagList tags={p.tags} className="mt-2" size="sm" />
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
