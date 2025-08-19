"use client";
// src/app/_components/navigation/slide-out-menu.tsx
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

/**
 * Header with a top-right hamburger that opens a slide-in menu from the right.
 * - Panel background: ~75% transparent gray
 * - Text: white, with white separators
 * - Close by: tapping the icon again, clicking the backdrop, pressing ESC, or swiping back
 */
export default function HeaderDrawer() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
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
      {/* Top-right menu button */}
      <button
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        onClick={toggle}
        className="fixed right-4 top-4 z-[60] rounded-full p-2 shadow-md hover:bg-gray-100/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bg-white/90"
      >
        {/* Provided Menu Icon (lucide style) */}
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
          <path d="M4 12h16" />
          <path d="M4 18h16" />
          <path d="M4 6h16" />
        </svg>
      </button>

      {/* Drawer + Backdrop */}
      {open && (
        <>
          {/* Backdrop */}
          <div
              key="backdrop"
              className={`fixed inset-0 z-50 bg-black/30 transition-opacity ${
                open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
              onClick={close}
            />

            {/* Slide-in panel */}
            <aside
              key="panel"
              role="dialog"
              aria-modal="true"
              className={`fixed right-0 top-0 z-[55] h-full w-[320px] max-w-[85vw] bg-gray-900/75 backdrop-blur-sm text-white
                transform transition-transform duration-300 ${
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
              </div>
          </aside>
        </>
      )}
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
