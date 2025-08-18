import AccordionWellbeing from "@/app/_components/accordion-wellbeing";
import { IconWellbeing } from "@/app/_components/icons";
import BackLink from "@/app/_components/back-link";

export default function Page() {
  return (
    <main className="container py-10 md:py-14">
      {/* トップへ戻る */}
      <div className="mb-6">
        <BackLink href="/" label="トップに戻る" />
      </div>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-primary">
          <IconWellbeing className="h-7 w-7" />
        </span>
        <h1 className="text-4xl font-extrabold text-text md:text-5xl">ウェルビーイング</h1>
      </div>

      <p className="mb-8 text-text/70">
        趣味・育児・人間関係 etc. 心地よさに直結する領域を、記事にして残していきます。
      </p>

      <AccordionWellbeing />
    </main>
  );
}
