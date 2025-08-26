// src/app/_components/accordion-career.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { IconDiary, IconColumn } from "@/app/_components/icons/index";
import { imgUrl } from "@/lib/img";

type Post = {
  title: string;
  href: string;
  excerpt?: string;
  thumbnail: string;
};
type Sub = { key: string; title: string; posts: Post[] };
type Section = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  subs: Sub[];
};

// TODO: ここにダイアリーの記事を追加する
const href = (...slug: string[]) => `/posts/${slug.join("/")}`;

function postItem(slugParts: string[], title: string, excerpt?: string): Post {
  const slug = slugParts.join("/");
  return {
    title,
    href: href(...slugParts),
    excerpt,
    thumbnail: imgUrl(slug, "cover.jpg"), // ← ここでR2 URLを生成
  };
}

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
          postItem(
            ["career", "diary", "high-school", "high-school-1"],
            "高校生だったころの話",
            "親に流された進路選択"
          ),
          postItem(
            ["career", "diary", "high-school", "high-school-2"],
            "紙切れ一枚で大学受験を終わらせた話",
            "ガソリンは満タン! 行き先は不明!"
          ),
        ],
      },
      {
        key: "university",
        title: "キャンパスライフ編 @ 都内Aランク私立大学(理工学部)",
        posts: [
          postItem(
            ["career", "diary", "university", "university-1"],
            "華のキャンパスライフを謳歌していた話",
            "サークルに全てを捧げた男"
          ),
          postItem(
            ["career", "diary", "university", "university-2"],
            "サークルを辞めてさらに堕落した話",
            "短期的快楽を追求した男"
          ),
          postItem(
            ["career", "diary", "university", "university-3"],
            "ようやく再起してきた話",
            "筋肉と電気工学"
          ),
          postItem(
            ["career", "diary", "university", "university-4"],
            "研究室選びで失敗した話",
            "地獄への門を開けていた男"
          ),
        ],
      },
      {
        key: "graduate-school",
        title: "ブラック研究室編 @ 都内私立大学院(工学)",
        posts: [
          postItem(
            ["career", "diary", "graduate-school", "graduate-school-1"],
            "教授に全てを搾取された話",
            "驚きの黒さ! 救いのなさ!"
          ),
          postItem(
            ["career", "diary", "graduate-school", "graduate-school-2"],
            "教授に反撃したお話",
            "逆襲の糸口！教授への下剋上！"
          ),
        ],
      },
      {
        key: "job-hunting",
        title: "新卒就活編 @ 都内私立大学院(工学)",
        posts: [
          postItem(
            ["career", "diary", "job-hunting", "job-hunting-1"],
            "富!名声!力!を軸に就活を開始したお話",
            "人生の勝者マンを目指した男"
          ),
          postItem(
            ["career", "diary", "job-hunting", "job-hunting-2"],
            "商社インターンに参加したお話",
            "スマホに出れなかっただけなのに"
          ),
          postItem(
            ["career", "diary", "job-hunting", "job-hunting-3"],
            "本選考は地獄モードだった話",
            "最終面接官には中身がないことがバレていた"
          ),
          postItem(
            ["career", "diary", "job-hunting", "job-hunting-4"],
            "追加募集は世紀末だったお話",
            "狭き門がさらに狭まった"
          ),
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
                            <ul className="space-y-2">
                              {sub.posts.map((p, i) => (
                                <li key={i}>
                                  <Link
                                    href={p.href}
                                    prefetch={false}
                                    className="
                                      flex gap-3 items-start
                                      rounded-lg border border-gray-200 bg-white
                                      px-3 py-2
                                      hover:bg-primary/5 hover:border-primary/50
                                      transition
                                    "
                                  >
                                    <img
                                      src={p.thumbnail}
                                      alt={p.title}
                                      className="h-12 w-16 flex-shrink-0 rounded object-cover"
                                    />
                                    <div className="min-w-0">
                                      <h4 className="font-bold text-link group-hover:text-primary line-clamp-1">
                                        {p.title}
                                      </h4>
                                      {p.excerpt && (
                                        <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">{p.excerpt}</p>
                                      )}
                                    </div>
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
