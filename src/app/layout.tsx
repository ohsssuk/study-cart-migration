import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "카트",
  description: "카트 마이그레이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
