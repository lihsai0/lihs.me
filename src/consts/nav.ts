import { MenuItem } from "@ui/nav/types";

export const MENU_LIST: MenuItem[] = [
  {
    type: "link",
    name: "博客",
    href: "/blog",
  },
  {
    type: "submenu",
    name: "小工具",
    subs: [
      {
        type: "outlink",
        name: "RIME 网页版",
        href: "https://webtool.lihs.me/rime/",
      },
      {
        type: "outlink",
        name: "Git 速查",
        href: "https://webtool.lihs.me/git-cheatsheet/",
      },
      {
        type: "outlink",
        name: "正则表达式解析器",
        href: "https://webtool.lihs.me/regexper/",
      },
    ],
  },
];
