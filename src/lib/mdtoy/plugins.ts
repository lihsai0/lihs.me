import type { PluggableList } from "unified";
import remarkGFM from "remark-gfm";
import remarkRemoveComments from "remark-remove-comments";
import remarkGithubBlockquoteAlert from "remark-github-blockquote-alert";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

// see https://github.com/wooorm/lowlight?tab=readme-ov-file#data
// snapshot see ./common-lowlight.txt
import { common } from "lowlight";
import protobuf from "highlight.js/lib/languages/protobuf";
import pgsql from "highlight.js/lib/languages/pgsql";

import deepmerge from "deepmerge";

import remarkDirectiveHtmlTag from "./plugin_html_tag";
import { h } from "hastscript";

export const remarkPlugins: PluggableList = [
  // remove HTML comments
  remarkRemoveComments,
  // use GFM grammar
  remarkGFM,
  // add directive support
  remarkDirective,
  remarkDirectiveHtmlTag,
  // add GitHub blockquote alert
  remarkGithubBlockquoteAlert,
  // add math support
  remarkMath,
];

// const hljsClassNames = [ /^hljs-./,
//   "function_",
//   "escape_",
//   "inherited__",
//   "class_",
// ];

const sanitizeSchema: typeof defaultSchema = deepmerge(defaultSchema, {
  attributes: {
    "*": [
      ["className", /^markdown-./],
    ],
  },
  tagNames: ["mark"],
});

export const rehypePlugins: PluggableList = [
  // add head title anchor
  rehypeSlug,
  // add head title anchor link
  [
    rehypeAutolinkHeadings,
    {
      content: h("span", { className: "markdown-icon markdown-icon-link" }),
    },
  ],
  // sanitize html
  [rehypeSanitize, sanitizeSchema],
  // add math support
  rehypeKatex,
  // add code highlighting
  [
    rehypeHighlight,
    {
      languages: { ...common, protobuf, pgsql },
    },
  ],
  // add code line numbers and line highlighting
  [
    rehypeHighlightCodeLines,
    {
      // showLineNumbers: true,
    },
  ],
];
