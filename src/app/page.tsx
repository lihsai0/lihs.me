import Link from "next/link";

import Navbar from "@ui/nav";
import CC from "@ui/cc";
import ICP from "@ui/icp";

import { MENU_LIST } from "@consts/nav";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar data={MENU_LIST} />
      <main className="container mx-auto p-4 flex-grow flex justify-center items-center">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="default-heading">你好，世界！</h1>
              <p className="py-6"></p>
              <div>
                <Link href="/blog" className="btn btn-primary">
                  前往博客
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="p-6 text-center text-sm">
        <ICP />
        <CC className="flex flex-col md:flex-row justify-center gap-x-4" />
      </footer>
    </div>
  );
}
