"use client";

import { useState } from "react";
import Link from "next/link";

// 追加アイコン
import {
  IconBaby,
  IconShirt,
  IconHeartHandshake,
} from "@/app/_components/icons/index";

type Post = { title: string; href: string; desc: string };
type Sub = { key: string; title: string; posts: Post[] };
type Section = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  subs: Sub[];
};

const href = (...slug: string[]) => `/posts/${slug.join("/")}`;
const thumbFromHref = (href: string, heroFile = "cover.jpg") => `${href}/${heroFile}`;

const sections: Section[] = [
  {
    key: "hobby",
    title: "趣味",
    desc: "楽しみを深める活動",
    icon: <IconShirt className="h-6 w-6" />,
    subs: [
    ],
  },
  {
    key: "childcare",
    title: "育児",
    desc: "子育てと日々の学び",
    icon: <IconBaby className="h-6 w-6" />,
    subs: [
    ],
  },
  {
    key: "others",
    title: "その他",
    desc: "心地よさを整えるあれこれ",
    icon: <IconHeartHandshake className="h-6 w-6" />,
    subs: [
    ],
  },
];

export default function AccordionWellbeing() {
  // どの大項目が開いているか
  const [openSection, setOpenSection] = useState<string | null>(null);
  // どの中項目が開いているか（フォーマット: `${sectionKey}:${subKey}`）
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
    // 大項目を切り替えたら中項目は一旦閉じる
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
                            <ul className="space-y-2">
                              {sub.posts.map((p, i) => (
                                <li key={i}>
                                  <Link
                                    href={p.href}
                                    prefetch={false}
                                    className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-primary/5"
                                  >
                                    {/* サムネイル */}
                                    <img
                                      src={thumbFromHref(p.href)}
                                      alt={p.title}
                                      className="h-12 w-16 flex-shrink-0 rounded object-cover"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                    {/* 右：タイトル＋（必要なら説明） */}
                                    <div className="min-w-0">
                                      <h4 className="font-medium text-text underline underline-offset-2 decoration-link/30 hover:decoration-link">
                                        {p.title}
                                      </h4>
                                      <p className="text-sm text-text/70">{p.desc}</p>
                                    </div>

                                    <svg
                                      className="ml-auto h-4 w-4 translate-x-0 text-link/70 transition group-hover:translate-x-0.5"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      aria-hidden="true"
                                    >
                                      <path d="M5 12h14" />
                                      <path d="m13 5 7 7-7 7" />
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
