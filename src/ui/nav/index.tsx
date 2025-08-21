import { FC } from "react";
import Link from "next/link";
import { LucideMenu } from "lucide-react";

import { MenuItem as MenuItemType } from "./types";
import MenuList from "./menu-list";

const Navbar: FC<{
  data: MenuItemType[];
}> = ({ data }) => {
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          Lihs.me
        </Link>
      </div>
      <div className="navbar-end">
        <MenuList data={data} className="hidden md:flex" mode="dropdown" />
        <details className="dropdown dropdown-end md:hidden">
          <summary className="btn m-1">
            <LucideMenu />
          </summary>
          <MenuList
            data={data}
            className="
              dropdown-content
              w-[95vw]
              bg-base-200
              z-10
              p-2
              rounded-box
              shadow-sm
            "
          />
        </details>
      </div>
    </nav>
  );
};

export default Navbar;
