// src/app/_components/intro.tsx
import Image from "next/image";

export default function Intro() {
  return (
    <section className="container mb-16 py-8 md:py-10 bg-white">
      <div className="grid w-full grid-cols-[84px_1fr] items-center gap-4 md:grid-cols-[96px_1fr] md:gap-6">
        <Image
          src="/avatar-pengineer.jpeg"
          alt="ペンジニアのアバター"
          width={96}
          height={96}
          priority
          className="rounded-2xl ring-1 ring-border shadow-soft-sm bg-white object-cover"
        />
        <div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-5xl">
            IT業界の荒波に揉まれるうちに
            <br className="hidden md:block" />
            ペンギンになってしまった
            <br className="hidden md:block" />
            エンジニア。
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-800 md:text-base">
            開発・転職・副業など、エンジニアとして得た知見と<br className="block md:hidden" />
            育児・格闘技・趣味など、人間として得た実感を記録しています。<br className="block md:hidden" />
            ──いつか誰かの、荒い海を渡るヒントになりますように。
          </p>
        </div>
      </div>
    </section>
  );
}
