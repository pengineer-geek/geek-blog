// src/app/_components/accordion-career.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { IconDiary, IconColumn } from "@/app/_components/icons";

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
    key: "diary",
    title: "ペンジニア's Real Diary",
    desc: "時系列に沿ったペンジニアのリアルな記録",
    icon: <IconDiary className="h-6 w-6" />,
    subs: [
      {
        key: "hs",
        title: "ガソリン満タン! 行き先は不明! ハイスクール編 @ 自称進学校",
        posts: [
          { title: "入学初日と“謎の校風”", href: "#" },
          { title: "部活・受験・ゲーム三昧", href: "#" },
          { title: "進路の分岐点で考えたこと", href: "#" },
        ],
      },
      {
        key: "uni",
        title:
          "モラトリアムど真ん中! 華のキャンパスライフ編 @ 都内Aランク私立大学(理工学士)",
        posts: [
          { title: "単位の取り方と時間術", href: "#" },
          { title: "研究室に入る前にやってよかったこと", href: "#" },
        ],
      },
      {
        key: "blacklab",
        title:
          "驚きの黒さ! 救いのなさ!! ブラックラボ編 @ 都内Aランク私立大学院(工学修士)",
        posts: [
          { title: "“24時間研究”の現実", href: "#" },
          { title: "メンタルを守るためにやったこと", href: "#" },
        ],
      },
      {
        key: "jobhunt",
        title:
          "富!名声!チカラ!を求めて!! 新卒就活生編 @ 都内Aランク私立大学院(工学修士)",
        posts: [
          { title: "ESと面接の型を作る", href: "#" },
          { title: "内定までのロードマップ", href: "#" },
        ],
      },
      {
        key: "freshman",
        title:
          "フレッシュマン! 新卒社会人編 @ メガベンチャー(ゲーム会社)",
        posts: [
          { title: "1年目のサバイバル", href: "#" },
          { title: "先輩に教わった“仕事の基礎”", href: "#" },
        ],
      },
      {
        key: "nojob",
        title: "富!名声!チカラを失った!! ノージョブ編 @ 都内某所",
        posts: [
          { title: "無職期間でやったこと", href: "#" },
          { title: "復帰に向けた準備", href: "#" },
        ],
      },
      {
        key: "junior",
        title: "Hello World!! ジュニアエンジニア編 @ 小規模受託・SES企業",
        posts: [
          { title: "最初の現場で学んだこと", href: "#" },
          { title: "エラーとの付き合い方", href: "#" },
        ],
      },
      {
        key: "middle",
        title: "Thinking And Building! ミドルエンジニア編 @ 小規模自社開発企業",
        posts: [
          { title: "プロダクト思考の芽生え", href: "#" },
          { title: "技術選定とチーム合意", href: "#" },
        ],
      },
      {
        key: "senior",
        title: "I'm Back!! シニアエンジニア編 @ メガベンチャー(SaaS企業)",
        posts: [
          { title: "SaaSの現場での責務", href: "#" },
          { title: "スケール時の設計感覚", href: "#" },
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
