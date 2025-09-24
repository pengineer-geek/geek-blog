// src/app/page.tsx
import Link from "next/link";
import CategoryCard from "@/app/_components/cards/category-card";
import { IconCareer, IconTech, IconWellness, IconWellbeing, IconPenguin, IconX } from "@/app/_components/icons/index";
import TagPicker from "@/app/_components/tags/tag-picker";
import { loadTagGroups } from "@/lib/tags";
import NewPickup from "@/app/_components/pickup/new-pickup";
import CategoriesTabs from "@/app/_components/home/categories-tabs";

export default async function Page() {
  const groups = await loadTagGroups();
  return (
    <main>
      {/* About this site */}
      <section className="container pt-14 pb-10 md:pt-14 md:pb-14">
        <h2 className="text-2xl font-extrabold text-primary md:text-3xl">
          About this site
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-text/80">
          開発・転職・副業など、エンジニアとして得た知見と<br />
          育児・格闘技・趣味など、 人間として得た実感を記録しています。<br />
          ──いつか誰かの、荒い海を渡るヒントになりますように。
        </p>
      </section>

      {/* About me */}
      <section className="container py-6">
        <div className="grid grid-cols-[84px_1fr] items-center gap-4 md:grid-cols-[96px_1fr] md:gap-6">
          <img
            src="/avatar-pengineer.jpeg"
            alt="ペンジニアのアイコン"
            width={96}
            height={96}
            className="rounded-2xl ring-1 ring-border shadow-soft-sm object-cover bg-white"
          />
          <div>
            <h3 className="text-xl font-extrabold text-primary">About me</h3>
            <p className="mt-2 max-w-3xl text-text/80 leading-relaxed">
              IT業界の荒波に揉まれるうちに、いつのまにかペンギンになってしまったエンジニア。
              <br />── ペンジニア
            </p>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-1">
                <span>🐧</span>
                <Link href="/about-me" className="link-about">
                  自己紹介はこちら
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <span>🐧</span>
                <Link href="/about-penguin" className="link-about">
                  ペンギンに込めた想い
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contents */}
      <section className="container py-10 md:py-14">
        <h2 className="text-xl font-extrabold text-primary">Contents</h2>

        <NewPickup title="新着記事" limit={10} />

        {/* ▼ ここをタブに置き換え */}
        <h3 className="text-xl font-extrabold text-primary">Categories</h3>
        <CategoriesTabs
          groups={{
            career: groups.career,
            tech: groups.tech,
            wellness: groups.wellness,
            wellbeing: groups.wellbeing,
          }}
        />
      </section>

      <div className="container py-2 md:py-4">
        <Link
          href="/random"
          prefetch={false}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-white hover:opacity-90 active:opacity-80"
        >
          🎲 ランダムで記事をPick
        </Link>
      </div>

      {/* タグから探す */}
      <section className="container py-10 md:py-14 rounded-xl bg-gray-100">
        <h3 className="mb-4 text-2xl font-extrabold text-text md:text-3xl">
          タグから探す
        </h3>

        {/* 「キャリア / テック / …」の見出しでグループ化してチップを表示 */}
        <TagPicker
          groups={{
            キャリア: groups.career,
            テック: groups.tech,
            ウェルネス: groups.wellness,
            ウェルビーイング: groups.wellbeing,
          }}
        />
      </section>

      {/* Sub Contents */}
      <section className="container py-10 md:py-14">
        <h3 className="text-xl font-extrabold text-primary">Sub Contents</h3>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <CategoryCard
            href="/stomach"
            title="ペンジニアの腹の中"
            desc={
              <>
                時事ネタや雑感メモなど
              </>
            }
            icon={<IconPenguin />}
          />
        </div>
      </section>

      {/* Contact Me */}
      <section className="container py-10 md:py-14">
        <h3 className="text-xl font-extrabold text-primary">Contact Me</h3>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <IconX className="h-6 w-6" />
            <Link
              href="https://x.com/pengineer_geek"
              className="link-about"
              target="_blank"
              rel="noopener noreferrer"
            >
              X(旧Twitter)
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
