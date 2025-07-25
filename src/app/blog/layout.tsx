import type { Metadata } from "next";

import Navbar from "@ui/nav";
import ICP from "@ui/icp";
import CC from "@ui/cc";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 flex-grow">{children}</main>
      <footer className="p-6 text-center text-sm">
        <ICP />
        <CC className="flex flex-col md:flex-row justify-center gap-x-4" />
      </footer>
    </div>
  );
}
