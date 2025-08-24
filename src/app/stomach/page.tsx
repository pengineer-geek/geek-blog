// src/app/stomach/page.tsx
import Link from "next/link";
import { IconPenguin } from "@/app/_components/icons/index";
import BackLink from "@/app/_components/navigation/back-link";
import { imgUrl } from "@/lib/img";

type Post = {
  title: string;
  href: string;
  excerpt?: string;
  thumbnail: string;
};

// /posts/<...> の slug から href とサムネURLを作る小ヘルパ
function postItem(slugParts: string[], title: string, excerpt?: string): Post {
  const slug = slugParts.join("/"); // 例: "stomach/soumen"
  return {
    title,
    href: `/posts/${slug}`,
    excerpt,
    thumbnail: imgUrl(slug, "cover.jpg"), // R2 の cover.jpg を参照
  };
}

// ここに「腹の中」記事を足していく
const posts: Post[] = [
  postItem(
    ["stomach", "soumen"],
    "そうめんは重労働論争について",
    "最もシンプルで、最もフィジカルで、最もプリミティブなそうめん"
  ),
];

export default function StomachPage() {
  return (
    <div className="container pt-14 pb-10 md:pt-14 md:pb-14">
      <div className="mb-4">
        <BackLink href="/" label="トップに戻る" />
      </div>

      <div className="mb-6 flex items-center gap-3 text-primary">
        <IconPenguin className="h-7 w-7" />
        <h1 className="text-3xl font-extrabold text-text md:text-4xl">ペンジニアの腹の中</h1>
      </div>
      <p className="text-base text-muted-foreground mb-6">
        時事ネタや雑感をまとめていきます。
      </p>

      {/* 記事一覧（カードグリッド） */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            prefetch={false}
            className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
              <img
                src={p.thumbnail}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="line-clamp-2 text-lg font-bold text-text group-hover:text-primary">
                {p.title}
              </h3>
              {p.excerpt && (
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                  {p.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
