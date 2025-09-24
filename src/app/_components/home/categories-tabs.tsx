'use client';

import { useState } from 'react';
import TreeCategories from '@/app/_components/home/tree-categories';
import CardsCategories from '@/app/_components/home/cards-categories';

type Props = {
  groups: {
    career: string[];
    tech: string[];
    wellness: string[];
    wellbeing: string[];
  };
};

const TABS = [
  { key: 'tree', label: 'ツリー' },
  { key: 'card', label: 'カード' },
] as const;
type TabKey = typeof TABS[number]['key'];

export default function CategoriesTabs({ groups }: Props) {
  const [active, setActive] = useState<TabKey>('tree'); // デフォルト「ツリー」

  return (
    <div className="mt-4">
      {/* Tab headers */}
      <div className="inline-flex rounded-xl border border-border bg-white p-1 shadow-soft-sm">
        {TABS.map(({ key, label }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={[
                'min-w-24 px-4 py-2 text-sm font-semibold rounded-lg transition',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-gray-50'
              ].join(' ')}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div className="mt-4">
        {active === 'tree' ? (
          <TreeCategories groups={groups} />
        ) : (
          <CardsCategories />
        )}
      </div>
    </div>
  );
}
