// src/app/layout.tsx
import Header from "@/app/_components/layouts/header";
import Footer from "@/app/_components/layouts/footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://pengineer-geek-blog.vercel.app"),
  title: "ペンジニアの技育（ギーク）ブログ",
  appleWebApp: {
    capable: true,
    title: "ペンジニアの技育（ギーク）ブログ",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      "/favicon.ico",
      "/favicon/favicon-16x16.png",
      "/favicon/favicon-32x32.png",
      "/favicon/favicon.ico"
    ],
    shortcut: "/favicon/favicon.ico",    // ショートカット用
    apple: "/favicon/apple-touch-icon-180.png", // iOS用（180×180 PNG）
  },
  description: "IT業界の荒波に揉まれるうちにペンギンになってしまったエンジニア。",
  openGraph: {
    type: "website",
    url: "/",
    title: "ペンジニアの技育（ギーク）ブログ",
    siteName: "ペンジニアの技育（ギーク）ブログ",
    description:
      "IT業界の荒波に揉まれるうちにペンギンになってしまったエンジニア。",
    images: [
      {
        url: "/ogp-pengineer.png",
        width: 1200,
        height: 630,
        alt: "ペンジニアの技育（ギーク）ブログ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ペンジニアの技育（ギーク）ブログ",
    description:
      "IT業界の荒波に揉まれるうちにペンギンになってしまったエンジニア。",
    images: ["/ogp-pengineer.png"],
  },
  alternates: { canonical: "/" }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon-180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <meta name="google-site-verification" content="BLV2VsQoWOmc353dHECcFN506gBTJJjgnsrkc4a1S2g" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ペンジニアの技育（ギーク）ブログ",
              "url": "https://pengineer-geek-blog.vercel.app/"
            }),
          }}
        />
      </head>
      <body className={cn(inter.className, "bg-background text-text")}>
        <Header />
        <div className="min-h-screen pt-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
