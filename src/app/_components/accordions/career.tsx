// src/app/_components/accordion-career.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { IconDiary, IconColumn } from "@/app/_components/icons/index";

type Post = { title: string; href: string };
type Sub = { key: string; title: string; posts: Post[] };
type Section = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  subs: Sub[];
};

// TODO: ここにダイアリーの記事を追加する
//const href = (...slug: string[]) => `/posts/${slug.join("/")}`;

const sections: Section[] = [
  {
    key: "diary",
    title: "ペンジニア's Real Diary",
    desc: "時系列に沿ったペンジニアのリアルな記録",
    icon: <IconDiary className="h-6 w-6" />,
    subs: [
      {
        key: "high-school",
        title: "ハイスクール編 @ 自称進学校",
        posts: [
          { title: "高校生だったころの話 -親に流された進路選択-", href: "/career/diary/high-school/high-school-1" },
        ],
      },
    ],
  },
  {
    key: "column",
    title: "コラム",
    desc: "キャリア形成や働き方などに関するあれこれ",
    icon: <IconColumn className="h-6 w-6" />,
    subs: [
      { key: "for-students", title: "学生向け", posts: [{ title: "大学でやると得なこと", href: "#" }] },
      { key: "for-workers", title: "働いている人向け", posts: [{ title: "燃え尽きない働き方", href: "#" }] },
      { key: "for-newgrad", title: "新卒就活生向け", posts: [{ title: "面接で観られているポイント", href: "#" }] },
      {
        key: "for-beginners",
        title: "未経験エンジニア求職者向け",
        posts: [{ title: "最速で実務レベルに届く勉強法", href: "#" }],
      },
      {
        key: "for-midcareer",
        title: "中途キャリア求職者向け",
        posts: [{ title: "転職の解像度を上げるチェックリスト", href: "#" }],
      },
    ],
  },
];

export default function AccordionCareer() {
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
                            <ul className="space-y-1">
                              {sub.posts.map((p, i) => (
                                <li key={i}>
                                  <Link
                                    href={p.href}
                                    prefetch={false}
                                    className="
                                      group/link flex items-center justify-between gap-3
                                      rounded-lg px-3 py-2
                                      text-link/85 hover:text-link
                                      hover:bg-primary/5
                                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                                      transition
                                    "
                                  >
                                    {/* 左：小アイコン + タイトル（下線） */}
                                    <span className="inline-flex items-center gap-2">
                                      {/* 小さなリンクドット（アイコンでもOK） */}
                                      <span className="h-1.5 w-1.5 rounded-full bg-link/70 group-hover/link:bg-link" />
                                      <span
                                        className="
                                          underline underline-offset-2
                                          decoration-link/30 group-hover/link:decoration-link
                                        "
                                      >
                                        {p.title}
                                      </span>
                                    </span>

                                    {/* 右：矢印（ほんの少しスライド） */}
                                    <svg
                                      className="h-4 w-4 translate-x-0 text-link/70 transition group-hover/link:translate-x-0.5 group-hover/link:text-link"
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
