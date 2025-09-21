// src/app/stomach/page.tsx
import Link from "next/link";
import { IconPenguin } from "@/app/_components/icons";
import BackLink from "@/app/_components/navigation/back-link";
import { imgUrl } from "@/lib/img";

// ★ 生成物と型をインポート
import postIndex, {
  type PostMeta,
  type SectionIndex,
} from "generated/post-index";

export default function StomachPage() {
  // find の戻り値に型をつける
  const section: SectionIndex | undefined = postIndex.sections.find(
    (s) => s.key === "stomach"
  );

  // ★ posts の型を PostMeta[] に固定
  const posts: PostMeta[] = section
    ? section.subs.flatMap((sub) => sub.posts)
    : [];

  return (
    <div className="container pt-14 pb-10 md:pt-14 md:pb-14">
      <div className="mb-4">
        <BackLink href="/" label="トップに戻る" />
      </div>

      <div className="mb-6 flex items-center gap-3 text-primary">
        <IconPenguin className="h-7 w-7" />
        <h1 className="text-3xl font-extrabold text-text md:text-4xl">
          ペンジニアの腹の中
        </h1>
      </div>
      <p className="text-base text-muted-foreground mb-6">
        時事ネタや雑感をまとめていきます。
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* posts が PostMeta[] になれば p は自動で PostMeta 推論される */}
        {posts.map((p) => {
          const href = `/posts/${p.slug}`;
          const thumbnail = imgUrl(p.slug, "cover.jpg");
          return (
            <Link
              key={href}
              href={href}
              prefetch={false}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                <img
                  src={thumbnail}
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
          );
        })}
      </div>
    </div>
  );
}
