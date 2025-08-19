import AccordionWellness from "@/app/_components/accordions/wellness";
import { IconWellness } from "@/app/_components/icons/index";
import BackLink from "@/app/_components/navigation/back-link";

export default function Page() {
  return (
    <main className="container pt-14 pb-10 md:pt-14 md:pb-14">
      {/* トップへ戻る */}
      <div className="mb-4">
        <BackLink href="/" label="トップに戻る" />
      </div>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-primary">
          <IconWellness className="h-7 w-7" />
        </span>
        <h1 className="text-4xl font-extrabold text-text md:text-5xl">ウェルネス</h1>
      </div>
      <p className="mb-8 text-text/70">
        強く逞しく生きるためのウェルネス情報まとめ。
      </p>

      <AccordionWellness />
    </main>
  );
}
