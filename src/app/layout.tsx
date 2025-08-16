// src/app/layout.tsx（抜粋）
import "./globals.css";
import type { Metadata } from "next";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { Inter } from "next/font/google";
import cn from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ペンジニアの技育（ギーク）ブログ",
  description: "IT業界の荒波に揉まれるうちにペンギンになってしまったエンジニア。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={cn(inter.className, "bg-background text-text")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
