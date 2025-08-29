import AccordionWellbeing from "@/app/_components/accordions/wellbeing";
import { IconWellbeing } from "@/app/_components/icons/index";
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
        <IconWellbeing className="h-7 w-7" />
        <h1 className="text-3xl font-extrabold text-text md:text-4xl">ウェルビーイング</h1>
      </div>

      <p className="mb-6 text-text/80">
        趣味・育児・人間関係 etc. 心地よさに直結する領域を、記事にして残していきます。
      </p>

      <section className="rounded-xl bg-gray-100 mb-6 p-4 md:p-6">
        <h2 className="mb-3 text-xl font-bold text-text">タグで絞り込む</h2>
        <TagPicker
          groups={{ ウェルビーイング: groups.wellbeing }}
          compact
        />
      </section>

      <AccordionWellbeing />
    </main>
  );
}
