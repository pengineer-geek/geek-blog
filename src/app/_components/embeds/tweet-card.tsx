"use client";

import Image from "next/image";
import clsx from "clsx";

type Props = {
  name: string;          // 表示名（ダミー）
  handle: string;        // @id（ダミー）
  avatarSrc?: string;    // アバターのパス（未指定ならSVGプレースホルダ）
  text: string;          // 本文（微調整テキストをここへ）
  date?: string;         // 例: "2025/09/06 6:31"
  stats?: { replies?: string; reposts?: string; likes?: string; bookmarks?: string };
  className?: string;    // 外側余白など
};

export default function TweetCard({
  name,
  handle,
  avatarSrc,
  text,
  date,
  stats,
  className,
}: Props) {
  return (
    <article
      className={clsx(
        "rounded-xl border bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur dark:border-white/10 dark:bg-zinc-900/80",
        "max-w-2xl text-[15px] leading-relaxed text-zinc-900 dark:text-zinc-100",
        className
      )}
      role="figure"
      aria-label="social post mock"
    >
      {/* ヘッダ */}
      <div className="flex items-center gap-3 px-4 pt-3">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <svg
            viewBox="0 0 40 40"
            className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400"
            aria-hidden="true"
          >
            <circle cx="20" cy="20" r="20" fill="url(#g)" />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="currentColor" />
                <stop offset="1" stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold">{name}</span>
            <span className="truncate text-zinc-500">@{handle}</span>
          </div>
        </div>
        <div className="ml-auto select-none text-xs text-zinc-500">x.com</div>
      </div>

      {/* 本文 */}
      <div className="px-4 pb-3 pt-2 whitespace-pre-wrap">
        {text}
      </div>

      {/* フッタ（メタ） */}
      {(date || stats) && (
        <div className="px-4 pb-3 text-sm text-zinc-500">
          {date && <div className="mb-2">{date}</div>}
          {stats && (
            <div className="flex items-center gap-4">
              {stats.replies && <span>💬 {stats.replies}</span>}
              {stats.reposts && <span>🔁 {stats.reposts}</span>}
              {stats.likes && <span>❤️ {stats.likes}</span>}
              {stats.bookmarks && <span>🔖 {stats.bookmarks}</span>}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
