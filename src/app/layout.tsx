import type { Metadata } from "next";

import "katex/dist/katex.min.css";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lihs.me",
    template: "%s | Lihs.me",
  },
  description: "一个记录我的经历、想法与思考的个人网站。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-hans">
      <body>{children}</body>
    </html>
  );
}
