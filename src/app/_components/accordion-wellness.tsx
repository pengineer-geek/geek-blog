"use client";

import { useState } from "react";
import Link from "next/link";
import { IconDumbbell, IconUtensils, IconBed } from "@/app/_components/icons";

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
    key: "training",
    title: "鍛錬",
    desc: "体をつくる・動かす・強くする",
    icon: <IconDumbbell className="h-6 w-6" />,
    subs: [
      {
        key: "weight",
        title: "ウェイトトレーニング",
        posts: [
          { title: "初心者メニューとフォームの基本", href: "#" },
          { title: "プログレッションの考え方", href: "#" },
        ],
      },
      {
        key: "bjj",
        title: "ブラジリアン柔術",
        posts: [
          { title: "白帯がまず覚えるべきムーブ", href: "#" },
          { title: "スパーで意識する2つの軸", href: "#" },
        ],
      },
    ],
  },
  {
    key: "nutrition",
    title: "栄養摂取",
    desc: "食事でコンディションを底上げ",
    icon: <IconUtensils className="h-6 w-6" />,
    subs: [
      {
        key: "recipe",
        title: "レシピ",
        posts: [
          { title: "高タンパク・低脂質の定番ごはん", href: "#" },
          { title: "5分で作れる作り置きスープ", href: "#" },
        ],
      },
      {
        key: "supplement",
        title: "サプリメント",
        posts: [
          { title: "目的別サプリの使い分け", href: "#" },
          { title: "最低限これだけでOKリスト", href: "#" },
        ],
      },
    ],
  },
  {
    key: "recovery",
    title: "休養",
    desc: "回復をデザインしてパフォーマンスUP",
    icon: <IconBed className="h-6 w-6" />,
    subs: [
      {
        key: "sleep",
        title: "睡眠",
        posts: [
          { title: "睡眠の質を上げるナイトルーティン", href: "#" },
          { title: "朝の体調を決める2つの習慣", href: "#" },
        ],
      },
      {
        key: "relax",
        title: "リラックス",
        posts: [
          { title: "副交感神経に寄せるセルフケア", href: "#" },
          { title: "仕事後の切り替えスイッチ集", href: "#" },
        ],
      },
    ],
  },
];

export default function AccordionWellness() {
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
          <div key={sec.key} className="rounded-2xl border border-border bg-white shadow-sm">
            {/* 大項目ヘッダ */}
            <button
              onClick={() => toggleSection(sec.key)}
              className="flex w-full items-center justify-between p-6 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <span className="text-primary">{sec.icon}</span>
                <div>
                  <h3 className="text-xl font-extrabold text-text">{sec.title}</h3>
                  <p className="text-text/70">{sec.desc}</p>
                </div>
              </div>
              <span className="ml-4 text-primary">{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* 中項目 */}
            {isOpen && (
              <div className="px-6 pb-6">
                <ul className="space-y-2">
                  {sec.subs.map((sub) => {
                    const key = `${sec.key}:${sub.key}`;
                    const subOpen = openSub === key;
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
                            <ul className="space-y-1">
                              {sub.posts.map((p, i) => (
                                <li key={i}>
                                  <Link
                                    href={p.href}
                                    className="block rounded-lg px-3 py-2 text-text/80 transition hover:bg-primary/5 hover:text-primary"
                                  >
                                    {p.title}
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
