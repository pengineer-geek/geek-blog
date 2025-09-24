'use client';

import CategoryCard from '@/app/_components/cards/category-card';
import { IconCareer, IconTech, IconWellness, IconWellbeing } from '@/app/_components/icons';

export default function CardsCategories() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <CategoryCard
        href="/categories/career"
        title="キャリア"
        desc={
          <>
            実体験ダイアリーや
            <br />
            仕事・キャリア形成についてのコラムなど
          </>
        }
        icon={<IconCareer />}
      />
      <CategoryCard
        href="/categories/tech"
        title="テック"
        desc={
          <>
            開発メモ、<br />
            作ったものの話など
          </>
        }
        icon={<IconTech />}
      />
      <CategoryCard
        href="/categories/wellness"
        title="ウェルネス"
        desc={
          <>
            運動・食事・睡眠。<br />
            コンディションを上げるためのノウハウなど
          </>
        }
        icon={<IconWellness />}
      />
      <CategoryCard
        href="/categories/wellbeing"
        title="ウェルビーイング"
        desc={<>心と思考を整えるためのあれこれ</>}
        icon={<IconWellbeing />}
      />
    </div>
  );
}
