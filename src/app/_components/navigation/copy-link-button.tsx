"use client";

import { useState } from "react";

interface CopyLinkButtonProps {
  buttonClassName?: string;
}

export default function CopyLinkButton({ buttonClassName }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className={buttonClassName || "p-2 text-white hover:text-accent"}
        aria-label="共有リンクをコピー"
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
          className="lucide lucide-link-2"
        >
          <path d="M9 17H7A5 5 0 0 1 7 7h2" />
          <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
          <line x1="8" x2="16" y1="12" y2="12" />
        </svg>
      </button>

      {/* コピー済みメッセージ */}
      {copied && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <span className="bg-gray-200 text-blue-900 text-base px-4 py-2 rounded shadow-lg">
            共有リンクをコピーしました！
          </span>
        </div>
      )}
    </div>
  );
}
