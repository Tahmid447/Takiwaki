"use client";

import React from "react";
import "./globals.css";

export const metadata = {
  title: "Takiwaki様 レッスン進捗ダッシュボード",
  description: "Teacher & student lesson progress dashboard"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>{metadata.title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body className="p-4 md:p-8 bg-[#FDFBF7] text-[#4A4A4A]">
        {children}
      </body>
    </html>
  );
}

