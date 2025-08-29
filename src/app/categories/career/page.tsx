// src/app/categories/career/page.tsx
import AccordionCareer from "@/app/_components/accordions/career";
import { IconCareer } from "@/app/_components/icons/index";
import BackLink from "@/app/_components/navigation/back-link";
import TagPicker from "@/app/_components/tags/tag-picker";
import { loadTagGroups } from "@/lib/tags";

export default async function CareerPage() {
  const groups = await loadTagGroups();
  return (
    <main className="container pt-14 pb-10 md:pt-14 md:pb-14">
      {/* トップへ戻る */}
      <div className="mb-4">
        <BackLink href="/" label="トップに戻る" />
      </div>

      {/* 見出しなど */}
      <div className="mb-6 flex items-center gap-3 text-primary">
        <IconCareer className="h-7 w-7" />
        <h1 className="text-3xl font-extrabold text-text md:text-4xl">キャリア</h1>
      </div>
      <p className="mb-6 text-text/80">
        実体験ダイアリーや、仕事・キャリア形成に関するコラムなど。
      </p>

      const groups = await loadTagGroups();

      <section className="mt-6">
        <h2 className="mb-3 text-xl font-bold text-text">タグで絞り込む</h2>
        <TagPicker
          groups={{ キャリア: groups.career }}
          compact
        />
      </section>

      {/* ここは props なしで呼ぶ */}
      <AccordionCareer />
    </main>
  );
}
