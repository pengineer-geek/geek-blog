"use client";

import { useState } from "react";
import Link from "next/link";
import { IconDiary, IconColumn } from "@/app/_components/icons";
import { imgUrl } from "@/lib/img";
import postIndex from "generated/post-index";

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
};

// タイトルやdescはキー→表示名の辞書で定義（自由に編集可能）
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

const SUB_META: Record<string, { title: React.ReactNode }> = {
  "high-school": { title: <>ハイスクール編<br />@ 自称進学校</> },
  university: { title: <>キャンパスライフ編<br />@ 都内Aランク私立大学(理工学部)</> },
  "graduate-school": { title: <>ブラック研究室編<br />@ 都内私立大学院(工学)</> },
  "job-hunting": { title: <>新卒就活編<br />@ 都内私立大学院(工学)</> },
  "game-planner": { title: <>新卒ゲームプランナー編<br />@ ゲーム会社(メガベンチャー)</> },
};

const href = (slug: string) => `/posts/${slug}`;

export default function AccordionCareer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  // 生成された index.json を Section/Sub 構造に変換しつつ、表示用メタを合成
  const sections: Section[] = (postIndex.sections as any[]).map((sec) => {
    const meta = SECTION_META[sec.key] ?? {
      title: sec.key,
      desc: "",
      icon: null,
    };
    const subs: Sub[] = sec.subs.map((sub: any) => ({
      key: sub.key,
      title: (SUB_META[sub.key]?.title ?? sub.key) as React.ReactNode,
      posts: sub.posts.map((p: any) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        tags: p.tags,
      })),
    }));
    return { key: sec.key, title: meta.title, desc: meta.desc, icon: meta.icon, subs };
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
                </div>
              </div>
              <span className="ml-4 text-primary">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div className="px-6 pb-6">
                <ul className="space-y-2">
                  {sec.subs.map((sub) => {
                    const subKey = `${sec.key}:${sub.key}`;
                    const subOpen = openSub === subKey;
                    return (
                      <li key={sub.key} className="rounded-xl border border-border/70 bg-white">
                        <button
                          onClick={() => toggleSub(sec.key, sub.key)}
                          className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-primary/5"
                          aria-expanded={subOpen}
                        >
                          <span className="font-medium text-text">{sub.title}</span>
                          <span className="text-primary">{subOpen ? "▲" : "▼"}</span>
                        </button>

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
                                          <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">{p.excerpt}</p>
                                        )}
                                        {/* TagListはお好みで */}
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
