'use client';

import { useState } from 'react';
import TreeCategories from '@/app/_components/home/tree-categories';
import CardsCategories from '@/app/_components/home/cards-categories';
import type { SectionIndex } from 'generated/post-index';

type Props = { indexData: { sections: SectionIndex[] } };

const TABS = [
  { key: 'tree', label: 'ツリー' },
  { key: 'card', label: 'カード' },
] as const;
type TabKey = typeof TABS[number]['key'];

export default function CategoriesTabs({ indexData }: Props) {
  const [active, setActive] = useState<TabKey>('tree');

  return (
    <div className="mt-4">
      <div className="inline-flex rounded-xl border border-border bg-white p-1 shadow-soft-sm">
        {TABS.map(t => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={[
                'min-w-24 px-4 py-2 text-sm font-semibold rounded-lg transition',
                isActive ? 'bg-primary text-white' : 'text-text hover:bg-gray-50',
              ].join(' ')}
              aria-pressed={isActive}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {active === 'tree' ? <TreeCategories indexData={indexData} /> : <CardsCategories />}
      </div>
    </div>
  );
}
