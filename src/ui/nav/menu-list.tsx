"use client";

import type { FC } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideExternalLink } from "lucide-react";

import { MENU_LIST, LinkItem, OutlinkItem, SubItems } from "./data";

type Mode = "dropdown" | "submenu";

const MenuList: FC<{ className?: string; mode?: Mode }> = ({
  className,
  mode,
}) => {
  return (
    <ul className={clsx("menu md:menu-horizontal md:space-x-1", className)}>
      {MENU_LIST.map((item) => {
        const key = `${item.type}-${item.name}`;
        switch (item.type) {
          case "link":
          case "outlink":
            return <MenuItem key={key} item={item} />;
          case "submenu":
            return (
              <li key={key}>
                <SubMenu item={item} mode={mode} />
              </li>
            );
        }
      })}
    </ul>
  );
};

export default MenuList;

const MenuItem: FC<{
  item: LinkItem | OutlinkItem;
}> = ({ item }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);
  switch (item.type) {
    case "link":
      return (
        <li>
          <Link className={clsx({ "menu-active": isActive })} href={item.href}>
            {item.name}
          </Link>
        </li>
      );
    case "outlink":
      return (
        <li>
          <a href={item.href} target="_blank">
            {item.name}
            <LucideExternalLink
              className="icon-text justify-self-end"
              strokeWidth={1.75}
            />
          </a>
        </li>
      );
  }
};

const SubMenu: FC<{ item: SubItems; mode?: Mode }> = ({
  item,
  mode = "submenu",
}) => {
  switch (mode) {
    case "dropdown":
      return (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            {item.name}
          </div>
          <ul
            tabIndex={0}
            className="
              menu
              dropdown-content
              bg-base-200
              rounded-box
              z-10
              p-2
              w-[14em]
              shadow-sm
            "
          >
            {item.subs.map((sub) => (
              <MenuItem key={`${sub.type}-${sub.name}`} item={sub} />
            ))}
          </ul>
        </div>
      );
    case "submenu":
      return (
        <details>
          <summary>{item.name}</summary>
          <ul>
            {item.subs.map((sub) => (
              <MenuItem key={`${sub.type}-${sub.name}`} item={sub} />
            ))}
          </ul>
        </details>
      );
  }
};
