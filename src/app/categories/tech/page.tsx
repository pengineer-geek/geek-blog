// src/app/categories/tech/page.tsx
import AccordionTech from "@/app/_components/accordions/tech";
import { IconTech } from "@/app/_components/icons/index";
import BackLink from "@/app/_components/navigation/back-link";
import TagPicker from "@/app/_components/tags/tag-picker";
import { loadTagGroups } from "@/lib/tags";

export default async function Page() {
  const groups = await loadTagGroups();
  return (
    <main className="container pt-14 pb-10 md:pt-14 md:pb-14">
      {/* トップへ戻る */}
      <div className="mb-4">
        <BackLink href="/" label="トップに戻る" />
      </div>

      <div className="mb-6 flex items-center gap-3 text-primary">
        <IconTech className="h-7 w-7" />
        <h1 className="text-4xl font-extrabold text-text md:text-5xl">テック</h1>
      </div>
      <p className="mb-6 text-text/80">
        個人ブログ運営や技術の紹介など、開発の実践知まとめ。
      </p>

      <section className="rounded-xl bg-gray-100 mb-6 p-4 md:p-6">
        <h2 className="mb-3 text-xl font-bold text-text">タグで絞り込む</h2>
        <TagPicker
          groups={{ テック: groups.tech }}
          compact
        />
      </section>

      <AccordionTech />
    </main>
  );
}
