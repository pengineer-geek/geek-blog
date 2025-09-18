"use client";

import { useState } from "react";
import Link from "next/link";
import { imgUrl } from "@/lib/img";
import TagList from "@/app/_components/tags/tag-list";

// 追加アイコン
import {
  IconBaby,
  IconShirt,
  IconHeartHandshake,
} from "@/app/_components/icons/index";

// 生成物（型付き）
import postIndex from "generated/post-index";
import type { SectionIndex, SubIndex, PostMeta } from "generated/post-index";

const TOP_PREFIX = "wellbeing/";

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

// セクション見出し（sectionKey → 表示）
type SubMetaBySection = Record<string, Record<string, { title: React.ReactNode }>>;
const SECTION_META: Record<string, { title: React.ReactNode; desc: string; icon: React.ReactNode }> = {
  others: {
    title: <span className="text-primary">その他</span>,
    desc: "その他ウェルビーイングに関するあれこれ",
    icon: <IconHeartHandshake className="h-6 w-6" />,
  },
};

// サブカテゴリーの表示名（未定義はキー文字列にフォールバック）
const SUB_META: SubMetaBySection = {
  // ▼ コラム用（同じ subKey を別表示にできる）
  others: {
    //
  },

  // ▼ どのセクションにも共通で効くデフォルト（任意）
  "*": {
    // 例: "meta": { title: "このセクションについて" },
  },
};

const href = (slug: string) => `/posts/${slug}`;

export default function AccordionWellbeing() {
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
