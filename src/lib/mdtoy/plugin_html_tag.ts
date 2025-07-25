import type { Root } from "mdast";
import { h } from "hastscript";
import { visit } from "unist-util-visit";

export default function remarkDirectiveHtmlTag() {
  return function (tree: Root) {
    visit(tree, (node) => {
      const allowList = [
        "abbr",
        "cite",
        "details",
        "kbd",
        "mark",
        "rp",
        "rt",
        "ruby",
        "summary",
        "time",
      ];
      if (
        (node.type === "containerDirective" ||
          node.type === "leafDirective" ||
          node.type === "textDirective") &&
        allowList.some((t) => t == node.name)
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes || {});

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}
