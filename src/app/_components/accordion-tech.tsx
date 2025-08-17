"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBlog, IconWrench } from "@/app/_components/icons";

type Post = { title: string; href: string };
type Sub = { key: string; title: string; posts: Post[] };
type Section = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  subs: Sub[];
};

const sections: Section[] = [
  {
    key: "blog",
    title: "個人ブログ開設・運営",
    desc: "本サイトを例に開設から運用まで",
    icon: <IconBlog className="h-6 w-6" />,
    subs: [
      {
        key: "how-to-start",
        title: "個人サイトの始め方 (エンジニア向け)",
        posts: [{ title: "はじめの一歩: 技術ブログを立ち上げる", href: "#" }],
      },
      {
        key: "operation",
        title: "運用のあれこれ",
        posts: [{ title: "デプロイ・保守・改善の実際", href: "#" }],
      },
    ],
  },
  {
    key: "tech-intro",
    title: "技術紹介",
    desc: "日々の開発で使う技術のメモや紹介",
    icon: <IconWrench className="h-6 w-6" />,
    subs: [
      {
        key: "web",
        title: "Webエンジニア",
        posts: [{ title: "Next.js で作るモダンWebアプリ", href: "#" }],
      },
      {
        key: "automation",
        title: "業務効率化",
        posts: [{ title: "日常業務を自動化する小技集", href: "#" }],
      },
    ],
  },
];

export default function AccordionTech() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

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
          <div
            key={sec.key}
            className="rounded-2xl border border-border bg-white shadow-sm"
          >
            {/* 大項目ヘッダ */}
            <button
              onClick={() => toggleSection(sec.key)}
              className="flex w-full items-center justify-between p-6 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <div className="text-primary">{sec.icon}</div>
                <div>
                  <h3 className="text-xl font-extrabold text-text">
                    {sec.title}
                  </h3>
                  <p className="text-text/70">{sec.desc}</p>
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
                    return (
                      <li
                        key={sub.key}
                        className="rounded-xl border border-border/70 bg-white"
                      >
                        {/* 中項目ヘッダ */}
                        <button
                          onClick={() => toggleSub(sec.key, sub.key)}
                          className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-primary/5"
                          aria-expanded={subOpen}
                        >
                          <span className="font-medium text-text">
                            {sub.title}
                          </span>
                          <span className="text-primary">
                            {subOpen ? "▲" : "▼"}
                          </span>
                        </button>

                        {/* 記事一覧 */}
                        {subOpen && (
                          <div className="px-4 pb-3">
                            <ul className="space-y-1">
                              {sub.posts.map((p, i) => (
                                <li key={i}>
                                  <Link
                                    href={p.href}
                                    className="
                                      group flex items-center justify-between rounded-lg
                                      border border-transparent bg-primary/5/50
                                      px-3 py-2 text-link
                                      transition
                                      hover:bg-primary/10 hover:border-primary/30
                                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                                    "
                                  >
                                    <span className="inline-flex items-center gap-2">
                                      {/* ドットのアクセント */}
                                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 group-hover:bg-primary" />
                                      {/* タイトルは下線＋色変化 */}
                                      <span className="underline underline-offset-4 decoration-border/60 group-hover:decoration-primary group-hover:text-primary">
                                        {p.title}
                                      </span>
                                    </span>

                                    {/* 右端の矢印（装飾） */}
                                    <svg
                                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                                      stroke="currentColor" strokeWidth="1.8" className="opacity-60 group-hover:opacity-100"
                                    >
                                      <path d="M5 12h14" /><path d="m13 5 7 7-7 7" />
                                    </svg>
                                  </Link>
                                </li>
                              ))}
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
