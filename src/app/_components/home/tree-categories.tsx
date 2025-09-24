'use client';

import Link from 'next/link';

type Props = {
  groups: {
    career: string[];
    tech: string[];
    wellness: string[];
    wellbeing: string[];
  };
};

/** シンプルなツリー。<details>で折りたたみ、左にツリー線風の罫線を付加 */
export default function TreeCategories({ groups }: Props) {
  const data = [
    {
      title: 'キャリア',
      href: '/categories/career',
      children: groups.career ?? [],
    },
    {
      title: 'テック',
      href: '/categories/tech',
      children: groups.tech ?? [],
    },
    {
      title: 'ウェルネス',
      href: '/categories/wellness',
      children: groups.wellness ?? [],
    },
    {
      title: 'ウェルビーイング',
      href: '/categories/wellbeing',
      children: groups.wellbeing ?? [],
    },
  ];

  return (
    <nav aria-label="カテゴリ ツリー" className="rounded-xl border border-border bg-white p-4 md:p-6">
      <ul className="space-y-2">
        {data.map((node) => (
          <li key={node.title}>
            <details open>
              <summary className="cursor-pointer list-none text-lg font-bold text-primary hover:opacity-80">
                <Link href={node.href} className="underline-offset-4 hover:underline">
                  {node.title}
                </Link>
              </summary>
              {node.children?.length ? (
                <ul className="mt-2 space-y-1 border-l-2 border-primary/20 pl-4">
                  {node.children.map((child) => (
                    <li key={child}>
                      <Link
                        href={`${node.href}?tag=${encodeURIComponent(child)}`}
                        className="text-sm text-text/80 hover:text-primary hover:underline underline-offset-4"
                      >
                        {child}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </details>
          </li>
        ))}
      </ul>
    </nav>
  );
}
