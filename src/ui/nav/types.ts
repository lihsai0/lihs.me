export type LinkItem = {
  type: "link";
  name: string;
  href: string;
};

export type OutlinkItem = {
  type: "outlink";
  name: string;
  href: string;
};

export type SubItems = {
  type: "submenu";
  name: string;
  subs: (LinkItem | OutlinkItem)[];
};

export type MenuItem = LinkItem | OutlinkItem | SubItems;
