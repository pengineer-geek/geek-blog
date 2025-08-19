"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

/**
 * Slide-out menu that can be TRIGGERED FROM INSIDE THE HEADER.
 * - Put <SlideOutMenu /> anywhere (e.g., header's right side). The trigger button renders inline.
 * - Panel/backdrop are fixed-positioned.
 * - Tailwind-only animations.
 */
export default function SlideOutMenu({
  buttonClassName = "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-800 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400",
  icon = (
    // Square menu icon (provided)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-menu-icon lucide-menu"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 8h10" />
      <path d="M7 12h10" />
      <path d="M7 16h10" />
    </svg>
  ),
}: {
  buttonClassName?: string;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {/* Inline trigger button (place this inside the header) */}
      <button
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        onClick={toggle}
        className={buttonClassName}
      >
        {icon}
      </button>

      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/30 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in panel */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-[55] h-full w-[320px] max-w-[85vw] text-white transform transition-transform duration-300 will-change-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col bg-gray-900/75 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
            <span className="text-lg font-semibold">メニュー</span>
            <button
              onClick={close}
              aria-label="メニューを閉じる"
              className="rounded p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-white/15">
              <NavItem href="/" label="トップ" onNavigate={close} />

              <li className="px-5 py-3">
                <div className="mb-2 text-sm tracking-wide text-white/80">カテゴリ</div>
                <ul className="space-y-1">
                  <SubItem href="/categories/career" label="キャリア" onNavigate={close} />
                  <SubItem href="/categories/tech" label="テック" onNavigate={close} />
                  <SubItem href="/categories/wellness" label="ウェルネス" onNavigate={close} />
                  <SubItem href="/categories/wellbeing" label="ウェルビーイング" onNavigate={close} />
                </ul>
              </li>
            </ul>
          </nav>

          <div className="px-5 py-4 border-t border-white/20 text-xs text-white/70">
            © {new Date().getFullYear()} 技育ブログ
          </div>
        </div>
      </aside>
    </>
  );
}

function NavItem({ href, label, onNavigate }: { href: string; label: string; onNavigate?: () => void }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className="block px-5 py-4 text-base font-medium hover:bg-white/10 focus:bg-white/10 focus:outline-none"
      >
        {label}
      </Link>
    </li>
  );
}

function SubItem({ href, label, onNavigate }: { href: string; label: string; onNavigate?: () => void }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className="block rounded px-3 py-2 text-[15px] hover:bg-white/10 focus:bg-white/10 focus:outline-none"
      >
        {label}
      </Link>
    </li>
  );
}

/**
 * Example header implementation (fixed header + embedded trigger):
 * Copy the parts you need to your own src/app/_components/header.tsx
 */
export function HeaderFixedWithDrawer() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-primary/100 shadow-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-sm font-extrabold text-white">
          ペンジニアの技育(ギーク)ブログ
        </Link>
        {/* Drawer trigger inline */}
        <SlideOutMenu />
      </div>
    </header>
  );
}

export function PagePaddingForFixedHeader({ children }: { children: React.ReactNode }) {
  // Add top padding equal to header height to avoid content being covered
  return <div className="pt-14">{children}</div>;
}
